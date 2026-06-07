# Design System Rules

Token values, type scale, color palette, spacing scale, and component specs are defined in `docs/DESIGN.md`. Read it before implementing any UI. These rules govern how to use the design system.

## Color

- Use semantic color tokens only — never raw hex values in components
- Token names are defined in `docs/DESIGN.md` — Foundations → Colors
- One accent color — do not introduce additional accent variants beyond what is in the doc

### Color work

- Root-cause color changes with a token-level pass — convert tokens to OKLCH and compute a WCAG contrast matrix, don't eyeball screenshots. Pair the math with the `audit-color-contrast` skill for the qualitative read.
- Decide palette direction from a candidate applied to **real rendered pages**, not swatches or per-component pads.
- Light-on-dark text blooms heavier and flattens weight hierarchy — scope `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` to `[data-theme="dark"] body` (leave light alone).

## Typography

- Use type scale tokens for all text — never set font sizes or weights directly
- Token names are defined in `docs/DESIGN.md` — Foundations → Typography
- JetBrains Mono is for structural metadata only: tags, card numbers, timestamps, status pills, code
- JetBrains Mono is **not permitted** in body copy, headlines, or prose
- Never mix font families within a single UI element

## Spacing

- Use spacing scale tokens only — never arbitrary pixel values
- Token names and values are defined in `docs/DESIGN.md` — Foundations → Spacing

## Elevation & Depth

- No `box-shadow` in v1 — depth is communicated through tonal borders and surface layering
- No glow effects
- `backdrop-filter: blur()` is permitted **only** on the pill nav and mobile slide-out menu — nowhere else
- Exact blur values are in `docs/DESIGN.md` — Foundations → Elevation & Depth → Backdrop-Blur Carve-out

## Shape & Radius

- Use radius tokens only — no arbitrary border-radius values
- Token names are defined in `docs/DESIGN.md` — Foundations → Shapes

## Z-Index

- Use z-index scale tokens only — never raw numbers
- Token names and values are defined in `docs/DESIGN.md` — Technical Conventions → Z-Index Scale

## Layout

- Respect max content width and reading column width from `docs/DESIGN.md` — Foundations → Layout → Grid & Containers
- Nav pill centers relative to the content container, not the viewport
