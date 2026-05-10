# Examples

This directory contains curated English examples that can be read and run without external services. They are intentionally small so the engineering pattern is visible without framework setup.

| File | Demonstrates |
| --- | --- |
| [minimal-agent-loop.py](./minimal-agent-loop.py) | A bounded agent loop with planning, action, observation, and final response steps. |
| [tool-use-agent.py](./tool-use-agent.py) | Explicit tool contracts, argument validation, and deterministic tool dispatch. |
| [rag-memory-workflow.py](./rag-memory-workflow.py) | Retrieval, lightweight memory, and context budget management. |
| [evaluation-harness.py](./evaluation-harness.py) | Task-level evaluation for tool choice, output correctness, and failure reporting. |

The original upstream example tree is preserved under [docs/upstream-zh/examples](../docs/upstream-zh/examples). Those examples are useful for compatibility checks and historical reference, but they are intentionally outside the active English example surface.
