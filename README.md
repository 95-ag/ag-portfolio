# AG Portfolio

Personal portfolio for an AI/ML engineer. Built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, and MDX.

## Stack

- **Framework:** Next.js 16 (App Router, static generation)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Content:** MDX via next-mdx-remote/rsc, frontmatter via gray-matter
- **Validation:** Zod (build-time frontmatter validation)
- **Linting/Formatting:** Biome

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Projects live in `content/projects/` as MDX files. Adding a file automatically generates a project page at `/work/[slug]`. Frontmatter is validated against a Zod schema at build time — invalid fields fail the build with a specific error.

## Build

```bash
npm run build   # production build + typecheck
npm run lint    # biome check
```
