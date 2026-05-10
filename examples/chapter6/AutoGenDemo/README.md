# AutoGen Software Team Collaboration Example

This example demonstrates how to use AutoGen to model a small software-development team with multiple collaborating agents.

## Files

- `autogen_software_team.py`: main example using an OpenAI-compatible client.
- `llm_client.py`: `HelloAgentsLLM` client wrapper.
- `requirements.txt`: Python dependencies.
- `output.py`: generated Streamlit Bitcoin price app.
- `README.md`: this guide.

## What It Demonstrates

- A product manager, engineer, code reviewer, and user proxy working through a development task.
- Requirement analysis, implementation, code review, and user feedback.
- Automated handoff between agents.
- Code generation followed by review.

## Setup

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```bash
LLM_API_KEY=your-api-key-here
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL_ID=gpt-4
```

Verify the environment:

```python
import os
from dotenv import load_dotenv

load_dotenv()

print(f"API Key: {os.getenv('LLM_API_KEY')[:10]}...")
print(f"Base URL: {os.getenv('LLM_BASE_URL')}")
print(f"Model: {os.getenv('LLM_MODEL_ID')}")
```

## Run

```bash
python autogen_software_team.py
```

Expected flow:

1. Initialize the model client.
2. Create the agent team.
3. Start the team conversation.
4. Let each role contribute: product planning, engineering, review, and user validation.
5. Stop when the termination condition is met.

## Agent Roles

- **ProductManager**: requirements, technical planning, risks, acceptance criteria.
- **Engineer**: implementation and technical design.
- **CodeReviewer**: quality, security, maintainability, and performance review.
- **UserProxy**: user-side testing and feedback.

## Generated App

The example generates a simple Bitcoin price app with:

- Current BTC price in USD.
- 24-hour change display.
- Refresh support.
- Error and loading states.
- Streamlit UI.

Run it with:

```bash
streamlit run output.py
```

## Customization

Modify role prompts in `autogen_software_team.py` to change behavior. Adjust the participant list, termination condition, and `max_turns` to change the collaboration flow.

## Troubleshooting

If agents do not start, check the API key, network connection, and model name. If the generated app fails, install dependencies and inspect the Python traceback.

## Related Chapters

- [Classic Agent Patterns](../../../agent-patterns/04-classic-agent-patterns.md)
- [Build Your Own Agent Framework](../../../frameworks/07-build-your-agent-framework.md)
- [Agent Evaluation](../../../evaluation/12-agent-performance-evaluation.md)
