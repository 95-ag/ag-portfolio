# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 4 — Real Project Content** (Phase 3 + Phase 3.5 complete)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 3.5 design refinement is complete, verified, and committed (6 commits on `phase-3.5-design-refinement`). Build passes (9 static pages), Biome clean, TypeScript clean.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm
- clsx, tailwind-merge, lucide-react

**Design tokens (complete) — `src/app/globals.css`:**
- Full semantic color map (light + dark): 18 roles
- Spacing scale: `xs` → `5xl` + `gutter`, `margin-mobile`, `margin-desktop`
- Radius: `sm` (default for buttons/cards/tags/callouts), `md` (code blocks), `lg` (headshot), `pill`
- Z-index: 10-level scale
- Motion: `duration-fast/base/slow`, `ease-standard`, `ease-emphasis`
- Type scale utility classes: `.type-display-{xl,lg,md}`, `.type-headline-{lg,md,sm}`, `.type-body-{lg,md,sm,xs}`, `.type-mono-{label,data}` with 768px mobile overrides
- `.prose-content` — MDX deep-dive prose: h2 (28px, section anchor rule), h3 (19px/500w), p (16px/26px lh, spacing-lg margin), ul/ol, li, a, strong, blockquote, hr, table, inline code

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
- `theme-toggle.tsx` — cycles light→dark→system, dynamic `aria-label`
- `icon.tsx` — lucide-react wrapper at 18px default

**Navigation (complete):**
- `pill-nav.tsx` — 44px pill; active state: `surface-sunken/on-surface` (not accent); accent reserved for logo mark only
- `mobile-nav.tsx` — Framer Motion slide-out, focus trap, Esc-to-close, reduced-motion gated
- `nav.tsx` — CSS-only responsive switch

**Footer (complete) — `src/components/layout/footer.tsx`:**
- No border-t; copy: `© {year} / Aishwarya Ganesan / Designed and developed by me.`
- Social icons: GitHub, LinkedIn, Mail — `on-surface-muted` with hover to `on-surface`

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx`, `diagram.tsx` — image/diagram with optional caption
- `callout.tsx` — `surface-sunken` bg, `border-l-[2px]`, no radius; types: insight/tradeoff/warning
- `code-block.tsx`, `mdx-components.tsx`

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — three variants: `compact` (1:1), `featured` (4:3), `text` (icon only — intentional, not a fallback); inset hero with `surface-sunken` background; `filled` tags; hover: border shift + title underline
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

## Last Session (Phase 4 — Real Content)

**Content:**
- Added `content/projects/model-extraction-attacks.mdx` — full MDX page (frontmatter, 8 deep-dive sections, Diagram/Figure/Callout/Stack components)
- Added `public/projects/model-extraction-attacks/` — 4 hand-crafted SVG diagrams (`extraction-pipeline`, `coreset-selection`, `ood-pipeline`, `attacker-victim-comparison`), 4 placeholder SVGs (hero + 3 charts), 3 real PNGs provided by user
- Real assets landed: `public/headshot.jpeg`, `public/AishwaryaGanesan_Resume.pdf`, `public/cat_head_icon.svg`
- Updated `content/about/about.mdx` with real headshot path
- Deleted `content/projects/_example.mdx`

**Bug fixes:**
- Fixed `ThemeToggle` hydration mismatch — deferred icon/aria-label render until after mount via `mounted` state
- Replaced `AG` text logomark in `PillNav` with `cat_head_icon.svg` via `next/image`

**Build:** passes clean — 10 static pages including `/work/model-extraction-attacks`

---

## Next Steps (Phase 5 — UI Polish)

Branch: `phase-5-ui-polish` (from `main` after current branch merges)

Design pass needed before more content:
1. Review every page at 375px / 768px / 1280px — identify spacing, typography, and layout issues
2. Home page — hero layout, CTA block, featured grid density
3. Work page — grid spacing, card proportions, tag rendering
4. Project detail — sidebar/content balance, section rhythm, prose density, hero sizing
5. About page — two-column layout, section spacing, headshot treatment
6. Global — nav pill sizing, footer spacing, any token drift

Content still pending (resume Phase 4 after polish):
- `lane-refinement-rl.mdx`, `distributed-task-queue.mdx`, `local-llm-experiments.mdx` — all still placeholder content
- Placeholder hero/chart SVGs in `model-extraction-attacks` — replace with real assets when ready

---

## Blockers
None
