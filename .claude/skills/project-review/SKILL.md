---
name: project-review
description: >
  Runs the two-pass content review on a completed portfolio MDX page — a cold technical-recruiter
  pass and a cold technical-hiring-manager pass, run as separate subagents with no shared context,
  followed by conflict surfacing and a prioritized fix list.

  Use this skill when the user says things like "review the content", "run the reviewers",
  "QA the page", "final review", "check the MDX", "does this read well", "is the content
  ready", or "review model-extraction-attacks". Fire whenever a portfolio project page is
  being evaluated for quality, credibility, or readiness — even if the user just says
  "look this over" while a project MDX is in scope. Do NOT fire for asset generation,
  cover generation, or page layout issues.
---

# Project Review

You run the final content QA gate on a portfolio project page. The output is a structured
review from two independent cold subagents, with conflicts surfaced and a prioritized fix list.

## Before running — read this reference

**`references/review-protocol.md`** — the full Step 3 review protocol: reviewer separation
rules, conflict-surfacing logic, common drift patterns, and what to do with the findings.
Read this before spawning any subagents.

## Assets — verbatim reviewer prompts

The two reviewer prompts live in `assets/`:

- **`assets/reviewer-recruiter.md`** — Reviewer 1 (technical recruiter, 30-second scan)
- **`assets/reviewer-technical.md`** — Reviewer 2 (technical hiring manager)

Use these **verbatim** as the cold subagent's initial message. Do not paraphrase or shorten them.
Append the MDX file path (and PDF report path if available) after the verbatim prompt text.

## Procedure

### Step 1 — Identify inputs

Confirm with the user (or infer from context):
- MDX file path (e.g., `content/projects/model-extraction-attacks.mdx`)
- PDF report path if available (pass to Reviewer 2 only — Reviewer 1 has no ML background)

### Step 2 — Spawn both reviewers simultaneously

Spawn two subagents in the same turn — do not run them sequentially:

**Subagent 1 (recruiter):**
- Use `assets/reviewer-recruiter.md` verbatim, then append: `\nMDX file: <path>`
- The subagent should read the MDX and return the formatted RECRUITER REVIEW block

**Subagent 2 (technical):**
- Use `assets/reviewer-technical.md` verbatim, then append: `\nMDX file: <path>` and
  `\nPDF report: <path>` if a report is available
- The subagent should read the MDX and PDF, trace every metric, and return the formatted
  TECHNICAL REVIEW block

Do not let either subagent see the other's output.

### Step 3 — Surface conflicts and present findings

After both return, present the results per `references/review-protocol.md`:

1. Show both review blocks in full
2. Identify any **conflicts** — items where Reviewer 1 wants plainer language but Reviewer 2
   passed as technically precise (or vice versa). Do not auto-resolve conflicts.
3. Identify **high-priority items** — anything flagged by both reviewers independently
4. Present a **prioritized fix list**: high-priority (both flagged) → conflicts → single-reviewer
   flags → reviewer-specific suggestions

### Step 4 — Stop and hand off

Stop after presenting findings. Do not start editing the MDX. The user decides which fixes
to apply and in what order.

## Validation — check before handing off

- Both subagents spawned in the same turn (true parallelism, no shared context)
- Verbatim prompts used — no paraphrasing
- Both review blocks shown in full before conflict analysis
- Conflicts identified explicitly — not resolved or merged
- Fix list is prioritized, not a flat dump
