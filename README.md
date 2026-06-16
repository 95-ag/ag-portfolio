# Aishwarya Ganesan — Portfolio

Personal portfolio for an AI/ML engineer — content-led, editorial, and technically credible.

**Live:** https://aishwaryaganesan.vercel.app

## About

A personal portfolio presenting AI/ML engineering work as in-depth case studies rather than a list of links. Each project is authored in MDX with build-validated frontmatter, statically generated, and built for fast, accessible reading in both light and dark themes.

## Stack

- **Framework:** Next.js 16 (App Router, static generation)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Content:** MDX via next-mdx-remote/rsc, frontmatter via gray-matter
- **Validation:** Zod (build-time frontmatter validation)
- **Linting/Formatting:** Biome

## Architecture at a glance

- **Static generation** — every content page is pre-rendered at build time (`generateStaticParams`); there is no server runtime for content.
- **Content pipeline** — project case studies live as MDX in `content/projects/`; frontmatter is validated against a Zod schema at build time, so invalid content fails the build with a specific error.
- **Build-time syntax highlighting** — code blocks are highlighted with Shiki during the build; no client-side highlighter is shipped to the browser.

## Requirements

- Node.js >=20.9.0 (see `.nvmrc`)

## Development

```bash
nvm use        # switch to the pinned Node version
npm install
npm run dev
```

Open http://localhost:3000.

## Content

Projects live in `content/projects/` as MDX files. Adding a file automatically generates a project page at `/work/[slug]`. Frontmatter is validated against a Zod schema at build time — invalid fields fail the build with a specific error.

Assets (diagrams, charts) export to `public/projects/[slug]/`; editable sources are kept in `assets-source/` on the development branch.

## Build

```bash
npm run build   # production build + typecheck
npm run lint    # biome check
```

## License

Source-available for reference; not licensed for reuse. © Aishwarya Ganesan.
