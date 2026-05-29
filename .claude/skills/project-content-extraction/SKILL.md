---
name: project-content-extraction
description: >
  Converts a research project (PDF report + repo + user context) into a fresh,
  schema-aligned portfolio MDX page at content/projects/<slug>.mdx. Always rebuilds
  body content from scratch — never transforms a prior draft. Produces complete
  frontmatter + H2-spine body, density-reduced and ready for human approval before
  asset generation begins.

  Use this skill whenever the user starts a new portfolio project page, says things
  like "extract <project> into MDX", "build the case study for <slug>", "write up
  the <project>", "turn this paper/repo into a portfolio page", or supplies a PDF +
  repo + slug in any combination — even if they don't say "MDX" or "portfolio". Fire
  on any request that initiates the content phase of a project. Do NOT fire for asset
  generation (diagrams, charts), cover/hero work, or reviewing an existing page —
  those are separate sibling skills.
---

# Project Content Extraction

You convert a research project (paper, repo, or both) into a portfolio-quality MDX
page. The output is a single file at `content/projects/<slug>.mdx` — complete
frontmatter and a deep-dive body — handed to the user for approval before any assets
or cover work begins.

## Before writing anything — read these references

1. **`references/evidence-and-modes.md`** — determines which source mode applies
   (report+repo / repo-only / report-only), how to rank conflicting claims, and how
   to tag confidence in repo-only mode. Read this before touching any source material.

2. **`references/frontmatter-rules.md`** — all required and optional frontmatter
   fields, their types, build-fail conditions, and MDX body authoring rules. Read
   this before writing the frontmatter.

3. **`references/extraction-procedure.md`** — the full intake → build → density
   reduction procedure. Use it as the step-by-step operating guide.

## High-level procedure

### Step 1 — Source Intake

Read every source before writing a single line. Consult `references/extraction-procedure.md`
Step 1 for the complete intake checklist.

Key discipline: dump the PDF and read it end-to-end. Inventory all tables (metric
sources) and all figures (determines what can be regenerated vs. must be cropped).
Scan the repo's README, training scripts, config files, and imports. Build a
numeric-claim log if a prior draft exists — that's an audit, not a transformation.

Ask the user upfront about anything that requires clarification (GitHub URL, logo
permissions, title framing, metric framing choices). Do this before writing, not
mid-draft.

### Step 2 — Write the MDX

Write the frontmatter first. The schema is strict — get it right before touching the
body. See `references/frontmatter-rules.md` for every field.

For the body: discard any existing content and rebuild from source. Old body content
is reference material, not a transformation input. Keep only the file path and any
frontmatter fields that are already confirmed correct.

Follow the standard H2 spine. See `references/extraction-procedure.md` Step 2 for
the full spine, narrative arc, and standalone-readability requirement.

### Step 3 — Density Reduction

Before finalizing, run the density checklist from `references/extraction-procedure.md`
Step 4. Convert standard-dataset-property tables to one-sentence prose. Remove figures
that duplicate table data. Pull the one interesting hyperparameter into prose with its
rationale; drop the rest.

## Output

One file: `content/projects/<slug>.mdx`

Stop here — hand the file path to the user for approval. Do not run reviewers,
generate assets, or build the cover. Those are separate skills that run after
this step is approved.

## Validation — check before handing off

- `next build` passes (Zod validates frontmatter at build time; schema at
  `src/lib/schemas/project.ts`)
- No H1 in the MDX body
- No raw HTML in body — use components: `<Figure>`, `<Diagram>`, `<Callout>`,
  `<Stack>`, `<Highlight>`
- No `slug:` field in frontmatter
- In repo-only mode: no paper-style metrics written without a traceable source

## Source mode quick-reference

| Available sources | Mode |
|---|---|
| PDF + repo | report+repo |
| Repo only, no PDF | repo-only |
| PDF only, no code | report-only |

The full mode rules — what each mode requires, forbids, and escalates to clarification —
are in `references/evidence-and-modes.md`.
