# Contributing

AgentSystems101 accepts contributions that improve technical accuracy, educational clarity, reproducibility, or production usefulness.

## Contribution Standards

- Keep executable behavior intact unless the change is explicitly a bug fix.
- Preserve imports, public APIs, and notebook structure unless a maintainer approves a refactor.
- Use technical English, not literal translation.
- Add or update validation when changing links, examples, notebooks, or repository structure.
- Mark uncertain technical interpretations with a TODO instead of guessing.
- Keep pull requests focused on one topic.

## Local Checks

Run these before opening a pull request:

```bash
node scripts/validate_repo.mjs
npx markdownlint-cli2
python examples/minimal-agent-loop.py
python examples/tool-use-agent.py
python examples/rag-memory-workflow.py
python examples/evaluation-harness.py
```

## Documentation Style

- Prefer grounded engineering language.
- Explain tradeoffs, failure modes, and operational constraints.
- Avoid hype claims about autonomy or model capability.
- Keep examples small enough for readers to inspect.
- Link to deeper references only when they help the reader make an engineering decision.

## Repository Boundaries

Active English-first material lives in the top-level curriculum directories. Original-language upstream material is preserved under `docs/upstream-zh` for attribution and compatibility.
