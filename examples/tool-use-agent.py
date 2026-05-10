#!/usr/bin/env python3
"""Tool-use example with explicit contracts and validation."""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any, Callable


@dataclass(frozen=True)
class ToolSpec:
    name: str
    required_args: tuple[str, ...]
    handler: Callable[..., str]


def calculate(expression: str) -> str:
    allowed = set("0123456789+-*/(). ")
    if any(char not in allowed for char in expression):
        raise ValueError("Expression contains unsupported characters.")
    return str(eval(expression, {"__builtins__": {}}, {}))


def lookup_policy(topic: str) -> str:
    policies = {
        "refund": "Refund requests require an order ID and a reason code.",
        "privacy": "Privacy requests must be routed to the data protection workflow.",
    }
    return policies.get(topic.lower(), "No policy entry found.")


TOOLS = {
    "calculate": ToolSpec("calculate", ("expression",), calculate),
    "lookup_policy": ToolSpec("lookup_policy", ("topic",), lookup_policy),
}


def dispatch_tool(tool_call: str) -> str:
    payload: dict[str, Any] = json.loads(tool_call)
    tool_name = payload.get("tool")
    args = payload.get("args", {})

    spec = TOOLS.get(tool_name)
    if spec is None:
        return f"Rejected unknown tool: {tool_name}"

    missing = [arg for arg in spec.required_args if arg not in args]
    if missing:
        return f"Rejected {tool_name}: missing required args {missing}"

    try:
        return spec.handler(**{key: args[key] for key in spec.required_args})
    except Exception as error:
        return f"Tool error from {tool_name}: {error}"


if __name__ == "__main__":
    calls = [
        '{"tool": "lookup_policy", "args": {"topic": "refund"}}',
        '{"tool": "calculate", "args": {"expression": "(42 * 3) / 2"}}',
        '{"tool": "calculate", "args": {"expression": "__import__(\\"os\\")"}}',
    ]
    for call in calls:
        print(dispatch_tool(call))
