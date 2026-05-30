# Lessons — Patterns from Corrections

Append-only. Each entry: the rule, why it exists, how to apply it.

---

## 2026-05-30 — Repeated workflow failures: tasks, verification, checkpoints

**`tasks.md` is the source of truth for task tracking — harness tools (TaskCreate/TaskUpdate) mirror it, not replace it.**
Both must be used. `tasks.md` is higher priority — it is the persistent record. Harness tools provide live UI status. The correct sequence: write checkbox to `tasks.md` first, then create matching harness task. When checking off, tick `tasks.md` first, then mark harness task completed. Never use harness tools alone without `tasks.md`.

**`tasks.md` must exist before the first file edit — not after.**
Plan approved → create `tasks.md` with plan file path at top → mark first task in_progress in `tasks.md` and harness → then edit files. If `tasks.md` doesn't exist at the first edit, stop and create it first.

**`session.md` is updated after every checkpoint, not just at session end.**
Checkpoints = each `tasks.md` checkbox flip, each user approval, before any commit. Batching all updates to the end means the file is useless for session recovery mid-task.

**Verification is a step, not a formality — complete it before proposing a commit.**
The plan's Verification section is a literal checklist. Read every changed file. Check syntax against actual tool/API docs (e.g. `playwright-cli screenshot --filename=` not `--path`). Only propose commit after the checklist passes. Proposing first and verifying only when the user asks is backwards.

**Lessons are only useful if read — check `lessons.md` at the start of any task touching workflow, tasks, or git.**
Writing a lesson after a correction does nothing if it's never consulted. When starting a non-trivial task: read `session.md` AND `lessons.md` before writing a single line of plan or code.

**Fix (2026-05-30): `session.md`, `tasks.md`, `lessons.md` auto-loaded via `@` imports in `.claude/CLAUDE.md`. If violations recur, the import mechanism isn't working — try hook-based injection via `update-config` skill.**

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
