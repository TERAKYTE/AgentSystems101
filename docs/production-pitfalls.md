# Production Pitfalls

Agent systems fail in predictable ways. Most failures are not solved by a larger prompt.

## Common Problems

| Problem | Typical Cause | Mitigation |
| --- | --- | --- |
| Unbounded loops | No step budget or terminal condition | Add max steps, state checks, and explicit stop criteria. |
| Tool misuse | Vague tool descriptions or weak schemas | Use typed inputs, examples, validation, and clear errors. |
| Context pollution | Too much irrelevant memory or retrieval | Rank, filter, summarize, and expire context. |
| Hidden state bugs | State updated by prompts instead of code | Keep state transitions explicit and testable. |
| Silent hallucination | No grounding or source verification | Require citations and verify against retrieved evidence. |
| Runaway cost | Repeated calls, large context, unnecessary agents | Budget tokens, cache results, and remove low-value agents. |
| Unsafe side effects | Agent can act without approval boundaries | Gate irreversible actions behind deterministic checks or human approval. |
| Brittle demos | Only happy-path examples tested | Build scenario suites with failure and edge cases. |

## Production Checklist

- Define allowed actions and forbidden actions.
- Add budgets for steps, tokens, time, and tool calls.
- Log every model call and tool call with correlation IDs.
- Validate tool inputs before execution.
- Keep secrets outside prompts and logs.
- Add replayable evaluations before changing prompts.
- Use human approval for high-impact actions.
- Design a fallback path when the model, tool, or retrieval system fails.

