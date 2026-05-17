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

| Role | Light | Dark | Used for |
|---|---|---|---|
| `background` | `#f8f8f7` | `#131313` | Page background |
| `surface` | `#f8f8f7` | `#131313` | Default content surface (= background) |
| `surface-raised` | `#f2f2f1` | `#211f1e` | Cards, callouts, highlighted panels — slightly off-white in light, warm-dark in dark |
| `surface-sunken` | `#ffffff` | `#0e0e0e` | Code blocks, inline code, diagram content regions — pure white in light for maximum code legibility |
| `surface-nav` | `#ffffffd9` | `#1c1b1bd9` | Floating nav/utility blur UI only — pill nav, mobile trigger, mobile panel, scroll-to-top (~85% opacity) |
| `surface-selection` | `#e6f4ec` | `#1a2e1f` | Active nav state, future tabs/segmented controls — accent-tinted, no border |
| `surface-overlay` | `#ffffffd9` | `#1c1b1bd9` | Legacy — superseded by `surface-nav`. Do not use for new work. |
| `surface-overlay-panel` | `#ffffffb8` | `#1c1b1bba` | Legacy — superseded by `surface-nav`. Do not use for new work. |
| `surface-tag` | `#e2e3e4` | `#2a2a2a` | Tag chip background — lighter than bg/card in light, darker in dark |
| `on-background` | `#191c1d` | `#e5e2e1` | Primary text on background |
| `on-surface` | `#191c1d` | `#e5e2e1` | Primary text on surfaces |
| `on-surface-muted` | `#6b7280` | `#a0a0a0` | Secondary text, captions |
| `outline` | `#6c7a71` | `#86948a` | Default borders, dividers |
| `outline-variant` | `#bbcabf` | `#3c4a42` | Subtle borders, low-contrast dividers |
| `outline-hair` | `color-mix(in srgb, #191c1d 10%, transparent)` | `color-mix(in srgb, #e5e2e1 10%, transparent)` | Alpha hairline border, surface-relative |
| `accent` | `#006e37` | `#35c27d` | Active nav, primary CTA, links, focus rings, callout accents |
| `accent-on` | `#ffffff` | `#0a1f0e` | Text/icon on accent fills |
| `accent-muted` | `#e6f4ec` | `#1a2e1f` | Hover backgrounds, accent-tinted surfaces |
| `secondary` | `#565e74` | `#bdc7d9` | Reserved — categorical use only (e.g., callout variants) |
| `tertiary` | `#a43a3a` | `#e8a5a5` | Reserved — categorical use only (e.g., warning callouts) |
| `error` | `#c0392b` | `#ff6b5e` | 404, validation errors |
| `success` | `#006e37` | `#35c27d` | Build status, confirmations (= accent in v1) |
| `focus-ring` | `#006e37` | `#35c27d` | 2px outline on keyboard focus (= accent) |
| `selection` | `#006e3733` | `#35c27d33` | Text selection background (accent at 20% alpha) |

### Typography

Three families, each with a distinct semantic role. All self-hosted via `next/font` for rendering stability and LCP performance.

- **Manrope** — display and headline.
- **Inter** — body, UI, prose.
- **JetBrains Mono** — structural metadata texture, not expressive typography.

#### Semantic Token Table

- 16 tokens, role-based.
- Tokens with a fixed color have it baked in; tokens without a color entry are context-dependent (color applied by the component).
- Mobile override: `display-primary` and `display-accent` scale to 36px / 44px line-height at ≤768px.
- Responsive exception: `support-meta` defaults to 13px; `footer.tsx` applies a local override (11px/18px mobile, 15px/24px desktop). This is the only component-level responsive exception to a semantic token.

| Token | Family | Size | Weight | Line-height | Tracking | Color | Role |
|---|---|---|---|---|---|---|---|
| `display-primary` | Manrope | 56px → 36px mobile | 600 | 64px → 44px | -0.025em | — (Ink, applied by component) | Hero headline, page H1 |
| `display-accent` | Manrope | 56px → 36px mobile | 600 | 64px → 44px | -0.025em | `accent` | Section title with accent color (Work page, About page) |
| `heading-component` | Manrope | 22px | 600 | 30px | -0.01em | — (Ink, applied by component) | Card titles, section headings in UI |
| `heading-narrative` | Manrope | 20px | 600 | 28px | -0.01em | `accent` | H4 in prose, editorial subheads that need warmth |
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
| `h2` | `mono-anchor` values | `border-bottom: 1px solid {outline-variant}`, `padding-bottom: {spacing.md}`, `margin-top: {spacing.3xl}`, `margin-bottom: {spacing.lg}` |
| `h3` | `heading-component` values | `margin-top: {spacing.2xl}`, `margin-bottom: {spacing.sm}` |
| `h4` | `heading-narrative` values | `margin-top: {spacing.xl}`, `margin-bottom: {spacing.xs}` |
| `p`, `li` | `body-primary` values (18px) | — |
| `blockquote` | `body-secondary` values + `font-style: italic` | `border-left: 2px solid {accent}`, `background: {surface-raised}`, `padding: {spacing.md} {spacing.lg}`, `margin-vertical: {spacing.lg}` |
| `table` | `body-caption` values (14px) | `border-collapse: collapse`, full-width |
| `th` | `body-caption` values + `font-weight: 600` | `border-bottom: 1px solid {outline-variant}`, padding |
| `td` | `body-caption` values | `border-bottom: 1px solid {outline-hair}`, padding |
| `code` (inline) | `mono-code` values | `background: {surface-sunken}`, `padding: 2px 6px`, `border-radius: {radius.sm}` |
| `pre code` | `mono-code` values | `border: 1px solid {outline-variant}`, `background: {surface-sunken}`, full block padding, 0px radius |
| `strong` | inherits surrounding token | `font-weight: 600` (no family or size change) |

### Spacing

- Strict 4px base. Used for padding, margins, gaps, and rhythm.
- Major section gaps: `{spacing.3xl}` (64px) desktop, `{spacing.2xl}` (48px) mobile.
- Paragraph separation: `{spacing.md}` (16px). List item separation: `{spacing.sm}` (8px).
- Card internal padding: `{spacing.lg}` (24px).
- Whitespace beyond these minimums is intentional, not arbitrary.

### Shapes

Four surface categories, each with a fixed radius:

- **Structural containers** — 0px (sharp). Cards, code blocks, callouts. Architectural, no softening.
- **Interactive controls** — `{radius.sm}` (4px). Tags, chips, buttons, inline code. Minimum radius to read as a control.
- **Media surfaces** — `{radius.md}` (8px). Headshot, hero images, figures, diagrams, highlights.
- **Floating controls** — `{radius.pill}`. Pill nav, mobile trigger, theme toggle, scroll-to-top, logomark.

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
| **4 — Border + sunken** | `1px solid outline-variant` + `surface: {surface-sunken}` | `<CodeBlock>`, prose inline `<code>`, `<Diagram>` inner content region, prose table `<th>` cells, project card media well, project detail hero background |
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
- Diagrams in project deep dives must be production-quality and visually consistent.
- Tooling is decided once and applied uniformly across all projects.

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
  hover: opacity 0.8, transition 150ms
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
  light: sun glyph
  dark: moon glyph  
  system: half-filled circle (◐) or monitor glyph
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
- Fades in on scroll threshold; hover shifts to `accent` border and color.
- Hidden when the mobile slide-out menu is open.

```yaml
scroll-to-top:
  position: fixed
  bottom: 24px
  right: 24px
  size: 44px x 44px
  borderRadius: pill
  background: surface-nav
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  iconSize: 16px
  color: on-surface
  zIndex: 40
  
  appears-after: 1 viewport-height of scroll
  enter: opacity 0 → 1, 200ms
  
  hover:
    background: accent-muted
    borderColor: accent
    color: accent
```

### Actions & Interactive

#### Buttons

Committed action controls; used for CTAs, form submissions, and external link triggers.

- Two variants: `primary` (filled `accent`) and `secondary` (outlined, transparent background).
- `<Button href="...">` renders as `<a>` — same visual spec regardless of rendering mode; navigating is still a committed action.
- No shadows, no gradients — hover handled by opacity or color transition alone.
- Icon slot is leading-only — the component renders a single icon before the label.

```yaml
button-primary:
  height: 44px
  paddingHorizontal: 24px
  background: accent
  color: accent-on
  fontSize: 14px
  fontWeight: 500
  borderRadius: sm
  border: none
  
  hover:
    opacity: 0.9
    transition: opacity 150ms

button-secondary:
  height: 44px
  paddingHorizontal: 24px
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

#### SocialLink

Quiet utility link for profile and contact links; lighter visual weight than `Button`, heavier than a static `Tag`.

- Smaller than `Button` (36px vs 44px) with a transparent bordered surface rather than filled.
- Used on the About page identity row for GitHub, LinkedIn, and Email.
- Hover intensifies border and text to `outline` / `on-surface` — no fill change.

```yaml
social-link:
  height: 36px                       # h-9 — quieter than Button (44px)
  paddingHorizontal: spacing-md      # 16px
  gap-icon-label: spacing-sm         # 8px
  borderRadius: sm                   # 4px — matches interactive controls
  background: transparent
  border: 1px solid outline-variant
  color: on-surface-muted
  type: interactive-label

  hover:
    borderColor: outline
    color: on-surface
    transition: all 150ms

  external: adds target="_blank" rel="noopener noreferrer" when external prop is true
```

#### Tag

Compact chip label used to categorize and surface topics on cards and in content headers; single treatment with no variants.

- Static — no hover state, no interactive affordance.
- Used on project cards (tech/topic tags) and project headers.

```yaml
tag:
  type: tag-chip, normal-case, tracking-normal
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

- Three layout variants: `compact` (1:1 hero), `featured` (4:3 hero), `text` (no hero, category icon). The `text` variant is an intentional editorial choice, not a fallback for a missing hero image.
- Hero image is inset with padding — not edge-to-edge — on a `surface-sunken` inner background.
- Hover: title underlines with `accent` decoration; border shifts from `outline-variant` to `outline`.

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
    text:      no hero, categoryIcon visible

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
  - summary:  body-caption, on-surface-muted
  - tag-row:  Tag (single canonical variant), gap xs, max 3 tags

project-card-text-variant:
  # No hero. Category icon mapped from projectType (academic|freelance|personal):
  #   academic → ScienceIcon, freelance → WorkIcon, personal → CodeIcon
  iconSize: 18px
  iconColor: on-surface-muted at opacity 60
  layout: icon → title (headline-sm) → summary → tags
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
    type: mono-label
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
- Links row renders only when the project has external links.
- Each link: 16px leading type icon (brand or Material) → text label → 12px trailing `OpenInNewIcon` as external link indicator.

```yaml
project-header:
  layout: flex-col, gap lg

  tags-row:
    Tag chips (canonical treatment), gap xs

  title:
    type: display-primary

  subtitle:                           # optional
    type: body-secondary
    color: on-surface-muted

  links-row:                          # optional, renders if links exist
    layout: flex-wrap, gap lg
    link:
      type: interactive-label, font-semibold
      padding: spacing-xs spacing-sm
      borderRadius: sm
      hover:
        background: accent-muted
        color: accent
        external-icon: translate-x 2px
      active: opacity 0.70
```

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
    type: mono-label
    color: on-surface-muted
    opacity: 0.40
```

#### Prose (MDX Deep-dive) Layout

Spacing and vertical rhythm for MDX long-form content; typographic treatment defined in Foundations → Typography → Prose Composition Rules.

- H2s function as section anchors: `1px currentColor` bottom border (inheriting `on-surface-muted`) creates a thin ruled separator.
- First H2 in `.prose-content` has `margin-top: 0` — separation is provided by the project section label above.
- H3s are clearly subordinate: no rule, reduced weight and margin.

```yaml
prose-h2-layout:
  marginTop: spacing-3xl
  borderBottom: 1px solid currentColor
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

#### About — Two-panel Intro

Two-column intro layout for the About page; headshot panel beside intro copy and philosophy text on desktop.

- Headshot stretches to fill both the intro and adjacent philosophy section via CSS grid row span — image uses `object-fit: cover` at `height: 100%`.
- Image renders in black and white (`grayscale(100%)`).
- On mobile: stacked single column, headshot at 4:5 aspect ratio.

```yaml
about-intro:
  desktop (>= lg):
    display: grid
    grid-template-columns: 5fr 7fr
    gap: xl
    align-items: stretch
    
    headshot-panel:
      gridColumn: 1
      height: 100%
      borderRadius: md
      filter: grayscale(100%)
      objectFit: cover
    
    content-panel:
      gridColumn: 2
      # contains intro copy + philosophy section in a vertical stack
  
  mobile (< lg):
    display: flex
    flexDirection: column
    gap: lg
    headshot-panel:
      aspectRatio: 4/5
      width: 100%
```

#### About — Two-column Structured Layout

25/75 column layout for structured About sections (Approach, Capabilities, Experience, Education); heading column on the left, content on the right.

- Heading column is sticky within its grid row at `lg+`; stacked single column below.
- Each section separated by a `1px outline-variant` border-top.

```yaml
about-two-col:
  desktop (>= lg):
    display: grid
    grid-template-columns: 3fr 9fr
    gap: xl
    paddingVertical: 3xl
    borderTop: 1px solid outline-variant
    
    heading-col:
      gridColumn: 1
      position: sticky
      top: 96px
      alignSelf: flex-start
      typography: headline-md
      color: on-surface
    
    content-col:
      gridColumn: 2
      gap: lg
  
  mobile (< lg):
    display: flex
    flexDirection: column
    gap: md
```

---

## Interaction Rules

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

---

## Iteration Notes

### Open Decisions

1. **Diagram tooling** — deferred from PRODUCT.md, decide before any project page goes to production. Affects the visual identity of project deep-dive content.
2. **`accent-hover` token** — v1 uses `opacity: 0.9` on hover for primary buttons. If this looks muddy in practice, define a dedicated darker/lighter accent variant per theme.

### Known Gaps

- `Foundations → Layout → Imagery → Diagrams` — diagram tooling and visual style standardization not yet finalized. See Open Decisions → Diagram tooling.
