# Build Verification Rules

Phase gates and verification checklists are defined in `.claude/docs/IMPLEMENTATION-PHASES.md`.
Read that document before marking any phase complete.

## Always Required (Every Task)

- `biome check` passes with zero errors
- TypeScript compiles with zero errors (strict mode)
- `next build` succeeds
- No broken imports
- No hydration errors in browser console

Do not advance to the next phase until all verification requirements for the current phase pass.

## Batch Gate

- Run the full `biome check` + `next build` at the batch gate, not per commit — per-commit render checks miss lint/type errors (import order, formatting, `!important`).
- `biome check --write <files>` auto-fixes format + organizeImports; `noImportantStyles` (no `!important`) is an "unsafe" fix that won't auto-apply — correct the root cause by hand.
- The on-edit hook is **format-only by design** (`biome format`) — do not extend it to run the full linter. Lint and build are gate checks, not per-edit checks.

## Dev Server & Browser Verification

- Stop the dev server before `next build` — a running dev server contends on `.next` with the production build. Free port 3000 first (see `windows-claude.md` → Long-running servers), then build; restart the dev server afterward for render checks.
- `preview_start` collides with a hand-backgrounded dev server on port 3000 — stop the background task **and** free the port before starting, or it falls back to 3001.
- Browser checks use **playwright-cli**, driven via a WSL script file (not inline):
  - `eval <fn>` runs in the **browser** context — Playwright *page* APIs (`emulateMedia`, `waitForLoadState`) are unavailable there.
  - Flip a next-themes site between light/dark via `eval "() => localStorage.setItem('theme', 'light'|'dark')"` then `reload` — not `emulateMedia`. Confirm the flip by diffing the two PNGs (identical size ⇒ it didn't flip).
  - Screenshot one element with `screenshot '<selector>' --filename <path>`; `--full-page` for the whole page.
  - Scroll lazy below-fold elements into view (confirm `naturalWidth > 0`) before capturing — otherwise the shot races the lazy-load and captures a blank box.
  - An animated canvas (WebGL) makes `screenshot` time out on no stable frame — freeze rAF first (`window.requestAnimationFrame = () => 0` via `eval`), then shoot.
