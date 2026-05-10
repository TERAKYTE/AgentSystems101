# Cost Optimization

Agent cost is driven by model calls, context size, tool latency, retries, and unnecessary agent handoffs.

## Cost Drivers

| Driver | Control |
| --- | --- |
| Large context | Retrieve fewer, better chunks; summarize old state; remove redundant instructions. |
| Too many agents | Collapse roles unless specialization measurably improves outcomes. |
| Tool retries | Validate arguments before calls; return actionable tool errors. |
| Expensive models everywhere | Route simple steps to smaller models; reserve stronger models for hard decisions. |
| Repeated retrieval | Cache query results and document embeddings. |
| Long outputs | Specify output format and length constraints. |

## Practical Policy

1. Start with a simple single-agent baseline.
2. Add instrumentation before optimization.
3. Measure cost per successful task, not cost per request.
4. Use model routing only after you know which steps are hard.
5. Keep quality gates; cheap wrong answers are still expensive.

