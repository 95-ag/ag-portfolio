# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 5 — UI Polish** (branch: `phase-5-about-page`)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 5 UI polish in progress. Build passes (10 static pages), Biome clean, TypeScript clean.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm
- clsx, tailwind-merge, lucide-react

**Design tokens — `src/app/globals.css` (current values):**
- Full semantic color map (light + dark): 21 roles
- Light: `background/surface #f8f8f7`, `surface-raised #f2f2f1`, `surface-sunken #ffffff`, `accent #006e37`
- Dark: `background/surface #131313`, `surface-raised #211f1e`, `surface-sunken #0e0e0e`, `accent #35c27d`
- **Surface polarity in light:** `surface-raised` is off-white (`#f2f2f1`) — cards/panels recede; `surface-sunken` is pure white (`#ffffff`) — code/inline code lifts for legibility
- **New tokens:** `surface-nav` (`#ffffffd9` / `#1c1b1bd9`) — blur UI only; `surface-selection` (`#e6f4ec` / `#1a2e1f`) — active nav/selection states
- `surface-overlay` / `surface-overlay-panel` — legacy, kept but superseded by `surface-nav`
- `outline-hair`: `color-mix(in srgb, var(--on-background) 10%, transparent)` — alpha hairline token
- Spacing: `xs` → `5xl` + `gutter`, `margin-mobile`, `margin-desktop`
- Radius: `sm`, `md`, `lg`, `pill`; Z-index: 10-level; Motion: `duration-fast/base/slow`, `ease-standard`, `ease-emphasis`

**Typography system — semantic tokens (16 classes in `globals.css`):**
All old `type-*` aliases removed. Three operative text colors: Ink (`on-surface`), Muted (`on-surface-muted`), Accent (`accent`).

| Token | Role |
|---|---|
| `display-primary` | Hero headline, page H1 — Ink |
| `display-accent` | Section title with Accent color |
| `heading-component` | Card titles, section headings — Ink |
| `heading-narrative` | H4 in prose, editorial subheads — Accent |
| `body-primary` | Long-form prose — Ink |
| `body-secondary` | Supporting copy, summaries — Muted |
| `body-caption` | Captions, timestamps — Muted |
| `body-emphasis` | Highlighted callout body — Ink |
| `callout-title` | Callout lead-in — Accent |
| `interactive-label` | Committed actions (buttons, CTAs) — stateful |
| `nav-link` | Navigational/location indicators — stateful |
| `mono-anchor` | Page eyebrows, structural metadata — Muted, uppercase |
| `tag-chip` | Tag chips on cards — Muted, uppercase |
| `insight-label` | Callout/highlight markers — Muted, uppercase |
| `mono-code` | Inline code, code blocks — Muted |
| `support-meta` | Footer, TOC items — Muted |

Mobile overrides (≤768px): `display-primary` / `display-accent` scale to 36px / 44px.
Footer responsive exception: `support-meta` + local Tailwind override to 11px/18px mobile, 15px/24px desktop.

**Prose composition (`.prose-content`):**
- `h2` → mono-anchor values + border-bottom + margin rules
- `h3` → heading-component + margins
- `h4` → heading-narrative + margins
- `p` / `li` → body-primary (18px), Ink
- `a` → Accent, underline
- `strong` → Ink, weight 600
- `blockquote` → body-secondary + italic + 2px Accent left border + `surface-raised` bg + `spacing-md spacing-lg` padding
- `table th/td` → body-caption, Muted
- `code` (inline) → mono-code + `surface-sunken` bg + `outline-variant` border

**Canonical elevation system (5 levels) — `src/app/globals.css` + components:**
| Level | Treatment | Components |
|---|---|---|
| 0 — Flat | No border, no fill | Page sections, hero, About, footer |
| 1 — Border only | `1px outline-variant` | `<Figure>`, `<Diagram>` outer shell, prose hr, table borders, back-link divider, nav dividers |
| 2 — Border + blur | `1px outline-variant` + `backdrop-blur-[12px]` + `surface-nav` | Pill nav, mobile nav trigger, mobile nav panel, scroll-to-top |
| 3 — Border + raised | `1px outline-variant` + `surface-raised` | Project cards, `<Highlight>` |
| 4 — Border + sunken | `1px outline-variant` + `surface-sunken` | `<CodeBlock>`, inline code, `<Diagram>` inner region, table `<th>`, card media well, hero bg |
| 5 — Accent left border + raised | `2px accent` + `surface-raised` | `<Callout>`, prose blockquote |

**Layout primitives (complete) — `src/components/layout/`:**
- `container.tsx`, `section.tsx`, `grid.tsx`, `stack.tsx`, `divider.tsx`, `sticky.tsx`, `sidebar-layout.tsx`

**UI primitives (complete) — `src/components/ui/`:**
- `button.tsx` — primary/secondary variants, 44px, `radius-sm`, icon slot
- `card.tsx` — **DELETED** (was unused)
- `heading.tsx` — polymorphic h1–h6; `SemanticType` prop maps directly to token class
- `tag.tsx` — single canonical treatment: `surface-tag` bg, `on-surface` text
- `theme-toggle.tsx` — `PillThemeSelector` + `InlineThemeSelector`; both use MaterialSymbol
- `material-symbol.tsx` — inline SVG; 5 icons

**Navigation (complete):**
- `pill-nav.tsx` — active state: `surface-selection` (accent-tinted); hover: `surface-sunken`; container: `surface-nav` + blur
- `mobile-nav.tsx` — active link: `surface-selection`; panel + trigger: `surface-nav` + blur
- `nav.tsx` — CSS-only responsive switch

**Footer (complete) — `src/components/layout/footer.tsx`:**
- `support-meta` token + responsive Tailwind override; no border-t

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx` — border only (level 1)
- `diagram.tsx` — outer shell border-only (`overflow-hidden`, no padding); inner image region gets `surface-sunken` fill
- `callout.tsx` — `surface-raised` fill + 2px accent left border (level 5). Single treatment, no variants.
- `highlight.tsx` — `surface-raised` fill + `outline-variant` border (level 3). **Shadow system removed permanently.**
- `code-block.tsx` — `outline-variant` border + `surface-sunken` fill (level 4)
- `mdx-components.tsx`

**Important implementation notes:**
- Tailwind v4 responsive variants (`md:custom-class`) do NOT work on `@layer components` classes — use `@media` blocks inside `@layer components`
- `React.Fragment` (explicit) required when `key` needed in map — `<>` cannot take `key`
- Biome `noStaticElementInteractions` fires on hover wrappers — biome-ignore with justification
- Material Symbols SVG paths use viewBox `0 -960 960 960` (not `0 0 24 24`)
- Prose cascade specificity: `.prose-content <element>` rules beat `@layer components` token classes — always add explicit Tailwind arbitrary color utilities on elements that must hold a fixed color inside prose
- `lucide-react` has no Github icon — use inline SVG
- `surface-selection` vs `surface-sunken`: selection = accent-tinted (active states), sunken = neutral (hover states, code surfaces, recessed wells)

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — three variants: `compact` (1:1), `featured` (4:3), `text`; outer: `surface-raised` + `outline-variant` border (0px radius); inner media: `surface-sunken` + `radius-md`
- `hero-media.tsx`, `project-overview.tsx`, `stack-summary.tsx`, `project-sidebar.tsx`
- `section-progress-nav.tsx` — TOC: active Ink, inactive Muted

**Pages (complete):**
- `src/app/page.tsx` — two-column hero, featured grid, CTA block
- `src/app/work/page.tsx` — heading + project grid
- `src/app/work/[slug]/page.tsx` — SectionProgressNav, HeroMedia, ProjectOverview, MDX body, backlink
- `src/app/about/page.tsx` — identity row, two-panel intro, Approach, Capabilities, Experience, Education
- `src/app/not-found.tsx` — 404 with Home + Work links

**Content pipeline (complete):**
- `src/lib/content/projects.ts`, `src/lib/content/about.ts`, `src/lib/schemas/project.ts`, `src/lib/schemas/about.ts`

**Documentation (synced):**
- `.claude/docs/DESIGN.md` — §4 token table updated (surface polarity swap, surface-nav, surface-selection added, legacy tokens noted); §8 fully rewritten (5-level canonical elevation table, blur carve-out, shadow section removed); §11 all affected components updated; §3 prose table updated
- `.claude/CLAUDE.md` — blur and shadow constraints updated

**Placeholder content:**
- `content/projects/lane-refinement-rl.mdx` — academic, `featured: true`, order 10
- `content/projects/distributed-task-queue.mdx` — freelance, order 20
- `content/projects/local-llm-experiments.mdx` — personal, order 30

---

## Last Session

**Elevation/depth system restructured — complete, uncommitted.**

Three logical work areas (to be committed as separate clusters):

**1. Token foundation**
- `globals.css`: `surface-raised`/`surface-sunken` values swapped in light theme
- `globals.css`: `surface-nav` + `surface-selection` tokens added (light + dark + `@theme inline`)
- `globals.css`: highlight shadow blocks removed permanently

**2. Component migration**
- `pill-nav.tsx` → `surface-nav` (container), `surface-selection` (active link)
- `mobile-nav.tsx` → `surface-nav` (trigger + panel), `surface-selection` (active link)
- `scroll-to-top.tsx` → `surface-nav`
- `callout.tsx` → `surface-raised` fill
- `code-block.tsx` → `surface-sunken` fill added
- `diagram.tsx` → outer border-only + `overflow-hidden`; inner image region gets `surface-sunken`
- `card.tsx` → deleted (was unused)

**3. Docs sync**
- `DESIGN.md` § 4, 8, 11 rewritten
- `CLAUDE.md` constraints updated

**Visual decisions still open:**
- `surface-sunken` contrast in light (deferred — evaluate after elevation stabilises)
- `surface-overlay` / `surface-overlay-panel` removal (deferred — kept as legacy)

---

## Next Steps

1. **Commit elevation work** (3 clusters — see git plan in session)
2. **About page visual polish** — now that elevation is stable, do a visual pass
3. **Home page v1 spec items:**
   - Hero portrait — wire up real headshot (`/public/headshot.jpeg`)
   - Hire Me CTA pulse — 2400ms opacity+scale on icon only, `useReducedMotion()` gated
   - Theme toggle tooltip — 500ms hover delay, optional/lower priority
4. **Merge to main** when phase-5 polish is complete
5. **Content** — placeholder MDX files need real content

---

## Blockers
None
