# Git Rules

## main branch

- main is always stable, buildable, and deployable
- No large architectural or UI work directly on main — branch first
- On main, undo via `git revert` only (user-run) — never `reset --hard` or force-push

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
- Never use `git add --all`, `git add -A`, or `git add .` — always stage by explicit file path. Bulk-add picks up secrets, build artifacts, and unrelated changes.

Prefer small, meaningful clustered commits over phase-sized commits. Separate infrastructure, routing, schemas, content pipeline, and UI shells into distinct commits when practical. Avoid giant "implement entire phase" commits — commits should be understandable from the diff without needing the full project context.

Refactors stay behavior-safe unless intentionally changing behavior.
Prefer incremental architectural progress over large rewrites.

## Approval gate (mandatory before any staging)

Before running `git add`, `git rm`, `git commit`, `git restore --staged`, or any operation that changes the index:

1. Propose the full commit plan in chat. Each cluster must include:
   - Cluster name and purpose (one phrase)
   - Exact file list to be staged
   - Exact single-line commit message
2. Wait for explicit approval before touching the index.
3. **Inside a plan**: commit clusters and messages are part of the plan. Plan approval covers them; do not re-ask. If the work diverges from the planned clusters, stop and re-propose.
4. **Outside a plan**: explicit propose-and-wait every time. Approval for one cluster never carries to the next.
5. If the user says "don't commit cluster N", drop it entirely — do not stage its files.

Skipping this gate is a process violation, not a shortcut. Recovery (`git reset --soft`) costs more than the proposal.

## Commit message format

**Single line only — no body, no trailing description, no bullet list.** Everything fits in the subject.

- Format: `type: short description`
- Imperative mood — `add`, `fix`, `refactor`, not `added` or `adds`
- Lowercase after the colon, no trailing period
- The message explains the WHY at a glance — not a recap of the diff
- Always pass via `-m "…"` — never via HEREDOC, never via `-F`, never via editor
- Never include `Co-Authored-By` trailers, generator credits, or signatures beyond the commit signing key

**Prefixes:**
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `style:` — formatting, whitespace, no code change
- `docs:` — user-facing or product documentation (MDX content, PRODUCT.md, README, DESIGN.md, CONTENT-SCHEMA.md)
- `chore:` — tooling, process config, maintenance — use for `.claude/`, CI config, build scripts, rule files
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
- `.claude/work/` process notes (`session.md`, `tasks.md`, `lessons.md`) — local-only working files, never tracked in the public repo

## PR and merge policy

- Working branches merge into `main` via **squash merge** — keeps `main` history one-commit-per-feature
- The squash commit message is the PR title (single line, same `type: short description` format)
- Working branch is deleted after squash merge — expected, not a loss
- Verify before opening the PR: `npm run build` succeeds, lint passes, typecheck passes, no hydration errors, responsive sanity check at 375px / 768px / 1280px

## Branch & remote autonomy — Claude does not execute

Claude never performs operations that change repository topology, branch ownership, remote state, or pull
request state.

This includes, but is not limited to:

- Branch creation, deletion, renaming, switching, or restoration.
- Merge, rebase, cherry-pick, squash, reset, revert, or history-rewrite operations.
- Remote creation, modification, removal, fetch-spec changes, or remote URL changes.
- Pushes of any kind (`git push`, force-push, tag push, mirror push).
- Worktree creation, removal, or reassignment.
- Tag creation, deletion, movement, or publication.
- Pull request creation, update, merge, closure, reopening, review submission, or approval.
- Default-branch changes or repository settings changes.

Examples include (non-exhaustive): `git checkout -b`, `git switch -c`, `git branch -m`,
`git branch -d`, `git merge`, `git rebase`, `git cherry-pick`, `git reset`, `git push`,
`git worktree add`, `git worktree remove`, `git tag`, and any `gh pr *` command.

These actions are always user-owned operations.

Claude may run read-only git commands such as:

- `git status`
- `git log`
- `git diff`
- `git show`
- `git fetch`
- `git branch --show-current`

Claude may also run `git add` and `git commit` only when:

- The user has already created and checked out the target branch.
- The approval gate defined above has been satisfied.
- No branch, remote, PR, worktree, tag, or history operation is required.

When work requires any prohibited operation, Claude stops and provides the exact commands for the user to
execute.

The release-snapshot workflow follows the same boundary. See `rules/release.md`.

## PR closure — Claude does not execute

PR creation, review, approval, merge, closure, reopening, and post-merge cleanup are user actions
(the prohibited operations are enumerated in "Branch & remote autonomy" above).

Claude may prepare:

- PR title
- PR body (structured as: Summary · Changes · Verification · Notes)
- Review / merge summaries
- Release notes
- Verification checklists
- Next-step instructions — the exact commands for the user to run after merge:

  ```
  git checkout main && git pull && git checkout -b <next-branch-name>
  ```

Claude never executes the PR operation itself.

## Public repo hygiene

- Sign commits (GPG or SSH) — verification badge matters for a portfolio
- Use a noreply commit email (e.g. `<id>+<username>@users.noreply.github.com`) so scrapers don't get your real address from `git log`
- Keep history clean and readable — the repo is public-facing
- Do not add `Co-Authored-By: Claude` trailers to commit messages

## .gitignore discipline

Treat `.gitignore` as part of the rules. Required entries:
- `node_modules/`
- `.next/`
- `.env*` (except `.env.example` if you add one)
- `.DS_Store`
- `.claude/work/` (local process notes — `session.md`, `tasks.md`, `lessons.md`)
- Build outputs and caches
