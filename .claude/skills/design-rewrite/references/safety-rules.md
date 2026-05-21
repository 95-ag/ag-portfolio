# Rewriter Safety Rules

These constraints exist to make information loss detectable and auditable. They are non-negotiable.

---

## Lossless by Default

Every paragraph, bullet, token, table row, and code example in the input must appear — semantically — in the output.

If content appears to be missing from the output, it must be accounted for in the change manifest as either:
- (a) relocated: `MOVED: source-anchor → destination-anchor`
- (b) merged: `MERGED: section-A + section-B → destination-anchor (reason)`
- (c) flagged duplicate awaiting confirmation: `FLAGGED: "…quote…" — possible duplicate of X`

The manifest is the audit trail. If something isn't in the manifest, it must be in the output.

---

## No Silent Deletion

If the model believes content is duplicative, redundant, or obsolete:
- Surface it to the user with a direct quote and a proposed action.
- Do not delete on its own judgment.
- Flagged content stays in the document until the user confirms removal.

---

## One Pass at a Time

A single invocation runs one of the five defined passes unless the user explicitly requests a combined pass.

Combined passes must segment the manifest with `--- PASS: name ---` dividers so each set of changes is independently auditable.

---

## Canonical-Ordering Preservation

Reordering must comply with the portfolio schema's canonical order:

```
YAML Registry → Overview → Foundations → [Semantic Systems] → Components → Domain Components → Interaction Rules → Accessibility Rules → Cross-Cutting Rules → Technical Conventions → Iteration Notes
```

Sections in `[brackets]` are optional or extension-position entries — their absence is not a violation. Reordering that places a section outside this sequence is rejected; the model surfaces the conflict and asks the user to decide.

---

## One-Time Architectural-Migration Carve-Out

The Section-Preserving Migrations default (see *Section-Preserving Migrations Preferred*) is suspended for an explicit Architectural Migration Pass. Cross-section restructuring across all boundaries is the entire point of that pass.

This suspension applies only to the Architectural Migration Pass (Pass 6). All other passes continue to default to section-preserving behavior.

---

## Terminology Is Auditable

Every replaced term is logged: `UNIFIED: "old phrase" → "new phrase" (N occurrences)`.

For whole-doc terminology passes, propose the full unification list and wait for user confirmation before applying.

---

## No New Content

The rewriter restructures and normalizes — it does not invent:
- new tokens
- new component sections
- new rules or constraints
- new design principles

If a structural gap suggests a section is missing, flag it: `FLAGGED: Section X appears to be empty/absent — no action taken`.

## Empty Placeholder Headings Are Not Structural Violations

A heading with no content is a placeholder — not an orphaned subsection, not a hierarchy violation, not grounds for a merge or deletion. Use `PLACEHOLDER` in the manifest and leave the heading in place. Do not conflate placeholder headings with structural problems that require rewriting.

The rewriter never invents content to populate placeholder headings. Population is the maintainer's job when explicitly user-directed.

---

## Tokens Are Sacred

Token names, hex values, px values, and frontmatter values are never altered by a rewriter pass except via an explicit terminology entry in the manifest with user confirmation.

---

## Section-Preserving Migrations Preferred

When restructuring, prefer migrations that keep existing section boundaries intact.

Cross-section consolidation (merging two distinct sections into one) requires:
- Duplication that is **substantial and explicit** — the same information, not just the same concept area.
- User confirmation before merge is applied.

Overlapping concept scope alone is not grounds for merge. When in doubt: flag and leave separate.

---

## Anchors and Link Integrity

Any heading rename emits a redirect entry in the manifest:
`RENAMED: "## Old Name" → "## New Name" — update cross-references`

It is the user's responsibility to propagate heading renames to sibling docs (CLAUDE.md, PRIMER.md, rules files), but the manifest must make every rename visible.
