# DESIGN.md

> Visual specification for the portfolio defined in `PRODUCT.md`.
> PRODUCT.md owns *what* and *why*. This document owns *how it looks*.
> When the two disagree on a visual detail, this document wins.
> Version 2.0

---

```yaml
# YAML Registry — globally reusable canonical tokens
# Primitive token values only. For semantic meaning, role, and
# usage constraints, see the Foundations section below.

spacing:
  xs:   4px
  sm:   8px
  md:   16px
  lg:   24px
  xl:   32px
  2xl:  48px
  3xl:  64px
  4xl:  96px
  5xl:  128px

  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px

radius:
  0px:  0px
  sm:   4px
  md:   8px
  lg:   12px
  pill: 9999px

motion:
  duration-fast: 150ms
  duration-base: 200ms
  duration-slow: 300ms
  easing-standard: cubic-bezier(0.2, 0, 0, 1)
  easing-emphasis: cubic-bezier(0.3, 0, 0, 1)

breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px

z-index:
  base: 0
  raised: 10
  sticky-content: 20
  reading-progress: 30
  scroll-to-top: 40
  pill-nav: 50
  mobile-menu-overlay: 55
  mobile-menu-panel: 60
  tooltip: 70
  modal: 80
  toast: 90
```

---

## Overview

### Design Philosophy

The portfolio combines the structural clarity of a technical journal with the precision of modern engineering interfaces. The visual language is editorial, systems-oriented, and restrained — designed to communicate technical credibility without relying on visual effects or trend-driven aesthetics.

- **Feel:** calm, intentional, highly readable, technically sharp, professionally understated.
- **Resemble:** a curated engineering case-study archive, a modern technical publication, a refined engineering workspace.
- **Avoid:** a startup marketing site, a hacker-terminal simulation, an experimental art portfolio, an Awwwards showcase.

### Core Principles

- Typography is the primary driver of hierarchy.
- Whitespace is structural, not empty.
- Motion is subtle and secondary to content.
- Color is functional, not decorative.
- Containers are lightweight and architectural — not decorative objects.
- Layouts support recruiter scanning, technical storytelling, long-form reading, and scalable content.

### Things to Avoid

- Excessive gradients, heavy glow effects, glassmorphism (carve-out: Foundations → Elevation & Depth → Backdrop-Blur Carve-out).
- Animation-heavy interactions, scroll-jacking, parallax, dramatic reveal animations, decorative motion.
- Dense unstructured layouts, image-heavy layouts without supporting context.
- Terminal/cyberpunk cosplay aesthetics (`SYSTEM_STATUS:`, `.exe`, `_underscore_NAMING` in copy).
- Startup-SaaS visual tropes, playful UI systems.

---

## Foundations

### Colors

- One accent — identity signal. `accent-strong` is intentionally not defined. For more emphasis, use weight or size, not a louder color.
- `{surface-selection}` and `{surface-sunken}` are intentionally distinct — selected states use `{surface-selection}`; hover states use `{surface-sunken}`.

#### Semantic Roles

- Tokens are role-based.
- The same role has different hex values per theme to maintain contrast and visual weight.
- **Background depth is context-aware** (set via `data-read="long"` on `<html>` — see Technical Conventions → Surface Context): *showcase* pages (home, about, work index) use the extreme ground — white in light / deep-black in dark — so background effects feel immersive; *reading* pages (project detail) use a softer middle ground for legibility. The table lists the showcase (default) value; reading overrides only the ground — light `background`/`surface` `#f8f8f9`; dark `background`/`surface` `#1a1a1a`, `surface-raised` `#292929`, `surface-sunken` `#141414`, `surface-nav` `#1f1f1fd9`.
- **Light depth logic:** `surface-sunken` is the brightest (pure white — image/code/diagram clarity), `surface-raised` lifts only gently, `background` is the off-white ground. Dark inverts (sunken darkest, raised lighter).

| Role | Light | Dark | Used for |
|---|---|---|---|
| `background` | `#fcfcfc` | `#0e0e0e` | Page background (showcase default; reading override above) |
| `surface` | `#fcfcfc` | `#0e0e0e` | Default content surface (= background) |
| `surface-raised` | `#ededed` | `#1c1c1c` | Cards, callouts, highlighted panels — gently lifted neutral panel (light: subtly off the bg; dark: lighter than bg) |
| `surface-sunken` | `#ffffff` | `#080808` | Diagram content regions, sunken insets (card media well, hero) — brightest in light for image/code clarity. Code blocks instead use the Shiki theme background (see Technical Conventions → Code Block Highlighting) |
| `surface-nav` | `#fcfcfcd9` | `#141414d9` | Floating nav/utility blur UI only — pill nav, mobile trigger, mobile panel, scroll-to-top (~85% opacity) |
| `surface-selection` | `#e8f3ec` | `#16271b` | Active nav state, future tabs/segmented controls — accent-tinted, no border |
| `surface-overlay` | `#ffffffd9` | `#141414d9` | Legacy — superseded by `surface-nav`. Do not use for new work. |
| `surface-overlay-panel` | `#ffffffb8` | `#141414ba` | Legacy — superseded by `surface-nav`. Do not use for new work. |
| `surface-tag` | `#dadce0` | `#2a2a2a` | Tag chip background — neutral grey; light deepened so chips read as filled pills on the raised card |
| `on-background` | `#2d2d2d` | `#e2e2e2` | Primary text on background |
| `on-surface` | `#2d2d2d` | `#e2e2e2` | Primary text on surfaces |
| `on-surface-muted` | `#66696f` | `#a1a1aa` | Secondary text, captions |
| `outline` | `#8b9197` | `#8a8a8a` | Default borders, dividers — light raised to ~3:1 UI contrast |
| `outline-variant` | `#e2e3e5` | `#333333` | Subtle borders, low-contrast dividers |
| `outline-hair` | `color-mix(in srgb, #2d2d2d 10%, transparent)` | `color-mix(in srgb, #e2e2e2 10%, transparent)` | Alpha hairline border, surface-relative |
| `accent` | `#006e37` | `#2aa566` | Active nav, primary CTA, links, focus rings, callout accents |
| `accent-on` | `#ffffff` | `#06210e` | Text/icon on accent fills |
| `accent-muted` | `#e8f3ec` | `#16271b` | Hover backgrounds, accent-tinted surfaces |
| `secondary` | `#565e74` | `#bdc7d9` | Reserved — categorical use only (e.g., callout variants) |
| `tertiary` | `#a43a3a` | `#e8a5a5` | Reserved — categorical use only (e.g., warning callouts) |
| `error` | `#c0392b` | `#ff6b5e` | 404, validation errors |
| `success` | `#006e37` | `#2aa566` | Build status, confirmations (= accent in v1) |
| `focus-ring` | `#006e37` | `#2aa566` | 2px outline on keyboard focus (= accent) |
| `selection` | `#006e3733` | `#2aa56633` | Text selection background (accent at 20% alpha) |

Four RGB-triple custom properties (`--accent-rgb`, `--on-surface-rgb`, `--on-surface-muted-rgb`, `--outline-variant-rgb`) exist for WebGL uniform consumption — space-separated format. Consumed exclusively by `src/components/bg/`. Do not use these directly in CSS.

### Typography

Four families, each with a distinct semantic role. All self-hosted via `next/font` for rendering stability and LCP performance.

- **Manrope** — display and headline.
- **Inter** — body, UI, prose.
- **JetBrains Mono** — structural metadata texture, not expressive typography.
- **Caveat** — handwritten annotation style; cover SVG annotations only. CSS variable `--font-caveat`. Not permitted in UI, prose, or structural elements.

#### Semantic Token Table

- 19 tokens, role-based.
- Tokens with a fixed color have it baked in; tokens without a color entry are context-dependent (color applied by the component).
- Three-tier responsive scale: ≤768 (mobile) / 769–1279 (mid) / ≥1280 (desktop). Base declarations in `@layer components` set desktop values; `@media (max-width: 1279px)` steps to mid; `@media (max-width: 768px)` steps to mobile. Breakpoints align with layout transitions: portrait+intro and capabilities → md (768); Approach 3-col grid → xl (1280).
- Mid-tier values (769–1279): `display-primary` → 52px / 58px; `display-title` → 46px / 54px; `heading-display` → 32px / 40px; `heading-section` → 24px / 32px. `body-lead` is 3-tier: 18/28 mobile → 20/30 mid → 24/34 desktop.
- Responsive exception: `support-meta` defaults to 13px; `footer.tsx` applies a local override (11px/18px mobile, 15px/24px desktop). This is the only component-level responsive exception to a semantic token.

| Token | Family | Size | Weight | Line-height | Tracking | Color | Role |
|---|---|---|---|---|---|---|---|
| `display-primary` | Manrope | 64 / 52 / 40px | 600 | 70 / 58 / 48px | -0.025em | — (Ink, applied by component) | Hero headline, page H1 (Home, Work, About, 404) |
| `display-title` | Manrope | 56 / 46 / 36px | 600 | 64 / 54 / 44px | -0.025em | — (Ink, applied by component) | Project-page H1 — one tier below `display-primary` so long titles stay controlled |
| `heading-display` | Manrope | 36 / 32 / 28px | 600 | 44 / 40 / 36px | -0.015em | — (Ink) | Editorial deck / tagline immediately under a page H1; page-level statement that bridges display and section heading tiers |
| `heading-section` | Manrope | 26 / 24 / 22px | 600 | 34 / 32 / 30px | -0.015em | — (Ink) | Major section headings on editorial pages (About, essay); more prominent than UI panel headings |
| `heading-component` | Manrope | 22px | 600 | 30px | -0.01em | — (Ink, applied by component) | Card titles, section headings in UI |
| `heading-narrative` | Manrope | 20px | 600 | 28px | -0.01em | `accent` | H4 in prose, editorial subheads that need warmth |
| `body-lead` | Inter | 24 / 20 / 18px | 400 | 34 / 30 / 28px | — | `on-surface` | Principal narrative paragraph(s) where prose is the centerpiece — About bio, editorial lead copy; also capability group labels. Ink (not muted) — a large lead in grey reads dull/low-presence |
| `body-primary` | Inter | 18px | 400 | 28px | — | — (Ink) | Long-form prose paragraphs |
| `body-secondary` | Inter | 18px | 400 | 28px | — | `on-surface-muted` | Supporting copy, card subtitles, summaries |
| `body-caption` | Inter | 14px | 400 | 20px | — | `on-surface-muted` | Figure captions, table text, timestamps |
| `body-emphasis` | Inter | 18px | 500 | 28px | — | — (Ink) | Highlighted callout body text |
| `callout-title` | Inter | 16px | 600 | 20px | — | `accent` | Callout/aside titles |
| `interactive-label` | Inter | 14px | 500 | 20px | — | — (stateful) | Committed actions — buttons, CTAs, download links. Color expresses available/hover/pressed state. |
| `nav-link` | Inter | 14px | 500 | 20px | — | — (stateful) | Navigational/location indicators — nav anchors, back links. Color expresses current/visited/hover state. Same visual spec as `interactive-label`; distinct behavioral contract. |
| `mono-anchor` | JetBrains Mono | 15px | 500 | 20px | +0.05em | `on-surface-muted` | Page eyebrows, role labels, structural metadata (uppercase) |
| `tag-chip` | JetBrains Mono | 12px | 500 | 16px | +0.05em | `on-surface` | Tag chips on cards (uppercase) |
| `insight-label` | JetBrains Mono | 13px | 500 | 16px | +0.05em | `on-surface-muted` | Callout/highlight markers (uppercase) |
| `mono-code` | JetBrains Mono | 16px | 400 | 24px | — | `on-surface-muted` | Inline code, code blocks |
| `support-meta` | Inter | 13px | 400 | 20px | — | `on-surface-muted` | Footer, TOC items, section progress nav |

#### Prose Composition Rules

- MDX prose inside `.prose-content` maps heading levels to existing semantic tokens and layout composition rules.
- No prose-only tokens are created.

| Element | Semantic token | Composition additions |
|---|---|---|
| `h2` | `mono-anchor` values | `border-bottom: 1px solid {on-surface-muted}`, `padding-bottom: {spacing.md}`, `margin-top: {spacing.3xl}`, `margin-bottom: {spacing.2xl}` |
| `h3` | `heading-component` values | `margin-top: {spacing.2xl}`, `margin-bottom: {spacing.sm}` |
| `h4` | `heading-narrative` values | `margin-top: {spacing.xl}`, `margin-bottom: {spacing.xs}` |
| `p`, `li` | `body-primary` values (18px) | — |
| `blockquote` | `body-secondary` values + `font-style: italic` | `border-left: 2px solid {accent}`, `background: {surface-raised}`, `padding: {spacing.md} {spacing.lg}`, `margin-vertical: {spacing.lg}` |
| `table` | `body-caption` values (14px) | `border-collapse: collapse`, full-width |
| `th` | `body-caption` values + `font-weight: 600` | `color: {on-surface}` (ink), `border-bottom: 2px solid {accent}`, no fill, padding |
| `td` | `body-caption` values | `color: {on-surface}` (ink), `border-bottom: 1px solid {outline-variant}`, padding |
| `code` (inline) | `mono-code` metrics, text `{accent}` | `background: {accent}` 10% tint, `border: 1px solid {accent}` 22%, `padding: 2px 6px`, `border-radius: {radius.sm}` |
| `pre code` | `mono-code` metrics; Shiki tokens | `border: 1px solid {outline-variant}`, background + token colors from Shiki (`vitesse`), full block padding, 0px radius |
| `strong` | inherits surrounding token | `font-weight: 600` (no family or size change) |

### Spacing

- Strict 4px base. Used for padding, margins, gaps, and rhythm.
- Major section gaps: `{spacing.3xl}` (64px) desktop, `{spacing.2xl}` (48px) mobile.
- Section page-edge padding: `pt-xl / pb-xl` (32px each) mobile; `pt-3xl / pb-2xl` (64px / 48px) desktop. Top is asymmetric at desktop — calibrated for pill-nav clearance. Mobile uses less top padding because the slide-out trigger occupies less vertical real estate than the pill nav.
- Paragraph separation: `{spacing.md}` (16px). List item separation: `{spacing.sm}` (8px).
- Card internal padding: `{spacing.lg}` (24px).
- Whitespace beyond these minimums is intentional, not arbitrary.

### Shapes

Four surface categories, each with a fixed radius:

- **Structural containers** — 0px (sharp). Cards, code blocks, callouts. Architectural, no softening.
- **Interactive controls** — `{radius.sm}` (4px). Tags, block buttons, inline code. Minimum radius to read as a control.
- **Media surfaces** — `{radius.md}` (8px). Headshot, hero images, figures, diagrams, highlights.
- **Floating & link controls** — `{radius.pill}`. Pill nav, mobile trigger, theme toggle, scroll-to-top, logomark, and link pills (`LinkPill` — About socials + project-header links). The pill radius distinguishes lightweight inline links from square block buttons and static tags.

`{radius.lg}` (12px) is reserved and unused in v1 — previously assigned to the headshot, now normalized to `{radius.md}`.

### Elevation & Depth

Depth is communicated through tonal layering and subtle borders.
No shadows, glow effects, or glassmorphism (except the blur carve-out below).

#### Elevation Levels

Six levels, each defined by border and surface treatment only.

| Level | Treatment | Components |
|---|---|---|
| **0 — Flat** | No border, no fill | Page sections, hero regions, all About sections, Home CTA, Work index, footer |
| **1 — Border only** | `1px solid outline-variant` | `<Figure>` image frame, `<Diagram>` outer shell, prose `<hr>`, prose table cell borders, back-link `border-t`, pill nav + mobile nav vertical dividers |
| **2 — Border + blur** | `1px solid outline-variant` + `backdrop-filter: blur(12px)` + `surface: {surface-nav}` | Pill nav, mobile nav panel, mobile nav trigger, scroll-to-top button |
| **3 — Border + raised** | `1px solid outline-variant` + `surface: {surface-raised}` | Project cards (all variants), `<Highlight>` editorial pull-quote |
| **4 — Border + sunken** | `1px solid outline-variant` + `surface: {surface-sunken}` | `<Diagram>` inner content region, project card media well, project detail hero background |
| **5 — Accent left border + raised** | `2px solid {accent}` (left only) + `surface: {surface-raised}` | `<Callout>`, prose `<blockquote>` |

#### Backdrop-Blur Carve-out

- Only floating nav and utility UI may use `backdrop-filter`.
- All blur surfaces use `{surface-nav}`.
- These surfaces float above arbitrary content and must remain legible against any background.

```yaml
blur-ui:
  surface: surface-nav
  backdrop-filter: blur(12px)
  border: 1px solid outline-variant

applies-to:
  - pill nav container
  - mobile nav trigger button
  - mobile nav slide-out panel
  - scroll-to-top button
```

### Motion & Interaction

#### Motion Principles

Motion is calm, restrained, intentional. All transitions respect `prefers-reduced-motion`.

- **Permitted:** opacity transitions, small transforms (≤4px translate, ≤2% scale), color transitions (border, background, text), slide-in for the mobile menu, slow pulse on the Hire Me CTA icon (see Components → Actions & Interactive → Hire Me CTA Pulse).
- **Prohibited:** scroll-jacking, parallax, per-section entrance animations on scroll, continuous ambient motion, cursor-tracking effects, page-load reveal sequences.

#### Duration & Easing

- `{motion.duration-fast}` (150ms) — hover states, button presses.
- `{motion.duration-base}` (200ms) — nav transitions, fades.
- `{motion.duration-slow}` (300ms) — slide-out menu, larger reveals.
- `{motion.easing-standard}` — `cubic-bezier(0.2, 0, 0, 1)`.
- `{motion.easing-emphasis}` — `cubic-bezier(0.3, 0, 0, 1)`.

### Layout

#### Grid & Containers

- Three-tier responsive grid: 12 columns on desktop, 8 on tablet, 4 on mobile.
- Content is capped at `1200px` max-width with tier-specific gutters and side margins.

```yaml
layout:
  max-content-width: 1200px

  desktop:
    columns: 12
    gutter: 24px
    side-margin: 64px

  tablet:
    columns: 8
    gutter: 20px
    side-margin: 32px

  mobile:
    columns: 4
    gutter: 16px
    side-margin: 16px
```

#### Imagery

**Photography**
- Imagery supports understanding — never decorative, never dominant.
- Treatment: monochrome or muted, restrained saturation, structured framing, editorial composition.
- Avoid: stock imagery, oversaturated visuals, oversized hero images without supporting context, image-heavy sections with weak structure.

**Diagrams**
- Diagrams in project deep dives must be production-quality and visually consistent across projects.
- **Hand-authored SVG (shared theme)** — primary tool for flows, pipelines, state, and architecture diagrams; generated from the shared `assets-source/svg/_theme.py` build
- **matplotlib → SVG/PNG** — charts and metrics visualizations where source data exists; must be script-reproducible
- **tldraw → SVG** — fallback only for spatial or custom layouts the SVG theme cannot express
- See `asset-guide.md` for full tooling rules, directory structure, and export standards

### Iconography

- UI/system icons use Material Symbols Outlined — inline SVG React components, inheriting `currentColor`.
- Brand and platform icons use official monochrome SVG marks, kept distinct from Material style.
- Icons communicate function. Navigation pairs icon + text label. Buttons use leading icons.

| Context | Size |
|---|---|
| Standalone icon links (footer) | 20px |
| Buttons, nav items, utility controls | 16px |
| Card/list metadata icons | 18px |
| Inline action indicators | 12px |

---

## Components

### Navigation

#### Floating Pill Nav

Fixed top-center navigation bar that persists across all scroll positions; the primary wayfinding surface and identity anchor of the site.

- Centered relative to the content max-width, not the viewport — aligns with content on ultrawide displays.
- Active item signals current location; hover signals affordance — states are visually distinct by design.
- Logomark replaces the Home nav item — no separate Home link at any viewport size.
- Logomark active state (on `/`): 2px `{accent}` ring + `aria-current="page"` — a ring, not the `surface-selection` fill used by other active items, because the 32px icon fully occludes a background fill. The mobile-panel logomark mirrors this.
- Blur surface maintains legibility above any page background at any scroll position.

```yaml
pill-nav:
  position: fixed
  top: 24px
  horizontalPlacement: center
  height: 44px
  paddingHorizontal: 8px
  borderRadius: pill
  background: surface-nav
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  zIndex: 50

  layout: [ logo-mark ] ─ [ divider ] ─ [ About  Work ] ─ [ divider ] ─ [ theme-toggle ]

pill-nav-logo:
  size: 32px x 32px
  borderRadius: pill (full circle)
  asset: /public/cat_head_icon.svg via next/image (unoptimized)
  hover:
    background: accent-muted
    outline: 1px solid accent
    transition: background 150ms
  links-to: /

pill-nav-item:
  height: 32px
  paddingHorizontal: 16px
  borderRadius: pill
  gap-icon-label: 8px
  iconSize: 16px
  fontSize: 14px
  fontWeight: 500

pill-nav-item-active:
  background: surface-selection
  color: on-surface

pill-nav-item-hover:
  background: surface-sunken
  color: on-surface
  transition: background 150ms

pill-nav-divider:
  width: 1px
  height: 20px
  background: outline-variant
```

#### Theme Toggle

Explicit three-option theme selector in the pill nav; shows the active mode icon collapsed and expands to all three options on hover.

- Three direct options — Light, Dark, System — set immediately on click; no cycling.
- Collapsed by default (active icon only); hovering reveals all three buttons inline.
- In the mobile slide-out panel: always expanded, grouped in a `surface-sunken` pill container.

```yaml
theme-toggle:
  size: 40px x 40px
  borderRadius: pill
  iconSize: 16px
  
  hover:
    background: accent-muted
    transition: background 150ms
  
  tooltip:
    appears-after: 500ms hover
    text: "Light" | "Dark" | "System"
    fontSize: body-xs
    background: on-surface
    color: surface
    padding: 4px 8px
    borderRadius: 4px

icons:
  light: LightModeIcon
  dark: DarkModeIcon
  system: ComputerIcon
```

#### Mobile Slide-out Menu

Touch-primary navigation panel for mobile viewports; mirrors pill nav structure and active state logic in a full-height slide-over overlay.

- Fixed trigger button in the top-right corner; opens with a slide-in from the right over a dimmed overlay.
- Active items use `surface-selection` — same token as pill nav active state; hover uses `surface-sunken`.
- Blur surface matches the pill nav visually; no left border — separation is achieved by the overlay and blur alone.
- Traps focus while open; overlay tap and close button both dismiss the panel.

```yaml
mobile-menu-trigger:
  position: fixed top-right
  top: 16px
  right: 16px
  size: 44px x 44px
  borderRadius: pill
  background: surface-nav
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  iconSize: 18px

mobile-slide-out:
  position: fixed
  top: 0
  right: 0
  width: min(280px, 80vw)
  height: 100vh
  background: surface-nav
  backdropFilter: blur(12px)
  border-left: none
  padding: 24px
  zIndex: 60
  
  enter: slide-in from right, 300ms, easing-emphasis
  exit: slide-out to right, 300ms, easing-emphasis

mobile-slide-out-overlay:
  position: fixed
  inset: 0
  background: on-background at 30% alpha
  zIndex: 55
  fade-in: 200ms

mobile-slide-out-layout:
  header-row:
    - logomark: top-left, 32x32px round image, links to /
    - close-button: top-right, 36x36px pill, on-surface-muted
  nav-items: vertical stack, margin-top xl, gap xs
    height: 40px
    iconSize: 16px
    fontSize: 14px
    fontWeight: 500
    borderRadius: pill
    active: surface-selection / on-surface
    hover: surface-sunken / on-surface
  flex-spacer
  theme-toggle: bottom of panel (no label, no divider)
```

#### Scroll-to-top Button

Utility button fixed to the bottom-right corner; appears after scrolling one viewport height and provides a one-tap return to page top.

- Bottom-right position does not collide with the pill nav (top-center).
- On `lg+` screens, right edge tracks the content column boundary instead of the viewport edge.
- At `xl+`, size increases to 48×48px — icon only, no label.
- Fades in on scroll threshold; hover shifts to `outline` border and `on-surface` color.
- Hidden when the mobile slide-out menu is open.

```yaml
scroll-to-top:
  position: fixed
  bottom: 80px
  right: 16px  # lg+: max(1rem, calc(50vw - 36rem))
  size: 44px x 44px  # xl+: 48px x 48px
  borderRadius: pill
  background: surface-nav
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  icon: arrow_upward (Material Symbols Outlined)
  iconSize: 20px
  color: on-surface-muted
  zIndex: 40

  appears-after: 400px of scroll

  hover:
    borderColor: outline
    color: on-surface
```

### Actions & Interactive

#### Buttons

Committed action controls; used for CTAs, form submissions, and external link triggers.

- Two variants: `primary` (filled `accent`) and `secondary` (outlined, transparent background).
- `<Button href="...">` renders as `<a>` — same visual spec regardless of rendering mode; navigating is still a committed action.
- No shadows, no gradients — hover uses color and surface transitions only.
- Icon slot is leading-only — the component renders a single icon before the label.

```yaml
button-primary:
  height: 56px
  paddingHorizontal: 48px
  background: accent
  color: accent-on
  fontSize: 14px
  fontWeight: 500
  borderRadius: sm
  border: none
  
  hover:
    background: on-surface
    color: surface
    transition: all 150ms

button-secondary:
  height: 56px
  paddingHorizontal: 48px
  background: transparent
  color: on-surface
  border: 1px solid outline
  borderRadius: sm
  
  hover:
    background: accent-muted
    borderColor: accent
    color: accent
    transition: all 150ms

button-icon-leading:
  iconSize: 16px
  gap-icon-label: 8px
```

#### CopyableCode

Interactive code chip that copies its value to clipboard; elevation-level-4 surface treatment (sunken bg + outline-variant border) reads as a code chip that is also a control.

- Surface: `surface-sunken` background, `outline-variant` 1px border, `radius-sm` — a sunken control surface, intentionally distinct from inline `code`'s accent-tint treatment.
- Height `h-11` (44px), `px-md` (16px) — meets accessible touch target floor while reading as a compact chip.
- Trailing icon swaps `ContentCopyIcon` → `CheckIcon` for 1500ms on copy, then reverts; `aria-live="polite"` announces success.
- Hover and focus shift border and text to `accent`; focus uses `focus-ring` outline.
- Intended for project detail pages, blog/MDX contexts, and any surface where displaying a copyable string with code-chip styling is appropriate.

```yaml
copyable-code:
  height: 44px
  paddingHorizontal: 16px
  background: surface-sunken
  border: 1px solid outline-variant
  borderRadius: sm
  color: on-surface-muted
  fontSize: 16px       # mono-code
  fontFamily: JetBrains Mono
  fontWeight: 400

  hover:
    borderColor: accent
    color: accent
    transition: colors 150ms

  copied-state:
    icon: CheckIcon
    duration: 1500ms
```

#### CopyLink

Low-visual-weight copy interaction for editorial and contact contexts; deliberately avoids code-surface styling.

- Idle state: `body-caption` (14px Inter), `on-surface-muted`, underline always visible. No border, no background, no code-chip surface.
- Copied state: text changes to "email copied!", underline removed for 1500ms, then reverts to idle.
- Hover and focus-visible: underline retained; focus uses `focus-ring` outline.
- Used in editorial contact sections where the code-chip surface of `CopyableCode` would interrupt the reading rhythm.

```yaml
copy-link:
  height: auto
  fontSize: 14px       # body-caption
  fontWeight: 400
  color: on-surface-muted
  textDecoration: underline
  underlineOffset: 2px
  background: none
  border: none

  copied-state:
    textDecoration: none
    label: "email copied!"

  hover:
    textDecoration: underline

  focus-visible:
    textDecoration: underline
    outline: 2px solid focus-ring
    outlineOffset: 2px
```

#### LinkPill

Quiet utility link for profile, contact, and project links; lighter visual weight than `Button`, heavier than a static `Tag`. Shared by the About identity row (GitHub, LinkedIn, Email) and the project-header links row (Code, Report, Paper, Slides, Demo).

- Smaller than `Button` (36px vs 56px); a soft-filled pill rather than a bordered box.
- `surface-raised` fill, no border, pill radius — reads as a solid tappable token.
- Hover shifts fill to `accent-muted` and text to `accent` (no border change).
- `external` adds `target="_blank" rel="noopener noreferrer"` **and** a trailing 12px open-in-new icon; mailto links (Email) omit both.

```yaml
link-pill:
  height: 36px                       # h-9 — quieter than Button (56px)
  paddingHorizontal: spacing-md      # 16px
  gap-icon-label: spacing-sm         # 8px
  borderRadius: pill                 # round — distinguishes link chips from square buttons/tags
  background: surface-raised
  border: none
  color: on-surface
  type: interactive-label

  hover:
    background: accent-muted
    color: accent
    transition: colors 150ms

  active:
    opacity: 0.70

  external:                          # genuinely external (new-tab) links only
    adds: target="_blank" rel="noopener noreferrer"
    trailing-icon: OpenInNewIcon 12px — on-surface-muted → accent + translate-x 2px on hover
```

#### Tag

Compact chip label used to categorize and surface topics on cards and in content headers; single treatment with no variants.

- Static — no hover state, no interactive affordance.
- Used on project cards (tech/topic tags) and project headers.

```yaml
tag:
  type: tag-chip
  paddingX: spacing-sm
  paddingY: 2px
  borderRadius: sm
  background: surface-tag
  color: on-surface
  border: none
```

#### Hire Me CTA Pulse

Primary button variant on the homepage with an animated leading icon; used exclusively for the Hire Me CTA.

- Pulse is on the leading icon only — never the button shell.
- Animation stops on hover, settling the control as the user approaches the click target.
- Reduced-motion fallback: icon holds at default state, no animation.

```yaml
hire-me-cta:

icon-pulse:
  animation: pulse 2400ms ease-in-out infinite
  keyframes:
    0%:   opacity 1.0, scale 1.0
    50%:  opacity 0.7, scale 1.05
    100%: opacity 1.0, scale 1.0
  
  reduced-motion-fallback:
    animation: none
```

### Content Surfaces

#### Project Card

Entry point to a project; communicates type, media, and scope at a glance and links to the detail page.

- Two layout variants: `compact` (1:1 hero) and `featured` (4:3 hero). Every card renders a hero — a live cover when registered, otherwise the `heroImage`; there is no hero-less variant.
- Hero is inset with padding — not edge-to-edge — on a `surface-sunken` inner background.
- Hover: title underlines with `accent` decoration; border shifts from `outline-variant` to `outline`.
- Cover metadata overlays (`logos[]`, `contributors[]`) are presentational only in cards — no interactive affordances.

```yaml
project-card:
  background: surface-raised
  border: 1px solid outline-variant
  borderRadius: 0px
  display: flex
  flexDirection: column
  transition: border-color 150ms

  hover:
    borderColor: outline

  variants:
    compact:   heroAspect 1/1
    featured:  heroAspect 4/3

project-card-hero:
  wrapperPadding: spacing-md
  innerBackground: surface-sunken
  innerBorderRadius: md               # 8px — media surface, matches all image/media radius

project-card-body:
  paddingX: spacing-lg
  paddingBottom: spacing-lg
  gap: spacing-sm
  - title:    heading-component, on-surface, font-semibold
              hover: underline (decoration: accent, offset 2px)
  - summary:  body-caption, on-surface-muted, line-clamp: 3
              no flex-1 or reserved spacer — tags follow immediately after visible text
  - tag-row:  Tag (single canonical variant), gap xs, max 3 tags
  card-height: equal within grid row via CSS grid row-stretch; content top-anchored, whitespace falls to bottom
```

#### Highlight

Standalone elevated pull-quote for a single key insight; a physically separated panel, not an inline aside.

- Optional `<figcaption>` heading above the body; no border-bottom, the heading floats.

```yaml
highlight:
  element: <figure>
  background: surface-raised
  border: 1px solid outline-variant
  borderRadius: md
  paddingX: spacing-2xl
  paddingY: spacing-xl
  marginY: spacing-2xl

  heading (optional):
    element: <figcaption>
    type: insight-label
    color: on-surface-muted
    margin-bottom: spacing-lg

  body:
    type: body-md
    fontWeight: 500 (medium)
    color: on-surface
    lineHeight: relaxed
```

#### Callout

Editorial pull block integrated with prose flow; level-5 elevation with `accent` left border and `surface-raised` fill.

- Single treatment, no variants — thin left border keeps the block integrated with prose, not reading as a card.
- Flush with prose column (no border-radius).

```yaml
callout:
  background: surface-raised
  borderLeft: 2px solid accent
  borderRadius: none
  padding: spacing-lg
  marginY: spacing-xl

callout-title:
  type: callout-title
  fontWeight: 600
  color: accent
  marginBottom: spacing-sm
```

### Footer

Single-row page footer with copyright copy, a social icon, and branding text; no theme toggle.

- Copyright: separators dimmed to 50% opacity; name at full `on-surface`; repo link label underlined.
- No top border; top separation comes from content margin above.

```yaml
footer:
  marginTop: spacing-4xl
  paddingVertical: spacing-lg
  paddingHorizontal: same as page side-margins
  borderTop: none

  layout: flex-row, space-between, align-center — single row at all viewport sizes

copyright-format:
  type: support-meta (responsive exception — 11px/18px mobile, 15px/24px desktop; local Tailwind override in footer.tsx)
  color: on-surface-muted
  opacity-spans:                      # "© {year} /" and "/" separators
    opacity: 0.50
  name-span:                          # "<name>"
    color: on-surface
  repo-link:                          # "Designed & developed by me."
    underline: yes, underline-offset 2px
    hover: on-surface

social-icon:
  size: 20px
  color: on-surface
  hover:
    color: accent
    scale: 1.1
    transition: all 150ms
```

## Domain Components

Page- and domain-bound composition systems that orchestrate Components and Foundations into product surfaces; assume a specific page context, content schema, or editorial purpose.

### Home Page

#### Hero

Two-column desktop layout: content left, portrait right. Single-column on mobile (portrait hidden below `lg`, 1024px). Section carries `overflow-hidden` to contain the portrait bleed.

- Content column (`lg:flex-1`): flexes to fill the row up to the portrait so no gap opens between text and image; H1 (`display-primary`, 64px desktop) wraps ~2 lines. Eyebrow (`mono-anchor`) → H1 → tagline (`body-lead`) → CTA row.
- CTAs: Primary "See Projects" (`ArrowDownwardIcon`, `href="#featured"`) + Secondary "Get in Touch" (`MailIcon`, `mailto:`).
- Portrait column (`shrink-0`, `lg:w-[460px]`, `hidden lg:block`): a fixed width keeps the portrait a stable size across the desktop range (no big→small scaling that would reopen the H1-vs-portrait balance). Two theme-specific portraits — `hero-dark.png` / `hero-light.png` — via `next/image` at **natural aspect** (`width 800 × height 1000`, `h-auto w-full`, no crop — the full figure shows, dissolving into the page on all sides). Only the active theme's image shows (`globals.css` `[data-theme]` `display:none` swap); both render in the DOM for a flash-free, JS-free swap. **No `priority`.** On mobile the whole column is `hidden` → neither portrait is fetched (mobile 4G/LCP budget untouched); on desktop both fetch (a `display:none` `next/image` whose ancestors are visible still downloads — one extra optimized portrait, acceptable since the budget targets mobile). Each drops its baked background via `mix-blend-mode` so the fixed meteor layer shows through the dissolved edges: dark `#080808` → `screen`, light `#fcfcfc` → `multiply`. A per-theme `contrast()` on the `<img>` (dark `1.07` / light `1.03`) snaps the near-pure field to true `#000` / `#fff` so the bake fully vanishes (screen/multiply only drop PURE black/white) — without it a faint lifted rectangle shows where meteors are absent. No mask. A per-theme `saturate(0.85)` + `opacity 0.9` on the `<img>` calms the full-colour portrait against the near-monochrome scheme so the H1 leads.
- **Hero blend constraint (deliberate, scoped exception to "no effects"):** `mix-blend-mode` composites against the backdrop within the element's stacking context. It sits on the `<img>` — a `filter`/`mix-blend` on the image *itself* is fine (an element's own blend still reaches its parent backdrop). What must NOT happen is a stacking context or opaque background on any **ancestor**: no `z-index`/`transform`/`opacity`/`filter`/`mask`/`isolation` on the wrapper or up to `<body>`, or the blend keys against an opaque box instead of the `BackgroundLayer` meteors. The hero is above the meteors by tree order and below the nav (`z-50`) — no explicit z-index. (`html`'s opaque `--background` is fine; meteors paint over it.) Works with or without the meteor canvas: when meteors are suppressed (reduced-motion / low-core / project pages) the blend simply drops each bake toward the flat page background.
- Hero `<Section>` bottom padding: `{spacing.2xl}` (48px) mobile, `{spacing.lg}` (24px) desktop — tighter at desktop to pull the featured grid closer.

#### Featured Projects Grid

Three-column project grid anchored with `id="featured"` as the scroll target for the hero primary CTA.

- No section heading above the grid — content leads directly.
- "View all projects →" link sits below the grid, right-aligned.
- Grid: `grid-cols-1` mobile → `grid-cols-2` mid → `grid-cols-3` desktop, `gap-gutter`.

### Project Detail

#### Project Detail Layout

Single-column editorial layout optimized for long-form project reading; no sidebar at any breakpoint.

- Content sections render in fixed order: header → hero → overview → tech stack → MDX body → backlink.

```yaml
project-detail:
  maxWidth: 960px
  margin: 0 auto

  sections-in-order:
    - project-header      # tags, title, subtitle, links row
    - hero-media          # 16:9, surface-sunken bg (level 4), radius-md
    - overview            # editorial-dl layout (see below)
    - tech-stack          # editorial-dl layout under a prose-h2
    - mdx-deep-dive       # MDX body
    - backlink            # "← Back to Work"
```

#### Project Header

Page header for a project detail page; communicates project identity, tags, and links before the hero media.

- Vertical stack: tags row → display title → optional subtitle → optional links row.
- Links row renders only when the project has external links (`github`, `demo`, `paper`, `presentation`).
- Cover metadata groups (`logos[]`, `contributors[]`) may be interactive in project detail pages when a `url` is present on the entry.
- Each link: 16px leading type icon (brand or Material) → text label → 12px trailing `OpenInNewIcon` as external link indicator.

```yaml
project-header:
  layout: flex-col, gap lg

  tags-row:
    Tag chips (canonical treatment), gap xs

  title:
    type: display-title

  subtitle:                           # optional
    type: body-secondary
    color: on-surface-muted

  links-row:                          # optional, renders if links exist
    layout: flex-wrap, gap sm
    link: LinkPill (external) — soft-filled pill with trailing open-in-new icon (see Components → Actions & Interactive → LinkPill)
```

#### Hero Cover

16:9 hero area below the project header. Every project has a hero from one of two sources — the build fails if neither is present.

- Live cover (preferred default): a React SVG component registered in `coverComponents` keyed by slug. Takes precedence over the image path when present.
- Static fallback: `next/image` or `<video>` (muted, autoPlay, playsInline, poster required). Same `surface-sunken` 16:9 wrapper in both cases.
- `aria-hidden="true"` on both the wrapper `<div>` and the `<svg>` element — covers are decorative, not content.

**HeroMetaOverlay** — `absolute inset-0 pointer-events-none` layer over the hero; rendered on the project detail page only, never on cards.

- Bottom-left: `logos[]` — circles (`rounded-full`, `bg-white`, `border: 1px solid {outline-variant}`), `object-contain p-1`; 32×32px on mobile, 40×40px at `md+`.
- Bottom-right: `contributors[]` — circular avatars stacked with −6px overlap, same border treatment; 20×20px on mobile, 24×24px at `md+`.
- Overlay padding: `{spacing.sm}` (8px) on mobile, `{spacing.md}` (16px) at `md+`, on all sides. Interactive affordances (links) enabled on detail page only.

**Live SVG cover rules**

- viewBox `0 0 1200 675` (16:9). All colors via CSS custom properties — no hardcoded hex values.
- Structural diagram elements: `var(--on-surface)`, `var(--background)`, `var(--on-surface-muted)`.
- Engineering annotations: `var(--font-caveat)` text and `var(--accent)` stroke only. No other font or color in annotations.

#### Section Progress Nav

Desktop-only sticky TOC derived from H2 headings in the MDX body; highlights the active section as the user scrolls.

- Fixed to the right side of the viewport; hidden below `md` breakpoint.
- Appears after the hero scrolls out of view.

```yaml
section-progress-nav:
  position: fixed, right side of viewport
  visible: desktop only (hidden < md)
  appears: after hero scrolls out of view
  behavior: highlights active section as user scrolls
  zIndex: sticky-content (20)
```

#### Project Section Label

Architectural divider separating the overview block from the MDX body on project detail pages; emitted by the page template, not authored in MDX.

- Section content begins below the label, separated by `spacing-xl`.

```yaml
project-section-label:
  borderTop: 1px solid outline-variant
  paddingTop: spacing-lg
  label:
    type: insight-label
    color: on-surface-muted
    opacity: 0.40
```

#### Prose (MDX Deep-dive) Layout

Spacing and vertical rhythm for MDX long-form content; typographic treatment defined in Foundations → Typography → Prose Composition Rules.

- H2s function as section anchors: `1px solid on-surface-muted` bottom border creates a thin ruled separator.
- First H2 in `.prose-content` has `margin-top: 0` — separation is provided by the project section label above.
- H3s are clearly subordinate: no rule, reduced weight and margin.

```yaml
prose-h2-layout:
  marginTop: spacing-3xl
  borderBottom: 1px solid on-surface-muted
  paddingBottom: spacing-md
  marginBottom: spacing-2xl

prose-h3-layout:
  marginTop: spacing-2xl
  marginBottom: spacing-sm

prose-paragraph:
  marginBottom: spacing-lg

prose-list-item:
  marginBottom: spacing-xs
```

#### Editorial Two-column Layout

Definition list grid for structured label/value content; used for the project Overview and Tech Stack sections.

- Fixed 180px label column with a fluid content column on desktop; single column on mobile.
- Not a general prose pattern — purpose-built for project metadata entries.
- Tech Stack `dd` values render italic; Overview `dd` values render in body default (non-italic).

```yaml
editorial-dl:
  element: <dl>
  desktop (>= md):
    grid-template-columns: 180px 1fr
    column-gap: spacing-2xl
    row-gap: spacing-lg

  mobile (< md):
    single column
    row-gap: spacing-md

  dt:
    font: Inter 14px/600
    color: on-surface
    padding-top: 3px     # baseline alignment against first content line

  dd:
    font: body-md (16px/28px)
    color: on-surface
    margin: 0
```

### About Layouts

- Inter-section gap (top-level flex container): `{spacing.2xl}` (48px) mobile → `{spacing.3xl}` (64px) mid → `{spacing.5xl}` (128px) desktop (≥1280). Breakpoints align with layout transitions: portrait+intro and capabilities go row at `md`; Approach 3-col grid at `xl`.

#### About — Two-panel Intro

Flex row intro layout for the About page; headshot panel beside intro copy on tablet and desktop, stacked identity block on mobile.

- Headshot column is a fluid clamp — `clamp(200px, 24vw, 320px)` — giving progressive portrait presence from tablet through desktop without exceeding a restrained ceiling. Text column takes the remaining width.
- Image renders in black and white (`grayscale(100%)`), `object-fit: cover`. `object-position` should be tuned to the source image composition to preserve face/shoulder framing at both aspect ratios.
- On mobile (below `md`, 768px): stacked single column, headshot goes full container width at 1:1 square aspect — acts as a contextual identity block, not a collapsed sidebar asset.

```yaml
about-intro:
  row (>= md, 768px):
    display: flex
    flexDirection: row
    gap: "{spacing.2xl}"   # 48px
    alignItems: start

    headshot-panel:
      width: "clamp(200px, 24vw, 320px)"
      aspectRatio: 3/4
      borderRadius: "{radius.md}"
      filter: grayscale(100%)
      objectFit: cover

    content-panel:
      flex: 1

  stacked (< md):
    display: flex
    flexDirection: column
    gap: "{spacing.xl}"    # 32px

    headshot-panel:
      width: 100%
      aspectRatio: 1/1
      borderRadius: "{radius.md}"
      filter: grayscale(100%)
      objectFit: cover
```

#### About — Two-column Structured Layout

25/75 column layout for structured About sections (Approach, Capabilities); heading column on the left, content on the right.

- Heading column at `md+`; stacked single column below `md` (768px).
- Each section separated by a `1px outline-variant` border-top.

```yaml
about-two-col:
  row (>= md):
    display: grid
    grid-template-columns: 3fr 9fr
    gap: xl
    paddingVertical: 3xl
    borderTop: 1px solid outline-variant
    
    heading-col:
      gridColumn: 1
      typography: headline-md
      color: on-surface
    
    content-col:
      gridColumn: 2
      gap: lg
  
  stacked (< md):
    display: flex
    flexDirection: column
    gap: md
```

### 404 Not Found

Vertically centered error page that fits within the viewport without scrolling; footer pins to the bottom.

- Layout: `flex flex-1 items-center` wrapper within expanded `main` — content centers vertically in remaining space after nav.
- Copy: "404" eyebrow (`mono-anchor`) → H1 (`display-primary`, "This page doesn't exist — but my work does.") → `body-lead` paragraph. No `max-width` constraint on body copy.
- CTAs: Primary "See Projects" (`Button` primary, `/work`, `ArrowForwardIcon` 16px) + Secondary "Go Home" (`Button` secondary, `/`, site logomark `<Image src="/cat_head_icon.svg" width={18} height={18} className="rounded-full" unoptimized />` — matches nav pill logomark pattern).
- No illustrations or special visual effects. `<Container>` provides horizontal rhythm.

---

### Background Layer

Atmospheric, secondary visual layer providing environmental depth. Must remain visually subordinate to typography and content surfaces at all times — visibility biases toward peripheral and negative-space perception rather than direct focal attention.

- **Components:** `BackgroundLayer` (orchestrator), `AsciiField`, `MeteorShower` in `src/components/bg/`. Mounted as first child of `<Providers>` in root layout, before `<Nav>`.
- **Layering:** fixed position, z-index 0, `isolation: isolate`, `pointer-events: none` — sits behind all page content. `<main>` carries `position: relative` to establish its stacking context above.
- **ASCII field:** ambient structural texture, not decorative ornamentation. Static — no animation. Desktop/tablet (≥768px, all routes): masked to the outer gutters/corners — a centered band sized to the content column + buffer is cleared (short fade in) so glyphs never touch the reading column. Mobile (<768px): full-bleed but sparser + fainter on non-project pages, and omitted entirely on project detail pages (dense reading). Three opacity tiers (accent, ink, mute); light-theme values are higher to compensate for the cream background's lower contrast.
- **Meteor layer:** conditionally mounted. Excluded when `prefers-reduced-motion` is set (canvas never mounts), below the 768px mobile breakpoint (re-checked on resize), on small touch-only devices (no hover + viewport < 1024px), on devices with fewer than 4 logical CPU cores, and on all `/work/[slug]` routes (reading focus). The 768px floor keeps the meteor and the full-bleed mobile ASCII field from ever co-rendering.
- **Theme-aware palette + render mode:** meteor colors and blend respond to `data-theme` via `MutationObserver` (no flash). **Dark** = additive neon glow on the deep bg — true accent `#2aa566` + steel-blue `#598cd9`, blend `normal`, opacity 0.42. **Light** = the inverse: a `uDark` shader branch maps the hot core to the darkest saturated ink and the falloff to white, blended `multiply` (opacity 0.52) so trails read as dark vivid streaks — true accent `#006e37` + blue `#3059b3`. Concept: dark = bright neon streaks, light = dark vivid streaks.
- **Performance:** Three.js loaded via `next/dynamic` (`ssr: false`) to preserve initial bundle size and interaction responsiveness. DPR capped at 1.5 and frame delta clamped to maintain rendering comfort on HiDPI screens and across tab focus changes.

---

## Interaction Rules

### Hover

Three shared tiers plus two named exceptions. All transitions use `{motion.duration-fast}` (150ms) on color, background, and border properties — never opacity alone (opacity transitions read as appearing/disappearing, not interacting).

- **Tier 1 — accent-surface fill:** surface shifts to `accent-muted`. Used on nav items (pill + mobile), logomark, theme-toggle buttons, scroll-to-top, and `LinkPill` (which also shifts text to `accent`). Communicates affordance without color takeover.
- **Tier 2 — accent border + text:** border and text shift to `accent`. Used on outline controls: CopyableCode. Communicates interactive intent on contained surfaces.
- **Tier 3 — full accent shift:** `accent-muted` fill + `accent` border + `accent` text. Used on secondary Button only. Communicates committed-action readiness.
- **Exception — primary CTA ink-flip:** background shifts from `accent` to `on-surface`; text shifts from `accent-on` to `surface`. Reserved exclusively for primary `Button`. Communicates maximum commitment without opacity collapse.
- **Exception — project card directional:** border intensifies from `outline-variant` to `outline`; card title underlines with `accent` decoration. Communicates link affordance without recoloring the editorial surface.
- **Exception — footer social icons:** color shifts to `accent` + `scale(1.1)`. Small persistent scale permitted here only.
- When `prefers-reduced-motion` is active, all hover transforms reduce to color-only.

Component YAML blocks remain colocated as the local spec source. This section documents the shared interaction language they implement.

### Focus

- All keyboard-focused interactive elements show 2px solid `focus-ring` (= `accent`) at 2px offset.
- Use `:focus-visible` only — prevents focus ring on mouse click, preserves it for keyboard navigation.
- Focus ring is applied via `outline`, never `box-shadow`.
- Component YAML may restate focus behavior locally for clarity but must not deviate from this baseline.

### Disabled

No disabled states are defined in v1 — portfolio surfaces have no async controls or form inputs requiring disabled representation.

### Loading

No loading states are defined in v1 — all pages are statically generated; no async UI patterns exist.

### Responsive Behavior

#### Breakpoints

- Five breakpoints covering phone through ultrawide.
- `md` (768px) is the desktop/mobile dividing line — navigation switches between pill nav and slide-out menu at this boundary.
- Minimum supported width is 375px. All layouts must work cleanly at this width.

#### Touch Targets

- Minimum 44×44px tappable area for all interactive elements on mobile — enforced even when visual size is smaller.
- Visual size and tappable area are distinct: icon buttons use transparent padding to reach the 44px target without enlarging the visual footprint.
- Pill nav items, mobile menu trigger, and scroll-to-top button all meet the 44px minimum through padding, not by increasing icon or label size.
- Footer links and inline editorial links prioritize reading-flow spacing over individual target inflation — vertical rhythm provides sufficient separation at comfortable reading densities.
- Dense editorial UI (tag chips, back-links, metadata rows) relies on spatial separation rather than individual target inflation — do not introduce outsized tap areas that break layout rhythm.

#### Collapsing Strategy

- **Pill nav → mobile slide-out:** at `md` (768px), the pill nav gives way to a hamburger trigger and a full-height slide-out panel. The two navigation surfaces do not coexist.
- **Project-detail progress nav:** visible on desktop as a sticky sidebar element; hidden entirely on mobile — no collapsed or accordion variant. Reading progress is conveyed by scroll position alone.
- **Editorial two-column → single-column:** project detail and About layouts that use a two-column reading grid collapse to a single content column on mobile. Sidebar metadata stacks above or below the primary content column, never alongside it.
- **Metadata stacking:** tag chips, timestamps, and role/tech metadata wrap within their container — no horizontal scroll for standard metadata rows. Flex-wrap is the default; grid reflow is used only where alignment is load-bearing.
- **Wrap vs scroll vs stack:** wrapping is preferred for chips and metadata; vertical stacking is preferred for structured content groups; horizontal scroll is reserved for overflow contexts where truncation would lose information.
- **Long-form reading on mobile:** the reading column reaches full viewport width at mobile sizes. Line length is managed by the tier-specific gutter defined in `Foundations → Layout → Grid & Containers`, not by constraining `max-width`. Reading rhythm is preserved over compact density.

---

## Accessibility Rules

- **Focus rings:** 2px solid `focus-ring` (= accent), 2px offset, on all keyboard-focused interactive elements. Use `:focus-visible`, not `:focus`, to avoid showing on mouse-click.
- **Contrast:** all text/background combinations meet WCAG AA (4.5:1 for body, 3:1 for large text and UI components). Active pill nav fill (`accent` background + `accent-on` text) must pass AA in both themes.
- **Touch targets:** minimum 44x44px for all interactive elements on mobile.
- **Reduced motion:** all motion in Foundations → Motion & Interaction has a no-motion fallback. The Hire Me pulse becomes static. Page transitions become instant. Hover transforms become color-only.
- **Theme toggle accessible name:** `aria-label` reflects current state ("Switch to dark theme", "Switch to system theme", etc.) and updates on cycle.

---

## Cross-Cutting Rules

### Do

- Use tonal layering before elevation — surface fills and tonal borders communicate depth; elevation levels are a last resort.
- Keep structural containers sharp (`0px` radius). Cards, code blocks, and callouts are architectural, not decorative.
- Use the accent color sparingly and intentionally — one high-signal moment per surface.
- Let typography establish hierarchy before introducing stronger surfaces or borders.
- Keep motion subtle and secondary to reading flow — transitions serve state, not spectacle.
- Use mono typography for metadata and structure only: tags, card numbers, timestamps, status pills, code.
- Preserve long-form readability above dense visual composition — editorial flow wins.

### Don't

- Don't introduce `backdrop-filter` outside floating navigation surfaces (pill nav, mobile nav panel, scroll-to-top).
- Don't use shadows to imply depth — tonal layering is the only elevation mechanism in v1.
- Don't use oversized hero imagery without contextual framing — images serve editorial narrative, not decoration.
- Don't use mono typography in body copy, headlines, or prose.
- Don't create decorative motion or scroll-driven effects — no parallax, no per-section entrance sequences.
- Don't add new accent colors for emphasis — the single accent token is the system boundary.
- Don't treat cards as floating objects — they are flat editorial surfaces, not visually lifted panels.

---

## Technical Conventions

### Z-Index Scale

Components must use z-index tokens, not raw numbers.

| Token | Value | Usage |
|---|---|---|
| `base` | 0 | Default document flow |
| `raised` | 10 | Reserved — raised cards, hover lifts (unused in v1) |
| `sticky-content` | 20 | Sticky sidebars, sticky table headers, section progress nav |
| `reading-progress` | 30 | Reading progress bar |
| `scroll-to-top` | 40 | Scroll-to-top button |
| `pill-nav` | 50 | Floating pill nav |
| `mobile-menu-overlay` | 55 | Semi-opaque overlay behind mobile slide-out |
| `mobile-menu-panel` | 60 | Mobile slide-out panel |
| `tooltip` | 70 | Tooltip popups |
| `modal` | 80 | Reserved |
| `toast` | 90 | Reserved |

### Root Layout Shell

`body` is `flex min-h-dvh flex-col`; `main` is `flex flex-1 flex-col pt-[var(--spacing-3xl)]`. `min-h-dvh` avoids iOS Safari viewport height bugs. On content-heavy pages this is transparent — `main` expands naturally. On short pages (404), a `flex flex-1 items-center` child centers content while the footer pins to the viewport bottom. `<BackgroundLayer />` mounts as first child of `<Providers>`, before `<Nav>` — fixed-position, does not affect document flow.

### Code Block Highlighting

Fenced code blocks are syntax-highlighted at build time via Shiki (`@shikijs/rehype` in the MDX RSC pipeline) — no client-side highlighter ships. Dual theme `vitesse-light` / `vitesse-dark`: light token colors render inline; `[data-theme="dark"]` swaps to the dark theme's `--shiki-*` CSS vars. The theme supplies the panel background and per-token colors; `<CodeBlock>` adds only the `{outline-variant}` border, block padding, 0px radius, and `mono-code` metrics.

### Surface Context

Background depth switches by page type via `data-read` on `<html>`: long-read project pages (`/work/[slug]`) get `data-read="long"` (softer reading ground); every other page uses the showcase default (the extreme ground). A pre-paint inline script in `layout.tsx` sets it before first paint (no flash); `<SurfaceContext>` keeps it in sync across client navigation. `globals.css` holds the showcase values in `:root` / `[data-theme="dark"]` and the reading overrides in `[data-read="long"]`. Values: Foundations → Colors.

### Font Smoothing

Dark theme applies `-webkit-font-smoothing: antialiased` / `-moz-osx-font-smoothing: grayscale` to `body` (light untouched). Light text on the dark background renders visually heavier ("bloom"), flattening font-weight hierarchy; grayscale antialiasing thins it so weight contrast reads.

---

## Iteration Notes

### Open Decisions

None.

### Known Gaps

None.
