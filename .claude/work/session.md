# Session State — Portfolio Pipeline

> **Fresh sessions: read this file FIRST**, then `tasks.md`, then the active stage's skill.
> This file holds pipeline STATE (status, sources, decisions). `tasks.md` holds the actionable
> checklist. Stage execution detail comes from each skill when invoked.
> Process rules → `.claude/CLAUDE.md`. Active plan → `/home/ag-95/.claude/plans/masked-autoencoders-pipeline.md` (WSL global plans dir, not the repo).

---

## Phase

**Phase 6 — Project Content** · branch `phase-6-real-content`
Completed projects: `model-extraction-attacks` (full pipeline — reference exemplar),
`dqn-lane-localization` (full pipeline — negative-result project, approved 2026-05-31).
All 4 pipeline skills are frozen and audited.

---

## Current Project

**`masked-autoencoders`** — pipeline-run plan **approved 2026-05-31**
(`/home/ag-95/.claude/plans/masked-autoencoders-pipeline.md`). Stage 1 (MDX) + Stage 2 (assets) approved; **Stage 3 (cover) next**.

**Kickoff complete** — sources located, slug confirmed:
- Report PDF: `tmp/mae_original/Advanced_DL_Project_Report_Group20.pdf`
- Report images: `tmp/mae_original/` — `MAE_architecture.jpg`, `grad-CAM-heatmap.png`,
  `grad-CAM-orginalpng.png`, `reconstruction1.png`, `reconstruction2.png`
- Repo: `https://github.com/95-ag/adl-masked-autoencoders`
- No slides
- Slug: `masked-autoencoders`
- Page links (decided at kickoff): code repo link + self-hosted report

All other frontmatter (title, subtitle, framing, logos, links, projectType, publishedAt,
featured, order, tags, stack) and body are decided **inside Stage 1** (`project-content-extraction`)
with the user — **not pre-locked here**. Read each skill + the project sources only when that
stage runs, not before.

### Review tooling (Stage 4) — project-specific bits
Project-specific only:
- Screenshots via `@playwright/cli` (repo devDep), needs chromium **rev 1224**; `.playwright/cli.config.json`
  sets `browserName: chromium` (gitignored; `playwright-cli install` regenerates it). Invoke the binary
  directly (`./node_modules/.bin/playwright-cli`); capture-script pattern: `tmp/review-shots/capture.sh`.

---

## Pipeline Stage Status — `masked-autoencoders`

| # | Stage (skill) | Status | Gate | Depends on |
|---|---|---|---|---|
| 0 | Kickoff (source files + slug) | **done** | — | — |
| 1 | `project-content-extraction` | **done** | user approves MDX ✓ 2026-05-31; post-gate: Highlight + Grad-CAM restructure + Detailed Problem four-layer rewrite; DQN Detailed Problem also revised; skill updated | 0 |
| 2 | `project-assets-generation` | **done** | user approves assets ✓ 2026-06-01; post-gate: shared SVG diagram theme (`assets-source/svg/_theme.py`) + tight responsive framing; Mermaid fully unloaded (dep + docs + skill fold, fresh-eyes reviewed); crop scripts dropped | 1 |
| 3 | `project-cover-generation` | **next** | user approves cover (3 sub-gates) | 2 |
| 4 | `project-review` | pending | user approves → complete | 3 |

Each stage is gated: do not advance until the prior gate has explicit user approval in chat.
Each stage reads its own SKILL.md + references and generates its own execution detail when invoked.

## Resume Instructions (cold start)

1. Read this file, then `tasks.md`, then `lessons.md` (auto-loaded via `@` in `.claude/CLAUDE.md`).
2. Find the first un-checked item in `tasks.md` (Kickoff, or the active stage).
3. For a stage: read that stage's `SKILL.md` + references under `.claude/skills/<skill>/` first.
4. Do NOT read project sources or skill internals ahead of their stage. Frontmatter is decided
   with the user inside Stage 1 — not pre-cached here.
5. Execute → propose commit cluster (propose-and-wait) → user approval at the gate → tick `tasks.md`
   then update this file → only then advance.
6. Never mark a stage complete without explicit user approval recorded in chat.

---

## Blockers

None. `masked-autoencoders` pipeline-run plan approved; Kickoff is next (locate source files +
confirm slug), then Stage 1 (`project-content-extraction`).

## Standing Deviations from PRODUCT.md

- **Hero CTAs (§7.1):** CTAs integrated into hero directly; bottom CTA section removed.
  Intentional — update PRODUCT.md in Phase 9 cleanup.
