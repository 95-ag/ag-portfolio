# Tasks — Phase 6

> Plan: `/home/ag-95/.claude/plans/masked-autoencoders-pipeline.md`  (WSL global plans dir)
> Pipeline state, sources, resume steps → `session.md`. Frontmatter is decided in Stage 1,
> not pre-locked. Tick each subtask when done. Stage gate = approval in chat before advancing.
>
> **To resume after context reset:** say "continue the pipeline" — session.md + tasks.md
> are auto-loaded; Claude finds the first unchecked subtask and continues from there.

## Active project: `masked-autoencoders`  (pipeline-run plan approved 2026-05-31)

### Kickoff (before Stage 1)
- [x] Locate source files (report PDF, repo + branch/commit, any slides) — locate, don't read
- [x] Confirm slug (`masked-autoencoders` unless changed)

### Stage 1 — `project-content-extraction`
- [x] Read SKILL.md + references first
- [x] Decide all frontmatter with user (title, subtitle, framing, logos, links, projectType, publishedAt, featured, order, tags, stack)
- [x] Write body (H2 spine per skill) + density-reduction + reader-review pass
- [x] `npm run build` passes; page renders at `/work/masked-autoencoders`
- [x] **Gate: user approves MDX**

### Stage 2 — `project-assets-generation`
- [x] Read SKILL.md + references first
- [x] Visual audit + asset plan; **user approves plan**
- [x] Generate assets from tracked sources; verify MDX `<Diagram>`/`<Figure>` references
  - mae-architecture (hand SVG), masking-ratio (chart, side-by-side w/ table),
    reconstructions (strip, unchanged), grad-cam (two tight crops, responsive 2-up)
  - `DiagramPanel` gained optional `label` prop (sub-figure caption)
- [x] Sub-plan: shared SVG diagram theme + tight responsive framing (see below)
- [x] `npm run build` passes
- [x] **Gate: user approves assets** ✓ 2026-06-01 (committed clusters 1–7, 6+7 combined)

#### Sub-plan — shared SVG theme (build-injected; migrate all 4 diagrams)
Approved 2026-05-31. Reason: diagram defs are duplicated per-file; viewBoxes carry
excess side margin (e.g. extraction/coreset content x=150..658 in an 800 viewBox),
so content shrinks too small on mobile. Fix = single source + tight padded viewBox.
- [x] `assets-source/svg/_theme.py` — canonical `DEFS` (style+marker, light+dark),
      `FRAME_PAD=16`, `build(content_bbox, title, aria_label, body)` → tight viewBox
- [x] Per-diagram `.py` sources (body + bbox + meta), replacing hand-authored arch SVG:
      `model-extraction-attacks/{extraction-pipeline,ood-pipeline,coreset-selection}.py`,
      `masked-autoencoders/mae-architecture.py`
- [x] Regenerate all 4 production SVGs with tight framing (540/184; ood 742/176)
- [x] Update MDX `aspect` → 540/184 (extraction/coreset/mae); ood-pipeline unreferenced (no MDX).
      Added `max-w-[640px]` cap so desktop content = prior size (within padding); mobile stays fluid
- [x] Verify: ran each `.py`; diff = viewBox + unified `.nt` only; `npm run build` + biome pass;
      browser-rendered arch + extraction light/dark, desktop+375px — consistent framing, mobile gain
- Commits: (1) `feat:` shared SVG theme + sources; (2) `refactor:` regenerate diagrams +
  MDX aspect/max-w updates

### Stage 3 — `project-cover-generation`
> **Start here (next task):** read `project-cover-generation` SKILL.md + references first,
> then **rewrite this section** with the full Stage 3 task list exactly as the skill defines
> the 3-gate flow (directions → base → annotations) — then proceed. The items below are a
> placeholder until that rewrite.
- [ ] Read SKILL.md + references; rewrite this section with all Stage 3 subtasks
- [ ] **Sub-gate 3a: directions approved**
- [ ] **Sub-gate 3b: base cover approved**
- [ ] **Sub-gate 3c: annotations approved**
- [ ] Register live cover; `npm run build` passes
- [ ] **Gate: user approves final cover**

### Stage 4 — `project-review`
- [ ] Read SKILL.md + references first
- [ ] Capture playwright screenshots (desktop + mobile, light + dark) — reuse dqn tooling
- [ ] Recruiter + technical reviewer passes (parallel cold subagents); findings noted
- [ ] Surface conflicts + prioritized fix list; apply approved fixes
- [ ] `npm run build` passes after fixes
- [ ] **Gate: user approves** → project complete

---

## Queued
- [x] **Unload Mermaid (follow-up)** — done 2026-06-01:
  - [x] `npm uninstall @mermaid-js/mermaid-cli` (dep + lockfile + `mmdc` bin removed)
  - [x] Update docs: `.claude/docs/{PRODUCT.md,DESIGN.md (via design-update),IMPLEMENTATION-PHASES.md}`
  - [x] Fold skill changes into `project-assets-generation` (SKILL.md, references, evals.json) — hand-SVG theme over Mermaid + crop-policy; fresh-eyes reviewed (`out_rel` gap fixed); residual tooling notes → `lessons.md`; `skill-notes.md` removed
- [ ] Phase 6 final: add freelance project; finalize featured set (≤3 site-wide)

## Complete
- `dqn-lane-localization` — full pipeline (negative-result project); approved 2026-05-31
- `model-extraction-attacks` — full pipeline (reference exemplar)
- All 4 pipeline skills — audited, frozen
- `project-review` visual-inspection upgrade
