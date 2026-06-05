# Frontend Rules

## Next.js

- App Router only — no Pages Router patterns
- All content pages use static generation (`generateStaticParams`)
- Default to server components — no `'use client'` unless strictly necessary
- Read `node_modules/next/dist/docs/` before using any Next.js API; this version may differ from training data

## Fonts

- All fonts loaded via `next/font` — no Google Fonts CDN requests
- Font families and CSS variable names are defined in `docs/DESIGN.md` — Foundations → Typography

## Images & Media

- All images via `next/image` with explicit `width` and `height` — no layout shift
- Image paths are web paths from `/public` — never filesystem-relative paths
- All `<video>` elements must have `autoPlay muted playsInline` — always muted, always with a `poster`
- After overwriting a `/public` asset, clear `.next/cache/images` and restart the dev server — `next/image` otherwise serves a stale optimized copy (old baked content reappears)
- `next/image` is lazy below the fold: a `display:none` **ancestor** cancels the fetch entirely, but a `display:none` element with **visible** ancestors still downloads (relevant to theme-swapped twin images)

## Imports

- Use path aliases from `tsconfig.json` — no relative `../../` chains
- Prefer named exports over default exports for components

## MDX

- No raw HTML in MDX body — use custom components only (`<Figure>`, `<Diagram>`, `<Callout>`, `<Stack>`)
- No `style=` or `className=` inline in MDX files
- No client-side syntax highlighter — build-time only (Shiki)
- Shiki dual-theme: use `defaultColor: false` (emits CSS vars only, no inline `color`) so the dark override works with normal cascade — never `!important` (biome forbids it)
- H1 is rendered by the layout from frontmatter `title` — never write H1 in MDX body

## Local Iteration & Caching

- A CSS/style edit not reflecting on the dev server is usually a stale Turbopack `.next` cache, not a styling mistake — verify the **computed** style (`getComputedStyle`) before re-tuning. Bust with `touch src/app/globals.css` (forces an HMR recompile) or `rm -rf .next`. Don't judge color from a downscaled screenshot
- Render-to-compare for any styling/visual choice: a throwaway `src/app/scratch/<topic>/page.tsx` route rendering the real components/variants side-by-side (both themes) beats deciding from description. Keep it uncommitted and delete it after the decision

## Tooling

- Run `biome check` before marking any task done
- TypeScript must pass with zero errors — strict mode is on
- biome `useExhaustiveDependencies` fires when an effect newly closes over a prop — add the prop to the deps array (safe when effectively constant) rather than disabling the rule
