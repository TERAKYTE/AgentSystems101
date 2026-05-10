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
const headingCache = new Map();
const textExtensions = new Set([
  ".css",
  ".csv",
  ".env",
  ".gd",
  ".godot",
  ".html",
  ".ini",
  ".js",
  ".json",
  ".jsonc",
  ".jsonl",
  ".md",
  ".mjs",
  ".py",
  ".sh",
  ".svg",
  ".toml",
  ".ts",
  ".tscn",
  ".tsx",
  ".txt",
  ".vue",
  ".yaml",
  ".yml",
]);

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

function isArchivedOrGenerated(relative) {
  return (
    relative.startsWith("docs/upstream-zh/") ||
    relative.startsWith("docs/upstream-legacy/") ||
    relative.startsWith("projects/community/")
  );
}

function isTextLikeFile(relative) {
  const basename = path.basename(relative);
  const extension = path.extname(relative);
  return (
    textExtensions.has(extension) ||
    basename === "README" ||
    basename === "LICENSE" ||
    basename === "NOTICE" ||
    basename.startsWith(".env")
  );
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

function githubSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingAnchors(file) {
  if (headingCache.has(file)) return headingCache.get(file);
  const anchors = new Set();
  const seen = new Map();
  const text = stripCodeFences(readFileSync(file, "utf8"));
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const base = githubSlug(match[2]);
    if (!base) continue;
    const count = seen.get(base) || 0;
    anchors.add(count === 0 ? base : `${base}-${count}`);
    seen.set(base, count + 1);
  }
  headingCache.set(file, anchors);
  return anchors;
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
    const [targetPath, anchor] = rawTarget.split("#");
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
      continue;
    }
    if (anchor && resolved.endsWith(".md")) {
      const decodedAnchor = decodeURIComponent(anchor).toLowerCase();
      if (!headingAnchors(resolved).has(decodedAnchor)) {
        failures.push(`${relative}: broken local anchor ${rawTarget}`);
      }
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
  const relative = rel(file);
  if (!isArchivedOrGenerated(relative) && /[^\x00-\x7F]/.test(relative)) {
    failures.push(`${relative}: active path contains non-ASCII characters`);
  }
  try {
    readFileSync(file);
  } catch (error) {
    failures.push(`${relative}: unreadable file: ${error.message}`);
  }
  if (!isArchivedOrGenerated(relative) && isTextLikeFile(relative)) {
    const text = readFileSync(file, "utf8");
    if (/\p{Script=Han}/u.test(text)) {
      failures.push(`${relative}: active text file contains Chinese characters`);
    }
  }
}

const markdownFiles = files.filter((file) => file.endsWith(".md") && isActiveMarkdown(file));
const notebookFiles = files.filter((file) => file.endsWith(".ipynb") && !isArchivedOrGenerated(rel(file)));
const pythonFiles = files.filter((file) => file.endsWith(".py") && !isArchivedOrGenerated(rel(file)));

for (const file of markdownFiles) checkMarkdown(file);
for (const file of notebookFiles) checkNotebook(file);
checkPythonSyntax(pythonFiles);

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validation passed: ${markdownFiles.length} Markdown files, ${notebookFiles.length} notebooks, ${pythonFiles.length} Python files checked.`);
