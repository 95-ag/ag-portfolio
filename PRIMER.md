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
- clsx, tailwind-merge

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

**Typography system — semantic tokens (19 classes in `globals.css`):**
All old `type-*` aliases removed. Three operative text colors: Ink (`on-surface`), Muted (`on-surface-muted`), Accent (`accent`).

| Token | ≤768 | 769–1279 | ≥1280 (desktop) | Role |
|---|---|---|---|---|
| `display-primary` | 36/44 | 46/54 | 56/64 | Hero headline, page H1 — Ink |
| `display-accent` | 36/44 | 46/54 | 56/64 | Section title — Accent, **500 weight** |
| `heading-display` | 28/36 | 32/40 | 36/44 | Editorial deck / tagline under H1 — Ink, **500 weight** |
| `heading-section` | 22/30 | 24/32 | 26/34 | Major section headings on editorial pages — Ink |
| `heading-component` | 22px | Card titles, UI section headings — Ink |
| `heading-narrative` | 20px | H4 in prose, editorial subheads — Accent |
| `body-lead` | 18/28 | 20/30 | 24/34 | Lead narrative paragraphs, capability group labels — **Muted** |
| `body-primary` | 18px | Long-form prose — Ink |
| `body-secondary` | 18px | Supporting copy, summaries — Muted |
| `body-caption` | 14px | Captions, timestamps — Muted |
| `body-emphasis` | 18px | Highlighted callout body — Ink, 500 weight |
| `callout-title` | 16px | Callout lead-in — Accent |
| `interactive-label` | 14px | Committed actions (buttons, CTAs) — stateful |
| `nav-link` | 14px | Navigational/location indicators — stateful |
| `mono-anchor` | 15px | Page eyebrows, structural metadata — Muted, uppercase |
| `tag-chip` | 12px | Tag chips on cards — Ink, uppercase |
| `insight-label` | 13px | Callout/highlight markers — Muted, uppercase |
| `mono-code` | 16px | Inline code, code blocks — Muted |
| `support-meta` | 13px | Footer, TOC items — Muted |

Three-tier responsive scale: ≤768 (mobile) / 769–1279 (mid) / ≥1280 (desktop). All three tiers in the table above. `body-lead` is fully 3-tier: 18/28 → 20/30 → 24/34. Breakpoints align with layout transitions: portrait+intro and capabilities → md (768); Approach 3-col grid → xl (1280).
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
- `button.tsx` — primary/secondary variants, h-14 (56px), px-2xl (48px), `radius-sm`, icon slot
- `copy-link.tsx` — text-link copy interaction: `body-caption`, `on-surface-muted`, underline idle/no-underline copied, 1500ms revert
- `copyable-code.tsx` — code-chip copy interaction: `surface-sunken` + `outline-variant` border, mono-code, 1500ms icon swap
- `card.tsx` — **DELETED** (was unused)
- `heading.tsx` — polymorphic h1–h6; `SemanticType` prop maps directly to token class
- `tag.tsx` — single canonical treatment: `surface-tag` bg, `on-surface` text
- `theme-toggle.tsx` — `PillThemeSelector` (collapsed, expands on hover) + `InlineThemeSelector` (always expanded); uses `LightModeIcon`, `DarkModeIcon`, `ComputerIcon`

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
- Brand icons (GitHub, LinkedIn) use viewBox `0 0 24 24` — kept as standalone SVG wrappers, not via `IconBase`
- Prose cascade specificity: `.prose-content <element>` rules beat `@layer components` token classes — always add explicit Tailwind arbitrary color utilities on elements that must hold a fixed color inside prose
- `surface-selection` vs `surface-sunken`: selection = accent-tinted (active states), sunken = neutral (hover states, code surfaces, recessed wells)

**Icon system (complete) — `src/components/icons/`:**
- `icon-base.tsx` — shared `IconBase` + `IconProps`; handles viewBox, sizing, `aria-hidden`, `currentColor`
- `material/` — 18 Material Symbols Outlined components (one per file); viewBox `0 -960 960 960`
- `brands/` — `GitHubIcon`, `LinkedInIcon`; viewBox `0 0 24 24`; standalone SVG wrappers (not via IconBase)
- lucide-react removed entirely

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — three variants: `compact` (1:1), `featured` (4:3), `text`; outer: `surface-raised` + `outline-variant` border (0px radius); inner media: `surface-sunken` + `radius-md`
- `project-header.tsx` — link pills: 16px leading icon + label + 12px `OpenInNewIcon` trailing indicator; Demo uses `DeployedCodeIcon`
- `hero-media.tsx`, `project-overview.tsx`, `stack-summary.tsx`, `project-sidebar.tsx`
- `section-progress-nav.tsx` — TOC: active Ink, inactive Muted

**Pages (complete):**
- `src/app/page.tsx` — two-column hero, featured grid (Collaboration & Hiring CTA removed)
- `src/app/work/page.tsx` — heading + project grid
- `src/app/work/[slug]/page.tsx` — SectionProgressNav, HeroMedia, ProjectOverview, MDX body, backlink
- `src/app/about/page.tsx` — identity row, two-panel intro, Capabilities, Approach, "Work with me" CTA (primary + CopyLink + secondary)
- `src/app/not-found.tsx` — 404 with Home + Work links

**Content pipeline (complete):**
- `src/lib/content/projects.ts`, `src/lib/content/about.ts`, `src/lib/schemas/project.ts`, `src/lib/schemas/about.ts`

**Documentation (synced):**
- `.claude/docs/DESIGN.md` — v2.0, two-layer architecture. Canonical spine: Overview / Foundations (incl. Iconography) / Components / **Domain Components** / Interaction Rules / Accessibility Rules / Cross-Cutting Rules / Technical Conventions / Iteration Notes.
- **DESIGN.md spine distinction:** `## Components` = reusable/portable UI systems; `## Domain Components` = page/domain-bound compositions (Project Detail with Prose Layout + Editorial Two-column, About Layouts).
- `.claude/rules/` — all stale DESIGN.md §N references migrated to new named paths
- `.claude/docs/CONTENT-SCHEMA.md` — cross-references updated to Domain Components paths
- `.claude/skills/design-writing-contract.md` — updated for Domain Components taxonomy
- `.claude/skills/design-rewrite/references/` — validation-heuristics, safety-rules, rewrite-passes updated

**Placeholder content:**
- `content/projects/lane-refinement-rl.mdx` — academic, `featured: true`, order 10
- `content/projects/distributed-task-queue.mdx` — freelance, order 20
- `content/projects/local-llm-experiments.mdx` — personal, order 30

---

## Last Session

**About page polish — Pass 2 complete.**

- **body-lead:** color `on-surface` → `on-surface-muted`; full 3-tier scale (18/20/24px); intro paragraphs `xl:text-justify xl:hyphens-auto`.
- **heading-display:** weight 600 → 500.
- **Button:** h-12→h-14 (56px), px-xl→px-2xl (48px). Label unchanged.
- **Contact section:** rebuilt as "Work with me" — flat/editorial, no card. Buttons: "Let's talk" (primary, mailto) + "Download Resume" (secondary). `CopyLink` text link beneath primary.
- **Home page:** Collaboration & Hiring CTA section removed. Home = hero + featured projects only.
- **New components:** `CopyableCode` (code-chip, reusable for project-detail/MDX contexts); `CopyLink` (text-link, low visual weight for editorial/contact contexts).
- **New icons:** `content-copy.tsx`, `check.tsx`.

**Process note:** always propose commit clusters and await approval before any `git` operation.

**Home page v1 spec items (deferred):**
- Hero portrait — wire up real headshot (`/public/headshot.jpeg`)
- Hire Me CTA pulse — 2400ms opacity+scale on icon only, `useReducedMotion()` gated

**Then:** Merge `phase-5-about-page` to main.

**Content** — placeholder MDX files need real content.

---

## Blockers
None
