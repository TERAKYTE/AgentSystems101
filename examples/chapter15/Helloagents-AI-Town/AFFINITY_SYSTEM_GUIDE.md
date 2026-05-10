# Affinity System Guide

The affinity system tracks the relationship between the player and each NPC. It is designed for game-state continuity, not psychological realism.

## Goals

- Make repeated interactions feel persistent.
- Let NPC responses reflect relationship history.
- Provide a simple state variable that can affect dialogue tone and behavior.

## Core Model

Each NPC has an affinity score and an affinity level. The score changes after interactions. The level is derived from score ranges and can be used in prompts, UI labels, and game logic.

Recommended five-level model:

| Level | Meaning | Typical behavior |
| --- | --- | --- |
| 1 | Cold | Short, guarded responses. |
| 2 | Neutral | Polite but limited responses. |
| 3 | Familiar | More helpful and conversational responses. |
| 4 | Friendly | Proactive suggestions and warmer tone. |
| 5 | Trusted | More context sharing and cooperative behavior. |

## Update Rules

Affinity should change slowly. Large jumps make the simulation unstable.

Example update signals:

- Positive player message: small increase.
- Helpful task completion: moderate increase.
- Repeated interruption or hostile message: decrease.
- Long inactivity: optional decay.

## Prompt Use

Inject affinity as compact context:

```text
Relationship with player: Friendly. The NPC is open and helpful but still stays in character.
```

Avoid letting affinity override role constraints, safety rules, or task requirements.

## Failure Modes

- **Runaway positivity**: every interaction increases affinity. Add neutral and negative cases.
- **Tone mismatch**: prompt says "cold" but response is warm. Add examples per level.
- **State drift**: relationship changes without logged evidence. Store recent reasons for updates.
- **Over-personalization**: NPC reveals too much too early. Gate information by level.

## Implementation Checklist

- Store affinity per player and NPC.
- Clamp scores to the valid range.
- Log every score update with a reason.
- Expose affinity state to the frontend.
- Keep update logic separate from dialogue generation so it can be tested.
