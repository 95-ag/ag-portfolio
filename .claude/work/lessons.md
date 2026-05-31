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
