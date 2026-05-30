# Tasks — Phase 6

> Plan: `.claude/plans/transient-doodling-forest.md`
> Pipeline state, locked decisions, sources, resume steps → `session.md`
> Tick each subtask when done. Stage gate = approval in chat before advancing.

## Active project: `dqn-lane-localization`

### Stage 1 — `project-content-extraction`

- [ ] Place hero.svg placeholder in `public/projects/dqn-lane-localization/`
- [ ] Copy `kth-logo.svg` from `model-extraction-attacks/`
- [ ] Source Scania logo SVG and place, or confirm omit
- [ ] Copy defense PDF to `public/projects/dqn-lane-localization/defense.pdf`
- [ ] Write frontmatter (all required fields; build-fail conditions checked)
- [ ] Write body (H2 spine: Detailed Problem → Background → Architecture → Data → Engineering Decisions → Algorithm & Training Design → Results → Constraints & Limitations → Next Steps)
- [ ] Density reduction pass (prose tables, redundant figures, list cleanup)
- [ ] `biome check` passes
- [ ] `npm run build` passes; page renders at `/work/dqn-lane-localization`
- [ ] **Gate: user approves MDX** ← do not advance until approved

### Stage 2 — `project-assets-generation` (blocked on Stage 1 gate)

- [ ] Invoke `project-assets-generation` skill; read its SKILL.md + references first
- [ ] Generate each required diagram/chart (one tick per asset)
- [ ] Assets placed in `public/projects/dqn-lane-localization/` and `assets-source/`
- [ ] MDX `<Diagram>`/`<Figure>` references updated to real asset paths
- [ ] `npm run build` passes
- [ ] **Gate: user approves assets** ← do not advance until approved

### Stage 3 — `project-cover-generation` (blocked on Stage 2 gate)

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
