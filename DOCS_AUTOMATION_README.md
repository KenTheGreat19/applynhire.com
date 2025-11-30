# Documentation Organization - Quick Reference

## What Was Done

✓ Created a `documentation/` folder in the project root
✓ Moved all existing `.md` files from:
  - Root level (README.md, CHANGELOG.md, etc.)
  - `docs/` folder (now removed)
  - `backend/` folder (README.md → BACKEND.md)

## Available Tools

### 1. **Initial Organization Script** (Already Run)
   ```bash
   bash scripts/organize-docs.sh /workspaces/applynhire.com
   ```
   - Creates documentation folder if needed
   - Moves all .md files from root and subdirectories

### 2. **Shell Function for Manual Organization**
   Add to your `~/.bashrc` or `~/.zshrc`:
   ```bash
   source /workspaces/applynhire.com/scripts/doc-functions.sh
   ```
   Then use:
   ```bash
   doc_auto_organize /workspaces/applynhire.com
   ```

### 3. **Automatic Git Hook** (Already Installed)
   - Location: `.git/hooks/pre-commit`
   - **Auto-enforces**: Any .md files you try to commit outside the `documentation/` folder are automatically moved there
   - **Trigger**: Happens automatically before each commit

## How to Use Going Forward

### Option A: Use the Git Hook (Recommended)
Just create or modify .md files anywhere and commit normally:
```bash
touch some-doc.md
git add some-doc.md
git commit -m "Add new documentation"
# The pre-commit hook automatically moves it to documentation/
```

### Option B: Manual Organization
Run the shell function when needed:
```bash
doc_auto_organize /workspaces/applynhire.com
```

### Option C: Create Files in Documentation Folder Directly
```bash
touch documentation/my-new-doc.md
```

## Makefile Integration (Optional)

Add to your `Makefile`:
```makefile
.PHONY: organize-docs
organize-docs:
	@bash scripts/organize-docs.sh

.PHONY: auto-docs
auto-docs:
	@source scripts/doc-functions.sh && doc_auto_organize .
```

Then use:
```bash
make organize-docs
make auto-docs
```

## Summary

- **All .md files are now in**: `documentation/`
- **Automatic enforcement**: Git pre-commit hook
- **Manual tools**: Scripts available for one-time organization
- **Future docs**: Will be automatically moved on commit or can use provided functions

No more scattered documentation!
