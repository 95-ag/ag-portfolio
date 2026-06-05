# Tasks — Phase 7 (SEO + AI readability)

> Phase state & decisions → `session.md`. Build-flow + gates → `.claude/docs/IMPLEMENTATION-PHASES.md`.
> Phase 6.5 (UI Polish) is COMPLETE and handed off as a manual PR (`phase-6.5-ui-polish` → main).
> Phase 7 work starts on a fresh branch off updated main after the merge.

## Phase 7 — SEO + AI readability
- [ ] **Lessons review (do FIRST).** Read all lessons — project `.claude/work/lessons.md`, the
      global `~/.claude` rules (`CLAUDE.md`, `rules/*`, `windows-claude.md`), project `.claude/rules/*`,
      and the project MEMORY. Organize/dedupe; **promote genuinely-general lessons into the CLAUDE
      workflow/rules**; **remove ones no longer applicable**. Report a disposition table (kept /
      promoted / pruned) before editing; confirm zero information loss.
- [ ] Per-page metadata (title/description) + Open Graph + Twitter cards
- [ ] `sitemap.xml` + `robots.txt`
- [ ] `llms.txt` (AI readability)
- [ ] JSON-LD structured data (Person; project case studies)
- [ ] Verify (biome / tsc / `next build` + render checks) → gate

## Remaining roadmap
- [ ] Phase 8 — Audits (typography / spacing / hierarchy / responsive / a11y)
- [ ] Phase 9 — Refactor/clean/align (incl. reconcile Hero-CTA deviation vs PRODUCT.md §7.1;
      resolve the 2 transitive moderate npm-audit advisories from `@shikijs/rehype`)
- [ ] Phase 10 — Deploy (Vercel)

## Deferred — after first deploy
- [ ] Freelance project — full 4-stage pipeline (sources/content not ready)
- [ ] "This web portfolio" self-referential case study (stronger against a live URL)
- [ ] Revisit featured set if the project count grows past 3

## Complete
- **Phase 6.5 — UI Polish** (branch `phase-6.5-ui-polish`, 23 commits `beba3a7`→`0e53053` + work
  chore): reading/nav (inline code, prose tables, logomark active ring, build-time Shiki, page-aware
  background), color system (neutral context-aware palette, softer ink, inverted light meteor),
  links/headings (shared `LinkPill`, ink H1s, removed `display-accent`, `heading-display` 600), and
  the theme-aware blend hero. Background evaluated and **kept as-is**.
- **Phase 6** — three real projects (`model-extraction-attacks`, `dqn-lane-localization`,
  `masked-autoencoders`), full pipeline each.
