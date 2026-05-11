# Git Rules

## main branch

- main is always stable, buildable, and deployable
- No large architectural or UI work directly on main — branch first
- On main, undo via `git revert` only — never `reset --hard` or force-push

## Branches

- Branch from main only — never branch off another feature branch
- Naming: `phase-x-*`, `feature-*`, `refactor-*`
- Delete merged branches after completion

## Commits

Every commit must:
- Build successfully
- Pass lint and typecheck
- Represent one logical change
- Not mix unrelated changes

Prefer small, focused commits over giant dump commits.
Refactors stay behavior-safe unless intentionally changing behavior.
Prefer incremental architectural progress over large rewrites.

## Commit message format

- Prefix + colon + space + subject
- Subject in imperative mood ("add hero section", not "added" / "adds")
- Subject ≤ 72 chars, lowercase after the colon, no trailing period
- If a body is needed: blank line after subject, wrap body at ~72 chars

**Prefixes:**
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `style:` — formatting, whitespace, no code change
- `docs:` — documentation only
- `chore:` — tooling, maintenance
- `test:` — tests
- `perf:` — performance
- `build:` — build system, deps, config
- `ci:` — CI config

## Never commit

- Broken builds
- Temporary hacks
- Abandoned experiments
- Dead files or components
- Unused dependencies
- Commented-out legacy code
- `node_modules/`
- Secrets or `.env` values
- Build artifacts (`.next/`, `dist/`)
- OS/editor cruft (`.DS_Store`, `.vscode/` unless intentionally shared)

## Before merging into main

Verify:
- `npm run build` succeeds
- Lint passes
- Typecheck passes
- No hydration issues
- Responsive sanity check at 375px / 768px / 1280px

## Public repo hygiene

- Sign commits (GPG or SSH) — verification badge matters for a portfolio
- Use a noreply commit email (e.g. `<id>+<username>@users.noreply.github.com`) so scrapers don't get your real address from `git log`
- Keep history clean and readable — the repo is public-facing

## .gitignore discipline

Treat `.gitignore` as part of the rules. Required entries:
- `node_modules/`
- `.next/`
- `.env*` (except `.env.example` if you add one)
- `.DS_Store`
- Build outputs and caches
