# Lessons — Patterns from Corrections

Append-only. Each entry: the rule, why it exists, how to apply it.

---

## 2026-05-28 — Workflow failures from "whats next" incident

**Status questions are not task assignments.**
"whats next", "where are we", "status?" = answer and stop. The user asked for information; they did not say "do it." A task begins only when the user explicitly assigns it. `session.md` → "Next Task" is a queue entry, not a brief.

**"Complete" means user approval, not build pass.**
Build passing proves the code works. It does not mean the user has reviewed and accepted the output. Never update `session.md` (or previously `PRIMER.md`) to mark something done without the user's explicit sign-off in chat.

**Plan mode is the default — not the exception.**
Skipping plan mode requires a deliberate justification. "This feels small" is not justification. Cover generation has 6+ steps and architectural decisions (background vs composition layer, metadata handling) — it is non-trivial. When in doubt, enter plan mode.

**`tasks.md` is required — it is not replaceable by session notes.**
If `tasks.md` doesn't exist at the start of a non-trivial task, the task hasn't been planned. Absence of `tasks.md` means stop and plan first.

**Cover system: background asset and composition layer are separate.**
The cover-system-guide.md specifies that HTML/CSS handles the metadata layer (logos, contributors, layout). The background image is a separate asset. Do not bake logos or metadata text into the rendered cover image — the `logos[]` frontmatter field is rendered by the composition system, not by the image generator.

**Cover generation workflow: Refine step is not optional.**
The workflow is: Extract → Suggest directions → **Refine with user** → Generate → Compose → Export. Jumping from Suggest directly to Generate skips the refinement step where the user shapes the final direction before any code runs.

**Process rules belong in stable docs, not in session state.**
Rules like approval gates and execution order were in PRIMER.md, which gets rewritten each session. They belong in `.claude/CLAUDE.md` or project CLAUDE.md — documents that persist and are not overwritten by session updates.
