# Mega Furnit Deployment Safety

## Do Not Overwrite Live Data Accidentally

These files are live user data:

- `data/site-content.json`
- `data/products.json`
- `data/page-builder.json`

They should not be included in future code-only deployment ZIPs unless the task specifically requires changing live content or layout data.

## Recommended ZIP Types

Use separate packages:

- Code-only ZIP: HTML, CSS, JavaScript, Netlify functions, admin/editor code, docs.
- Full reference ZIP: includes JSON data files for backup/reference only.
- Template/schema ZIP: example JSON or documentation only.

## High-Risk Files

Replacing these files can revert Decap CMS edits, Visual Editor changes, product edits, section order, hidden/deleted sections, theme settings, or design layers:

- `data/site-content.json`
- `data/products.json`
- `data/page-builder.json`

## Safe Upload Habit

Before uploading a ZIP to GitHub:

1. Check whether it contains files under `data/`.
2. If it does, confirm those JSON files are intentionally meant to replace the live website data.
3. Prefer uploading code files only when the task is a code/editor fix.
4. Keep a backup of current GitHub JSON data before replacing any live data file.

## Git Gateway Save

The Visual Editor Save button commits these live data files through Netlify Identity and Git Gateway:

- `data/site-content.json`
- `data/products.json`
- `data/page-builder.json`

Do not remove these files from the repository. Do not change Netlify deployment settings for this stabilization pass.

