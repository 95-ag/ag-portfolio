# Lessons — Patterns from Corrections

Append-only. Each entry: the rule, why it exists, how to apply it.

---

## Visual verification

**Browser rendering is required for any visual check.** Grep, curl, and HTML inspection confirm structure — they cannot confirm layout, spacing, or readability. Use playwright for all rendered-page verification.

**Do not infer the verification method from the tool name.** A skill named `playwright-cli` does not mean playwright ran. Confirm from session history what actually produced any prior render.

**Label conclusions by how they were reached.** "Inferred from image dimensions" and "confirmed by browser render" are not the same confidence level. State which applies.

**If browser rendering is unavailable, stop.** Do not substitute pixel analysis or HTML inspection for questions that require a rendered page. State the blocker explicitly.

---

## File scope

**Files outside the repo are not project-owned.** `tmp/`, extracted assets, and sibling directories require explicit scope confirmation before modification. Read access does not imply write permission.

**Confirm asset provenance before any downstream work.** Before analyzing an extracted asset: confirm the PDF page, the image object, and that the output matches the expected content. A corrupted extraction invalidates all analysis built on it — re-extract from source, never patch.

**`tmp/` files are read-only reference material.** PDFs, extracted text, and slide exports are source references, not project deliverables.

---

## Asset generation order

**Propose a visual plan and get approval before generating anything.** Generating first and reviewing after produces assets the user must reject. Correct order: read SKILL.md → write tasks → inventory source material → propose plan with rationale → get approval → generate.

**`tasks.md` must exist before the first file write.** Plan approved → write `tasks.md` → mark first task in_progress → then edit files. This rule has been violated four times.

**Propose commit clusters in chat and wait for approval before touching the index.** Staging or committing without a proposal is a process violation. This rule has been violated two times.

---

## Task and session discipline

**`tasks.md` is the source of truth; harness tools mirror it.** Tick `tasks.md` first, then update the harness task. Never use harness tools alone.

**`session.md` is updated at every checkpoint** — each checkbox flip, each user approval, before each commit. Not at session end.

**Verification is a literal checklist, not a formality.** Run every item in the plan's Verification section before proposing a commit.

**Read `lessons.md` at the start of any task touching workflow, tasks, or git.** Writing lessons without reading them is useless. All three files (`session.md`, `tasks.md`, `lessons.md`) are auto-loaded via `@` imports in `.claude/CLAUDE.md`.

**Write lessons when the correction lands, not at session end.**

---

## Tooling safety

**Diagnose tool failures before changing global config.** Identify what the working method was and why it appears unavailable before proposing any fix.

**Global config changes (`~/.claude/settings.json`, `claude mcp add`) require explicit user approval.** Propose, explain, wait.

**Never use `--break-system-packages`, `--force`, or equivalent override flags without permission.** Safe alternatives in order: `strings` → `pip install --user` → project venv → `/tmp` venv.

---

## Workflow discipline

**Status questions are not task assignments.** "whats next", "where are we", "status?" — answer and stop. A task begins only when the user says "do X".

**"Complete" means user approval, not build pass.** Never mark a stage done without explicit sign-off in chat.

**Plan mode is the default.** Skipping it requires deliberate justification. "Feels small" is not justification.

**Process rules belong in stable docs.** Approval gates and execution order belong in `.claude/CLAUDE.md` or project `CLAUDE.md` — not in `session.md`, which is rewritten each session.

---

## Cover generation

**Background asset and composition layer are separate.** The background image is generated; logos and metadata are rendered by the HTML/CSS composition layer via the `logos[]` frontmatter field. Never bake logos or text into the background image.

**The Refine step is not optional.** Workflow: Extract → Suggest → **Refine with user** → Generate → Compose → Export. Jumping from Suggest to Generate skips the step where the user shapes the direction.
