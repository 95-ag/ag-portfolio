#!/usr/bin/env bash
# Cut a curated orphan-snapshot release of `main` onto the `production` branch.
# Curate-only: stages the allowlisted files, then STOPS — no commit, no push, no branch ops.
# MUST be run from inside the `production` worktree (guarded below). See RELEASE.md.
#
# Usage (from the production worktree, with main pulled up to date):
#   ./release.sh
#   git status                 # review what was staged
#   git commit -m "Release vN"
#   git push                   # first push: git push -u origin production
set -euo pipefail

# --- Safety guard: refuse to run anywhere but the production branch -----------
current_branch="$(git symbolic-ref --short HEAD 2>/dev/null || echo DETACHED)"
if [ "$current_branch" != "production" ]; then
  echo "ERROR: release.sh must run on the 'production' branch (current: $current_branch)." >&2
  echo "       Enter the production worktree first — see RELEASE.md." >&2
  exit 1
fi

# --- Allowlist: exactly what a production snapshot keeps ----------------------
# KEEP IN SYNC WITH RELEASE.md. Everything else (.claude/, AGENTS.md,
# assets-source/, requirements.txt, playwright.config.ts, tmp/) is intentionally dropped.
ALLOWLIST=(
  src
  public
  content
  package.json
  package-lock.json
  next.config.ts
  tsconfig.json
  postcss.config.mjs
  biome.json
  .nvmrc
  .gitignore
  README.md
)

echo "Clearing tracked files from the production worktree..."
git rm -rf --quiet . >/dev/null

echo "Staging allowlisted paths from main..."
git checkout main -- "${ALLOWLIST[@]}"

echo
echo "Staged snapshot (production = curated main):"
git status --short
echo
echo "Next steps (run manually):"
echo "  git status                 # review"
echo '  git commit -m "Release vN"'
echo "  git push                   # first push: git push -u origin production"
