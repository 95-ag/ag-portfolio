@../AGENTS.md

# AG Portfolio

Personal portfolio for an AI/ML engineer. Content-led, editorial, minimal, technically credible.

## Docs — Read Before Any Task

| Doc | Owns |
|---|---|
| `.claude/docs/PRODUCT.md` | What to build and why |
| `.claude/docs/DESIGN.md` | All visual decisions — wins over PRODUCT.md on visuals |
| `.claude/docs/CONTENT-SCHEMA.md` | MDX and frontmatter structure — wins over PRODUCT.md on content fields |
| `.claude/docs/build-flow.md` | Phase-by-phase build order and verification gates |

Current session state → `PRIMER.md` at project root.

## Stack

- **Framework:** Next.js 16 App Router — static generation for all content pages
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion — used sparingly, always gated by `prefers-reduced-motion`
- **Content:** MDX via gray-matter + next-mdx-remote
- **Validation:** Zod — all frontmatter validated at build time
- **Tooling:** Biome for format + lint

## Rules — Always Apply

All rules live in `.claude/rules/`. Read the relevant file before any task in that area.

| Rule file | Covers |
|---|---|
| `rules/frontend.md` | Next.js, fonts, images, imports, MDX |
| `rules/design-system.md` | Color tokens, typography, spacing, elevation, z-index |
| `rules/motion.md` | Animation constraints, duration tokens, reduced-motion |
| `rules/content.md` | Frontmatter schema, MDX body, Zod validation |
| `rules/accessibility.md` | Semantic HTML, focus, contrast, ARIA |
| `rules/build-verification.md` | Phase gates, always-required checks |
| `rules/git.md` | Branching, commits, merge policy, public repo hygiene |

## Key Constraints

- Do not skip build phases — see `build-flow.md` for phase gates
- No client-side syntax highlighting — build-time only via Shiki
- No animation libraries beyond Framer Motion
- No shadows — elevation via tonal borders and surface fills only (Highlight shadow carve-out removed)
- Backdrop-blur only on floating nav/utility UI: pill nav, mobile nav trigger, mobile slide-out panel, scroll-to-top button
- Build fails on invalid frontmatter — enforced via Zod in `/lib/schemas/`
- Missing optional frontmatter fields render nothing — never placeholders or "TBD"
- `projectType` is internal metadata — never displayed as a badge or label on the site
- No raw HTML in MDX body — use components (`<Figure>`, `<Diagram>`, `<Callout>`, `<Stack>`)
