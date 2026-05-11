# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 2 — Design System** (Phase 1 complete)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 1 architecture is complete and verified. All routes generate statically, MDX pipeline is wired, Zod validation fails the build on invalid frontmatter.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm

**Architecture (complete):**
- `src/app/fonts.ts` — Manrope (`--font-manrope`), Inter (`--font-inter`), JetBrains Mono (`--font-jetbrains`)
- `src/app/providers.tsx` — next-themes ThemeProvider (`attribute="data-theme"`, system default)
- `src/app/globals.css` — Tailwind v4 + minimal Phase 1 tokens (background, foreground, accent, font vars)
- `src/app/layout.tsx` — fonts on `<html>`, suppressHydrationWarning, Providers + Nav + main + Footer
- `src/lib/schemas/project.ts` — full ProjectFrontmatterSchema (Zod, per CONTENT-SCHEMA.md §10)
- `src/lib/schemas/about.ts` — AboutFrontmatterSchema
- `src/lib/content/projects.ts` — reads/validates/sorts, cross-validates featured count + relatedProjects slugs. Files starting with `_` are excluded (drafts/examples).
- `src/lib/content/about.ts` — reads/validates about.mdx
- `src/components/layout/nav.tsx` — bare `<nav>` shell
- `src/components/layout/footer.tsx` — bare `<footer>` shell
- `src/components/mdx/mdx-components.tsx` — thin stubs: Figure, Diagram, Callout, Stack
- Routes: `/` `/work` `/work/[slug]` `/about` (all static, placeholder content)
- `content/projects/_example.mdx` — excluded from build (underscore prefix), kept for local pipeline testing
- `content/about/about.mdx` — valid frontmatter for AboutFrontmatterSchema

**Key constraints discovered/confirmed:**
- `--font-jetbrains` is the CSS variable name for JetBrains Mono (avoids circular `--font-mono: var(--font-mono)`)
- `next-mdx-remote/rsc` is the correct MDX renderer for App Router (not `@next/mdx`) since content lives outside `src/`
- biome.json excludes `.claude/` to avoid linting hook files
- Draft/example MDX files with `_` prefix are excluded from content pipeline

---

## Last Session
- Phase 1 architecture fully built and verified
- `npm run build` passes — all 4 routes generate statically
- `biome check` exits 0 (2 warnings on `<img>` stubs, not errors)
- Zod validation failure tested — build fails with `[summary] Invalid input` when required field removed
- Code review passed with 2 fixes applied: `--font-mono` circular reference resolved; `_` draft exclusion implemented immediately (not deferred)
- Committed to `phase-1-foundation`

---

## Next Steps (Phase 2 — Design System)
1. Read `.claude/docs/DESIGN.md` before any token work
2. Implement full Tailwind v4 `@theme` token map: color, spacing, radius, z-index, motion duration
3. Build typography system: type scale classes from DESIGN.md §3
4. Build layout primitives: Container, Section, Grid, Stack, Divider
5. Build core UI components: Button, Card, Heading, Tag, Callout (with design treatment), Theme toggle
6. Build MDX component visuals: Figure (`next/image`), Diagram, Callout, Stack
7. Build pill nav and mobile slide-out menu with proper interaction behavior
8. Run `code-reviewer` agent before Phase 2 verification
9. Verify Phase 2 checklist from `build-flow.md`

---

## Blockers
None
