# Preface

Large language models changed how software systems handle language, reasoning traces, and tool-facing interfaces. Agent systems build on that capability by giving a model controlled access to tools, state, retrieval, and workflows. This is useful, but it is not magic: agent systems fail when goals are underspecified, tools are unsafe, context is unmanaged, or evaluation is missing.

AgentSystems101 is written for engineers who want to understand those tradeoffs directly. The handbook starts with LLM foundations, then moves through agent loops, planning, tool use, memory, RAG, orchestration, multi-agent protocols, evaluation, agentic training, and production operations.

The goal is not to promote agents as a replacement for conventional software. The goal is to show where agent patterns fit, where deterministic workflows are better, and how to build systems that can be inspected, measured, and improved.

## How To Read This Handbook

Start with the foundations if you are new to LLM application design. If you already build with LLM APIs, move quickly into the agent patterns and framework chapters, then spend more time on memory, RAG, evaluation, and production concerns.

Recommended path:

1. Read the foundations chapters to understand the vocabulary and limits of LLM-based systems.
2. Study classic agent patterns such as ReAct, planning, and reflection.
3. Compare low-code, framework-based, and from-scratch implementation approaches.
4. Learn how memory, retrieval, and context budgets affect system behavior.
5. Study multi-agent protocols only after single-agent tool use is clear.
6. Add evaluation before optimizing prompts or adding more tools.
7. Treat the projects as reference architectures rather than copy-paste templates.

## Prerequisites

- Basic Python programming ability.
- Familiarity with command-line development and Git.
- Basic understanding of HTTP APIs and JSON.
- Some experience using an LLM API is useful, but not required for the conceptual chapters.

You do not need a model-training background to start. The reinforcement learning chapter introduces the relevant workflow from an application-engineering perspective.

## Working Style

When reading or modifying the examples, keep these engineering boundaries in mind:

- Preserve code behavior unless you are intentionally fixing a bug.
- Treat prompts, tools, memory, and retrieval as separate system components.
- Prefer explicit contracts over hidden assumptions.
- Measure task outcomes, tool-call correctness, latency, cost, and failure modes.
- Keep humans in the loop for irreversible actions.

AgentSystems101 is meant to be a practical reference that can grow over time. Contributions should improve clarity, correctness, reproducibility, or production usefulness.
