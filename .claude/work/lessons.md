# Lessons — Patterns from Corrections

> This file holds **portfolio-pipeline lessons** (the 4 project skills) and **project skill-authoring
> lessons** (building/maintaining this repo's skills — design-*, spec-write).
> General web/Next/WSL/tooling lessons live in the CLAUDE rules — promote there, not here:
> `rules/frontend.md`, `rules/build-verification.md`, `rules/design-system.md`,
> global `windows-claude.md` / `CLAUDE.md`.
>
> **Format:** One entry per lesson. Lead with the rule. Keep it to 2–3 lines max.
> Add/remove as patterns are confirmed or invalidated.

---

## Asset generation order

**Propose a visual plan and get approval before generating anything.** Generating first and reviewing after produces assets the user must reject. Correct order: read SKILL.md → write tasks → inventory source material → propose plan with rationale → get approval → generate.

---

## Cover generation

**Background asset and composition layer are separate.** The background image is generated; logos and metadata are rendered by the HTML/CSS composition layer via the `logos[]` frontmatter field. Never bake logos or text into the background image.

**The Refine step is not optional.** Workflow: Extract → Suggest → **Refine with user** → Generate → Compose → Export. Jumping from Suggest to Generate skips the step where the user shapes the direction.

**Measure geometry for annotation placement with `getBBox`.** Read element geometry via playwright-cli `eval` (returns viewBox-unit coords) — navigate first in one `eval`, then read in the next call.

---

## Biome JSX suppression — multiline elements

**`{/* biome-ignore rule */}` only suppresses single-line elements.** For multiline JSX, the lint error fires on the attribute line (not the element tag), so the sibling comment doesn't reach it — biome reports both `suppressions/unused` and the original error.
**Fix: use `biome.json` overrides scoped to the specific files** — not a global rule disable, which silently removes the safety net everywhere else.

---

## Skill authoring

**Name a skill with an action and a non-colliding prefix.** A noun-only name (`project-docs`) reads as a thing, not a tool, and `project-*` collided with the portfolio `project-content-extraction`/`-review`/etc. Mirror the working pattern: `<domain>-<verb>` like `design-update` / `spec-write`.

**skill-creator's description-optimization loop does not fire in this Claude CLI build.** Its trigger-eval (`run_eval`/`run_loop`) proxies a skill via a temp slash-command, which this CLI doesn't auto-invoke for a plain query — so even an obvious positive scores 0/N (confirmed under `--model opus`, isolated cwd; `claude -p` itself works). All-zero signal would optimize a description against noise. Rely on a fresh-eyes triggering review instead; revisit the loop only on a compatible harness/CLI.

---

## Skill maintenance — generalize, don't overfit

**Skill standards are principles, not one project's recipe.** When folding per-project learnings into a frozen skill, each item enters as a principle or *conditional* guidance ("when a project needs X, consider Y") — never as project-specific constants, a composition-specific tactic hardened into a universal rule, or a mandate every run must follow. Default to the most general framing and let the user tighten, not loosen.

**Separate the general rule from the scene/project it came from.** A learning captured while building one cover often contains a genuinely general rule wearing a project costume (e.g. a static-generation `Math.random` constraint hidden inside "road scene" notes). Lift the general part into general guidance so it survives for unrelated cases; keep only the truly domain-specific part conditional.

**Neutralize worked examples.** Illustrative examples lifted verbatim from the source project (its exact metric, its vanishing point) read as bias. Keep the principle, swap the example for a neutral one or label it clearly illustrative.

**Two checks before deleting scratch notes.** (1) A disposition table mapping every note to incorporated / intentionally-rejected / project-specific — confirm zero information loss, noting where the authoritative copy now lives (e.g. committed component, not the note). (2) A separate-agent fresh-eyes review of the updated skill for self-containment, consistency, stale refs, and overfit. Run both, report findings, then propose deletion.
