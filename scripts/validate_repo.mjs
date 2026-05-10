#!/usr/bin/env node
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", ".venv", "venv", "__pycache__"]);
const activeMarkdownRoots = [
  "README.md",
  "docs",
  "foundations",
  "agent-patterns",
  "memory-rag",
  "frameworks",
  "multi-agent",
  "evaluation",
  "rl-agents",
  "projects",
  "examples",
  "notebooks",
  "assets",
];

const failures = [];

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function isActiveMarkdown(file) {
  const relative = rel(file);
  if (relative.startsWith("docs/upstream-zh/")) return false;
  if (relative.startsWith("docs/upstream-legacy/")) return false;
  if (relative.startsWith("projects/community/")) return relative === "projects/community/README.md";
  return activeMarkdownRoots.some((prefix) => relative === prefix || relative.startsWith(`${prefix}/`));
}

function stripCodeFences(markdown) {
  const lines = markdown.split(/\r?\n/);
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return "";
      }
      return inFence ? "" : line;
    })
    .join("\n");
}

function checkMarkdown(file) {
  const text = readFileSync(file, "utf8");
  const relative = rel(file);
  const fenceMatches = text.match(/^\s*(```|~~~)/gm) || [];
  if (fenceMatches.length % 2 !== 0) {
    failures.push(`${relative}: unbalanced Markdown code fences`);
  }

  const headings = new Map();
  const linesWithoutCode = stripCodeFences(text).split(/\r?\n/);
  for (const [index, line] of linesWithoutCode.entries()) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const normalized = match[2].trim().toLowerCase();
    const seen = headings.get(normalized) || [];
    seen.push(index + 1);
    headings.set(normalized, seen);
  }
  for (const [heading, lines] of headings.entries()) {
    if (lines.length > 1) {
      failures.push(`${relative}: duplicate heading "${heading}" on lines ${lines.join(", ")}`);
    }
  }

  const withoutCode = stripCodeFences(text);
  const nonCodeLines = withoutCode.split(/\r?\n/);
  for (const [index, line] of nonCodeLines.entries()) {
    if (/\p{Script=Han}/u.test(line)) {
      failures.push(`${relative}: non-English prose remains outside code fences on line ${index + 1}`);
    }
  }

  const linkPattern = /!?\[[^\]]*?\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = linkPattern.exec(withoutCode)) !== null) {
    const rawTarget = match[1].trim();
    if (
      rawTarget.startsWith("#") ||
      /^[a-z][a-z0-9+.-]*:/i.test(rawTarget) ||
      rawTarget.startsWith("mailto:")
    ) {
      continue;
    }
    const [targetPath] = rawTarget.split("#");
    if (!targetPath) continue;
    let decoded = targetPath;
    try {
      decoded = decodeURIComponent(targetPath);
    } catch {
      failures.push(`${relative}: malformed URL encoding in link ${rawTarget}`);
      continue;
    }
    const resolved = path.resolve(path.dirname(file), decoded);
    if (!resolved.startsWith(root) || !existsSync(resolved)) {
      failures.push(`${relative}: broken local link ${rawTarget}`);
    }
  }
}

function checkNotebook(file) {
  const relative = rel(file);
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    if (!Array.isArray(data.cells)) {
      failures.push(`${relative}: notebook JSON has no cells array`);
    }
  } catch (error) {
    failures.push(`${relative}: invalid notebook JSON: ${error.message}`);
  }
}

function checkPythonSyntax(files) {
  if (files.length === 0) return;
  const script = [
    "import ast, pathlib, sys",
    "bad=[]",
    "for p in sys.argv[1:]:",
    "    try:",
    "        ast.parse(pathlib.Path(p).read_text(encoding='utf-8'))",
    "    except SyntaxError as e:",
    "        bad.append(f'{p}:{e.lineno}:{e.msg}')",
    "    except UnicodeDecodeError as e:",
    "        bad.append(f'{p}:utf8:{e}')",
    "print('\\n'.join(bad))",
    "sys.exit(1 if bad else 0)",
  ].join("\n");

  for (let index = 0; index < files.length; index += 80) {
    const chunk = files.slice(index, index + 80);
    const python = spawnSync("python", ["-c", script, ...chunk], {
      cwd: root,
      encoding: "utf8",
      shell: false,
    });
    if (python.status !== 0) {
      const output = `${python.stdout || ""}${python.stderr || ""}`.trim();
      failures.push(`Python syntax validation failed:\n${output}`);
    }
  }
}

const files = walk(root);
for (const file of files) {
  try {
    readFileSync(file);
  } catch (error) {
    failures.push(`${rel(file)}: unreadable file: ${error.message}`);
  }
}

const markdownFiles = files.filter((file) => file.endsWith(".md") && isActiveMarkdown(file));
const notebookFiles = files.filter((file) => file.endsWith(".ipynb") && !rel(file).startsWith("projects/community/"));
const pythonFiles = files.filter((file) => file.endsWith(".py") && !rel(file).startsWith("projects/community/"));

for (const file of markdownFiles) checkMarkdown(file);
for (const file of notebookFiles) checkNotebook(file);
checkPythonSyntax(pythonFiles);

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validation passed: ${markdownFiles.length} Markdown files, ${notebookFiles.length} notebooks, ${pythonFiles.length} Python files checked.`);
