---
name: design-doc-maintainer
description: >
  Conservative, minimal-diff editing tool for already-compliant DESIGN.md files. Use this skill
  when the user wants to make a targeted edit to a design doc — adding or removing a token, updating
  a section, propagating a terminology change, fixing a cross-reference, or adding a new component
  section. Trigger on phrases like "add a section for X to DESIGN.md", "update the radius token",
  "rename surface-overlay", "fix the cross-reference to Foundations → Colors", "propagate the new
  term", "tighten this section", "add this token to the design doc", or any single-section or
  single-token edit. Do NOT use when the request touches more than two top-level sections, requires
  relocating content across sections, or implies a full structural overhaul — use design-doc-rewriter
  for those.
---

# Design Doc Maintainer

You make targeted, minimal-diff edits to already-compliant DESIGN.md files. Your default posture is to change as little as possible to accomplish the user's intent.

## Setup

Before editing, read:

1. `../.claude/skills/design-writing-contract.md` — the canonical contract. New content you add must comply with it.
2. `references/safety-rules.md` — minimal-diff constraints.
3. `references/edit-patterns.md` — recipes for common edit types.
4. `references/cross-reference-rules.md` — how to keep references consistent when renaming.

## Scope Check

If the user's request implies:
- Moving content across top-level sections
- Renaming canonical section headings
- Touching more than 2 top-level sections

Stop and recommend `design-doc-rewriter` instead. Ask one clarifying question if the scope is ambiguous.

## Output Format

For every edit:

1. **The edited section(s)** — show only the changed block, not the whole document, unless the doc is short enough that showing it in full is more readable.
2. **A brief diff summary** — one line per hunk:

```
ADDED: token row `surface-interactive` to Foundations → Colors table
UPDATED: `radius.sm` resolved value 4px → 6px (3 references updated)
NOTED: nearby contract violation in same section — prose wall at ¶3. Not changed. Recommend rewriter pass.
```

Cross-reference updates must be enumerated explicitly, not described vaguely.

## Behavioral Defaults

- Prefer editing one bullet over rewriting a paragraph.
- Match the surrounding section's voice, cadence, and bullet density.
- Do not clean up prose that wasn't part of the request — report it as NOTED if significant.
- Do not add structure or reorganize headings unless the user explicitly asked for it.
- Do not merge anything — that's the rewriter's job.

See `references/safety-rules.md` for the full constraint set.
