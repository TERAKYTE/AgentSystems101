#!/usr/bin/env python3
"""Minimal evaluation harness for agent behavior."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class EvalCase:
    name: str
    user_input: str
    expected_tool: str
    expected_phrase: str


@dataclass(frozen=True)
class EvalResult:
    name: str
    passed: bool
    reason: str


def simple_agent(user_input: str) -> tuple[str, str]:
    lowered = user_input.lower()
    if "refund" in lowered:
        return "lookup_policy", "Refund requests require an order ID and a reason code."
    if "latency" in lowered:
        return "search_docs", "Latency should be tracked alongside tool calls and model cost."
    return "none", "I need a clearer task before selecting a tool."


def evaluate(case: EvalCase) -> EvalResult:
    tool, answer = simple_agent(case.user_input)
    if tool != case.expected_tool:
        return EvalResult(case.name, False, f"Expected tool {case.expected_tool}, got {tool}.")
    if case.expected_phrase.lower() not in answer.lower():
        return EvalResult(case.name, False, "Expected phrase was missing from the answer.")
    return EvalResult(case.name, True, "Passed.")


if __name__ == "__main__":
    cases = [
        EvalCase("refund_policy", "What is the refund workflow?", "lookup_policy", "order ID"),
        EvalCase("observability", "How do we monitor latency?", "search_docs", "Latency"),
        EvalCase("ambiguous", "Help me", "none", "clearer task"),
    ]

    results = [evaluate(case) for case in cases]
    for result in results:
        status = "PASS" if result.passed else "FAIL"
        print(f"{status} {result.name}: {result.reason}")

    failed = [result for result in results if not result.passed]
    raise SystemExit(1 if failed else 0)
