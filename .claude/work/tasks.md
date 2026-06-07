# Tasks — Phase 9 (Refactor / Clean / Align)

> Phase state & decisions → `session.md`. Build-flow + gates → `.claude/docs/IMPLEMENTATION-PLAN.md`.
> Plan: `C:\Users\aishw\.claude\plans\breezy-wibbling-globe.md` (approved).
> Current sub-task: **Code cleanup** (dead-code / unused-token removal). Refactor = SEPARATE later step.

## Active — Code cleanup (IMPLEMENTED — awaiting commits + sign-off)
### Change 1 — delete dead code (commit `refactor:`)
- [x] BEFORE screenshots: home + /work, both themes (covers pill-nav theme toggle + project cards)
- [x] Delete unused icons: `science.tsx`, `work.tsx`, `code.tsx` (no barrel — safe)
- [x] Remove legacy `ThemeToggle` fn from `theme-toggle.tsx` (file kept + 2 live selectors)
- [x] Remove `ProjectCard.variant` prop (interface + `page.tsx` + `work/page.tsx` call sites)
- [x] AFTER screenshots → **byte-identical** to before (zero regression); DESIGN.md alignment preserved

### Change 2 — remove 5 reserved tokens (commit `refactor:`)
- [x] `globals.css`: deleted secondary/tertiary/error/success (light+dark+`@theme`) + `--outline-hair`
- [x] `rules/design-system.md`: dropped the secondary/tertiary reservation bullet

### Change 3 — DESIGN.md token rows (commit `docs:`, via design-update)
- [x] Removed the 5 rows from Foundations → Colors; cross-ref check clean

### Change 4 — npm audit + bookkeeping (commit `chore:`)
- [x] npm-audit accept documented in `session.md` (postcss-in-Next, build-time only; revisit at deploy)
- [x] Closed Hero-CTA standing deviation note (code + docs agree)

### Gate
- [x] biome (88) + tsc + `next build` (13 routes) green · removed symbols grep → 0 · `npm audit` = 2 (unchanged)

### Commits (pending approval)
- [ ] 4 cleanup commits + the held work-files chore (session/tasks/lessons + npm-audit note)

## Done — this phase
- [x] **Doc alignment** (PRODUCT + CONTENT-SCHEMA + DESIGN) — 3 commits `248d083`→`b922e05`.
      Verified: biome/tsc/next-build green, grep `§`→0, named-path resolution, fresh-eyes both-ways. **Sign-off pending.**
- [x] **`spec-write` skill** — commit `abffccf`. Authors+maintains non-design spec docs (PRODUCT/PLAN/SCHEMA);
      DESIGN.md excluded. Fresh-eyes reviewed (2 blockers + 1 nit fixed). Description-opt loop aborted
      (skill-creator harness doesn't fire in this CLI build). **Sign-off pending.**
- [x] **`IMPLEMENTATION-PHASES.md` → `IMPLEMENTATION-PLAN.md` rename** — commit `4f5f1fa` (+6 refs).

## Uncommitted
- [ ] Work-files chore (cluster 3): `session.md` + `tasks.md` + `lessons.md` — propose + commit.

## Remaining roadmap
- [ ] Phase 10 — Deploy (Vercel)
  - [ ] SEO: update `metadataBase` + canonical URLs + sitemap to final production domain after deploy
  - [ ] npm audit (2 moderate postcss-in-Next) — fix at deploy: try `npm update next` first (prefer an
        upstream postcss ≥8.5.10 bump → no override); fall back to `overrides: {"postcss":"^8.5.10"}` only
        if upstream hasn't patched. Re-audit clean before deploy is done. (`audit fix --force` rejected — downgrades Next to 9.x.)

## Deferred — after first deploy
- [ ] Freelance project — full 4-stage pipeline (sources/content not ready)
- [ ] "This web portfolio" self-referential case study (stronger against a live URL)
- [ ] Revisit featured set if the project count grows past 3

## Complete (prior phases)
- **Phase 8 — Audits** (`6bfe6e4`→`adba24f` + work chore): 6 skill audits, two-tier display scale,
  color tokens, OG covers, SEO metadata; 6 global audit skills updated.
- **Phase 7 — SEO + AI readability** (`2f86b96`→`215e423`): OG image, metadata + OG/Twitter + canonical
  + JSON-LD, sitemap + robots, llms.txt; `implement-ai-seo` skill updated.
- **Phase 6.5 — UI Polish** (`beba3a7`→`0e53053`): reading/nav, color system, links/headings, blend hero.
- **Phase 6** — three real projects (`model-extraction-attacks`, `dqn-lane-localization`,
  `masked-autoencoders`), full pipeline each.
