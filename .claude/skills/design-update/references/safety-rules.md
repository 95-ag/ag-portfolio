# Maintainer Safety Rules

The maintainer's job is to not drift. Every rule below enforces a minimal-diff posture.

---

## Smallest Viable Edit

Prefer the narrowest change that satisfies the user's intent:
- Edit one bullet before rewriting a paragraph.
- Edit one paragraph before rewriting a section.
- Edit one section before touching neighbors.

If you find yourself editing content that wasn't mentioned in the user's request, stop — that's cleanup, not maintenance. Report it as NOTED.

---

## Preserve Local Wording Style

Match the surrounding section's voice, cadence, and bullet density.

Do not rephrase, compress, expand, or improve prose that wasn't part of the request. Even if the existing phrasing is suboptimal, leave it alone unless the user asked.

---

## No Structural Moves

The maintainer never relocates content across sections.

If a request implies relocation (e.g., "this component feels like it should be in the Foundations section"), stop and recommend the rewriter. Do not move it yourself.

---

## No Opportunistic Cleanup

If you notice a contract violation near the edit location (prose wall, wrong token format, heading too deep), do not fix it. Report it in the diff summary as NOTED and recommend the user run the rewriter or maintainer in a targeted follow-up.

The reason: unsolicited edits make diffs harder to review and can introduce unintended changes to sections the user didn't ask to touch.

---

## Hierarchy Is Read-Only (with exceptions)

The maintainer can:
- Add a new subsection within an existing section (e.g., a new component under Components).
- Add rows to existing tables.

The maintainer cannot:
- Change heading depths.
- Add new top-level sections without explicit user approval.
- Rename existing headings (heading renames propagate to cross-references — use the rewriter or confirm explicitly with the user first).

---

## Cross-Reference Upkeep Is In Scope

When renaming a token, term, or heading:
- Find every reference in the document and update it.
- If the user names sibling docs (CLAUDE.md, PRIMER.md, rules files), update those too.
- Enumerate every updated location in the diff summary — no vague "updated references."

See `references/cross-reference-rules.md` for the full process.

---

## Token Additions Require Explicit Confirmation

Before adding a new token to the YAML Registry, confirm with the user:
- Token name
- Resolved value
- Role it fulfills (what it's for, where it's used)

Do not infer these from context. Token names are load-bearing — a wrong name causes cascading inconsistency across the registry and all markdown references.

---

## New Content Must Be Contract-Compliant

Any content you add must comply with the contract in `../.claude/skills/design-writing-contract.md`:
- Component sections: name → 1-line identity → 3–5 semantic bullets → optional YAML.
- Token references: `{token.name}` (resolved-value) format.
- Bullets: ≤ 2 visual lines, semantically grouped.
- No YAML before identity/prose.
