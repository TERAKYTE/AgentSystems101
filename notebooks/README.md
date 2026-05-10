# Notebooks

Notebook files are preserved in their source example or community project directories to avoid breaking local paths.

Use this directory as the notebook policy and index:

- Keep notebooks reproducible.
- Do not rewrite notebook JSON manually.
- Avoid committing secrets, local paths, or large generated outputs.
- Validate notebook JSON before publishing.

Find notebooks with:

```bash
rg --files -g "*.ipynb"
```

