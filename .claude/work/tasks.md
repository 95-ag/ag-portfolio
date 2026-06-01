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
3-gate flow: directions → base composition → annotations (optional). Each sub-gate needs
explicit user approval before the next. Live React SVG component (theme-adaptive + Caveat
annotations) → `src/components/project/covers/masked-autoencoders.tsx`, registered by slug.

- [x] Read SKILL.md + references first; rewrite this section with all Stage 3 subtasks
- [x] **Gate 1 — directions:** propose 3–4 directions (incl. typography fallback) w/ ASCII skeletons
  - [x] **Sub-gate 3a: direction approved** — Direction A (masked-grid → asym enc→dec → reconstruction)
- [x] **Gate 2 — base composition:** build standalone diagram (one accent focal element only),
      `viewBox="0 0 1200 675"`, `aria-hidden` on wrapper + svg, all colors via CSS custom props
  - [x] Register slug in `src/components/project/covers/index.ts`; `npm run build` passes
  - [x] Visual-verify base via playwright-cli (light + dark, element-cropped) + card-scale on /work
        — masked grid reads as 75%-blanked; both themes ok
  - [x] Refinements (user-directed): + MASKED INPUT/RECONSTRUCTION labels; encoder/decoder → autoencoder
        funnel (trapezoids, small dashed decoder); accent moved to visible patches (masked input = single
        focal subject) per approved Direction A. Re-verified light+dark+card scale.
  - [x] **Sub-gate 3b: base cover approved** ✓ 2026-06-01
- [x] **Gate 3 — annotations (optional):** Direction 1 — `75% masking / sweet spot` (→ visible
      patch) + `66.85% / linear-probe acc` (→ ENCODER label). Notebook gesture (arrowhead at
      note), left-middle text attach, fixed 8px gap both ends, tangent-aligned heads, convex
      curves (top arches / bottom sags).
  - [x] Visual-verify arrows + gaps (light + dark) via playwright-cli
  - [x] **Sub-gate 3c: annotations approved** ✓ 2026-06-01
- [x] Final visual review — separate-agent fresh-eyes pass (thumbnail + both themes): no blocking
      issues; one non-blocking soft spot (reconstruction grid reads inert — intentional per MDX "blurry")
- [x] `heroAlt` verified accurate; `heroImage` omitted (live component); `npm run build` passes
- [x] **Gate: user approves final cover** ✓ 2026-06-01 (cover committed `55d9593`)
- Cover + index committed `55d9593`; `.claude/work` docs intentionally uncommitted (go with follow-ups)

### Stage 4 — `project-review`
- [x] Read SKILL.md + references first
- [x] Capture playwright screenshots (desktop + mobile, light + dark) → `tmp/review-shots/masked-autoencoders/`
- [x] Recruiter + technical reviewer passes (parallel cold subagents) — recruiter STRONG/FORWARD YES; technical STRONG
- [x] Surface conflicts (none) + prioritized fix list; applied fix #2 (subtitle leads with outcome); #1 confirmed intended
- [x] `npm run build` passes after fix; committed `5c3911a`
- [x] **Gate: user approves** ✓ 2026-06-01 → project complete

---

## Queued
- [x] **Unload Mermaid (follow-up)** — done 2026-06-01:
  - [x] `npm uninstall @mermaid-js/mermaid-cli` (dep + lockfile + `mmdc` bin removed)
  - [x] Update docs: `.claude/docs/{PRODUCT.md,DESIGN.md (via design-update),IMPLEMENTATION-PHASES.md}`
  - [x] Fold skill changes into `project-assets-generation` (SKILL.md, references, evals.json) — hand-SVG theme over Mermaid + crop-policy; fresh-eyes reviewed (`out_rel` gap fixed); residual tooling notes → `lessons.md`; `skill-notes.md` removed
- [x] **Fold Stage-3 cover learnings into `project-cover-generation` skill** ✓ 2026-06-01
  (plan `wise-toasting-backus.md`). Annotations + base nudges folded (generalized/neutralized);
  separate-agent fresh-eyes review passed (4 fixes applied); committed `5148568`.
- [x] **Flip arrow directions in existing hero covers to the notebook gesture** ✓ 2026-06-01 —
  `model-extraction-attacks` (3 annotations, repositioned + curved per user red marks) +
  `dqn-lane-localization` (1 annotation, more convex). Verified light/dark; committed `59bf90e`.
- [x] **Tooling note** → folded into `lessons.md` (Cover-verification tooling section). `skill-notes.md` dropped.
- [ ] Phase 6 final: add freelance project; finalize featured set (≤3 site-wide)

## Complete
- `dqn-lane-localization` — full pipeline (negative-result project); approved 2026-05-31
- `model-extraction-attacks` — full pipeline (reference exemplar)
- All 4 pipeline skills — audited, frozen
- `project-review` visual-inspection upgrade
