# Tasks — Phase 7 (SEO + AI readability)

> Phase state & decisions → `session.md`. Build-flow + gates → `.claude/docs/IMPLEMENTATION-PHASES.md`.
> Phase 6.5 (UI Polish) is COMPLETE and handed off as a manual PR (`phase-6.5-ui-polish` → main).
> Plan: `/home/ag-95/.claude/plans/serene-gliding-sunset.md`

## Phase 7 — SEO + AI readability
- [x] **Lessons review — DONE (signed off 2026-06-05).**
- [x] **C1–C4 implementation — committed.**
      - C1 `2f86b96`: `src/app/opengraph-image.tsx`
      - C2 `d92c0e6`: metadata + OG/Twitter + canonicals + JSON-LD (all 5 pages + `src/lib/seo/jsonld.ts` + `biome.json`)
      - C3 `6585fb5`: `src/app/sitemap.ts` + `src/app/robots.ts`
      - C4 `215e423`: `src/app/llms.txt/route.ts`
- [x] **Verify:** `/sitemap.xml`, `/robots.txt`, `/llms.txt` — curl confirmed ✓
- [x] **Verify:** OG/canonical meta tags + JSON-LD — browser confirmed ✓ (all 3 pages)
- [x] **C7 — Update `implement-ai-seo` skill** (done, signed off 2026-06-06)
      Plan: `/home/ag-95/.claude/plans/serene-gliding-sunset.md`
      - SKILL.md: fix JSON-LD placement, add CreativeWork, add §3a framework APIs,
        add §5 opengraph-image.tsx + no-merge warning, add §7 Route Handler note, §1 inventory item
      - REFERENCE.md: enrich Person schema, add CreativeWork, add Next.js Metadata API section,
        expand llms.txt template, rename Raw HTML heading, sameAs safety note
      - Fresh-eyes review gate before done
- [x] **C6 — work files commit** (done 2026-06-06)

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
