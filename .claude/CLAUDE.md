@../AGENTS.md
@work/session.md
@work/tasks.md
@work/lessons.md

# AG Portfolio

Personal portfolio for an AI/ML engineer. Content-led, editorial, minimal, technically credible.

## Docs — Read Before Any Task

| Doc | Owns |
|---|---|
| `.claude/docs/PRODUCT.md` | What to build and why |
| `.claude/docs/DESIGN.md` | All visual decisions — wins over PRODUCT.md on visuals |
| `.claude/docs/CONTENT-SCHEMA.md` | MDX and frontmatter structure — wins over PRODUCT.md on content fields |
| `.claude/docs/IMPLEMENTATION-PHASES.md` | Phase-by-phase build order and verification gates |

Current session state → `.claude/work/session.md`.

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
| `rules/portfolio-system.md` | Portfolio case studies, assets, cover system, technical presentation |

## Key Constraints

- Do not skip build phases — see `IMPLEMENTATION-PHASES.md` for phase gates
- No client-side syntax highlighting — build-time only via Shiki
- No animation libraries beyond Framer Motion
- No shadows — elevation via tonal borders and surface fills only (Highlight shadow carve-out removed)
- Backdrop-blur only on floating nav/utility UI: pill nav, mobile nav trigger, mobile slide-out panel, scroll-to-top button
- Build fails on invalid frontmatter — enforced via Zod in `/lib/schemas/`
- Missing optional frontmatter fields render nothing — never placeholders or "TBD"
- `projectType` is internal metadata — never displayed as a badge or label on the site
- No raw HTML in MDX body — use components (`<Figure>`, `<Diagram>`, `<Callout>`, `<Stack>`)
- `tmp/` is read-only reference material (source PDFs, extracted text, slide/repo dumps) — never a deliverable or edit target. It is **not in git**: never assume its contents exist (a fresh clone won't have them). When scratch space is needed, prefer this project-local `tmp/` over global/system temp folders

## Visual Verification

- Browser rendering is required for any visual check — use the review tooling (playwright-cli, driven via the WSL build/run scripts), never HTML/curl/grep inspection
- Do not infer the verification method from a tool's name — confirm what actually produced the render
- Label conclusions by how they were reached: "inferred from markup" and "confirmed by browser render" are different confidence levels — state which
- If browser rendering is unavailable, stop and say so — do not substitute pixel or HTML analysis for a rendered-page question

## Process Rules

- Complete one project fully before moving to the next
- Execution order per project: MDX → [user approval] → assets → [user approval] → hero cover → [user approval] → review → [user approval]
- Portfolio project work is driven by the four pipeline skills — they are the operational source of truth:
  1. `project-content-extraction` — MDX content from report + repo
  2. `project-assets-generation` — diagrams, charts, legacy crops
  3. `project-cover-generation` — hero cover (3-gate: directions → base → annotations)
  4. `project-review` — two-pass QA (recruiter + technical hiring manager)
- Never update `session.md` to mark a task complete without user approval recorded in chat
