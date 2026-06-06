# Tasks — Phase 8 (Audits)

> Phase state & decisions → `session.md`. Build-flow + gates → `.claude/docs/IMPLEMENTATION-PHASES.md`.
> Plan: `/home/ag-95/.claude/plans/drifting-greeting-elephant.md`
> Two halves: **Part A** = capture + audit (no implementation). **Part B** = fix + ship (scoped after Part A review).

## Part A — Capture + Audit (6 skill audits only)
- [x] **A0** — tasks.md rewritten + dev server up on :3000
- [x] **A1** — one-shot capture DONE: 36 full-page PNGs (`tmp/audit/shots/`, all OK, theme-flip
      confirmed) + 10 HTML/utility dumps (`tmp/audit/data/html/`). Computed-style scrape dropped
      (globals.css carries exact per-token metrics).
- [x] **A2** — token bundle ready: `src/app/globals.css` + `docs/DESIGN.md`; contrast reuses
      `tmp/color-analyze.mjs` OKLCH/WCAG approach
- [x] **A3** — 6 parallel audit agents DONE (Opus ×5 vision/design, Sonnet ×1 ai-seo):
      - [x] audit-typography
      - [x] audit-spacing
      - [x] audit-visual-hierarchy
      - [x] audit-color-contrast
      - [x] audit-design-quality
      - [x] audit-ai-seo
- [x] **A4** — synthesis → `tmp/audit/FINDINGS.md` (unified table + full detail + conflicts + fixes)
      + `tmp/audit/SKILL-NOTES.md`. Presented in chat. STOP for user finalization.

## Part B — Fix + ship (plan approved 2026-06-06; IN PROGRESS — awaiting live verification)
Implemented (token-only in components):
- [x] 1. Headline two-tier (h2): display-primary→64 (page titles) + new .display-title 56 (project titles);
      heading.tsx union; project-header.tsx; home hero = content flex-1 / portrait fixed 460 / saturate(0.85)+opacity-90
- [x] 2. Prose rhythm (h1): h4 margins mt-xl/mb-xs.  m1 (reading measure) REVERTED per user (narrow hurt reading)
- [x] 3. Section renames (l8): 3 MDX done
- [x] 4. Color tokens (h4,l11): --surface-tag #ebecee→#dadce0, --outline #9aa0a6→#8b9197 (light)
- [x] 5. DQL cover: KEEP band per user (inherits new token; no merge)
- [~] 6a m5 (card tag pin) REVERTED per user (looked like missing data); 6b l6 (scroll-to-top) REVERTED per user
- [~] 7. l4 touch targets REVERTED per user (threw off sidebar/footer proportion)
- [x] 8. About hero (h3): portrait clamp(180,20vw,280) + deck text-balance
- [x] 9. Cover OG images (h6): 3 dark cover.png in public/projects/*/; heroImage repointed ×3 (mae added)
- [x] 10. SEO: m2 Person 31 on About; m3 metaDescription ×3; m4 home+about descriptions; l12d llms.txt Key Pages;
      l12b work <header>.  l12c (<time>) N/A — no visible dates rendered.
- [x] 11. DESIGN.md aligned via design-update: two-tier scale + surface-tag #dadce0 + outline #8b9197 + hero
- [x] 13. Scratch routes + old hero files removed (user ran approved delete)
- [x] Gate: tsc clean · biome clean (85 files) · `next build` green (13 routes) · WCAG re-verified (new tokens pass)
      · OG present all 3 (mae fixed) · mobile 375 holds · desktop render signed off. Lighthouse → Phase 10/deploy.
- [x] Commits 1–7 landed (`6bfe6e4`→`1159395`). Cluster 8 (work files) held per user — updated, not committed.
- [x] 12a. `project-content-extraction` spine names shortened (3 files) — committed `adba24f`
- [x] 12b. 6 GLOBAL audit skills updated from SKILL-NOTES (principles, disposition table); fresh-eyes
      review (separate agent) → 2 blockers + 1 nit neutralized; WSL↔Windows synced (9 files, diff-clean)
- [x] PR title + body + next-branch → handed to user
- [x] Final Phase 8 sign-off (2026-06-06)
- [x] Cluster-8 work-files committed

## Remaining roadmap
- [ ] Phase 9 — Refactor/clean/align (reconcile Hero-CTA vs PRODUCT.md §7.1; resolve 2 transitive
      moderate npm-audit advisories from `@shikijs/rehype`)
- [ ] Phase 10 — Deploy (Vercel)

## Deferred — after first deploy
- [ ] Freelance project — full 4-stage pipeline (sources/content not ready)
- [ ] "This web portfolio" self-referential case study (stronger against a live URL)
- [ ] Revisit featured set if the project count grows past 3

## Complete
- **Phase 7 — SEO + AI readability** (4 commits `2f86b96`→`215e423`): OG image, metadata + OG/Twitter
  + canonical + JSON-LD (all pages), sitemap + robots, llms.txt; `implement-ai-seo` skill updated.
- **Phase 6.5 — UI Polish** (23 commits `beba3a7`→`0e53053`): reading/nav, color system,
  links/headings, blend hero; background kept as-is.
- **Phase 6** — three real projects (`model-extraction-attacks`, `dqn-lane-localization`,
  `masked-autoencoders`), full pipeline each.
