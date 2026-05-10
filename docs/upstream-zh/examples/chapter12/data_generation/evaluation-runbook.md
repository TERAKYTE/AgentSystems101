# AIME Data Generation and Evaluation Runbook

This runbook explains how to generate AIME-style data, run automated evaluation, inspect reports, and optionally perform human verification.

## Prerequisites

### 1. Install dependencies

```bash
pip install hello-agents[evaluation]
pip install datasets huggingface_hub pandas tqdm gradio
```

### 2. Configure environment variables

Create or update `.env`:

```bash
DASHSCOPE_API_KEY=your_dashscope_key
OPENAI_API_KEY=your_openai_key
HF_TOKEN=your_hf_token
```

Use at least one LLM provider key. `HF_TOKEN` is used for dataset downloads.

## One-Command Workflow

Run the full generation and evaluation pipeline:

```bash
cd examples/chapter12
python data_generation/run_complete_evaluation.py 30 3.0
```

Arguments:

- `30`: generate 30 problems.
- `3.0`: wait 3 seconds between generations. Two to three seconds is usually a safer default for rate limits.

The workflow uses AIME 2025 reference problems from `math-ai/aime25` in JSONL format.

Estimated runtime:

- Data generation: 15-30 minutes for 30 problems.
- LLM judge evaluation: 10-15 minutes.
- Win-rate evaluation: 5-10 minutes.
- Total: roughly 30-55 minutes, depending on provider latency and rate limits.

Output layout:

```text
data_generation/
├── generated_data/
│   └── aime_generated_YYYYMMDD_HHMMSS.json
└── evaluation_results/
    └── YYYYMMDD_HHMMSS/
        ├── llm_judge/
        │   ├── llm_judge_result_YYYYMMDD_HHMMSS.jsonl
        │   └── llm_judge_report_YYYYMMDD_HHMMSS.md
        ├── win_rate/
        │   ├── win_rate_result_YYYYMMDD_HHMMSS.jsonl
        │   └── win_rate_report_YYYYMMDD_HHMMSS.md
        └── comprehensive_report.md
```

## Inspect Reports

Find the newest evaluation directory:

```bash
cd data_generation/evaluation_results
ls -lt
```

Read the combined report:

```bash
cat YYYYMMDD_HHMMSS/comprehensive_report.md
```

The combined report includes generation metadata, topic distribution, answer analysis, LLM judge scores, win-rate statistics, and improvement recommendations.

Read detailed reports:

```bash
cat YYYYMMDD_HHMMSS/llm_judge/llm_judge_report_YYYYMMDD_HHMMSS.md
cat YYYYMMDD_HHMMSS/win_rate/win_rate_report_YYYYMMDD_HHMMSS.md
```

## Optional Human Verification

Launch the review UI:

```bash
python data_generation/human_verification_ui.py data_generation/generated_data/aime_generated_YYYYMMDD_HHMMSS.json
```

Workflow:

1. Open `http://127.0.0.1:7860`.
2. Review each problem, answer, and solution.
3. Score the item across four dimensions on a 1-5 scale.
4. Mark it as `approved`, `rejected`, or `needs_revision`.
5. Add reviewer comments if useful.
6. Submit the review and move to the next item.

Verification output:

```text
data_generation/generated_data/aime_generated_YYYYMMDD_HHMMSS_verifications.json
```

## Advanced: Run Steps Separately

Generate only:

```python
from data_generation.aime_generator import AIMEGenerator

generator = AIMEGenerator(delay_seconds=3.0)
generated_data_path = generator.generate_and_save(num_problems=30)
print(f"Generated data saved to: {generated_data_path}")
```

Run only LLM judge evaluation:

```python
from hello_agents import HelloAgentsLLM
from hello_agents.tools import LLMJudgeTool

llm = HelloAgentsLLM()
llm_judge_tool = LLMJudgeTool(llm=llm)

result = llm_judge_tool.run({
    "generated_data_path": "data_generation/generated_data/aime_generated_XXXXXX.json",
    "reference_year": 2025,
    "max_samples": 30,
    "output_dir": "data_generation/evaluation_results/llm_judge"
})
```

Run only win-rate evaluation:

```python
from hello_agents import HelloAgentsLLM
from hello_agents.tools import WinRateTool

llm = HelloAgentsLLM()
win_rate_tool = WinRateTool(llm=llm)

result = win_rate_tool.run({
    "generated_data_path": "data_generation/generated_data/aime_generated_XXXXXX.json",
    "reference_year": 2025,
    "num_comparisons": 20,
    "output_dir": "data_generation/evaluation_results/win_rate"
})
```

## Troubleshooting

### API rate limits

If the provider retries requests, increase the delay:

```bash
python data_generation/run_complete_evaluation.py 30 5.0
```

If the run is interrupted, rerun the same command. The pipeline is designed to resume from checkpoints when available.

### Slow Hugging Face downloads

Use a mirror endpoint if needed:

```bash
export HF_ENDPOINT=https://hf-mirror.com
```

### Duplicate generated problems

The generator samples from a large reference set and prompts the model to produce distinct problems. If duplicates remain, increase manual review, tighten prompts, or add a post-generation duplicate filter.

### Evaluation failed

Check that API keys are valid, generated data files exist, and JSON/JSONL files are well-formed.

## Quality Thresholds

Strong result:

- LLM judge average score at least 4.5/5.0.
- Win rate near 48% or higher.
- Pass rate at least 90%.
- Human approval rate at least 95%.

Acceptable result:

- LLM judge average score at least 4.0/5.0.
- Win rate at least 45%.
- Pass rate at least 80%.
- Human approval rate at least 90%.

Needs improvement:

- LLM judge average below 4.0/5.0.
- Win rate below 45%.
- Pass rate below 80%.
- Human approval rate below 90%.

## Next Steps

If quality is strong, keep the data, generate more samples if needed, and retain the reports as quality evidence.

If quality is acceptable, add human verification, keep only high-quality examples, and tune prompts.

If quality needs improvement, analyze low-scoring examples, adjust generation prompts, regenerate, and rerun evaluation.

## Summary

1. Run `python data_generation/run_complete_evaluation.py 30 3.0`.
2. Wait for generation and evaluation to finish.
3. Review `data_generation/evaluation_results/XXXXXX/comprehensive_report.md`.
4. Optionally run human verification.
5. Decide whether to keep, filter, or regenerate the data.
