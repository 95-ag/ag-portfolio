# Lessons — Patterns from Corrections

> This file now holds only project-pipeline-specific lessons.
> Append project-specific corrections here; promote anything general to the CLAUDE rules.

---

## Asset generation order

**Propose a visual plan and get approval before generating anything.** Generating first and reviewing after produces assets the user must reject. Correct order: read SKILL.md → write tasks → inventory source material → propose plan with rationale → get approval → generate.

(Generic plan-first / `tasks.md`-before-first-write / propose-commit-clusters discipline now lives in the global `CLAUDE.md` Hard Gates.)

---

## Cover generation

**Background asset and composition layer are separate.** The background image is generated; logos and metadata are rendered by the HTML/CSS composition layer via the `logos[]` frontmatter field. Never bake logos or text into the background image.

**The Refine step is not optional.** Workflow: Extract → Suggest → **Refine with user** → Generate → Compose → Export. Jumping from Suggest to Generate skips the step where the user shapes the direction.

---

## Skill maintenance — generalize, don't overfit

**Skill standards are principles, not one project's recipe.** When folding per-project learnings into a frozen skill, each item enters as a principle or *conditional* guidance ("when a project needs X, consider Y") — never as project-specific constants, a composition-specific tactic hardened into a universal rule, or a mandate every run must follow. This was corrected four times in one task; default to the most general framing and let the user tighten, not loosen.

**Separate the general rule from the scene/project it came from.** A learning captured while building one cover often contains a genuinely general rule wearing a project costume (e.g. a static-generation `Math.random` constraint hidden inside "road scene" notes). Lift the general part into general guidance so it survives for unrelated cases; keep only the truly domain-specific part conditional.

**Neutralize worked examples.** Illustrative examples lifted verbatim from the source project (its exact metric, its vanishing point) read as bias. Keep the principle, swap the example for a neutral one or label it clearly illustrative.

**Two checks before deleting scratch notes.** (1) A disposition table mapping every note to incorporated / intentionally-rejected / project-specific — confirm zero information loss, noting where the authoritative copy now lives (e.g. committed component, not the note). (2) A separate-agent fresh-eyes review of the updated skill for self-containment, consistency, stale refs, and overfit. Run both, report findings, then propose deletion.

---

## Asset pipeline — tooling notes not folded into the skill (masked-autoencoders, 2026-06-01)

The asset-*design* learnings from this run were folded into the `project-assets-generation`
skill (hand-SVG shared theme, responsive framing, `<Figure>` crop gotcha, dark-mode bake,
crop-script policy). These remaining items are environment/tooling, not asset-design
guidance, so they stay here:

**Clear the Next image cache after overwriting a `/public` asset.** `next/image` serves a
stale optimized copy when a file is replaced at the same path (old baked content/labels
reappear). `rm -rf .next/cache/images`, then restart the dev server.

**Browser-verify lazy figures by scrolling them in first.** Below-fold `next/image` is
lazy; a `playwright-cli screenshot` fires before the image loads and captures a blank box.
Scroll the element into view and wait (confirm `naturalWidth>0` if unsure) before shooting —
don't mistake a lazy-load race for a real bug. (Candidate to graduate into `project-review`
tooling notes.)

---

## Cover-verification tooling — `@playwright/cli` 0.1.13 + preview server (2026-06-01)

Captured while building/flipping covers. Environment/tooling, not cover-design content
(the design learnings were folded into `project-cover-generation`).

**`@playwright/cli` 0.1.13 command surface (drifted from older capture scripts):**
- The command is `eval`, not `run-code`. `eval <func>` runs in the **browser** context, so
  Playwright *page* APIs (`emulateMedia`, `waitForLoadState`) are unavailable there — calling
  them throws/silently no-ops.
- Flip the site theme via `eval "() => localStorage.setItem('theme','light'|'dark')"` then
  `reload` (the site uses next-themes `attribute="data-theme"`, storageKey `theme`) — NOT
  `emulateMedia`. Confirm by diffing the two PNGs (identical size ⇒ theme didn't flip).
- Screenshot a single element with `screenshot '<selector>' --filename <path>` (selector is the
  positional target); `--full-page` for the whole page.
- Inline `CLI=./node_modules/.bin/playwright-cli; $CLI open …` gets MSYS-mangled from the
  git-bash Bash tool (the var empties; `open` falls through to the system opener). Run a
  **script file** via `wsl -d ubuntu bash <file>` instead. Pattern: `tmp/review-shots/cover-capture*.sh`.
- Measure text/element geometry for precise annotation placement with `getBBox` via `eval`
  (returns viewBox-unit coords); navigate first in a separate `eval`, then read in the next call.

**`preview_start` vs a hand-backgrounded dev server collide on port 3000.** Stop the background
task (TaskStop) AND `pkill -f next-server` before `preview_start`, or it errors ("Another next
dev server is already running") and falls back to 3001.

---

## UI-polish verification tooling (phase 6.5, 2026-06-01)

**A CSS edit not reflecting on the dev server is usually a stale Turbopack `.next` cache,
not a styling mistake — verify the *computed* style before re-tuning the CSS.** Spent a cycle
"fixing" an inline-code accent color that looked gray in screenshots; the rule on disk was
correct but the running server served the old compiled CSS. The decisive check was reading
`getComputedStyle(el).color` via playwright-cli `eval` — it returned the OLD token, proving
the edit wasn't live. Fix: `preview_stop` → kill `next-server` → `rm -rf .next` → `preview_start`
→ re-probe. **Probe computed values, don't judge color from a downscaled full-page screenshot**
(a dark accent like `#006e37` reads near-black on a small chip).

**`pkill -f next-server` self-matches its own command line → exit 15 (SIGTERM suicide).** The
pattern string `next-server` appears in the bash `-lc` argument, so `pkill -f` kills the very
shell running it. Use the bracket trick: `pkill -f 'next-serv[e]r'` (the literal `[e]` in the
cmdline doesn't match the regex). Same trap with `"next dev"`.

**MSYS path mangling on background dev-server starts.** `wsl -d ubuntu bash /home/...script.sh`
from the git-bash Bash tool rewrites the unix path to `C:/Program Files/Git/home/...` →
"No such file or directory". Prefix with `MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'` (already
in `windows-claude.md`, but easy to forget on `run_in_background` starts).

**Render-to-compare beats deciding-from-description for styling choices.** A throwaway
`src/app/scratch/<topic>/page.tsx` route showing variants side-by-side (both themes via the
localStorage theme flip) lets the user pick from real renders. Keep it non-committed and
`rm -rf src/app/scratch` after the decision. Use a narrow column + larger font in the scratch
page so chips/text are big enough to judge color at screenshot scale.

**Biome forbids `!important` (`lint/complexity/noImportantStyles`) — build fails on it.** Shiki's
default dual-theme dark override (`defaultColor:'light'`) writes inline token `color`, which can
only be beaten with `!important`. Use **`defaultColor: false`** instead: Shiki then emits *only*
CSS vars (no inline colors), so a plain `[data-theme="dark"] .shiki, .shiki span { color: var(--shiki-dark); … }`
override works with normal cascade — no `!important`, biome-clean. Verify the swap by counting
`distinctTokenColors` via `eval` in both themes (expect >1, and a theme-appropriate `.shiki` bg).

**Stop the dev server before `next build`.** A running dev server (preview or hand-started)
contends on `.next` with a production build. `preview_stop` + `pkill -f 'next-serv[e]r'` (bracket
trick avoids the self-kill), confirm `:3000` free, then build. Restart the dev server afterward
for render checks.

**Run full `biome check` + `next build` at the batch gate, not per commit.** Per-commit render
checks catch visual bugs but not lint/type errors (e.g. `!important`, import order, formatting).
`biome check --write <changed files>` auto-fixes format + organizeImports; the `noImportantStyles`
fix is "unsafe" (won't auto-apply) — fix the root cause by hand.

**Inline `$(seq …)` / `$(…)` in `wsl -d ubuntu bash -lc '…'` from git-bash gets MSYS-mangled**
(syntax error near the number). Use a literal loop bound, a script file, or wait on the
`run_in_background` task notification instead of polling with a mangled command.
