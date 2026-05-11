# Accessibility Rules

Full requirements in `docs/PRODUCT.md` §10 and `docs/DESIGN.md` §13.

## Semantic HTML

- Use semantic elements: `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`, `<section>`
- One `<h1>` per page — rendered by the layout, never written in MDX body
- Heading hierarchy must be logical and sequential — no skipping levels

## Focus & Keyboard

- All interactive elements must be keyboard-reachable in logical DOM order
- Use `:focus-visible` not `:focus` — prevents focus ring on mouse click
- Focus ring style is defined in `docs/DESIGN.md` §13 — use the `focus-ring` token
- The mobile slide-out menu must trap focus while open

## Touch Targets

- Minimum 44×44px for all interactive elements on mobile — no exceptions

## Color & Contrast

- All text/background combinations must meet WCAG AA in both light and dark themes
- Never convey information by color alone

## Images & Media

- All images require meaningful `alt` text; decorative images use `alt=""`
- All `<video>` elements must be muted — no autoplay audio

## ARIA

- Icon-only buttons must have `aria-label`
- Each `<nav>` must have `aria-label` or `aria-labelledby` to distinguish multiple nav landmarks
- Current page in nav: use `aria-current="page"`
- Theme toggle `aria-label` must reflect current state and update on each cycle
