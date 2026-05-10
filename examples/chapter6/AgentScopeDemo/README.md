# AgentScope Multi-Agent Game Example

This example demonstrates how to use AgentScope for a multi-agent game-style workflow. It is part of the Chapter 6 framework-practice material.

## Purpose

The project shows how role-based agents can coordinate in an interactive scenario. Use it to study:

- Multi-agent role design.
- Turn-taking and state updates.
- Tool and message routing.
- Failure modes in long-running agent interactions.

## Setup

Install the dependencies listed in the example directory, then configure the model provider required by the scripts.

```bash
pip install -r requirements.txt
```

Use environment variables or a local `.env` file for API keys and model settings.

## Run

Run the main demo script from this directory. If multiple scripts are present, start with the one named as the main game or demo entrypoint.

```bash
python main.py
```

If the repository version uses a different entrypoint, inspect the scripts in this directory and run the file that creates the AgentScope agents.

## Design Notes

- Keep role prompts short enough to avoid context drift.
- Treat generated dialogue as simulation output, not factual content.
- Add logging when debugging multi-agent turn order.
- Use smaller turn limits during development to reduce cost and latency.

## Extension Ideas

- Add more agent roles.
- Add a human observer mode.
- Record game events for later analysis.
- Add metrics for turn length, tool calls, and task completion.

## Related Chapters

- [Framework Development Practice](../../../frameworks/06-framework-development-practice.md)
- [Multi-Agent Protocols](../../../multi-agent/10-agent-communication-protocols.md)
