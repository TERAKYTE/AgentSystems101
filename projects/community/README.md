# Community Projects

This directory preserves community-submitted capstone projects from the upstream repository.

These projects are useful for studying how learners applied agent patterns to concrete products, but they are not a single maintained application. Expect variation in:

- language and documentation quality
- dependency versions
- API provider assumptions
- notebook reproducibility
- production readiness

## Contribution Format

Community project folders should use:

```text
github-username-project-name/
|-- README.md
|-- requirements.txt
|-- main.ipynb or main.py
`-- supporting files
```

Recommended README sections:

- project summary
- core agent workflow
- tools and external services
- setup and configuration
- usage examples
- known limitations
- author attribution

## Review Standard

Before treating a community project as a reference implementation, check:

1. Does it run from a clean environment?
2. Are secrets excluded?
3. Are tool calls and side effects explicit?
4. Does it include enough examples to verify behavior?
5. Are generated outputs clearly separated from source code?

For the main capstone guidance, see [Capstone Project](../16-capstone-project.md).
