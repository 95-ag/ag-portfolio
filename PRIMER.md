# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 6 — Project Content** (branch: `phase-6-real-content`)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Build passes (10 static pages), Biome clean, TypeScript clean.

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

Three-tier responsive scale: ≤768 (mobile) / 769–1279 (mid) / ≥1280 (desktop). `body-lead` is fully 3-tier: 18/28 → 20/30 → 24/34. Breakpoints align with layout transitions: portrait+intro and capabilities → md (768); Approach 3-col grid → xl (1280).
Footer responsive exception: `support-meta` + local Tailwind override to 11px/18px mobile, 15px/24px desktop.

**Prose composition (`.prose-content`):**
- `h2` → mono-anchor values + border-bottom + margin rules
- `h3` → heading-component + margins
- `h4` → heading-narrative + margins
- `p` / `li` → body-primary (18px), Ink
- `ul` → `list-style-type: disc`, `padding-left: spacing-xl`; `ul > li::marker { color: var(--outline-variant) }` — toned to match overview bullet visual register
- `ol` → `list-style-type: decimal`, `padding-left: spacing-xl` — native document flow
- `li margin-bottom: spacing-xs` per DESIGN.md spec
- `a` → Accent, underline; `a[href^="#"]` → on-surface, underline outline-variant, accent on hover
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

**Root layout shell — `src/app/layout.tsx`:**
- `body`: `flex min-h-dvh flex-col` — footer always pins to viewport bottom; `min-h-dvh` avoids iOS Safari vh bugs
- `main`: `flex flex-1 flex-col pt-[var(--spacing-3xl)]` — expands to fill remaining space; transparent on content-heavy pages
- Short pages (404): child uses `flex flex-1 items-center` to vertically center content within expanded main

**Layout primitives (complete) — `src/components/layout/`:**
- `container.tsx`, `section.tsx` (accepts `id` prop), `grid.tsx`, `stack.tsx`, `divider.tsx`, `sticky.tsx`, `sidebar-layout.tsx`
- `section.tsx` padding: `pt-xl / pb-xl` (32px) mobile; `pt-3xl / pb-2xl` (64px top / 48px bottom) desktop.

**UI primitives (complete) — `src/components/ui/`:**
- `button.tsx` — primary/secondary variants, h-14 (56px), px-2xl (48px), `radius-sm`, icon slot
- `copy-link.tsx` — text-link copy interaction: `body-caption`, `on-surface-muted`, underline idle/no-underline copied, 1500ms revert
- `copyable-code.tsx` — code-chip copy interaction: `surface-sunken` + `outline-variant` border, mono-code, 1500ms icon swap
- `heading.tsx` — polymorphic h1–h6; `SemanticType` prop maps directly to token class
- `tag.tsx` — single canonical treatment: `surface-tag` bg, `on-surface` text
- `theme-toggle.tsx` — `PillThemeSelector` (collapsed, expands on hover) + `InlineThemeSelector` (always expanded)

**Navigation (complete):**
- `pill-nav.tsx` — logomark: `<Image src="/cat_head_icon.svg" width={32} height={32} />` via next/image; active state: `surface-selection`; hover: `surface-sunken`; container: `surface-nav` + blur
- `mobile-nav.tsx` — active link: `surface-selection`; panel + trigger: `surface-nav` + blur
- `nav.tsx` — CSS-only responsive switch

**Footer (complete) — `src/components/layout/footer.tsx`:**
- `support-meta` token + responsive Tailwind override; no border-t

**MDX components (complete) — `src/components/mdx/`:**
- `figure.tsx` — border only (level 1)
- `diagram.tsx` — outer shell border-only; inner image region gets `surface-sunken` fill
- `callout.tsx` — `surface-raised` fill + 2px accent left border (level 5)
- `highlight.tsx` — `surface-raised` fill + `outline-variant` border (level 3). Shadow system removed permanently.
- `code-block.tsx` — `outline-variant` border + `surface-sunken` fill (level 4)
- `mdx-components.tsx`

**Important implementation notes:**
- Tailwind v4 responsive variants (`md:custom-class`) do NOT work on `@layer components` classes — use `@media` blocks inside `@layer components`
- `React.Fragment` (explicit) required when `key` needed in map — `<>` cannot take `key`
- Biome `noStaticElementInteractions` fires on hover wrappers — biome-ignore with justification
- Material Symbols SVG paths use viewBox `0 -960 960 960` (not `0 0 24 24`)
- Brand icons (GitHub, LinkedIn) use viewBox `0 0 24 24` — kept as standalone SVG wrappers, not via `IconBase`
- Site logomark (`/cat_head_icon.svg`) rendered via `<Image ... unoptimized />` (not via IconBase/currentColor) — used in pill nav + 404 CTA
- Prose cascade specificity: `.prose-content <element>` rules beat `@layer components` token classes — always add explicit Tailwind arbitrary color utilities on elements that must hold a fixed color inside prose
- `surface-selection` vs `surface-sunken`: selection = accent-tinted (active states), sunken = neutral (hover states, code surfaces, recessed wells)
- Tailwind v4 preflight strips `list-style: none` globally — prose `ul`/`ol` must explicitly set `list-style-type`

**Icon system (complete) — `src/components/icons/`:**
- `icon-base.tsx` — shared `IconBase` + `IconProps`; handles viewBox, sizing, `aria-hidden`, `currentColor`
- `material/` — 19 Material Symbols Outlined components (one per file); viewBox `0 -960 960 960`
- `brands/` — `GitHubIcon`, `LinkedInIcon`; viewBox `0 0 24 24`; standalone SVG wrappers (not via IconBase)
- lucide-react removed entirely

**Project components (complete) — `src/components/project/`:**
- `project-card.tsx` — three variants: `compact` (1:1), `featured` (4:3), `text`; description `line-clamp-3`, tags flow immediately after visible text (no spacer); card heights equal via CSS grid row-stretch
- `project-header.tsx` — link pills: 16px leading icon + label + 12px `OpenInNewIcon` trailing indicator
- `hero-media.tsx`, `project-overview.tsx`, `stack-summary.tsx`, `project-sidebar.tsx`
- `section-progress-nav.tsx` — TOC: active Ink, inactive Muted; only H2 elements get IDs; slugify strips `&` and collapses `--` → `-`

**Pages (complete):**
- `src/app/page.tsx` — two-column desktop hero (content left `shrink-0 lg:w-[480px] xl:w-[560px]`, portrait right `flex-1 height:600px`, `overflow-hidden` section, left-edge linear mask fade); featured grid (`id="featured"`, no heading, "View all →" below grid)
- `src/app/work/page.tsx` — heading + project grid
- `src/app/work/[slug]/page.tsx` — SectionProgressNav, HeroMedia, ProjectOverview, MDX body, backlink
- `src/app/about/page.tsx` — identity row, two-panel intro, Capabilities, Approach, "Work with me" CTA (primary + CopyLink + secondary)
- `src/app/not-found.tsx` — vertically centered in viewport, footer pinned; "404" eyebrow, display-primary H1, body-lead; Primary "See Projects" (ArrowForwardIcon) + Secondary "Go Home" (logomark via Image)

**Content pipeline (complete):**
- `src/lib/content/projects.ts`, `src/lib/content/about.ts`, `src/lib/schemas/project.ts`, `src/lib/schemas/about.ts`

**Documentation:**
- `.claude/docs/DESIGN.md` — Domain Components: Home Page, Project Detail, About Layouts, 404 Not Found. Technical Conventions: Root Layout Shell.
- `.claude/docs/portfolio/project-extraction-workflow.md` — operational workflow for report+repo → MDX extraction. Covers H2 spine, source-of-truth hierarchy, density reduction checklist, asset categorization, reviewer patterns. **Read before starting any Phase-6 project.**
- `.claude/rules/` — all stale DESIGN.md §N references migrated to named paths

**Placeholder content:**
- `content/projects/lane-refinement-rl.mdx` — academic, `featured: true`, order 10
- `content/projects/distributed-task-queue.mdx` — freelance, order 20
- `content/projects/local-llm-experiments.mdx` — personal, order 30

---

## Phase 6 — model-extraction-attacks

### Content — COMPLETE ✓

MDX fully rewritten from source (PDF + repo). All metrics traceable to PDF tables. No placeholders.

**Finalized decisions:**
- Title: "Stealing Black-Box ML Models"
- Section order: Detailed Problem → Background → Architecture → Data → Engineering Decisions → Algorithm & Training Design → Results → Constraints & Limitations → Next Steps (Architecture before Data — improves comprehension)
- Results subsections numbered 1–6 with summary paragraph at top
- OOD track explicitly framed as strongest generalization result
- Metric framing: ~80% at 25k labels-only; 82.88% with top-3 softmax (both honest, sourced from Table 1b)
- GitHub: `95-ag/dl-model-extraction` | Paper: `/projects/model-extraction-attacks/DL_Project.pdf`
- Credits: KTH logo only (no co-author avatars)
- `attack-transfer-summary.svg` removed from MDX — table covers it

### Assets — PENDING

**Build from source (Mermaid):**
- `extraction-pipeline.svg` — 3-stage flow: query gen → surrogate training → downstream eval
- `coreset-selection.svg` — proxy → entropy rank → top-k → victim API
- `ood-pipeline.svg` — ImageNet + web-scrape → resize → label verify → query pool

**Build from source (matplotlib):**
- `query-budget-results.png` — Fig 1: random vs. coreset accuracy vs. budget, CIFAR-10/100
- `architecture-transfer-heatmap.svg` — Table 1a: ResNet-34/50 × ResNet-34/50/VGG19-BN
- `output-access-bar-chart.svg` — Table 1b: 79.8 / 82.88 / 82.15

**Legacy crop from PDF:**
- `adversarial-example-panel.png` — Fig 2
- `membership-inference-roc.png` — Fig 3b
- `membership-inference-roc-test.png` — Fig 4b

**Shared tooling to create first (reused across all Phase-6 projects):**
- `assets-source/mermaid/_theme.*` — Mermaid theme with site tokens
- `assets-source/matplotlib/_portfolio.mplstyle` — shared matplotlib style

**Delete before committing assets:**
- `hero-model-extraction.svg` — placeholder
- `attacker-victim-comparison.svg` — placeholder, redundant
- `attack-transfer-summary.svg` — removed from MDX

### Hero Cover — PENDING

Output: `hero-cover.webp`. KTH logo in metadata layer. Start typography-first. Update `heroImage` + `heroAlt` last.

---

## Uncommitted Changes (as of this session)

Four files, proposed as two clusters — **do not commit until approved:**

**Cluster A — `feat: complete model-extraction-attacks content and prose list styling`**
- `content/projects/model-extraction-attacks.mdx` — full MDX rewrite
- `public/projects/model-extraction-attacks/kth-logo.svg` — new KTH logo asset
- `src/app/globals.css` — prose list styling (`ul` disc + `::marker` color; `ol` decimal; `li` spacing)

**Cluster B — `docs: add project extraction workflow and update primer`**
- `.claude/docs/portfolio/project-extraction-workflow.md` — new operational workflow doc
- `PRIMER.md` — this update

---

## Next Task

**Start:** Phase 6 asset phase for `model-extraction-attacks`

1. Install `@mermaid-js/mermaid-cli`
2. Create `assets-source/` directory structure
3. Author `assets-source/mermaid/_theme.*` (site token colors, Inter sans, hairline strokes)
4. Author and export 3 Mermaid diagrams: `extraction-pipeline`, `coreset-selection`, `ood-pipeline`
5. Author `assets-source/matplotlib/_portfolio.mplstyle`
6. Digitize PDF Fig 1 / Table 1a / Table 1b values → matplotlib scripts → export charts
7. Crop PDF Figs 2, 3b, 4b → PNG
8. Delete 3 placeholder assets
9. Build verification

Read `.claude/docs/portfolio/project-extraction-workflow.md` and `asset-guide.md` before starting.

---

## Next Projects (after model-extraction-attacks is complete)

**2. lane-refinement-rl** — same workflow: MDX → assets → hero cover
**3. masked-autoencoders** — same workflow

Then: remove 3 placeholder MDX files, add freelance project, finalize featured set.

**Featured projects (final state):** `lane-refinement-rl`, `model-extraction-attacks`, freelance project

---

## Phase Roadmap

| Phase | Status |
|---|---|
| 1–5 | Complete |
| 6 — Project Content | In progress — model-extraction-attacks content done, assets pending |
| 7 — SEO + AI Readability | Pending |
| 8 — Audits | Pending |
| 9 — Refactor / Clean | Pending |
| 10 — Deploy | Pending |

---

## Process Rules

- Always propose commit clusters and await approval before any `git` operation
- Complete one project fully before moving to the next
- Execution order per project: MDX → [approval] → assets → [approval] → hero cover
- Read `project-extraction-workflow.md` at the start of each new Phase-6 project

---

## Known Deviations from PRODUCT.md

- **Hero CTAs (§7.1):** CTAs moved into the hero; separate bottom CTA section removed. Intentional.
- **Sidebar (§7.3):** Replaced with single-column editorial layout.

## Missing Production Assets

- `/public/resume.pdf` — About page "Download Resume" button targets this
