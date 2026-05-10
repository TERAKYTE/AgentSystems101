# Cyber Town Setup Guide

This guide explains how to run the Cyber Town demo locally.

## Requirements

- Python 3.10 or newer.
- Godot 4.x.
- An OpenAI-compatible LLM API key, optional but recommended.
- Windows, macOS, or Linux shell.

## Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env`:

```bash
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4o-mini
```

If no API key is set, the backend uses preset dialogue so the demo can still run.

Start the backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Open `http://localhost:8000/docs` to verify the API.

## Godot Setup

1. Open Godot 4.x.
2. Import the project from the Godot directory.
3. Confirm the backend URL points to `http://localhost:8000`.
4. Run the scene.

## Smoke Test

Run:

```bash
cd backend
python test_api.py
```

The smoke test should confirm that NPC listing, status retrieval, chat, and refresh endpoints work.

## Common Issues

- Backend does not start: check Python version and dependencies.
- API key error: verify `.env` and environment variable loading.
- Godot cannot connect: check backend port and CORS settings.
- NPC dialogue is generic: the fallback dialogue mode may be active.

## Development Tips

- Use shorter update intervals while debugging.
- Keep API logs open beside the Godot console.
- Test backend endpoints before debugging the game client.
- Keep model calls small during iteration to control cost.
