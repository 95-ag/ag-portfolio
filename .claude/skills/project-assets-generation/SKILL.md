---
name: project-assets-generation
description: >
  From an approved portfolio MDX, categorizes every referenced visual, generates it
  from a tracked source file using shared tooling, frames and crops per Step 5b
  principles, and places optimized exports in /public/projects/<slug>/ with editable
  sources retained in assets-source/. Always generates from source — never hand-edits
  production files directly.

  Use this skill after MDX is approved and the user says things like "generate the
  assets for <slug>", "make the diagrams for <slug>", "build the figures", "create
  the pipeline diagram", "generate the charts". Fire on any figure/diagram/chart
  request tied to a portfolio page even without the word "asset". Do NOT fire for
  hero cover generation (separate skill) or MDX content edits (separate skill).
---

# Project Assets Generation

You generate the production assets for a portfolio MDX page. The output is a set of
SVG/PNG/WebP files in `/public/projects/<slug>/` — each with an editable source retained
in `assets-source/` — handed to the user for approval before cover generation begins.

## Before generating anything — read these references

1. **`references/asset-procedure.md`** — categorization decision table, audit-before-generate
   rule, Step 5b framing and crop normalization principles. Read before touching any source
   material or generating any file.

2. **`references/asset-standards.md`** — format table, directory layout, naming convention,
   exact mmdc command, matplotlib shared style usage, reproducibility rules, anti-patterns.
   Read before writing any source file or export command.

## High-level procedure

### Step 1 — Inventory

Read the approved MDX. List every `<Diagram>`, `<Figure>`, and `<Stack>` component reference
that names a file in `/public/projects/<slug>/`. These are the assets to produce.

Check `/public/projects/<slug>/` for any assets already committed. Do not regenerate committed
assets unless the user explicitly asks.

### Step 2 — Categorize

For each asset, assign a type using the decision table in `references/asset-procedure.md`:

| Type | When |
|---|---|
| Mermaid | Sequential pipelines, stage diagrams, selection processes, dependency/state |
| matplotlib | Any result with source numbers (benchmark, comparison chart, ROC curve, heatmap) |
| Legacy crop | Figure exists in PDF but source data is unavailable for regeneration |
| Composition | Annotated layouts, side-by-side image comparisons, raster panels |

Do not generate an asset without a source file. The only exception is legacy PDF crops —
document the crop procedure in a comment or notes file.

### Step 3 — Audit existing assets (before generating)

Before writing or exporting anything, measure the content bounds of every asset you plan
to produce or crop. See `references/asset-procedure.md` Step 5b — audit rule. Know exactly
what whitespace is present before you export. It is easy to make framing worse under the
assumption you are making it better.

### Step 4 — Generate

**Mermaid diagrams:**
1. Write `.mmd` source to `assets-source/mermaid/<slug>/<name>.mmd` — no `%%{init}%%` blocks
2. Run: `mmdc -i <source>.mmd -o /public/projects/<slug>/<name>.svg -c assets-source/mermaid/_theme.json`

**matplotlib charts:**
1. Write Python script to `assets-source/matplotlib/<slug>/<name>.py`
2. Apply shared style: `plt.style.use('assets-source/matplotlib/_portfolio.mplstyle')`
3. Note the run command explicitly so the user can reproduce

**Legacy PDF crops:**
- Use PIL/equivalent to measure content bounds of the source figure
- Apply consistent padding (typically 15–28px) per `references/asset-procedure.md`
- Export as high-DPI PNG to `/public/projects/<slug>/<name>.png`

### Step 5 — Frame and place

Apply Step 5b framing rules from `references/asset-procedure.md` before finalizing exports:
- Width hierarchy (full prose width only for complex information-dense diagrams)
- Multi-subplot figures displayed as single composed figures — not split
- Crop normalization: symmetric padding, unified y-bounds across subplots

Place exports:
- Production files → `/public/projects/<slug>/`
- Source files → `assets-source/{mermaid,matplotlib}/<slug>/`

## Output

Production assets in `/public/projects/<slug>/` with sources retained.

Stop here — hand the asset list to the user for approval. Do not generate the hero cover
or modify the MDX. Those are separate skills.

## Validation — check before handing off

- Every asset has a source file (`.mmd` or `.py`) — except documented PDF crops
- No `%%{init}%%` blocks in any `.mmd` file
- SVG for all Mermaid and vector outputs; PNG/WebP for raster per the format table
- Filenames are descriptive and stable — not `chart.svg` or `diagram1.svg`
- Production assets are in `/public/projects/<slug>/`, not in `assets-source/`
- `next build` passes (no broken `/public` refs from the MDX)
