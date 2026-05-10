# Observability

Agent observability is the difference between debugging a system and guessing what happened.

## Minimum Trace Fields

| Field | Notes |
| --- | --- |
| run_id | Stable ID for the full task. |
| step_id | Stable ID for each model/tool step. |
| user_request | Original request, with sensitive data redacted where needed. |
| system_prompt_hash | Store full prompt securely or hash it with a version pointer. |
| model | Provider, model name, temperature, and relevant inference settings. |
| input_tokens and output_tokens | Required for cost and context analysis. |
| tool_name | Name and version of each tool called. |
| tool_arguments | Validate and redact before logging. |
| tool_result_summary | Store enough to debug without leaking sensitive data. |
| retrieved_context_ids | Chunk IDs, scores, source documents, and timestamps. |
| final_answer | The user-visible response. |
| error | Exception class, message, retry count, and fallback path. |

## Debugging Questions

- Did the agent choose the right next action?
- Was the tool call valid?
- Was retrieved context relevant and current?
- Did memory help or pollute the answer?
- Did the system stop for the right reason?
- Was a cheaper or simpler path available?

## Redaction Rules

Do not log raw secrets, full credentials, private keys, access tokens, payment data, or unnecessary personal data. Redaction belongs in code, not in prompt instructions.

