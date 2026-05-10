# Cyber Town FastAPI Backend

This backend powers the Cyber Town AI NPC dialogue system.

## Features

- Player-to-NPC chat with one agent per NPC.
- Batch dialogue generation for autonomous NPC updates.
- NPC state caching and refresh endpoints.
- CORS support for Godot HTML5 exports.
- Preset-dialogue fallback when no LLM key is configured.

## NPCs

1. **Zhang San**: Python engineer in the workstation area.
2. **Li Si**: product manager in the meeting room.
3. **Wang Wu**: UI designer in the lounge area.

## Install

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file or set environment variables. If no API key is configured, the system runs with preset dialogue.

## Run

```bash
python main.py
```

Or:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

After startup:

- API docs: `http://localhost:8000/docs`
- Root endpoint: `http://localhost:8000/`

## Test

```bash
python test_api.py
```

The test script checks the root route, health check, NPC list, NPC status, chat endpoint, NPC details, and forced status refresh.

## Main Endpoints

```http
GET /npcs
```

Returns all configured NPCs.

```http
POST /chat
Content-Type: application/json

{
  "npc_name": "Zhang San",
  "message": "Hello, what are you working on?"
}
```

Starts a player-to-NPC chat turn.

```http
GET /npcs/status
```

Returns cached autonomous dialogue and state.

```http
POST /npcs/status/refresh
```

Forces a state refresh.

## Project Structure

```text
backend/
├── main.py              # FastAPI app
├── config.py            # Configuration
├── models.py            # Pydantic models
├── agents.py            # NPC agent system
├── batch_generator.py   # Batch dialogue generation
├── state_manager.py     # NPC state cache
├── test_api.py          # API smoke tests
├── requirements.txt
└── README.md
```

## Design Notes

Batch generation reduces cost and latency by updating multiple NPCs in one model call. Direct chat still uses the target NPC's role context.

Recommended update intervals:

- Development: 10 seconds.
- Normal run: 30-60 seconds.
- Low-cost mode: 120 seconds.

## Troubleshooting

- LLM initialization failed: check `OPENAI_API_KEY` or provider settings.
- Dialogue has no model response: the fallback preset-dialogue mode may be active.
- CORS error: check `CORS_ORIGINS` in `config.py`.

## Development

To add an NPC, update `NPC_ROLES` in `agents.py`, add preset dialogue in `batch_generator.py`, and restart the service.

To change dialogue style, edit the system-prompt construction in `agents.py`.

## License

This example follows the same license as the HelloAgents project.
