# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 5 — UI Polish** (branch: `phase-5-work-page`)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Phase 5 UI polish in progress. Build passes (10 static pages), Biome clean, TypeScript clean.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome
- framer-motion, next-themes, gray-matter, next-mdx-remote, zod, remark-gfm
- clsx, tailwind-merge, lucide-react

**Design tokens — `src/app/globals.css` (current values):**
- Full semantic color map (light + dark): 19 roles including `outline-hair`
- Light: `background/surface #f8f8f7`, `surface-raised #ffffff`, `surface-sunken #f2f2f1`, `accent #006e37`
- Dark: `background/surface #131313`, `surface-raised #211f1e`, `surface-sunken #0e0e0e`, `accent #35c27d`
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
- `blockquote` → body-secondary + italic + Accent left border
- `table th/td` → body-caption, Muted
- `code` (inline) → mono-code + surface-sunken bg

**Layout primitives (complete) — `src/components/layout/`:**
- `container.tsx`, `section.tsx`, `grid.tsx`, `stack.tsx`, `divider.tsx`, `sticky.tsx`, `sidebar-layout.tsx`

**UI primitives (complete) — `src/components/ui/`:**
- `button.tsx` — primary/secondary variants, 44px, `radius-sm`, icon slot
- `card.tsx` — flat element, `surface-raised` treatment
- `heading.tsx` — polymorphic h1–h6; `SemanticType` prop maps directly to token class; `display-primary` and `heading-component` get explicit `text-[var(--on-surface)]`
- `tag.tsx` — `variant="outline"` (Muted text) or `variant="filled"` (Ink text); both `normal-case tracking-normal`
- `theme-toggle.tsx` — `PillThemeSelector` (expand-on-hover, all 3 always in DOM, `overflow-hidden` width transition) + `InlineThemeSelector` (`w-fit`); both use MaterialSymbol
- `material-symbol.tsx` — inline SVG; 5 icons: `fingerprint`, `folder_code`, `light_mode`, `dark_mode`, `computer`; paths from `@material-symbols/svg-400@0.44.7` (no runtime dep); viewBox `0 -960 960 960`

**Navigation (complete):**
- `pill-nav.tsx` — active state tonal (surface-sunken/Ink); active icon in Accent; uses MaterialSymbol
- `mobile-nav.tsx` — Framer Motion slide-out, focus trap, Esc-to-close, reduced-motion gated
- `nav.tsx` — CSS-only responsive switch

**Footer (complete) — `src/components/layout/footer.tsx`:**
- `support-meta` token + responsive Tailwind override; no border-t

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx`, `diagram.tsx` — image/diagram with optional `body-caption` caption
- `callout.tsx` — single editorial treatment: Accent border, `callout-title` with explicit `text-[var(--accent)]` (overrides prose cascade), `body-emphasis` body with explicit Ink. No type variants.
- `highlight.tsx` — elevated pull-quote; `insight-label` heading, `body-emphasis` body
- `code-block.tsx`, `mdx-components.tsx`

**Important callout implementation note:**
`callout-title` uses `.callout-title` class (has `color: var(--accent)`) but also requires explicit `text-[var(--accent)]` Tailwind arbitrary utility. Without it, `.prose-content p` / `.prose-content strong` override the class color with Ink via higher specificity. The explicit utility class wins the cascade.

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — three variants: `compact` (1:1), `featured` (4:3), `text`; thumbnail `aspect-video`; hover: border/bg tonal shift + chevron Accent + image scale; no shadows
- `hero-media.tsx` — image/video/SVG handler, reduced-motion poster fallback
- `project-overview.tsx`, `stack-summary.tsx`, `project-sidebar.tsx`
- `section-progress-nav.tsx` — TOC: active Ink (`on-surface`), inactive Muted (`on-surface-muted`). **Not `outline`** — `outline` is a border token, not a text token.

**Pages (complete):**
- `src/app/page.tsx` — two-column hero, featured grid, CTA block
- `src/app/work/page.tsx` — heading + project grid
- `src/app/work/[slug]/page.tsx` — SectionProgressNav, HeroMedia, ProjectOverview, MDX body, backlink
- `src/app/about/page.tsx` — identity row, two-panel intro, Approach, Capabilities, Experience, Education
- `src/app/not-found.tsx` — 404 with Home + Work links

**Content pipeline (complete):**
- `src/lib/content/projects.ts`, `src/lib/content/about.ts`, `src/lib/schemas/project.ts`, `src/lib/schemas/about.ts`

**Documentation (synced):**
- `.claude/docs/DESIGN.md` §3 — replaced old `type-*` YAML with 16-token semantic table + prose composition rules section; interactive-label vs nav-link behavioral contract documented; footer responsive exception noted
- `.claude/docs/CONTENT-SCHEMA.md` — `<Callout>` updated: removed `type` prop and multi-variant docs; documented single treatment

**Placeholder content:**
- `content/projects/lane-refinement-rl.mdx` — academic, `featured: true`, order 10
- `content/projects/distributed-task-queue.mdx` — freelance, order 20
- `content/projects/local-llm-experiments.mdx` — personal, order 30

**Key constraints:**
- Tailwind v4 responsive variants (`md:custom-class`) do NOT work on `@layer components` classes — use `@media` blocks inside `@layer components`
- `React.Fragment` (explicit) required when `key` needed in map — `<>` cannot take `key`
- Biome `noStaticElementInteractions` fires on hover wrappers — biome-ignore with justification
- Material Symbols SVG paths use viewBox `0 -960 960 960` (not `0 0 24 24`)
- Prose cascade specificity: `.prose-content <element>` rules beat `@layer components` token classes — always add explicit Tailwind arbitrary color utilities on elements that must hold a fixed color inside prose (e.g., callout title)
- `lucide-react` has no Github icon — use inline SVG

---

## Last Session

**Tag / button / radius normalization — complete and committed (this session).**

Three commit clusters:

1. `refactor: normalize tag/button system — collapse variants, extract components`
   - `<Tag>` collapsed to single canonical treatment: `surface-tag` bg, `on-surface` text, `spacing-sm` padding
   - `<SocialLink>` extracted: h-9 border-chip, quiet utility affordance
   - `<Button>` extended with `href` discriminated union — renders `<a>` or `<button>` based on prop, same variants both branches
   - About social row → `<SocialLink>`; home/about CTAs → `<Button href="...">`

2. `refactor: semantic token cleanup — inline code composition and code block surface`
   - Inline code rule in globals.css rewritten to explicitly match `mono-code` token values (note: `@apply mono-code` does NOT work in Tailwind v4 against `@layer components` classes — keep values explicit)
   - `<CodeBlock>` surface-sunken fill removed — now border-only, no fill

3. `refactor: normalize radius vocabulary — architectural containers to 0px, media to 8px`
   - Cards outer: `radius-sm` → 0px (architectural container)
   - Code blocks: `radius-md` → 0px
   - Card hero inner: `radius-sm` → `radius-md` (4px → 8px, media surface)
   - About headshot: `radius-lg` → `radius-md` (12px → 8px)
   - Homepage portrait placeholder: `radius-sm` → `radius-md` (4px → 8px)

**DESIGN.md synced** to reflect all three clusters (tag spec, radius vocabulary, elevation note, Button anchor rendering, new SocialLink spec).

**Visual QA passed** (Playwright). One mobile weak spot noted: 0px cards at 375px have near-invisible side edges because `surface-raised` (#fff) and `background` (#f8f8f7) are tonally very close — inner hero image contrasts more than the outer container. Not a regression; flagged for the elevation/depth audit.

---

## Next Steps

**Immediate next action — do this first:**

**Elevation/depth audit** (prerequisite for About page polish)

Full inventory of every depth/elevation mechanism currently in the system. For each: where it exists, whether it is structural / interactive / decorative, and whether it aligns with the editorial-architectural direction.

Audit categories:
- Borders (`outline-variant`, `outline`, `outline-hair`)
- Tonal surface steps (`background` → `surface-raised` → `surface-sunken`)
- Hover border shifts
- Hover background shifts
- Shadows (documented carve-outs: `<Highlight>` only)
- Blur / backdrop-filter (pill nav, mobile panel, scroll-to-top)
- Image scaling on hover (`group-hover:scale-[1.03]` on card hero)
- Sticky / floating elements
- Accent fills (primary button, active nav state, callout border)
- Dark-surface anchors (surface-sunken used as anchor color in dark theme)
- Radius usage as depth signal
- Typography density as depth signal

Output of audit feeds directly into About page polish decisions.

---

`phase-5-work-page` polish otherwise complete. Remaining:

1. **About page polish** (`phase-5-about-page`) — elevation/depth audit first
2. **Home page v1 spec items:**
   - Hero portrait — wire up real headshot (`/public/headshot.jpeg`)
   - Hire Me CTA pulse — DESIGN.md §11: 2400ms opacity+scale on icon only, stops on hover, `useReducedMotion()` gated
   - Theme toggle tooltip — 500ms hover delay, optional/lower priority
3. **Merge to main** when phase-5 polish is complete
4. **Content** — placeholder MDX files need real content

---

## Blockers
None
