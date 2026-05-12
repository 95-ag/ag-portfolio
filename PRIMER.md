# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 3 — Skeleton Pages** (Phase 2 complete)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 2 design system is complete, verified, and committed. All routes generate statically. Biome clean, TypeScript clean, build passes.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm
- clsx, tailwind-merge, lucide-react (Phase 2)

**Design tokens (complete) — `src/app/globals.css`:**
- Full semantic color map (light + dark): 18 roles
- Spacing scale: `xs` → `5xl` + `gutter`, `margin-mobile`, `margin-desktop`
- Radius: `sm`, `md`, `lg`, `pill`
- Z-index: 10-level scale
- Motion: `duration-fast/base/slow`, `ease-standard`, `ease-emphasis`
- Type scale utility classes: `.type-display-{xl,lg,md}`, `.type-headline-{lg,md,sm}`, `.type-body-{lg,md,sm,xs}`, `.type-mono-{label,data}` with 768px mobile overrides

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
- `pill-nav.tsx` — 44px pill, layout: `[ AG logo ] ─ [ About  Work ] ─ [ theme toggle ]`. Logo is 32px round accent circle linking to `/`. No "Home" text item on desktop.
- `mobile-nav.tsx` — Framer Motion slide-out, focus trap with focus-return, Esc-to-close, reduced-motion gated
- `nav.tsx` — CSS-only responsive switch (pill at `md+`, mobile below)

**Footer (complete) — `src/components/layout/footer.tsx`:**
- Top border, `4xl` top margin, copyright + GitHub/LinkedIn icons
- GitHub: https://github.com/95-ag
- LinkedIn: https://www.linkedin.com/in/aishganesan/

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx` — `next/image` fill, `width` enum (`default/wide/full`), optional caption
- `diagram.tsx` — same as Figure, `surface-sunken` panel + `outline-variant` border
- `callout.tsx` — `type="insight|tradeoff|warning"`, left accent bar via Tailwind CSS var
- `code-block.tsx` — `surface-sunken`, mono, `outline-variant` border; overrides `<pre>`
- `mdx-components.tsx` — wires all above + `<Stack>` re-export

**Utilities:**
- `src/lib/utils/cn.ts` — clsx + tailwind-merge
- `src/lib/utils/focus-trap.ts` — focus trap with focus-return on close (WCAG 2.4.3)

**Key constraints confirmed:**
- No `backdrop-filter` except pill-nav and mobile slide-out
- No shadows — tonal borders only
- Logo mark is a placeholder `AG` circle — swap by dropping `/public/logo.svg` and updating `LogoMark` in `pill-nav.tsx`
- `<hr>` replaced with `<div aria-hidden>` for Divider (Biome ARIA rule)
- GitHub/LinkedIn use inline SVGs (not in lucide-react)
- Reduced-motion handled per-component via `useReducedMotion()` — no global CSS override
- `SidebarLayout` uses `<div>` not `<main>` (layout.tsx already wraps in `<main>`)
- Docs (DESIGN.md + PRODUCT.md) updated to reflect nav layout and social URLs

---

## Last Session
- Phase 2 fully built and code-reviewed
- Nav updated: 44px pill, logo-left layout, About/Work items, divider + theme toggle right
- LinkedIn URL corrected to `https://www.linkedin.com/in/aishganesan/`
- DESIGN.md and PRODUCT.md updated to match implementation
- All verification passes — pending commit

---

## Next Steps (Phase 3 — Skeleton Pages)
1. Read `.claude/docs/PRODUCT.md` before any page work
2. Build in order: Home → Work → Project template → About
3. Use Phase 2 primitives only — no new design decisions
4. No polish — structure, hierarchy, and content rendering only

---

## Blockers
None
