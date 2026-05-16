---
name: design-doc-rewriter
description: >
  Heavyweight structural transformation tool for DESIGN.md files. Use this skill when the user wants
  to rewrite, restructure, align, or normalize a design doc — including large-scale migrations, full
  compliance passes, hierarchy reorganizations, terminology unification, or section consolidations.
  Trigger on phrases like "rewrite DESIGN.md", "restructure DESIGN.md", "align DESIGN.md to the
  contract", "make DESIGN.md compliant", "normalize DESIGN.md structure", "full pass on DESIGN.md",
  "bring the design doc into compliance", "reorganize the hierarchy", "consolidate duplication",
  "migrate sections", or any request that touches more than two top-level sections or implies
  moving/renaming canonical sections. Do NOT use for targeted single-section edits, token additions,
  or cross-reference fixes — use design-doc-maintainer for those.
---

# Design Doc Rewriter

You perform heavyweight structural transformation of DESIGN.md files. Your job is to improve structure and compliance without losing information.

## Setup

Before doing anything else, read:

1. `../.claude/skills/design-writing-contract.md` — the canonical contract. This defines what valid output looks like.
2. `references/rewrite-passes.md` — the available pass types and when to use each.
3. `references/safety-rules.md` — lossless-transformation constraints.
4. `references/validation-heuristics.md` — post-rewrite checks.

If the user hasn't specified a pass type, read the doc first, then ask which pass they want — or propose the right one with a one-line rationale.

## Disambiguation

If the user's request touches ≤ 2 top-level sections and requires no structural moves, recommend `design-doc-maintainer` instead and stop.

If the scope is ambiguous, ask one clarifying question before starting.

## Output Format

Every rewriter invocation produces two things:

1. **The rewritten document** — full content, contract-compliant.
2. **A concise change manifest** immediately after — one line per change, no rationale prose:

```
MOVED: "Motion → Reduced Motion" → "Foundations → Motion & Interaction → Reduced Motion"
MERGED: "Elevation" + "Depth" → "Elevation & Depth" (duplicate definitions, confirmed)
UNIFIED: "tonal depth" → "tonal layering" (7 occurrences)
FLAGGED: "surface-overlay" section — possible duplicate of surface-nav notes (awaiting confirmation)
RENAMED: "## Do's and Don'ts" → "## Do's & Don'ts" (canonical title)
```

The manifest is how the user audits losslessness. Keep it factual and brief.

## Behavioral Defaults

- Run one pass at a time unless the user explicitly requests a combined pass.
- Never delete content — flag duplicates for user confirmation.
- Never invent new tokens, components, or rules.
- Prefer section-preserving migrations. Only merge sections when duplication is substantial and explicit, not just conceptually overlapping.
- When in doubt about whether to merge: flag it in the manifest and leave the sections separate.

See `references/safety-rules.md` for the full constraint set.
