# Tasks — Phase 6

> Plan: `.claude/plans/transient-doodling-forest.md`
> Pipeline state, locked decisions, sources, resume steps → `session.md`
> Tick each subtask when done. Stage gate = approval in chat before advancing.
>
> **To resume after context reset:** say "continue the pipeline" — session.md + tasks.md
> are auto-loaded; Claude finds the first unchecked subtask and continues from there.

## Active project: `dqn-lane-localization`

### Stage 1 — `project-content-extraction` ✓ COMPLETE (approved 2026-05-30)

- [x] Place hero.svg placeholder in `public/projects/dqn-lane-localization/`
- [x] Copy `kth-logo.svg` from `model-extraction-attacks/`
- [x] Source Scania logo SVG and place, or confirm omit
- [x] Copy defense PDF to `public/projects/dqn-lane-localization/defense.pdf`
- [x] Write frontmatter (all required fields; build-fail conditions checked)
- [x] Write body (H2 spine: Detailed Problem → Background → Architecture → Data → Engineering Decisions → Algorithm & Training Design → Results → Constraints & Limitations → Next Steps)
- [x] Density reduction pass (prose tables, redundant figures, list cleanup)
- [x] Reader Review pass (subagent) — all findings resolved
- [x] `npm run build` passes; page renders at `/work/dqn-lane-localization`
- [x] Extraction skill updated with Stage 1 learnings; extraction-notes merged and deleted
- [x] **Gate: user approved MDX** ← 2026-05-30

### Stage 2 — `project-assets-generation` ✓ COMPLETE (approved 2026-05-30)

- [x] Invoke `project-assets-generation` skill; read its SKILL.md + references first
- [x] **Visual audit complete** — iterative review + CSS gap fix; commit clusters 1–4 approved 2026-05-30
- [x] **Asset plan approved by user** — asset set finalized through audit cycle; commits approved 2026-05-30
- [x] Generate / replace each asset per approved plan — 7 production assets committed (cluster 3)
- [x] MDX `<Diagram>`/`<Figure>` references verified (paths, aspect ratios, alt text) — cluster 2
- [x] `npm run build` passes
- [x] **Capture skill extraction notes** — asset-notes cleaned; align into skill references ← DONE 2026-05-30
- [x] **Gate: user approves assets** ← approved 2026-05-30

### Stage 3 — `project-cover-generation` ← NEXT

- [ ] Invoke `project-cover-generation` skill; read its SKILL.md + references first
- [ ] **Sub-gate 3a: directions approved**
- [ ] **Sub-gate 3b: base cover approved**
- [ ] **Sub-gate 3c: annotations approved**
- [ ] Replace `hero.svg` placeholder with final cover; update `heroImage` in frontmatter
- [ ] `npm run build` passes
- [ ] **Gate: user approves final cover** ← do not advance until approved

### Stage 4 — `project-review` (blocked on Stage 3 gate)

- [ ] Invoke `project-review` skill; read its SKILL.md + references first
- [ ] Capture playwright screenshots (desktop + mobile, light + dark)
- [ ] Recruiter reviewer pass complete; findings noted
- [ ] Technical reviewer pass complete; findings noted
- [ ] Fixes applied
- [ ] `npm run build` passes after fixes
- [ ] **Gate: user approves** → project complete

---

## Queued
- [ ] `masked-autoencoders` — same 4-stage pipeline
- [ ] Phase 6 final: add freelance project; finalize featured set (≤3 site-wide)

## Complete
- `model-extraction-attacks` — full pipeline (reference exemplar)
- All 4 pipeline skills — audited, frozen
- `project-review` visual-inspection upgrade
