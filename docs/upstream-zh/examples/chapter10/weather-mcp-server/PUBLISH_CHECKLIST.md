# Publish Checklist

Use this checklist before submitting the MCP server to Smithery.

## File Checks

- [ ] `README.md` is complete and clear.
- [ ] `LICENSE` exists.
- [ ] `Dockerfile` is configured correctly, if used.
- [ ] `pyproject.toml` is configured correctly.
- [ ] `requirements.txt` contains all required dependencies.
- [ ] `smithery.yaml` is configured correctly.
- [ ] `server.py` runs locally.

## Functional Tests

- [ ] The server starts successfully.
- [ ] All tools can be called.
- [ ] Errors are handled clearly.
- [ ] Response payloads have the expected shape.

## Documentation Checks

- [ ] Installation instructions are clear.
- [ ] Usage examples are complete.
- [ ] API documentation covers all tools.
- [ ] Supported capabilities are listed.

## Configuration Checks

- [ ] `name` and `version` are correct in `pyproject.toml`.
- [ ] `name` is unique in `smithery.yaml`.
- [ ] Versions match across `pyproject.toml` and `smithery.yaml`.
- [ ] Versioning follows semantic versioning.
- [ ] Tool definitions are complete.
- [ ] Homepage URL is correct.

## GitHub Readiness

- [ ] Code has been pushed to GitHub.
- [ ] A `v1.0.0` tag exists.
- [ ] A release has been created.
- [ ] The repository is public.

## Final Checks

- [ ] Local tests pass.
- [ ] Documentation has no obvious spelling issues.
- [ ] Important links are reachable.
- [ ] The server is ready for Smithery submission.

## Submission Steps

1. Open <https://smithery.ai/>.
2. Sign in with GitHub.
3. Click **Submit Server**.
4. Enter the repository URL.
5. Confirm the metadata.
6. Submit and wait for review. Reviews commonly take one to three days.

## After Approval

- [ ] Approval email received.
- [ ] Server is searchable on Smithery.
- [ ] Installation and usage have been tested from Smithery.
- [ ] Announcement or community post is prepared, if relevant.
