# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 5 — UI Polish** (branch: `phase-5-work-page`)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 5 work-page polish is in progress. Build passes (10 static pages), Biome clean, TypeScript clean. No uncommitted changes outstanding.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm
- clsx, tailwind-merge, lucide-react

**Design tokens — `src/app/globals.css` (current values):**
- Full semantic color map (light + dark): 19 roles (added `outline-hair`)
- Light surfaces: `background/surface #f8f8f7`, `surface-raised #ffffff`, `surface-sunken #f2f2f1`
- Dark surfaces: `background/surface #131313`, `surface-raised #211f1e`, `surface-sunken #0e0e0e`
- Light accent: `#006e37` / dark accent: `#35c27d` (calmer editorial green, less teal)
- `outline-hair`: `color-mix(in srgb, var(--on-background) 10%, transparent)` — alpha hairline token
- Spacing scale: `xs` → `5xl` + `gutter`, `margin-mobile`, `margin-desktop`
- Radius: `sm`, `md`, `lg`, `pill`; Z-index: 10-level; Motion: `duration-fast/base/slow`, `ease-standard`, `ease-emphasis`
- Type scale utility classes: `.type-display-{xl,lg,md}`, `.type-headline-{lg,md,sm}`, `.type-body-{lg,md,sm,xs}`, `.type-mono-{label,data}` with 768px mobile overrides
- `.prose-content` — MDX deep-dive prose styles; `.editorial-dl` — two-column definition list; `.highlight-panel` — pull-quote elevation; `.footer-text` — responsive footer type

**Layout primitives (complete) — `src/components/layout/`:**
- `container.tsx` — 1200px cap, responsive side margins (xl: spacing-xl / 32px)
- `section.tsx` — semantic wrapper, token vertical padding
- `grid.tsx` — responsive 4 → 8 → 12 column grid
- `stack.tsx` — vertical flex with typed gap token prop
- `divider.tsx` — 1px `outline-variant` rule (not used on current pages — available for future use)
- `sticky.tsx` — `position: sticky`, CSS string `top` prop
- `sidebar-layout.tsx` — 260px sidebar (no border-r) + 680px reading column, collapses below `lg`

**UI primitives (complete) — `src/components/ui/`:**
- `button.tsx` — primary/secondary variants, 44px, `radius-sm`, icon slot
- `card.tsx` — flat element, `surface-raised` treatment
- `heading.tsx` — polymorphic h1–h6, type-scale class
- `tag.tsx` — `variant="outline"` (border, muted) or `variant="filled"` (surface-sunken, on-surface); both `normal-case tracking-normal`
- `theme-toggle.tsx` — `PillThemeSelector` (expand-on-hover, all 3 always in DOM, `overflow-hidden` width transition) + `InlineThemeSelector` (`w-fit`, always 3 visible); both use `MaterialSymbol`
- `material-symbol.tsx` — inline SVG component; 5 icons: `fingerprint`, `folder_code`, `light_mode`, `dark_mode`, `computer`; paths inlined from `@material-symbols/svg-400@0.44.7` (no runtime dep); viewBox `0 -960 960 960`

**Navigation (complete):**
- `pill-nav.tsx` — 44px pill; active state: `surface-sunken/on-surface` (tonal); active nav icon renders in `accent`; uses `MaterialSymbol`
- `mobile-nav.tsx` — Framer Motion slide-out, focus trap, Esc-to-close, reduced-motion gated; uses `MaterialSymbol` + `InlineThemeSelector`
- `nav.tsx` — CSS-only responsive switch

**Footer (complete) — `src/components/layout/footer.tsx`:**
- No border-t; copy: `© {year} / Aishwarya Ganesan / Designed and developed by me.`
- Social icons: GitHub, LinkedIn, Mail — `on-surface-muted` with hover to `on-surface`

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx`, `diagram.tsx` — image/diagram with optional caption
- `callout.tsx` — `surface-sunken` bg, `border-l-[2px]`, no radius; types: insight/tradeoff/warning
- `code-block.tsx`, `mdx-components.tsx`

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — three variants: `compact` (1:1), `featured` (4:3), `text` (icon only — intentional, not a fallback); thumbnail `aspect-video` (16:9); inset hero with scale transform on hover; `filled` tags; hover: border/bg tonal shift + chevron with accent + image scale; no shadows
- `hero-media.tsx` — image/video/SVG handler, reduced-motion poster fallback
- `project-overview.tsx` — Problem / What I built / Results (muted bullets) / transferableSkills or learnings
- `stack-summary.tsx` — dot-separated inline text per category (no Tag chips)
- `project-sidebar.tsx` — shortTitle, fullTitle, tags (dot-separated prose), stack (dot-separated prose), links
- `reading-progress.tsx` — fixed left 2px bar, sentinel-based reveal, hidden `< md`

**Pages (complete):**
- `src/app/page.tsx` — Two-column hero (portrait + statement), featured grid, single CTA block (resume secondary + contact primary)
- `src/app/work/page.tsx` — Heading only + project grid; no eyebrow, no intro
- `src/app/work/[slug]/page.tsx` — Section labels (OVERVIEW, DEEP DIVE) with thin top rules; no `<Divider />`; SidebarLayout, HeroMedia, ReadingProgress, ProjectOverview, MDX body, backlink
- `src/app/about/page.tsx` — Identity + contact row; two-panel intro (portrait + `positioning` paragraph + `detailedPositioning` bullets sourced from frontmatter); Approach grid; Capabilities, Experience, Education, Contact
- `src/app/not-found.tsx` — 404 with Home + Work links

**Content pipeline (complete):**
- `src/lib/content/projects.ts` — `getAllProjects()`, `getProjectsForWork()`, `getFeaturedProjects()`, `getProjectBySlug()`
- `src/lib/content/about.ts` — `getAbout()`
- `src/lib/schemas/project.ts` — Zod validation (build-fail on violations)
- `src/lib/schemas/about.ts` — Zod validation; includes `positioning` (string) and `detailedPositioning` (string[]) as required fields

**Documentation (complete and synced):**
- `.claude/docs/DESIGN.md` — reflects all phase 3.5 visual decisions (prose tokens, radius, nav, card, sidebar, footer, callout, section labels)
- `.claude/docs/PRODUCT.md` — reflects current page intent, reading flow, CTA structure, About section order
- `.claude/docs/CONTENT-SCHEMA.md` — `positioning` + `detailedPositioning` documented; callout cross-reference fixed

**Placeholder content (Phase 4 replaces):**
- `content/projects/lane-refinement-rl.mdx` — academic, `featured: true`, order 10
- `content/projects/distributed-task-queue.mdx` — freelance, order 20
- `content/projects/local-llm-experiments.mdx` — personal, order 30
- `public/projects/*/hero.svg` — geometric placeholder hero images
- `public/headshot.svg` — silhouette placeholder (update `content/about/about.mdx` headshot field when real photo lands)

**Key constraints confirmed:**
- `lucide-react` has no `Github` icon — use inline SVG (see `footer.tsx`, `project-sidebar.tsx`, `about/page.tsx`)
- `<img>` disallowed by Biome `noImgElement` — use `next/image` everywhere; pass `unoptimized` for SVG
- SVGs in next/image require `unoptimized={true}` — handled in `hero-media.tsx` and `about/page.tsx`
- `.prose-content` wrapper class applied in project detail main column — prose styles live in `globals.css`
- `SidebarLayout` aside stacks above content on `< lg`; sticky on `lg+`; no border-r
- `getProjectsForWork()` sort: projectType priority 0 = academic/freelance, 1 = personal
- `variant="text"` on ProjectCard is an intentional editorial variant — never use it as a fallback for missing `heroImage` (heroImage is required by schema)
- About page intro content (`positioning`, `detailedPositioning`) must live in `content/about/about.mdx` — never hardcode in the page component

---

## Last Session (Phase 5 — Work Page Polish, branch: `phase-5-work-page`)

**Work page and global nav/theme polish complete. All changes committed.**

Nav / theme toggle:
- `material-symbol.tsx` (new) — 5 icons inline from `@material-symbols/svg-400`, no package added
- `pill-nav.tsx` — lucide icons replaced with MaterialSymbol; active icon uses `accent` color
- `mobile-nav.tsx` — same icon swap; `InlineThemeSelector` replaces old toggle
- `theme-toggle.tsx` — `PillThemeSelector` redesigned: all 3 buttons always in DOM, `overflow-hidden` width transition, no jarring remount; `InlineThemeSelector` `w-fit` fixes trailing space in mobile panel

Work cards (`project-card.tsx`):
- Thumbnail `aspect-video` (was aspect-square/4:3)
- Hero image scales `group-hover:scale-[1.03]` via inner wrapper
- Body padding/gap tightened; subtitle/summary shown without line-clamp
- Hover: border + bg tonal shift, chevron fades in with accent + translate — no shadows (v1 rule)

Surface + accent palette refinement (`globals.css` + `DESIGN.md` synced):
- Light: `background/surface #f8f8f7`, `surface-sunken #f2f2f1`, `accent #006e37`
- Dark: `surface-raised #211f1e`, `accent #35c27d`, `accent-on #0a1f0e`, `accent-muted #1a2e1f`
- Added `outline-hair` token: `color-mix(in srgb, var(--on-background) 10%, transparent)`

**Constraints discovered this branch:**
- Tailwind v4 responsive variants (`md:custom-class`) do NOT work on `@layer components` classes — use explicit `@media` blocks inside `@layer components` instead
- `React.Fragment` (explicit) required when `key` is needed in a map — `<>` shorthand cannot take `key`
- Biome `noStaticElementInteractions` fires on hover wrappers — use biome-ignore with justification comment
- Material Symbols SVG paths use viewBox `0 -960 960 960` (not standard `0 0 24 24`)

**Build:** clean — 10 static pages, Biome + TypeScript pass

---

## Next Steps

`phase-5-work-page` is ready to merge → `main`. Next branches:

1. `phase-5-about-page` — About page: two-column layout, section spacing, headshot treatment
2. `phase-5-home-page` — Home page: hero layout, CTA block, featured grid density
   **Home page has three outstanding v1 spec items to implement during polish:**
   - **Hero portrait** — real headshot (`/public/headshot.jpeg`) exists but home page still shows a `surface-sunken` placeholder rectangle; wire it up
   - **Hire Me CTA pulse** — DESIGN.md §11 specifies slow pulse (2400ms, opacity + scale) on the leading icon only; stops on hover; gated by `useReducedMotion()`
   - **Theme toggle tooltip** — DESIGN.md §11 specifies tooltip after 500ms hover showing current mode label ("Light" / "Dark" / "System"); optional, lower priority

**Content still pending (Phase 4 remainder):**
- `lane-refinement-rl.mdx`, `distributed-task-queue.mdx`, `local-llm-experiments.mdx` — still placeholder content
- Placeholder hero/chart SVGs in `model-extraction-attacks` — replace when real assets ready

---

## Blockers
None
