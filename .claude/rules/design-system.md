# Design System Rules

Token values, type scale, color palette, spacing scale, and component specs are defined in `docs/DESIGN.md`. Read it before implementing any UI. These rules govern how to use the design system.

## Color

- Use semantic color tokens only — never raw hex values in components
- Token names are defined in `docs/DESIGN.md` §4
- One accent color — do not introduce additional accent variants beyond what is in the doc
- `secondary` and `tertiary` tokens are reserved for callout variants — do not use for general styling

## Typography

- Use type scale tokens for all text — never set font sizes or weights directly
- Token names are defined in `docs/DESIGN.md` §3
- JetBrains Mono is for structural metadata only: tags, card numbers, timestamps, status pills, code
- JetBrains Mono is **not permitted** in body copy, headlines, or prose
- Never mix font families within a single UI element

## Spacing

- Use spacing scale tokens only — never arbitrary pixel values
- Token names and values are defined in `docs/DESIGN.md` §5

## Elevation & Depth

- No `box-shadow` in v1 — depth is communicated through tonal borders and surface layering
- No glow effects
- `backdrop-filter: blur()` is permitted **only** on the pill nav and mobile slide-out menu — nowhere else
- Exact blur values are in `docs/DESIGN.md` §8

## Shape & Radius

- Use radius tokens only — no arbitrary border-radius values
- Token names are defined in `docs/DESIGN.md` §7

## Z-Index

- Use z-index scale tokens only — never raw numbers
- Token names and values are defined in `docs/DESIGN.md` §12

## Layout

- Respect max content width and reading column width from `docs/DESIGN.md` §6
- Nav pill centers relative to the content container, not the viewport
