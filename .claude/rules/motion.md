# Motion Rules

Motion timing, easing, and component-specific specs are defined in `docs/DESIGN.md` — Foundations → Motion & Interaction. These rules govern how to implement motion.

## Reduced Motion (Non-Negotiable)

- Every Framer Motion animation must be gated with `useReducedMotion()`
- When reduced motion is preferred: all transitions are instant or removed — no exceptions
- Video heroes show poster only, no autoplay
- Animated SVGs that cannot respect `prefers-reduced-motion` must be replaced with static images

## Duration

- Use motion duration tokens only — no arbitrary millisecond values
- Token names and values are defined in `docs/DESIGN.md` — Foundations → Motion & Interaction → Motion Principles

## Permitted

- Opacity transitions (fade in/out)
- Small transforms (max values in `docs/DESIGN.md` — Foundations → Motion & Interaction → Motion Principles)
- Color transitions (border, background, text)
- Slide-in for mobile menu
- Pulse on the Hire Me CTA **icon only** — never the full button, stops on hover

## Prohibited

- Scroll-jacking
- Parallax
- Per-section entrance animations on scroll
- Continuous ambient motion on any element other than the CTA icon
- Cursor-tracking effects
- Page-load reveal sequences
