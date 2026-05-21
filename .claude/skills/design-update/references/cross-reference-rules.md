# Cross-Reference Rules

DESIGN.md uses heading-path style for cross-references: `Section → Subsection → Sub-subsection`.

These appear in:
- DESIGN.md itself (inline references to other sections)
- CLAUDE.md (project config)
- PRIMER.md (session state)
- `.claude/rules/design-system.md` and other rules files

When any heading or token name changes, all references must be updated in the same edit.

---

## Heading Path Format

Canonical format: `Section → Subsection → Sub-subsection`

Examples:
- `Foundations → Colors → Usage Notes`
- `Foundations → Elevation & Depth → Backdrop-Blur Carve-out`
- `Components → button-primary`

Rules:
- Use `→` as separator (not `/` or `>`).
- Match the heading text exactly, including capitalization and punctuation.
- Omit levels that are not needed for disambiguation.

---

## Finding All References

When renaming a heading or token, search:

1. DESIGN.md — all inline mentions and any embedded cross-references.
2. CLAUDE.md — often references DESIGN.md sections in rules tables.
3. PRIMER.md — may reference current section paths.
4. `.claude/rules/design-system.md` — frequently references token names and section paths.
5. Any other sibling docs the user names explicitly.

Use a case-sensitive search for the exact heading text to avoid false positives.

---

## Updating References

When a heading changes: `"Old Section Name"` → `"New Section Name"`

Update every occurrence of the old heading path. This includes:
- Exact-match references: `Foundations → Old Section Name`
- Prefixed references: `see Foundations → Old Section Name → Usage Notes`

Do not update prose that happens to use the old words in a different context (e.g., "old section name describes...").

---

## Enumeration in Diff Summary

Every cross-reference update must be listed individually in the diff summary. No vague "updated references."

Format:
```
UPDATED: cross-reference "Foundations → Old Name" → "Foundations → New Name" in DESIGN.md (2 occurrences)
UPDATED: cross-reference "Foundations → Old Name" → "Foundations → New Name" in .claude/rules/design-system.md (1 occurrence)
```

---

## Token References

Token name changes follow the same rules. Search for the token name in backtick format: `` `token-name` ``.

Also check for resolved-value inline mentions (e.g., `(44px)`) if the resolved value changed too. Token values are defined in the YAML Registry — update the registry first, then propagate to markdown body inline mentions.

---

## Post-Migration Sibling Doc Updates

After a structural migration of DESIGN.md (e.g., the Architectural Migration Pass), every heading-path reference in sibling docs may be outdated.

Before running a large structural migration, the agent SHOULD ask the user which sibling docs, rule files, prompts, or automation configs depend on DESIGN.md heading paths or token names. Cross-reference propagation must adapt to the project ecosystem — not a hardcoded file inventory.

At minimum, check all sibling docs that reference DESIGN.md heading paths or token names. In this portfolio project, that includes files such as `.claude/CLAUDE.md`, `PRIMER.md`, and files in `.claude/rules/` — but the user's project may have additional dependents (automation scripts, prompt templates, other rule files) that the agent cannot enumerate independently.

Cross-reference propagation is in scope for the migration pass, not pre-migration contract work. After migration, verify that every heading path in sibling docs resolves to a real heading in the updated DESIGN.md.
