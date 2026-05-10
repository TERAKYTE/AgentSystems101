#!/usr/bin/env python3
"""Minimal deterministic agent loop.

The example uses a scripted model so it can run without network access. Replace
`scripted_model` with an LLM call after the loop, state, and stop conditions are
clear.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Callable


Tool = Callable[[str], str]


@dataclass
class AgentState:
    user_goal: str
    steps: list[str] = field(default_factory=list)
    observations: list[str] = field(default_factory=list)


def search_docs(query: str) -> str:
    corpus = {
        "agent loop": "An agent loop alternates between model reasoning, tool action, observation, and termination checks.",
        "stop condition": "Production agents need explicit stop conditions such as max steps, confidence, or a completed task state.",
    }
    return corpus.get(query.lower(), "No matching document found.")


def scripted_model(state: AgentState) -> str:
    if not state.observations:
        return "ACTION search_docs agent loop"
    if len(state.observations) == 1:
        return "ACTION search_docs stop condition"
    return "FINAL Use a bounded loop: plan, call tools, inspect observations, and stop when the task is complete."


def run_agent(user_goal: str, tools: dict[str, Tool], max_steps: int = 4) -> str:
    state = AgentState(user_goal=user_goal)

    for _ in range(max_steps):
        model_output = scripted_model(state)
        state.steps.append(model_output)

        if model_output.startswith("FINAL "):
            return model_output.removeprefix("FINAL ").strip()

        if not model_output.startswith("ACTION "):
            return "The model returned an unsupported instruction."

        _, tool_name, tool_input = model_output.split(" ", 2)
        tool = tools.get(tool_name)
        if tool is None:
            return f"Unknown tool requested: {tool_name}"

        state.observations.append(tool(tool_input))

    return "Stopped before completion because the step limit was reached."


if __name__ == "__main__":
    answer = run_agent(
        "Explain the safest minimal structure for an agent loop.",
        tools={"search_docs": search_docs},
    )
    print(answer)
