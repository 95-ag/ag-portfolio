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

### Reading experience + Navigation — DONE (verified + signed off 2026-06-01)
> Plan: `/home/ag-95/.claude/plans/splendid-yawning-gray.md`. All 5 bullets shipped via the
> per-bullet cycle; batch gate passed: `biome` clean, `tsc` ok, `next build` ok (9 pages),
> code-reviewer no blockers, both-theme renders confirmed. 14 commits `beba3a7`→`7f35b4e`.

- [x] Inline code — accent-tinted chip (variant A, 10% tint + hairline accent border)
- [x] Tables — editorial ink text + 2px accent header underline, horizontal rules only
- [x] Home nav active-state — LogoMark accent ring + `aria-current` on `/` (pill + mobile)
- [x] Code blocks — build-time Shiki (`@shikijs/rehype`, vitesse dual-theme, `defaultColor:false`)
- [x] ASCII background — page-aware: desktop gutters, mobile sparse (none on project), meteor 768px gate

### Colors — DONE (signed off 2026-06-04)
> Analysis-first (audit-color-contrast + OKLCH/WCAG matrix). Shipped: neutral ChatGPT-style
> palette; context-aware surface depth (showcase white/deep-black vs reading soft, via `data-read`);
> deepened dark accent `#2aa566` (less minty); softer ink + dark `antialiased`; `body-lead`→ink;
> inverted light-mode meteor (dark-ink streaks via `uDark` shader); kept green H4 headings.
> Build green; DESIGN.md aligned. Commits `72c490c`, `c1f02aa`.
- [x] Neutral palette, context-aware surfaces, accent, ink, meteor, body-lead — done + committed

### Pre-hero polish (do before the hero image)
- [ ] Social links (About) + project links (work/project pages: Code/Report/Paper/Slides) — unify to
      a single consistent look
- [ ] About page headline — increase font weight

### Brand / hero
- [ ] New hero image (person working at a desk / similar)
- [ ] Mobile: stack hero image **below** the hero paragraph + buttons

### Background revisit *(after colors + hero land)*
- [ ] Re-check the ASCII/meteor background across all sizes + pages once colors/hero are
      final. Whimsy is nice but currently makes pages feel less clean/neat — weigh whimsy vs
      neatness for both themes. Evaluate a more minimal alternative: **top/bottom scroll bands**
      (pick one) instead of side gutters. Decide keep / minimize / change.

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
