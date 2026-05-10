# Environment Configuration

Most examples in this repository use external model APIs. Keep provider settings in environment variables or `.env` files and never commit real secrets.

## Common Variables

```bash
MODEL_PROVIDER=openai
MODEL_ID=gpt-4.1-mini
OPENAI_API_KEY=replace_me
OPENAI_BASE_URL=https://api.openai.com/v1
```

Provider-specific examples may use different variable names, including `DASHSCOPE_API_KEY`, `MODELSCOPE_API_KEY`, `TAVILY_API_KEY`, `SERPAPI_API_KEY`, `QDRANT_URL`, or `NEO4J_URI`.

## Recommended Workflow

1. Copy the local `.env.example` file when one exists.
2. Fill in API keys locally.
3. Run the smallest smoke test first.
4. Confirm that generated logs do not contain secrets.
5. Add `.env` to `.gitignore` if the project does not already ignore it.

## Provider Notes

- OpenAI-compatible providers usually require a base URL, model ID, and API key.
- Local models such as Ollama may not require a cloud API key but still require the local service to be running.
- Retrieval examples may require vector database credentials.
- Browser, search, map, weather, and research examples may require separate tool API keys.

When an example fails, check environment variables before changing code.

