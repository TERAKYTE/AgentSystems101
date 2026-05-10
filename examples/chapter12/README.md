# Chapter 12 Examples: Agent Evaluation

This directory contains the runnable examples for Chapter 12, which covers agent performance evaluation, BFCL, GAIA, LLM-as-judge workflows, win-rate comparison, and synthetic data quality checks.

## File Map

| File | Section | Purpose |
| --- | --- | --- |
| `01_basic_agent_example.py` | 12.1.1 | Basic agent example that motivates evaluation. |
| `02_bfcl_quick_start.py` | 12.2.5 | BFCL quickstart with a high-level evaluation wrapper. |
| `03_bfcl_custom_evaluation.py` | 12.2.5 | BFCL evaluation using lower-level components. |
| `04_run_bfcl_evaluation.py` | 12.2.9 | BFCL evaluation workflow with practical checks. |
| `05_gaia_quick_start.py` | 12.3.5 | GAIA quickstart. |
| `06_gaia_best_practices.py` | 12.3.9 | GAIA evaluation practices. |
| `07_data_generation_complete_flow.py` | 12.4.6 | End-to-end synthetic data generation and evaluation. |
| `08_data_generation_llm_judge.py` | 12.4.3 | LLM judge evaluation for generated data. |
| `09_data_generation_win_rate.py` | 12.4.4 | Win-rate evaluation for generated data. |

## Quickstart

### 1. Install dependencies

```bash
pip install hello-agents[evaluation]==0.2.3
```

### 2. Configure environment variables

```bash
export OPENAI_API_KEY="your_openai_api_key"
export HF_TOKEN="your_huggingface_token"
```

`HF_TOKEN` is required for gated Hugging Face datasets such as GAIA.

### 3. Download BFCL data if needed

The first BFCL run can download data automatically. If that fails, download the Gorilla repository manually:

```bash
cd ../HelloAgents
git clone https://github.com/ShishirPatil/gorilla.git temp_gorilla
```

## Run Examples

### Basic Agent Example

```bash
python 01_basic_agent_example.py
```

Shows a minimal ReAct-style agent and explains why evaluation harnesses are needed.

### BFCL Quickstart

```bash
python 02_bfcl_quick_start.py
```

Expected output:

```text
Accuracy: 100.00%
Correct: 5/5
```

### Custom BFCL Evaluation

```bash
python 03_bfcl_custom_evaluation.py
```

Shows how to assemble a custom BFCL evaluation from lower-level components.

### BFCL Best Practices

```bash
python 04_run_bfcl_evaluation.py
```

Covers progressive evaluation, multi-category evaluation, comparative runs, and error analysis.

### GAIA Quickstart

GAIA is a gated dataset. Request access first:

1. Open <https://huggingface.co/datasets/gaia-benchmark/GAIA>.
2. Click **Request Access**.
3. Wait for approval.
4. Set `HF_TOKEN`.

```bash
python 05_gaia_quick_start.py
```

Expected output:

```text
Exact match: 100.00%
Partial match: 100.00%
Correct: 2/2
```

### GAIA Best Practices

```bash
python 06_gaia_best_practices.py
```

Covers level-based evaluation, small-sample smoke tests, and result interpretation.

### Complete Data Generation Evaluation

```bash
python 07_data_generation_complete_flow.py 30 3.0
```

Arguments:

- `30`: generate 30 problems.
- `3.0`: wait 3 seconds between generations.

Workflow:

1. Generate AIME-style problems.
2. Score them with an LLM judge.
3. Compare them with reference problems using win rate.
4. Optionally perform human verification.

Expected output:

```text
Generated problems: 30
LLM judge average score: 3.5/5.0
Win rate: 45.0%
Recommendation: generated quality is approaching reference AIME style.
```

### LLM Judge Evaluation

```bash
python 08_data_generation_llm_judge.py
```

Evaluates generated AIME-style problems across correctness, clarity, difficulty match, and completeness.

### Win-Rate Evaluation

```bash
python 09_data_generation_win_rate.py
```

Compares generated problems against reference problems and reports win, tie, and loss rates.

## Recommended Learning Path

Beginner path:

1. Run `01_basic_agent_example.py`.
2. Run `02_bfcl_quick_start.py`.
3. Run `04_run_bfcl_evaluation.py`.
4. Run `05_gaia_quick_start.py`.
5. Run `06_gaia_best_practices.py`.

Advanced path:

1. Run `03_bfcl_custom_evaluation.py`.
2. Run `08_data_generation_llm_judge.py`.
3. Run `09_data_generation_win_rate.py`.
4. Run `07_data_generation_complete_flow.py`.

## Troubleshooting

### Module not found

Install the framework locally:

```bash
cd ../HelloAgents
pip install -e .
```

### BFCL data not found

The first run should download the dataset. If it fails, clone the Gorilla repository manually:

```bash
cd ../HelloAgents
git clone https://github.com/ShishirPatil/gorilla.git temp_gorilla
```

### GAIA access denied

GAIA requires dataset approval. Request access on Hugging Face and set `HF_TOKEN`.

### Evaluation is slow

Reduce sample counts while developing:

```python
results = bfcl_tool.run(agent, category="simple_python", max_samples=5)
results = gaia_tool.run(agent, level=1, max_samples=2)
```

Or reduce generated data volume:

```bash
python 07_data_generation_complete_flow.py 10 3.0
```

### How should I estimate cost?

Costs come mostly from LLM API calls:

- BFCL: roughly one call per sample.
- GAIA: often one to five calls per sample, depending on task complexity.
- Synthetic data generation: generation, judge scoring, and pairwise win-rate calls each add cost.

Use small samples first, then scale only after the harness is stable.

## Related Resources

- [HelloAgents framework](https://github.com/jjyaoao/HelloAgents)
- [BFCL / Gorilla](https://github.com/ShishirPatil/gorilla)
- [GAIA dataset](https://huggingface.co/datasets/gaia-benchmark/GAIA)
