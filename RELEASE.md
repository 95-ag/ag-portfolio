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

# 2. Create an isolated worktree (detached → no stray branch). Main checkout untouched.
git worktree add --detach ../ag-portfolio-production

# 3. In the worktree, start production as an orphan branch
cd ../ag-portfolio-production
git checkout --orphan production

# 4. Curate the first snapshot from main. Run main's release.sh by absolute path — it
#    self-clears the worktree (git rm -rf .) then stages only the allowlist. Do NOT run a
#    manual `git rm` first; that would delete release.sh before it runs.
bash ~/projects/ag-portfolio/release.sh

# 5. Verify, then commit + push the first release
git status
git commit -m "Release v1"
git push -u origin production
```

> `release.sh` is `main`-only (not in the allowlist), so it is absent from the snapshot itself — always
> invoke it by its path in the main checkout (`bash ~/projects/ag-portfolio/release.sh`), never as
> `./release.sh` from inside the worktree.

## Per-release procedure (snapshot `vN`)

```bash
# 1. Update main in its own checkout (NOT via `git fetch origin main:main` — that
#    fails while main is checked out in the main worktree).
cd ~/projects/ag-portfolio && git checkout main && git pull

# 2. Re-curate in the production worktree from the updated main.
cd ~/projects/ag-portfolio-production
git checkout production
bash ~/projects/ag-portfolio/release.sh   # re-stage the allowlist from main

git status                                # review the diff
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
