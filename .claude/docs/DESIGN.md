# DESIGN.md

> Visual specification for the portfolio defined in `PRODUCT.md`.
> PRODUCT.md owns *what* and *why*. This document owns *how it looks*.
> When the two disagree on a visual detail, this document wins.

---

## 1. Design Philosophy

The portfolio combines the structural clarity of a technical journal with the precision of modern engineering interfaces. The visual language is editorial, systems-oriented, and restrained — designed to communicate technical credibility without relying on visual effects or trend-driven aesthetics.

**The interface should feel:** calm, intentional, highly readable, technically sharp, professionally understated.

**It should resemble:** a curated engineering case-study archive, a modern technical publication, a refined engineering workspace.

**It should not resemble:** a startup marketing site, a hacker-terminal simulation, an experimental art portfolio, an Awwwards showcase.

### Core principles

- Typography is the primary driver of hierarchy.
- Whitespace is structural, not empty.
- Motion is subtle and secondary to content.
- Color is functional, not decorative.
- Containers are lightweight and architectural — not decorative objects.
- Layouts support recruiter scanning, technical storytelling, long-form reading, and scalable content.

### Things to avoid (consolidated)

Excessive gradients, heavy glow effects, glassmorphism (except the one carve-out in §6), animation-heavy interactions, scroll-jacking, parallax, dramatic reveal animations, decorative motion, dense unstructured layouts, image-heavy layouts without context, terminal/cyberpunk cosplay aesthetics (`SYSTEM_STATUS:`, `.exe`, `_underscore_NAMING` in copy), startup-SaaS visual tropes, playful UI systems.

---

## 2. Breakpoints

Restated from PRODUCT.md for self-containment.

```yaml
breakpoints:
  sm: 640px      # large phone / small tablet portrait
  md: 768px      # tablet portrait
  lg: 1024px     # tablet landscape / small desktop
  xl: 1280px     # desktop
  2xl: 1536px    # large desktop / ultrawide cap
```

`md` is the desktop/mobile dividing line for navigation behavior (pill ↔ slide-out). All layouts must work cleanly at 375px width.

---

## 3. Typography System

### Font families

Three families, all self-hosted via `next/font` for performance (no Google Fonts CDN request, eliminates FOUT, required to hit PRODUCT.md's LCP < 2.0s budget).

```ts
// app/fonts.ts
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google'

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
```

- **Manrope** — display and headline.
- **Inter** — body, UI, prose.
- **JetBrains Mono** — metadata, tags, code, lightweight technical accents only. Never in long-form prose.

### Type scale

```yaml
# Display (hero-only, used sparingly)
display-xl:
  fontFamily: Manrope
  fontSize: 64px
  fontWeight: 700
  lineHeight: 72px
  letterSpacing: -0.025em

display-lg:
  fontFamily: Manrope
  fontSize: 48px
  fontWeight: 700
  lineHeight: 56px
  letterSpacing: -0.02em

display-md:
  fontFamily: Manrope
  fontSize: 40px
  fontWeight: 700
  lineHeight: 48px
  letterSpacing: -0.02em

# Headlines (section/page headings)
headline-lg:
  fontFamily: Manrope
  fontSize: 32px
  fontWeight: 600
  lineHeight: 40px
  letterSpacing: -0.01em

headline-md:
  fontFamily: Manrope
  fontSize: 24px
  fontWeight: 600
  lineHeight: 32px
  letterSpacing: -0.01em

headline-sm:
  fontFamily: Manrope
  fontSize: 20px
  fontWeight: 600
  lineHeight: 28px

# Mobile overrides for display/headline
display-lg-mobile:
  fontSize: 36px
  lineHeight: 44px

headline-lg-mobile:
  fontSize: 28px
  lineHeight: 36px

# Body
body-lg:
  fontFamily: Inter
  fontSize: 18px
  fontWeight: 400
  lineHeight: 28px

body-lg-mobile:
  fontSize: 17px
  lineHeight: 26px

body-md:
  fontFamily: Inter
  fontSize: 16px
  fontWeight: 400
  lineHeight: 24px

body-sm:
  fontFamily: Inter
  fontSize: 14px
  fontWeight: 400
  lineHeight: 20px

body-xs:
  fontFamily: Inter
  fontSize: 12px
  fontWeight: 400
  lineHeight: 16px

# Inline UI
link:
  inherits: body-md
  fontWeight: 500
  color: accent
  textDecoration: none
  hoverDecoration: underline
  hoverDecorationOffset: 2px

# Prose (MDX deep-dive body)
prose-h2:
  fontFamily: Manrope
  fontSize: 28px
  fontWeight: 600
  lineHeight: 36px
  letterSpacing: -0.02em

prose-h3:
  fontFamily: Manrope
  fontSize: 19px
  fontWeight: 500
  lineHeight: 28px
  letterSpacing: -0.01em

prose-body:
  fontFamily: Inter
  fontSize: 16px
  fontWeight: 400
  lineHeight: 26px

# Mono (metadata, code)
mono-label:
  fontFamily: JetBrains Mono
  fontSize: 13px
  fontWeight: 500
  lineHeight: 16px
  letterSpacing: 0.05em
  textTransform: uppercase   # for status pills, section eyebrows

mono-data:
  fontFamily: JetBrains Mono
  fontSize: 14px
  fontWeight: 400
  lineHeight: 20px

# Code
code-inline:
  fontFamily: JetBrains Mono
  fontSize: 0.875em      # relative to surrounding text
  background: surface-sunken
  padding: 2px 6px
  borderRadius: 4px

code-block:
  fontFamily: JetBrains Mono
  fontSize: 14px
  lineHeight: 22px
  padding: 16px 20px
  background: surface-sunken
  borderRadius: 8px
  border: 1px solid outline-variant

# Prose
blockquote:
  inherits: body-lg
  fontStyle: italic
  borderLeft: 3px solid accent
  paddingLeft: 16px
  marginVertical: 24px

list-item:
  inherits: body-md
  marginBottom: 8px
```

### Mono usage rules

JetBrains Mono is used for **structural metadata only** — visual texture, not prose. Permitted:
- Tags / chips on cards and project sidebars
- Card numbering (`001`, `002`) in corners
- Timestamps and version labels
- Status pills and section eyebrows
- Inline code and code blocks

Not permitted:
- Body copy in mono
- Headlines in mono
- Decorative `_underscore_NAMING` or `.EXE` styling
- `SYSTEM_STATUS:` prefixes in prose

---

## 4. Color System

### Semantic roles

Tokens are role-based. The same role has different hex values per theme to maintain contrast and visual weight.

| Role | Light | Dark | Used for |
|---|---|---|---|
| `background` | `#f8f9fa` | `#131313` | Page background |
| `surface` | `#f8f9fa` | `#131313` | Default content surface (= background) |
| `surface-raised` | `#ffffff` | `#1c1b1b` | Cards, sidebars, elevated panels |
| `surface-sunken` | `#f3f4f5` | `#0e0e0e` | Code blocks, inset wells |
| `surface-overlay` | `#ffffffd9` | `#1c1b1bd9` | Pill nav backdrop, slide-out menu (semi-transparent for backdrop-blur) |
| `on-background` | `#191c1d` | `#e5e2e1` | Primary text on background |
| `on-surface` | `#191c1d` | `#e5e2e1` | Primary text on surfaces |
| `on-surface-muted` | `#3c4a42` | `#bbcabf` | Secondary text, captions |
| `outline` | `#6c7a71` | `#86948a` | Default borders, dividers |
| `outline-variant` | `#bbcabf` | `#3c4a42` | Subtle borders, low-contrast dividers |
| `accent` | `#006c49` | `#4edea3` | Active nav, primary CTA, links, focus rings, callout accents |
| `accent-on` | `#ffffff` | `#0a1f15` | Text/icon on accent fills |
| `accent-muted` | `#e6f4ed` | `#1f3329` | Hover backgrounds, accent-tinted surfaces |
| `secondary` | `#565e74` | `#bdc7d9` | Reserved — categorical use only (e.g., callout variants) |
| `tertiary` | `#a43a3a` | `#e8a5a5` | Reserved — categorical use only (e.g., warning callouts) |
| `error` | `#c0392b` | `#ff6b5e` | 404, validation errors |
| `success` | `#006c49` | `#4edea3` | Build status, confirmations (= accent in v1) |
| `focus-ring` | `#006c49` | `#4edea3` | 2px outline on keyboard focus (= accent) |
| `selection` | `#006c4933` | `#4edea333` | Text selection background (accent at 20% alpha) |

### Notes on color usage

- **One accent.** The portfolio is identity-led by a single green. `accent-strong` is intentionally not defined — if you need more emphasis, use weight or size, not a louder color.
- **`secondary` and `tertiary` are reserved tokens.** Available for future categorical needs (callout variants, status differentiation), not used in v1 layouts.
- **Pure white is rare in light theme.** Reserved for `surface-raised` (cards, elevated panels). Body background is the warm off-white `#f8f9fa`.
- **Dark theme is deep but not black.** `#131313` is the deepest surface; `surface-sunken` goes slightly darker for code blocks only.
- **Accent and success share a value in v1.** Acceptable because there is no scenario in v1 where both are visible together (success states are post-launch).

---

## 5. Spacing System

Strict 4px base. Used for padding, margins, gaps, and rhythm.

```yaml
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
```

### Density rule

Minimum spacing between major page sections: **`3xl` (64px)** desktop, **`2xl` (48px)** mobile. Within sections, paragraphs separated by `md` (16px); list items by `sm` (8px). Cards internal padding: `lg` (24px).

This is the only density rule. Whitespace beyond these minimums is intentional, not arbitrary.

---

## 6. Layout & Grid

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

Long-form pages constrain reading width to `~680px` (roughly 65–70 characters per line) regardless of grid.

---

## 7. Shape Language

```yaml
radius:
  sm: 4px      # tags, chips, buttons, project cards, callouts (default for most surfaces)
  md: 8px      # code blocks
  lg: 12px     # headshot, large containers
  pill: 9999px # pill nav, status pills, theme toggle, scroll-to-top
```

Use of fully sharp corners (0px) and very large rounds (>12px) is reserved for specific intentional cases — flag them rather than defaulting.

---

## 8. Elevation & Depth

Depth is communicated through tonal layering and subtle borders. **No shadows in v1.** No glow effects. No glassmorphism — except the one carve-out below.

```yaml
elevation:
  flat: none                                  # default; surfaces sit at their tonal layer
  raised: border 1px solid outline-variant    # cards, sidebars
  inset:  border 1px solid outline-variant    # code blocks, wells (uses surface-sunken)
```

### Backdrop-blur carve-out

The **floating pill nav** and **mobile slide-out menu** are the only surfaces permitted to use backdrop-blur. Spec:

```yaml
pill-nav-backdrop:
  background: surface-overlay        # semi-transparent at ~85% opacity
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  shadow: none

mobile-slide-out-backdrop:
  background: surface-overlay
  backdropFilter: blur(16px)
  border-left: 1px solid outline-variant
```

Nothing else uses `backdrop-filter` in v1. The reason these get the exception: they float above arbitrary content (hero images, project videos) and need to remain legible.

---

## 9. Motion

Motion is calm, restrained, intentional. All transitions respect `prefers-reduced-motion`.

```yaml
motion:
  duration-fast: 150ms       # hover states, button presses
  duration-base: 200ms       # nav transitions, fades
  duration-slow: 300ms       # slide-out menu, larger reveals
  easing-standard: cubic-bezier(0.2, 0, 0, 1)
  easing-emphasis: cubic-bezier(0.3, 0, 0, 1)
```

### Permitted motion

- Opacity transitions (fade in/out).
- Small transforms (≤4px translate, ≤2% scale).
- Color transitions (border, background, text).
- Slide-in for the mobile menu.
- Slow pulse on the Hire Me CTA icon (see §11).

### Prohibited motion

- Scroll-jacking, parallax.
- Per-section entrance animations on scroll.
- Continuous ambient motion.
- Cursor-tracking effects.
- Page-load reveal sequences.

---

## 10. Imagery

Imagery supports understanding, never dominates. Project hero images and the About headshot are intentional, not decorative.

**Treatment:** monochrome or muted, restrained saturation, structured framing, editorial composition. The About headshot is black & white per PRODUCT.md §7.4.

**Avoid:** stock imagery, oversaturated visuals, oversized hero images without supporting context, image-heavy sections with weak structure.

**Diagrams** in project deep dives must be production-quality and visually consistent. Tooling (Excalidraw / Mermaid / tldraw / hand-drawn) is decided once and used uniformly across all projects — see PRODUCT.md open question.

---

## 11. Component Specifications

### Floating pill nav

PRODUCT.md §5 mandates this pattern. Visual spec:

```yaml
pill-nav:
  position: fixed
  top: 24px
  horizontalPlacement: center      # centered relative to max-content-width container, NOT viewport
  height: 44px
  paddingHorizontal: 8px
  borderRadius: pill
  background: surface-overlay
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  zIndex: 50

  layout: [ logo-mark ] ─ [ divider ] ─ [ About  Work ] ─ [ divider ] ─ [ theme-toggle ]

pill-nav-logo:
  size: 32px x 32px
  borderRadius: pill (full circle)
  background: accent
  color: accent-on
  content: "AG" in mono-label at 10px   # placeholder until real logo asset in /public/
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
  background: surface-sunken
  color: on-surface
  # Intentionally not using accent — accent is reserved within the nav for the
  # logo mark, keeping the active highlight tonal and quiet.

pill-nav-item-hover:
  background: surface-sunken
  color: on-surface
  transition: background 150ms

pill-nav-divider:
  width: 1px
  height: 20px
  background: outline-variant
  # one divider after logo, one before theme toggle
```

**Top-center caveat:** centered relative to the 1200px content max-width, not the viewport. On ultrawide monitors the pill aligns with content rather than floating in empty space.

**Logo mark:** currently an `AG` round accent circle (placeholder). When a real logo asset is available, drop it in `/public/logo.svg` and update the `LogoMark` component in `pill-nav.tsx`. The logo always links to `/` and replaces the "Home" nav item — no separate Home link on desktop.

### Theme toggle (in pill nav)

```yaml
theme-toggle:
  size: 40px x 40px
  borderRadius: pill
  iconSize: 18px
  # no fill background; just the icon
  
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

Click cycles Light → Dark → System → Light. State persisted to localStorage (System clears the override).

### Mobile slide-out menu

```yaml
mobile-menu-trigger:
  position: fixed top-right
  top: 16px
  right: 16px
  size: 44px x 44px
  borderRadius: pill
  background: surface-overlay
  backdropFilter: blur(12px)
  border: 1px solid outline-variant
  iconSize: 20px

mobile-slide-out:
  position: fixed
  top: 0
  right: 0
  width: min(320px, 85vw)
  height: 100vh
  background: surface-overlay
  backdropFilter: blur(16px)
  border-left: 1px solid outline-variant
  padding: 24px
  zIndex: 60
  
  enter: slide-in from right, 300ms, easing-emphasis
  exit: slide-out to right, 250ms, easing-standard

mobile-slide-out-overlay:
  position: fixed
  inset: 0
  background: on-background at 40% alpha
  zIndex: 55
  fade-in: 200ms

mobile-slide-out-layout:
  - close-icon: top-right of menu
  - logo: top-left of menu
  - divider
  - nav-items: vertical stack, each item full-width
      height: 48px
      iconSize: 20px
      fontSize: 16px
      borderRadius: md
      active: same accent fill as desktop pill
  - flex-spacer
  - divider
  - theme-toggle: at bottom, with label "Theme: [current]" and cycling click
```

### Hire Me CTA pulse

```yaml
hire-me-cta:
  # Standard primary button styling (see §11 Buttons)
  # Plus pulse on the leading icon only:

icon-pulse:
  animation: pulse 2400ms ease-in-out infinite
  keyframes:
    0%:   opacity 1.0, scale 1.0
    50%:  opacity 0.7, scale 1.05
    100%: opacity 1.0, scale 1.0
  
  reduced-motion-fallback:
    animation: none
    # icon stays at default state, no pulse
```

The pulse is on the icon only, never the entire button. Stops if the button is hovered (gives a settled feeling on intent-to-click).

### Project card

```yaml
project-card:
  background: surface-raised
  border: 1px solid outline-variant
  borderRadius: sm                    # 4px
  display: flex
  flexDirection: column
  transition: border-color 150ms

  hover:
    borderColor: outline

  variants:
    compact:   heroAspect 1/1         # default — Work grid
    featured:  heroAspect 4/3         # homepage featured
    text:      no hero, categoryIcon visible
      # Intentional editorial variant for text-led projects.
      # NOT a fallback when heroImage is missing — heroImage is required by schema.

project-card-hero:
  # Hero is inset with breathing room — not edge-to-edge
  wrapperPadding: spacing-md
  innerBackground: surface-sunken
  innerBorderRadius: sm

project-card-body:
  paddingX: spacing-lg
  paddingBottom: spacing-lg
  gap: spacing-sm
  - title:    body-lg (compact) or headline-sm (featured), on-surface, font-semibold
              hover: underline (decoration: accent, offset 2px)
  - summary:  body-sm, on-surface-muted, line-clamp-2
  - tag-row:  Tag variant="filled", gap xs, max 3 tags

project-card-text-variant:
  # No hero. Category icon mapped from projectType (academic|freelance|personal):
  #   academic → FlaskConical, freelance → Briefcase, personal → Code2 (lucide-react)
  iconSize: 18px
  iconColor: on-surface-muted at opacity 60
  layout: icon → title (headline-sm) → summary → tags
```

**Click affordances on card-hover:**
- Title underline (decoration uses `accent`).
- Border color shifts from `outline-variant` → `outline`.

No card number, no chevron, no "View case study →" text.

### Buttons

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
    # Use a slightly darkened accent — define as accent-hover token if needed.
    # In v1: drop opacity to 0.9.
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
  iconSize: 18px
  gap-icon-label: 8px
```

Buttons rely on spacing, type, and contrast. No shadows. No gradients.

### Tag

```yaml
tag:
  type: mono-label, normal-case (overrides default uppercase)
  letterSpacing: normal
  paddingX: spacing-sm
  paddingY: 2px
  borderRadius: sm

  variants:
    outline:
      background: transparent
      border: 1px solid outline-variant
      color: on-surface-muted

    filled:
      background: surface-sunken
      color: on-surface               # brighter than outline variant
      border: none
```

Project cards use `filled`. Project sidebars render metadata as plain inline dot-separated text rather than tag chips (see Project sticky sidebar below). `outline` remains available for contexts that need a chip with a hairline border.

### Project sticky sidebar

PRODUCT.md §7.3 mandates this layout. Visual spec:

```yaml
project-sidebar:
  width: 260px
  position: sticky
  top: 96px               # clears the pill nav (24px top + 56px height + 16px gap)
  alignSelf: flex-start
  paddingRight: spacing-lg
  borderRight: none        # no hard divider — separation comes from column gap
  maxHeight: calc(100vh - 96px)
  overflowY: auto

project-sidebar-section:
  marginBottom: spacing-xl

  - short-title:         headline-sm
  - full-title:          body-sm, on-surface-muted, italic (optional)
  - tag-row (Topics):    body-sm, on-surface-muted, dot-separated ("tag · tag · tag")
  - stack-summary:
      group-label:       body-xs uppercase tracking-widest, on-surface-muted opacity 50
      group-items:       body-sm, on-surface-muted, dot-separated
      groups: Languages / Frameworks / Libraries / Tools
  - links:               icon + label, vertical stack, gap sm

project-main:
  flex: 1
  paddingLeft: spacing-xl
  maxWidth: 680px          # constrained reading width
```

On viewports below `lg`, the sidebar content stacks at the top of the page in a single-column layout (no sticky behavior).

### Reading progress indicator

```yaml
reading-progress:
  position: fixed
  left: 32px
  top: calc(sidebar-bottom + 24px)   # below the sticky sidebar's footprint
  width: 2px
  height: 200px
  background: outline-variant
  borderRadius: pill
  zIndex: 30

reading-progress-fill:
  width: 100%
  background: accent
  borderRadius: pill
  transformOrigin: top
  transition: transform 100ms linear
  # fill height driven by scroll position past the hero
```

Appears only after the user scrolls past the hero. Project pages only. Hidden below `md`.

### Scroll-to-top button

```yaml
scroll-to-top:
  position: fixed
  bottom: 24px
  right: 24px
  size: 44px x 44px
  borderRadius: pill
  background: surface-raised
  border: 1px solid outline-variant
  iconSize: 18px
  color: on-surface
  zIndex: 40
  
  appears-after: 1 viewport-height of scroll
  enter: opacity 0 → 1, 200ms
  
  hover:
    background: accent-muted
    borderColor: accent
    color: accent
```

Bottom-right does not collide with pill nav (top-center). Hidden when the slide-out menu is open.

### Footer

```yaml
footer:
  marginTop: spacing-4xl
  paddingVertical: spacing-xl
  paddingHorizontal: same as page side-margins
  borderTop: none                    # no top divider

  layout-desktop: flex-row, space-between
    left: copyright (body-sm)
    right: social icons (GitHub, LinkedIn, Mail), gap md, iconSize 18px

  layout-mobile: flex-column, gap md

copyright-format:
  # Exact copy: "© {year} / Aishwarya Ganesan / Designed and developed by me."
  surrounding-spans:                 # "© {year} /" and "/ Designed and developed by me."
    color: on-surface-muted
    opacity: 0.40
  name-span:                          # "Aishwarya Ganesan"
    color: on-surface-muted
    opacity: 1.0

social-icon:
  size: 18px
  color: on-surface-muted
  hover:
    color: on-surface
    transition: color 150ms
```

No theme toggle in the footer. (It lives in the pill nav / slide-out menu.)

### Callout (MDX)

Editorial pull block — integrated with prose flow, not a UI card.

```yaml
callout:
  background: surface-sunken              # subtle tonal separation
  borderLeft: 2px solid [type-color]      # insight=accent, tradeoff=secondary, warning=tertiary
  borderRadius: none                      # flush with prose
  paddingLeft: spacing-lg
  paddingRight: spacing-md
  paddingY: spacing-md
  marginY: spacing-xl

callout-title:
  type: body-md
  fontWeight: 600
  color: on-surface
  marginBottom: spacing-sm
```

`type` defaults to `"insight"`. The accent line is intentionally thin (2px) to keep the block from reading as a UI card.

### Project section label

Architectural divider used on project detail pages to separate major reading sections (e.g. `OVERVIEW`, `DEEP DIVE`). Not authored in MDX — emitted by the project page template.

```yaml
project-section-label:
  borderTop: 1px solid outline-variant
  paddingTop: spacing-lg
  label:
    type: mono-label
    color: on-surface-muted
    opacity: 0.40
  # Section content begins below the label, separated by spacing-xl
```

### Prose (MDX deep-dive) layout

Pairs with the `prose-h2` / `prose-h3` / `prose-body` type tokens in §3.

```yaml
prose-h2-layout:
  borderTop: 1px solid outline-variant
  paddingTop: spacing-xl
  marginTop: spacing-3xl
  marginBottom: spacing-lg
  # First h2 inside .prose-content skips border-top + padding-top + margin-top
  # so the section label above provides the only anchor rule.

prose-h3-layout:
  marginTop: spacing-2xl
  marginBottom: spacing-sm

prose-paragraph:
  marginBottom: spacing-lg

prose-list-item:
  marginBottom: spacing-xs
```

H2s function as section anchors via their own thin top rule. H3s sit clearly subordinate (lighter weight, smaller, no rule).

### About — two-panel intro

PRODUCT.md §7.4 #3.

```yaml
about-intro:
  desktop (>= lg):
    display: grid
    grid-template-columns: 5fr 7fr     # ~40/60 split
    gap: xl                             # 32px
    align-items: stretch
    
    headshot-panel:
      gridColumn: 1
      # Image height extends through the philosophy section using
      # CSS grid stretch — image element uses object-fit: cover and
      # height: 100% within its grid cell. The grid row spans both
      # the intro and the next section (philosophy).
      height: 100%
      borderRadius: md
      filter: grayscale(100%)            # B&W per PRODUCT.md
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

### About — two-column structured layout

PRODUCT.md §7.4 #4. Used for sections 5–8 (Approach, Capabilities, Experience, Education).

```yaml
about-two-col:
  desktop (>= lg):
    display: grid
    grid-template-columns: 3fr 9fr        # 25/75
    gap: xl                                # 32px
    paddingVertical: 3xl                   # 64px between sections
    borderTop: 1px solid outline-variant
    
    heading-col:
      gridColumn: 1
      # Section heading sticks to the top of its grid row only on lg+
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

## 12. Z-Index Scale

```yaml
z-index:
  base: 0
  raised: 10              # raised cards, hover lifts (none in v1, reserved)
  sticky-content: 20      # sticky sidebars, sticky table headers
  reading-progress: 30
  scroll-to-top: 40
  pill-nav: 50
  mobile-menu-overlay: 55
  mobile-menu-panel: 60
  tooltip: 70
  modal: 80               # reserved
  toast: 90               # reserved
```

Components must use these tokens, not raw numbers.

---

## 13. Accessibility Specifics

Beyond PRODUCT.md §10's general requirements:

- **Focus rings:** 2px solid `focus-ring` (= accent), 2px offset, on all keyboard-focused interactive elements. Use `:focus-visible`, not `:focus`, to avoid showing on mouse-click.
- **Contrast:** all text/background combinations meet WCAG AA (4.5:1 for body, 3:1 for large text and UI components). Active pill nav fill (`accent` background + `accent-on` text) must pass AA in both themes.
- **Touch targets:** minimum 44x44px for all interactive elements on mobile.
- **Reduced motion:** all motion in §9 has a no-motion fallback. The Hire Me pulse becomes static. Page transitions become instant. Hover transforms become color-only.
- **Theme toggle accessible name:** `aria-label` reflects current state ("Switch to dark theme", "Switch to system theme", etc.) and updates on cycle.

---

## 14. Open Decisions

1. **Diagram tooling** — deferred from PRODUCT.md, decide before any project page goes to production. Affects the visual identity of project deep-dive content.
2. **`accent-hover` token** — v1 uses `opacity: 0.9` on hover for primary buttons. If this looks muddy in practice, define a dedicated darker/lighter accent variant per theme.
