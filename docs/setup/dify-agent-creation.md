# Dify Agent Creation Notes

This short guide replaces the original step-by-step Chinese appendix with an English-first setup checklist.

## Basic Flow

1. Create a Dify workspace.
2. Add a model provider and verify a simple chat call.
3. Create a new chatflow, workflow, or agent app depending on the use case.
4. Add tools or plugins only when the workflow needs them.
5. Add a knowledge base if the agent needs retrieval over documents.
6. Test with representative prompts and inspect intermediate workflow outputs.
7. Export or document the workflow before sharing it.

## Engineering Checks

- Keep tool credentials in Dify's credential store.
- Name workflow nodes by purpose, not by implementation detail.
- Add fallback branches for failed tool calls.
- Keep prompts short enough to review and version.
- Test at least one failure case, not only the happy path.

## When To Use Dify

Dify is useful for fast product prototypes, internal assistants, and RAG applications where the workflow can be represented in a visual builder. If you need deeply custom runtime control, explicit state machines, or heavy automated testing, a code-first framework may be a better fit.

