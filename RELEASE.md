# Release Process

This repo publishes through a **dual-branch model**. `release.sh` automates the file curation; every git, branch, and push operation is run manually.

## Branch model

- **`main`** — authoritative development branch. May contain development tooling and planning artifacts (e.g. `AGENTS.md`, asset sources), and the full development history.
- **`production`** — curated release branch with **orphan history**, independent of `main`. Treated as a build artifact (like `dist/`), never as a development branch.

**Never merge `main` into `production`.** Each release is a **snapshot-replace**: the production worktree's tracked files are overwritten with a curated, allowlisted copy of `main`'s current state, then committed as `Release vN`. The two branches share no ancestry.

## What ships (allowlist)

A production snapshot keeps exactly:

```
src/ public/ content/ package.json package-lock.json next.config.ts
tsconfig.json postcss.config.mjs biome.json .nvmrc .gitignore README.md
```

Everything else is intentionally dropped (denylist): `.claude/` (including docs), `AGENTS.md`, `assets-source/`, `requirements.txt`, `playwright.config.ts`, `tmp/`. The allowlist is the single source of truth and is duplicated in `release.sh` — keep the two in sync.

## Why orphan-snapshot

The public deploy surface is kept to exactly the build inputs, while the development branch retains the full workflow and planning history. This is deliberate: the "how I built this" story is presented in the portfolio's own case study, not carried as repository clutter in the deployed artifact.

## One-time setup (creates `production`)

Run from the primary `main` checkout. The worktree is created as a sibling directory.

```bash
# 1. Make sure main is current
git checkout main && git pull

# 2. Create an isolated worktree for production work
git worktree add ../ag-portfolio-production

# 3. In the worktree, start production as an orphan branch
cd ../ag-portfolio-production
git checkout --orphan production
git rm -rf .            # clear the orphan index/worktree

# 4. Curate the first snapshot from main
./release.sh            # stages the allowlist; does NOT commit

# 5. Verify, then commit + push the first release
git status
git commit -m "Release v1"
git push -u origin production
```

> `release.sh` is `main`-only and is not part of the allowlist, so it will not be present after a snapshot
> overwrites the worktree. The orphan checkout in step 3 still has it before the first `release.sh` run; for
> later releases, invoke it by path from the main checkout (e.g. `bash ../ag-portfolio/release.sh`).

## Per-release procedure (snapshot `vN`)

```bash
# From the production worktree:
git checkout production
git fetch origin && git pull          # if production moved remotely

# Fast-forward the local main ref so release.sh curates the latest:
git fetch origin main:main
bash ../ag-portfolio/release.sh       # re-stage the allowlist from main

git status                            # review the diff
git commit -m "Release vN"
git push
```

## Build invariant (verify before every push)

A production snapshot must contain every `next build` input. Before pushing:

1. **Build the snapshot:** `npm ci && npm run build` from the production worktree — must succeed (static routes generate).
2. **Prove zero leakage:** confirm none of the stripped paths slipped in:

   ```bash
   git ls-files | grep -E '^\.claude/|^AGENTS\.md$|^assets-source/|^requirements\.txt$' && echo "LEAK" || echo "clean"
   ```

   Expected: `clean`.

## Branch autonomy

`release.sh` only stages files. All branch creation, commits, pushes, and PRs are run manually — the script never performs them.
