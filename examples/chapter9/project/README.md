# Sample Project Directory

This directory is used to demonstrate `TerminalTool` safety behavior.

## Safety Properties

`TerminalTool` includes three guardrails:

1. **Command allowlist**: only specific low-risk commands can run.
2. **Working-directory boundary**: files outside the configured workspace cannot be accessed.
3. **Path traversal protection**: relative paths such as `..` are checked so the tool cannot escape the workspace.

## Test Scenarios

- Dangerous commands such as `rm -rf` should be blocked.
- Attempts to read files outside the workspace should be rejected.
- Attempts to escape the workspace with relative paths should be detected and blocked.
