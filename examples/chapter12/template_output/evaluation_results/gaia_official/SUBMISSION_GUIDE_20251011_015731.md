# GAIA Result Submission Guide

## Evaluation Summary

- **Model name**: `TestAgent`
- **Evaluation level**: 1
- **Total samples**: 2
- **Exact matches**: 0
- **Exact match rate**: 0.00%

## Submission File

Result file:

```text
gaia_level1_result_20251011_015731.jsonl
```

The JSONL file contains one record per task with:

- `task_id`
- `model_answer`
- `reasoning_trace`, if available

## Submit to the GAIA Leaderboard

1. Open the GAIA leaderboard page.
2. Prepare model metadata such as model name, model family, and model type.
3. Upload the JSONL result file.
4. Confirm the format before submitting.

Expected JSONL format:

```json
{"task_id": "xxx", "model_answer": "answer", "reasoning_trace": "reasoning trace"}
```

## Checks Before Submission

- Verify that every task has a `task_id`.
- Confirm that answers are normalized to the expected format.
- Make sure the uploaded file is the final JSONL output, not the Markdown summary.
- Do not submit toy results as official benchmark claims.

## Notes

This guide is sample output from the local evaluation workflow. Use it to understand the submission shape before preparing a real run.
