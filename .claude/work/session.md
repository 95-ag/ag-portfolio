# Session State — Portfolio Pipeline

> **Fresh sessions: read this file FIRST**, then `tasks.md`, then the active stage's skill.
> This file holds pipeline STATE (decisions, sources, status). `tasks.md` holds the
> actionable checklist. Stage execution detail comes from each skill when invoked.
> Process rules → `.claude/CLAUDE.md`. Stage-1 plan → `.claude/plans/transient-doodling-forest.md`.

---

## Phase

**Phase 6 — Project Content** · branch `phase-6-real-content`
Completed projects: `model-extraction-attacks` (full pipeline — reference exemplar).
All 4 pipeline skills are frozen and audited.

---

## Current Project

**`dqn-lane-localization`** — master's thesis *"Deep Q-Learning for Lane Localization"*
(KTH / Scania, 2024). Rigorous **negative-result** project.

**Current stage: Stage 3 (`project-cover-generation`) — ready to begin.**
Stage 2 fully closed: assets gate approved + skill alignment + skill overhaul committed (2026-05-30).

---

## Locked Decisions (user-approved 2026-05-30)

| Decision | Value |
|---|---|
| Slug | `dqn-lane-localization` |
| Title | `Deep Q-Learning for Lane Localization` |
| Subtitle | `Exploring Reinforcement Learning for Accurate Lane Detection` |
| Framing | Engineering rigor + **honest negative result** — no metric inflation |
| Logos | KTH **and** Scania |
| Links | DiVA paper + presentation (defense PDF hosted in `/public`). **NO GitHub** (repo private) |
| projectType | `academic` |
| publishedAt | `2024-03-25` |
| featured | `true` |
| order | ~`50` |
| Paper link | `https://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-346213` |
| Presentation link | `/projects/dqn-lane-localization/defense.pdf` |
| tags | Reinforcement Learning, Deep Q-Learning, Lane Detection, Autonomous Driving, Computer Vision, PyTorch |
| stack | langs [Python]; frameworks [PyTorch]; libs [OpenCV, NumPy, scikit-learn, Matplotlib]; tools [Git, Linux, Anaconda, TensorBoard] |

## Authoritative Sources

Source mode: **report + repo (full)**. Report = authoritative for metrics/structure;
repo/config = authoritative for frameworks, hyperparameters, file structure.

- Report: `tmp/reports/DA233X_AishwaryaGanesan_MasterThesisReport.pdf` (101 pp)
- Defense: `tmp/reports/DA233X_AishwaryaGanesan_MasterThesisDefense.pdf` (22 slides)
- Extracted text: `tmp/report-full.txt`, `tmp/defense-full.txt`, `tmp/repo-dump.txt`
  (regenerate via `.venv/bin/python3` + `pypdf`; **never** `pip --break-system-packages` — `lessons.md` 2026-05-30)
- **Repo implementation reference (use this branch for all stages):**
  `github.com/95-ag/DQLL-Curve` branch **`work-in-progress`** @ **`1daf775b3ac4d71ac06b8515855f83800477b236`**
  (2023-12-21 — latest; contains `lane_localizer/curveAgent.py` + Bézier training artifacts).
  ⚠️ Do **not** use `dql-main` — it predates the curve implementation. `tmp/repo-dump.txt`
  was taken from `dql-main`; re-pull from `work-in-progress` if code detail is needed.
  Keep using this branch unless the user explicitly changes it.
- Reference exemplar: `content/projects/model-extraction-attacks.mdx` (+ its assets/cover).

> Metrics and project facts are **not** cached here — Stage 1 (content-extraction) reads
> the sources above directly when it runs, per its skill. The project is a rigorous
> **negative result** (DQL localization did not beat the CV detector; curves did not beat
> points) — that honest framing is locked; the numbers come from the report at extraction time.

## Pipeline Stage Status

| # | Stage (skill) | Status | Output artifact | Gate | Depends on |
|---|---|---|---|---|---|
| 1 | `project-content-extraction` | **complete** ✓ | `content/projects/dqn-lane-localization.mdx` + prereq build assets | approved 2026-05-30 | — |
| 2 | `project-assets-generation` | **complete** ✓ | diagrams/charts in `public/projects/…` + `assets-source/…` | approved 2026-05-30 | 1 |
| 3 | `project-cover-generation` | **ready** | hero cover (3-gate) + updated `heroImage` | user approves cover | 2 |
| 4 | `project-review` | blocked | QA findings + fixes, final sign-off | user approves | 3 |

Each stage is gated: do not advance until the prior gate has explicit user approval in chat.
Stages 2–4 generate their own execution plans when their skill is invoked — not pre-planned here.

## Resume Instructions (cold start, no re-planning)

1. Read this file, then `tasks.md`, then `lessons.md` (all auto-loaded via `@` in `.claude/CLAUDE.md`).
2. Find the in-progress / first un-checked stage in the table above and in `tasks.md`.
3. Read that stage's `SKILL.md` + references under `.claude/skills/<skill>/`.
4. Apply Locked Decisions above **verbatim** (user-approved — do not re-ask). Read metrics/facts
   from the sources at execution time per the skill; do not invent or cache them here.
5. Use repo branch `work-in-progress` @ `1daf775` for any code reference.
6. Execute the stage → propose commit cluster → get user approval at the gate → tick `tasks.md` then update this file → only then advance.
7. Never mark a stage complete without explicit user approval recorded in chat.

---

## Blockers

None. Stage 3 (`project-cover-generation`) is ready to begin — invoke the skill to start.

## Standing Deviations from PRODUCT.md

- **Hero CTAs (§7.1):** CTAs integrated into hero directly; bottom CTA section removed.
  Intentional — update PRODUCT.md in Phase 9 cleanup.
