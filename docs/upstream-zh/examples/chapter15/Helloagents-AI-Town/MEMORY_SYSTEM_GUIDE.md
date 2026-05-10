# Memory System Guide

Cyber Town uses memory to make NPCs respond consistently across turns and sessions.

## Memory Types

Short-term memory:

- Recent messages in the current interaction.
- Useful for immediate coherence.
- Should be bounded by token budget.

Long-term memory:

- Durable facts about the player, NPC, and relationship.
- Useful for continuity across sessions.
- Should be summarized and validated before reuse.

Episodic memory:

- Important events, tasks, or moments.
- Useful for callbacks in future conversations.

## What to Store

Store compact facts, not full transcripts by default:

- Player preferences.
- Important promises or tasks.
- Relationship events.
- NPC-specific facts.
- Game-world events.

Example:

```json
{
  "npc": "Li Si",
  "type": "episodic",
  "fact": "The player helped prepare the product review notes.",
  "importance": 0.8,
  "created_at": "2026-05-10T12:00:00Z"
}
```

## Retrieval Strategy

Retrieve only the memories relevant to the current NPC and situation. Too much memory increases cost and can make responses drift.

Recommended retrieval order:

1. Current session context.
2. NPC profile and role.
3. Recent relationship events.
4. High-importance long-term facts.

## Failure Modes

- **Memory stuffing**: too much retrieved context reduces answer quality.
- **Stale facts**: old state conflicts with current game state.
- **Unverified facts**: user statements are treated as true without confirmation.
- **Cross-NPC leakage**: one NPC uses another NPC's private context.

## Guardrails

- Namespace memory by NPC and player.
- Store timestamps and importance.
- Summarize long conversations.
- Add deletion or correction paths.
- Log which memories were retrieved for each response.
