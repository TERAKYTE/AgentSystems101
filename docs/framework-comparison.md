# Framework Comparison

Framework choice should follow the control problem, not the trend. The key question is whether the system needs flexible reasoning, deterministic workflow control, multi-agent collaboration, or fast product assembly.

| Option | Best For | Avoid When | Operational Notes |
| --- | --- | --- | --- |
| Dify | Internal assistants, RAG apps, workflow prototypes | You need deep custom orchestration or unusual runtime behavior | Good for fast iteration; inspect export and deployment constraints early. |
| Coze | Bot experiences and platform-native agent workflows | You need portable backend ownership | Strong product surface; platform dependency is the tradeoff. |
| n8n | Business automation with many SaaS integrations | The task requires complex open-ended reasoning | Treat the LLM as one workflow step, not the whole system. |
| AutoGen | Role-based collaboration and conversational agent teams | You need deterministic state transitions | Conversation flow is easy to start and harder to bound. |
| AgentScope | Engineered multi-agent systems with lifecycle concerns | The task is a small one-agent prototype | Better fit when message passing and deployment matter. |
| CAMEL | Role-playing experiments and cooperative task solving | You need strong guarantees about workflow order | Useful for exploration; evaluate outputs aggressively. |
| LangGraph | Stateful agent workflows, loops, and human checkpoints | You want a no-code product builder | Strong choice for explicit state machines and production debugging. |
| Custom framework | Education, specialized control, minimal dependencies | You cannot invest in tests and observability | Best for learning internals or highly constrained systems. |

## Selection Heuristics

- Use a workflow engine when the process is known and failure cost is high.
- Use an agent loop when task decomposition cannot be fully specified upfront.
- Use multi-agent collaboration only when role separation improves the result enough to justify the cost.
- Use RAG when factual grounding matters and the knowledge source can be curated.
- Use memory when repeated sessions create useful state; otherwise keep context ephemeral.

## Common Failure Modes

- Framework hides too much state to debug failures.
- Multi-agent chat adds cost without improving task quality.
- Tool schemas are vague, causing invalid calls.
- Retrieval returns plausible but irrelevant context.
- Evaluation only checks final text and misses bad intermediate actions.

