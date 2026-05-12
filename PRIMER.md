# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 4 — Real Project Content** (Phase 3 complete)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 3 skeleton pages are complete, verified, and committed. All routes generate statically. Biome clean, TypeScript clean, build passes (9 pages).

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm
- clsx, tailwind-merge, lucide-react

**Design tokens (complete) — `src/app/globals.css`:**
- Full semantic color map (light + dark): 18 roles
- Spacing scale: `xs` → `5xl` + `gutter`, `margin-mobile`, `margin-desktop`
- Radius: `sm`, `md`, `lg`, `pill`
- Z-index: 10-level scale
- Motion: `duration-fast/base/slow`, `ease-standard`, `ease-emphasis`
- Type scale utility classes: `.type-display-{xl,lg,md}`, `.type-headline-{lg,md,sm}`, `.type-body-{lg,md,sm,xs}`, `.type-mono-{label,data}` with 768px mobile overrides
- `.prose-content` — MDX deep-dive prose (h2, h3, p, ul, ol, li, a, strong, blockquote, hr, table, inline code)

**Layout primitives (complete) — `src/components/layout/`:**
- `container.tsx` — 1200px cap, responsive side margins
- `section.tsx` — semantic wrapper, token vertical padding
- `grid.tsx` — responsive 4 → 8 → 12 column grid
- `stack.tsx` — vertical flex with typed gap token prop
- `divider.tsx` — 1px `outline-variant` rule
- `sticky.tsx` — `position: sticky`, CSS string `top` prop, default `var(--spacing-4xl)`
- `sidebar-layout.tsx` — 280px sidebar + 720px reading column, collapses below `lg`

**UI primitives (complete) — `src/components/ui/`:**
- `button.tsx` — primary/secondary variants, 44px, icon slot
- `card.tsx` — flat element, `surface-raised` treatment
- `heading.tsx` — polymorphic h1–h6, type-scale class
- `tag.tsx` — mono-label, `sm` radius
- `theme-toggle.tsx` — cycles light→dark→system, dynamic `aria-label`
- `icon.tsx` — lucide-react wrapper at 18px default

**Navigation (complete):**
- `pill-nav.tsx` — 44px pill, layout: `[ AG logo ] ─ [ About  Work ] ─ [ theme toggle ]`
- `mobile-nav.tsx` — Framer Motion slide-out, focus trap, Esc-to-close, reduced-motion gated
- `nav.tsx` — CSS-only responsive switch

**Footer (complete) — `src/components/layout/footer.tsx`**

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx`, `diagram.tsx`, `callout.tsx`, `code-block.tsx`, `mdx-components.tsx`

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — `compact` + `featured` variants, hover: border + title underline + chevron shift only
- `hero-media.tsx` — image/video/SVG handler, reduced-motion poster fallback, `unoptimized` for SVG
- `project-overview.tsx` — Problem / What I built / Results / transferableSkills or learnings
- `stack-summary.tsx` — four stack categories, skips empty arrays
- `project-sidebar.tsx` — shortTitle, fullTitle, tags, stack, links (GitHub/demo/paper)
- `reading-progress.tsx` — `'use client'`, fixed left bar, IntersectionObserver sentinel, hidden `< md`

**Pages (complete):**
- `src/app/page.tsx` — Hero, Featured projects grid, CTA (recruiter + freelance cards)
- `src/app/work/page.tsx` — Project grid, `getProjectsForWork()` sort (academic+freelance → personal → order → publishedAt)
- `src/app/work/[slug]/page.tsx` — SidebarLayout, HeroMedia, ReadingProgress, ProjectOverview, MDX body, backlink
- `src/app/about/page.tsx` — Identity header, two-panel intro (headshot `grayscale`, approach), Capabilities, Experience, Education, Contact
- `src/app/not-found.tsx` — 404 with Home + Work links

**Content pipeline (complete):**
- `src/lib/content/projects.ts` — `getAllProjects()`, `getProjectsForWork()`, `getFeaturedProjects()`, `getProjectBySlug()`
- `src/lib/content/about.ts` — `getAbout()`
- `src/lib/schemas/project.ts` — Zod validation (build-fail on violations)
- `src/lib/schemas/about.ts` — Zod validation

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
- `SidebarLayout` aside: stacks above content on `< lg`; sidebar is sticky on `lg+`
- `getProjectsForWork()` sort: projectType priority 0 = academic/freelance, 1 = personal

---

## Last Session
- Phase 3 fully built and verified
- 3 placeholder projects created with SVG hero assets
- All 4 pages (Home, Work, Project detail, About) + 404 implemented
- Biome clean, TypeScript clean, `next build` passes (9 static pages)

---

## Next Steps (Phase 4 — Real Project Content)
1. Read `.claude/docs/PRODUCT.md` §4, §8 before authoring content
2. Add 2–3 fully real projects (`content/projects/*.mdx`) with actual screenshots/diagrams/metrics
3. Add real headshot (`/public/headshot.jpg`) and update `content/about/about.mdx`
4. Add `/public/resume.pdf`
5. Validate content: `npm run build` must pass with real frontmatter

---

## Blockers
None
