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

## Imports

- Use path aliases from `tsconfig.json` — no relative `../../` chains
- Prefer named exports over default exports for components

## MDX

- No raw HTML in MDX body — use custom components only (`<Figure>`, `<Diagram>`, `<Callout>`, `<Stack>`)
- No `style=` or `className=` inline in MDX files
- No client-side syntax highlighter — build-time only (Shiki)
- H1 is rendered by the layout from frontmatter `title` — never write H1 in MDX body

## Tooling

- Run `biome check` before marking any task done
- TypeScript must pass with zero errors — strict mode is on
