# Tasks — Phase 6 close-out → 6.5 → deploy

> Phase state & decisions → `session.md`. Build-flow + gates → `.claude/docs/IMPLEMENTATION-PHASES.md`.
> The 4 portfolio pipeline skills are frozen and stay available for the deferred projects (below) —
> they are not the active tracker anymore.

## Phase 6 — Project Content (close-out)
- [x] Three real projects authored + reviewed: `model-extraction-attacks`, `dqn-lane-localization`,
      `masked-autoencoders` (full pipeline each). Phase-6 gate (≥2 real projects) met.
- [x] Featured set: all three `featured: true` (= the ≤3 cap); home `#featured` shows all three.
- [x] No leftover Phase-4 placeholder projects — `content/projects/` holds only the 3 real MDX files.

## Phase 6.5 — UI Polish (next)
> Iterative; several items are investigations to resolve with the user. Color/surface items go
> through `design-update` / `design-rewrite` (they edit DESIGN.md). Full scope → IMPLEMENTATION-PHASES.md.

### Reading experience
- [ ] ASCII background — fade toward content center; none on small screens; bias the pattern into
      corners/free space so it never disrupts body text (project/about/home) — investigate approach
- [ ] Inline code — unreadable now; try accent (green), Notion-like feel *(decide)*
- [ ] Code blocks — unreadable now; try ink text + bold accent highlights *(decide)*
- [ ] Tables — grey now; switch to ink + bold accent highlights *(decide)*

### Navigation & global UI
- [ ] Home page active-state nav (currently missing)

### Colors *(→ design-update / design-rewrite)*
- [ ] Dark-theme accent still reads minty — adjust
- [ ] Light-theme raised surface is a clashing grey — fix
- [ ] Revisit surface hierarchy (ChatGPT-like preferred; current hard to maintain, ink harsh) —
      evaluate vs bg design + both themes before committing *(investigate, possible token change)*

### Brand / hero
- [ ] New hero image (person working at a desk / similar)
- [ ] Mobile: stack hero image **below** the hero paragraph + buttons

- [ ] **Gate: user approves the polish set** → Phase 7

## Remaining phases (roadmap)
- [ ] Phase 7 — SEO + AI readability (metadata, OG, sitemap/robots, llms.txt, JSON-LD)
- [ ] Phase 8 — Audits (typography/spacing/hierarchy/consistency/responsive/a11y)
- [ ] Phase 9 — Refactor/clean/align (incl. reconcile Hero-CTA deviation vs PRODUCT.md §7.1)
- [ ] Phase 10 — Deploy (Vercel); then hand user the PR for `phase-6-real-content`

## Deferred — after first deploy
- [ ] Freelance project — full 4-stage pipeline (sources/content not ready yet)
- [ ] "This web portfolio" self-referential case study — author after deploy (live URL + real
      screenshots + the build story make it stronger)
- [ ] Revisit featured set if the project count grows past 3

## Complete
- `masked-autoencoders` — full pipeline; signed off 2026-06-01
- `dqn-lane-localization` — full pipeline (negative-result project)
- `model-extraction-attacks` — full pipeline (reference exemplar)
- All 4 pipeline skills — audited, frozen; `project-cover-generation` updated with the notebook
  arrow gesture; all three covers consistent
