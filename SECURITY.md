# Security Policy

AgentSystems101 is an educational repository, but examples may demonstrate tool use, retrieval, automation, and model-facing workflows. Treat all agent systems as untrusted by default until tool permissions, data boundaries, and human approval paths are explicit.

## Reporting Security Issues

Please report security-sensitive issues privately through the repository owner contact channels rather than opening a public issue. Include:

- affected file or example,
- impact,
- reproduction steps,
- suggested mitigation if known.

## Example Safety Expectations

- Do not commit API keys, access tokens, cookies, or local credentials.
- Do not add examples that execute shell commands, network writes, or filesystem changes without explicit guardrails.
- Keep destructive tool calls behind human approval.
- Prefer read-only examples for public educational material.
- Document required permissions clearly when an example needs external services.
