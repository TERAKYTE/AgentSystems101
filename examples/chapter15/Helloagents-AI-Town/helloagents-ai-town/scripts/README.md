# Godot Script Notes

This directory contains scripts for the Cyber Town Godot client.

## Responsibilities

Scripts typically handle:

- Player movement and interaction.
- NPC state rendering.
- Backend API calls.
- Dialogue UI updates.
- Polling or refreshing autonomous NPC status.

## Backend Integration

The Godot client should call the FastAPI backend instead of calling the LLM provider directly. This keeps API keys out of the client and centralizes dialogue, memory, and affinity logic.

Recommended flow:

1. Player interacts with an NPC.
2. Godot sends a chat request to the backend.
3. Backend generates or retrieves the NPC response.
4. Godot renders the response and updates local UI state.

## Debugging

- Confirm the backend is running before testing scripts.
- Log request URLs and response status codes.
- Keep timeouts short enough for UI responsiveness.
- Handle fallback dialogue gracefully when the backend returns an error.

## Extension Points

- Add new NPC interaction triggers.
- Display affinity level in the UI.
- Show memory-based callbacks in dialogue.
- Add local animations based on backend NPC activity.
