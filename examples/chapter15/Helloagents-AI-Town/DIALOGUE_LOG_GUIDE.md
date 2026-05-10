# Dialogue Log Guide

Dialogue logs make Cyber Town debuggable. They record player messages, NPC responses, model metadata, and state changes.

## What to Log

For each turn, store:

- Timestamp.
- Player ID, if available.
- NPC name.
- Player message.
- NPC response.
- Model provider and model name.
- Tool calls, if any.
- Memory references, if any.
- Affinity changes.
- Error or fallback state.

## Recommended Shape

```json
{
  "timestamp": "2026-05-10T12:00:00Z",
  "npc": "Zhang San",
  "player_message": "What are you working on?",
  "npc_response": "I am optimizing the town simulation backend.",
  "model": "gpt-4o-mini",
  "affinity_delta": 1,
  "fallback": false
}
```

## Uses

- Debug prompt failures.
- Inspect NPC consistency.
- Reconstruct user-visible behavior.
- Evaluate cost and latency.
- Improve memory and affinity logic.

## Privacy and Safety

Do not log secrets, API keys, or unnecessary personal data. If logs can include user input, treat them as sensitive application data.

## Operational Advice

- Rotate logs in long-running demos.
- Store structured JSONL when possible.
- Keep human-readable summaries for demo review.
- Add correlation IDs when requests span backend, LLM, and frontend layers.
