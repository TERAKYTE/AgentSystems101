# Chapter 9 Examples: Context Engineering

This directory contains the runnable examples for Chapter 9. The examples focus on context construction, note-taking tools, terminal access, and long-running agent workflows.

## Directory Layout

```text
chapter9/
├── 01_context_builder_basic.py          # Basic ContextBuilder usage
├── 02_context_builder_with_agent.py     # ContextBuilder integrated with an agent
├── 03_note_tool_operations.py           # Basic NoteTool operations
├── 04_note_tool_integration.py          # Advanced NoteTool integration
├── 05_terminal_tool_examples.py         # TerminalTool examples
├── 06_three_day_workflow.py             # Three-day workflow demonstration
├── codebase_maintainer.py               # Codebase maintenance assistant
├── codebase/                            # Sample codebase
│   ├── data_processor.py
│   ├── api_client.py
│   ├── utils.py
│   └── models.py
├── data/                                # Sample data
│   └── sales_2024.csv
├── logs/                                # Sample logs
│   └── app.log
└── project/                             # Sample project sandbox
    ├── README.md
    └── main.py
```

## Quickstart

### 1. Configure an embedding model

Examples that use memory need an embedding configuration. The simplest local option is TF-IDF:

```python
import os

# Use TF-IDF without extra model downloads or API keys.
os.environ['EMBED_MODEL_TYPE'] = 'tfidf'
os.environ['EMBED_MODEL_NAME'] = ''
```

### 2. Run the examples

```bash
cd examples/chapter9

# Run the TerminalTool example without an LLM.
python 05_terminal_tool_examples.py

# Run basic NoteTool operations without an LLM.
python 03_note_tool_operations.py

# Run the complete workflow demo after configuring an LLM.
python 06_three_day_workflow.py
```

## Example Map

### Basic Examples

`01_context_builder_basic.py`

- Shows basic `ContextBuilder` usage.
- Builds and manages `ContextPacket` objects.
- Demonstrates token limits and context priority.

`02_context_builder_with_agent.py`

- Integrates `ContextBuilder` with `SimpleAgent`.
- Demonstrates automatic context management.
- Handles conversation history.

`03_note_tool_operations.py`

- Covers `NoteTool` CRUD operations.
- Demonstrates note search and tag management.
- Exports notes for later use.

`04_note_tool_integration.py`

- Connects `NoteTool` with `ContextBuilder`.
- Tracks long-running project state.
- Generates suggestions from historical notes.

`05_terminal_tool_examples.py`

- Demonstrates common `TerminalTool` workflows.
- Covers exploratory navigation, data-file analysis, log review, codebase analysis, and safety behavior.

### Advanced Example

`06_three_day_workflow.py` demonstrates a longer-running agent workflow:

- Day 1: explore the codebase.
- Day 2: analyze code quality.
- Day 3: plan refactoring tasks.
- One week later: check progress.
- Maintain continuity across sessions.
- Coordinate `ContextBuilder`, `NoteTool`, and `TerminalTool`.

The workflow uses the sample `./codebase` directory:

- `data_processor.py`: data processing module with several TODOs.
- `api_client.py`: API client that needs stronger error handling.
- `utils.py`: utility functions that can be optimized.
- `models.py`: data models that need additional validation.

`codebase_maintainer.py` is the core assistant implementation. It combines:

- `ContextBuilder` for context management.
- `NoteTool` for structured notes.
- `TerminalTool` for immediate file access.
- `MemoryTool` with working memory only.

## Configuration

### Embedding Options

#### Option 1: TF-IDF for local testing

```python
import os

os.environ['EMBED_MODEL_TYPE'] = 'tfidf'
os.environ['EMBED_MODEL_NAME'] = ''
```

Benefits:

- No extra dependency.
- No API key.
- No model download.

Tradeoff:

- Weak semantic matching compared with embedding models.

#### Option 2: Local Transformer for offline semantic search

```python
import os

os.environ['EMBED_MODEL_TYPE'] = 'local'
os.environ['EMBED_MODEL_NAME'] = 'sentence-transformers/all-MiniLM-L6-v2'
os.environ['HF_TOKEN'] = 'your_huggingface_token'
```

Requirements:

1. Install dependencies with `pip install sentence-transformers`.
2. Create a Hugging Face token at <https://huggingface.co/settings/tokens>.
3. Allow the first run to download the model, roughly 90 MB.

Token setup:

```bash
# Recommended: configure once with huggingface-cli.
pip install huggingface-hub
huggingface-cli login

# Or set it in code.
os.environ['HF_TOKEN'] = 'hf_your_token_here'

# Or set it in the shell.
export HF_TOKEN="hf_your_token_here"
```

#### Option 3: DashScope for hosted embeddings

```python
import os

os.environ['EMBED_MODEL_TYPE'] = 'dashscope'
os.environ['EMBED_MODEL_NAME'] = 'text-embedding-v3'
os.environ['EMBED_API_KEY'] = 'your_dashscope_api_key'
```

Requirements:

1. Register at <https://dashscope.aliyun.com/>.
2. Create an API key.
3. Install the dependency with `pip install dashscope`.

### LLM Configuration

Examples that call an LLM need a configured `HelloAgentsLLM` client:

```python
from hello_agents import HelloAgentsLLM

# Uses default configuration. OPENAI_API_KEY must be set.
llm = HelloAgentsLLM()

# Or configure the client explicitly.
llm = HelloAgentsLLM(
    api_key="your_api_key",
    base_url="https://api.openai.com/v1",
    model="gpt-4"
)
```

For local work, prefer putting these values in a `.env` file.

### Memory Configuration

`codebase_maintainer.py` uses only working memory so the demo does not require a Qdrant vector database:

```python
self.memory_tool = MemoryTool(
    user_id=project_name,
    memory_types=["working"]
)
```

For episodic or semantic memory, install and start Qdrant:

```bash
docker run -p 6333:6333 qdrant/qdrant
```

## Supporting Files

`data/sales_2024.csv` contains more than 40 sales records with date, product, category, quantity, price, customer ID, and region fields.

`logs/app.log` simulates one day of application logs with INFO, WARNING, and ERROR entries from 2024-01-19 14:00 to 23:30.

`codebase/` contains four Python modules and more than ten TODO comments. It is designed for code analysis, TODO discovery, function search, and code statistics.

## Troubleshooting

### `RuntimeError: all embedding models are unavailable`

The embedding configuration is probably incomplete. For the TF-IDF path, make sure both variables are set:

```python
os.environ['EMBED_MODEL_TYPE'] = 'tfidf'
os.environ['EMBED_MODEL_NAME'] = ''
```

### Qdrant connection failed

The default configuration may be trying to connect to Qdrant. Use the working-memory-only setup in `codebase_maintainer.py`, or start Qdrant:

```bash
docker run -p 6333:6333 qdrant/qdrant
```

### Hugging Face model download failed

Check network access and the Hugging Face token. You can also set a mirror endpoint or fall back to TF-IDF:

```bash
export HF_ENDPOINT=https://hf-mirror.com
```

### TerminalTool rejected a command

`TerminalTool` uses an allowlist. Use supported commands such as `ls`, `cat`, `head`, `tail`, `grep`, `find`, `awk`, `sed`, `cut`, `sort`, `uniq`, `wc`, `pwd`, `cd`, `tree`, and `stat`.

## Recommended Run Order

1. Start with examples that do not require an LLM: `03_note_tool_operations.py` and `05_terminal_tool_examples.py`.
2. Configure embeddings, then run `01_context_builder_basic.py`.
3. Configure an LLM, then run `02_context_builder_with_agent.py`, `04_note_tool_integration.py`, and `06_three_day_workflow.py`.

## Related Docs

- Chapter: [Context Engineering](../../memory-rag/09-context-engineering.md)
- API details: see the docstrings in each tool class.
- Repository home: [AgentSystems101](../../README.md)
