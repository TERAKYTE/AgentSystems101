# Evaluation Methodology

Agent evaluation must inspect the process, not only the final answer. A final response can look correct while using the wrong tool, violating a policy, missing a required source, or silently corrupting state.

## What To Measure

| Layer | Example Metric | Why It Matters |
| --- | --- | --- |
| Task outcome | Success rate, exact match, rubric score | Measures user-visible quality. |
| Tool use | Valid call rate, argument accuracy, unnecessary calls | Catches orchestration failures. |
| Retrieval | Recall at k, citation support, context relevance | Prevents ungrounded answers. |
| Memory | Write precision, stale memory rate, deletion success | Avoids polluted long-term state. |
| Safety | Policy violations, unsafe side effects, approval bypasses | Controls operational risk. |
| Cost | Tokens, tool calls, wall time, retries | Keeps systems economically viable. |
| Reliability | Retry rate, timeout rate, non-deterministic failures | Shows production readiness. |

## Evaluation Set Design

1. Include normal tasks, edge cases, adversarial prompts, and ambiguous requests.
2. Record expected tool calls where tool behavior matters.
3. Include negative cases where the agent should refuse, ask for clarification, or stop.
4. Separate development examples from holdout evaluations.
5. Re-run a representative subset after every prompt, retrieval, model, or tool change.

## Rubric Template

| Score | Meaning |
| --- | --- |
| 5 | Correct answer, correct process, all constraints satisfied. |
| 4 | Correct answer with minor process or formatting issues. |
| 3 | Partially correct, missing important context or weak grounding. |
| 2 | Major error, wrong tool use, or incomplete task. |
| 1 | Unsafe, misleading, fabricated, or task-breaking output. |

## Practical Guidance

- Store model inputs, tool outputs, retrieved chunks, and final answers for evaluation replay.
- Evaluate multiple model/provider configurations with the same harness.
- Track regressions by scenario, not only by average score.
- Treat "looks good in a demo" as insufficient evidence.

