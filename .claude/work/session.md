# Session State

> Updated at every checkpoint. Read this cold to reconstruct current state.
> Process rules → `.claude/CLAUDE.md`. Phase definitions → `IMPLEMENTATION-PHASES.md`.
> Active task detail → `tasks.md`.

---

## Current Phase

**Phase 6 — Project Content** (branch: `phase-6-real-content`)

---

## What's Done

- Phases 1–5 complete (foundation, design system, skeleton pages, content scaffold, UI polish)
- `model-extraction-attacks` — MDX content complete
- `model-extraction-attacks` — assets complete
- `model-extraction-attacks` — hero cover infrastructure complete and committed:
  - Caveat font loaded (`feat: load Caveat font for cover annotations`)
  - Cover registry + hero-media slug prop (`feat: add slug-based cover component registry to hero media`)
  - HeroMetaOverlay component + page wire-in (`feat: render hero logos and contributors overlay on project detail`)
  - KTH logo transparent bg fix (`fix: remove hardcoded white background from KTH logo SVG`)
- Workflow/task management system re-aligned

## Active Task

`model-extraction-attacks` hero cover — plan: `~/.claude/plans/cuddly-kindling-hickey.md`

Cover component reverted to v1 composition (QUERIES → VICTIM → PSEUDO LABELS → SURROGATE) after v3/v4/v5 redesign attempts were rejected. User approved v1 visual. Cover component file uncommitted (Cluster 5). Phase B doc updates pending user approval of cover.

## Blockers

None.

## Standing Deviations from PRODUCT.md

- **Hero CTAs (§7.1):** PRODUCT.md says no CTA in hero, deferred to bottom section. Implementation: CTAs integrated into the hero directly; separate bottom CTA section removed. Intentional — update PRODUCT.md in Phase 9 cleanup.
