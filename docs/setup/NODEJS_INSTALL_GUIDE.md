# Installing Node.js and npx

Node.js is required for many Model Context Protocol (MCP) servers because a large part of the MCP server ecosystem is written in JavaScript or TypeScript.

Installing Node.js gives you:

- `node`: the JavaScript runtime
- `npm`: the Node package manager
- `npx`: a package runner that can download and execute packages without a permanent global install

## Windows

1. Open [https://nodejs.org/](https://nodejs.org/).
2. Download the LTS installer.
3. Run the `.msi` installer.
4. Keep the default installation path unless you have a specific reason to change it.
5. Make sure `Add to PATH` is enabled.
6. Restart PowerShell or Command Prompt.

Verify:

```powershell
node --version
npm --version
npx --version
```

## macOS

Use the official installer or Homebrew.

Official installer:

```bash
# Download the LTS .pkg from https://nodejs.org/
node --version
npm --version
npx --version
```

Homebrew:

```bash
brew install node
node --version
npm --version
npx --version
```

## Linux

For Debian or Ubuntu, NodeSource is usually a better option than the default system package when you need a current LTS release.

```bash
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
npx --version
```

## Why npx Matters for MCP

Many MCP examples start community servers through `npx`:

```bash
npx -y @modelcontextprotocol/server-filesystem .
```

This downloads and runs the package on demand, which is useful for tutorials and local experimentation.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `node` is not recognized | Restart the terminal and confirm Node.js was added to `PATH`. |
| `npx` is slow | Use a reliable npm registry or install the package globally for repeated use. |
| Permission errors on macOS/Linux | Avoid running normal `npx` workflows with `sudo`; fix npm directory permissions instead. |
| Multiple Node versions conflict | Use `nvm` on macOS/Linux or `nvm-windows` on Windows. |

## Next Step

After Node.js is installed, continue with the MCP examples in [Agent Communication Protocols](../../multi-agent/10-agent-communication-protocols.md).
