# PRIMER.md — Session Snapshot

> Rewrite this at the end of every session. Claude reads this at the start of each task for continuity.

---

## Current Phase
**Phase 1 — Foundation** (not yet started — setup complete, ready to build)

See `.claude/docs/build-flow.md` for full phase requirements and verification checklist.

---

## Current State

Base Next.js 16 project initialized. Claude Code project setup is complete. No real app architecture built yet.

**Installed:**
- Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Biome

**Not yet installed (Phase 1 requires):**
- Framer Motion
- MDX support (next-mdx-remote or @next/mdx)
- next-themes
- gray-matter
- Zod
- Font packages (Manrope, Inter, JetBrains Mono via `next/font`)

**Scaffolded (app):**
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` — default Next.js scaffold only

**Claude Code setup (complete):**
- `.claude/CLAUDE.md` — project context, stack, key constraints, rules index
- `.claude/settings.json` — permissions + all four hooks wired
- `.claude/docs/` — PRODUCT.md, DESIGN.md, CONTENT-SCHEMA.md, build-flow.md
- `.claude/rules/` — frontend.md, design-system.md, motion.md, content.md, accessibility.md, build-verification.md, git.md
- `.claude/hooks/` — file-protect.mjs, code-formatter.mjs, bash-firewall.mjs, text-enforce.mjs
- `.claude/agents/code-reviewer.md` — implementation review gate
- `AGENTS.md` — Next.js version warning
- `PRIMER.md` — this file

**Not yet created (app):**
- `src/components/`, `src/lib/`, `src/styles/`
- `content/projects/`, `content/blog/`
- MDX pipeline, Zod schemas, font config, theme provider
- Any real layout, nav, or page structure

---

## Last Session
- Wrote all `.claude/rules/` files: frontend, design-system, motion, content, accessibility, build-verification, git
- Updated `.claude/CLAUDE.md` with full project context and rules index table
- Created four hooks: file-protect, code-formatter, bash-firewall, text-enforce
- Wired hooks into `.claude/settings.json`
- Rules are behavioral (how to behave) — project values live in docs
- Added `*:Zone.Identifier` to `.gitignore`
- Added `.claude/agents/code-reviewer.md` — project-scoped implementation review gate, runs before phase verification

---

## Next Steps
1. Commit current branch (`phase-1-foundation`) — setup + tooling complete
2. Install Phase 1 dependencies: Framer Motion, next-mdx-remote, next-themes, gray-matter, Zod, fonts
3. Configure: path aliases, Tailwind design tokens, font loading, dark/light/system theme
4. Create folder structure: `components/`, `lib/`, `styles/`, `content/projects/`
5. Set up MDX pipeline + Zod frontmatter validation
6. Build layout shell: nav, footer, theme provider
7. Run `code-reviewer` agent before Phase 1 verification
8. Verify Phase 1 checklist from `build-flow.md` before moving to Phase 2

---

## Blockers
None
