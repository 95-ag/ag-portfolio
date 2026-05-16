# Edit Patterns

Common maintainer operations with the correct approach for each.

---

## Add a token row to a Foundations table

1. Confirm with the user: token name, resolved value, role.
2. Find the correct table in the Foundations section.
3. Add the row in the appropriate position (group by semantic category if the table is ordered that way).
4. Check if the new token needs a corresponding Usage Notes entry — add one if so.
5. Diff summary: `ADDED: token row \`token-name\` to Foundations → Colors table`

---

## Update a token's resolved value

1. Find the token in the Foundations table.
2. Update the resolved value in the table.
3. Scan the rest of the document for inline references to the old resolved value (e.g., `(44px)` in prose) and update them.
4. Diff summary: `UPDATED: \`token.name\` resolved value old → new (N inline references updated)`

---

## Rename a token

This is a cross-reference-heavy operation. Read `references/cross-reference-rules.md` before proceeding.

1. Confirm the new name with the user.
2. Update the Foundations table.
3. Find and replace all references in the document.
4. Find and replace in sibling docs named by the user.
5. Diff summary lists every touched location.

---

## Add a new component section

1. Identify the correct location within the Components section (alphabetical, or by category if the section is grouped).
2. Write the component entry following the contract format:
   - `### \`component-name\``
   - 1-line identity statement (not a heading)
   - 3–5 semantic bullets covering: visual identity, dimensions/tokens, usage context, interaction behavior, important constraints
   - Optional YAML spec block after the bullets
3. Confirm contextual usage examples are included.
4. Diff summary: `ADDED: component \`component-name\` to Components section`

---

## Remove a section or component

1. Confirm with the user — never remove without explicit instruction.
2. Check for cross-references to the removed section and update or remove them.
3. Diff summary: `REMOVED: section/component name — N cross-references updated`

---

## Propagate a terminology change

When a stable-vocabulary term is renamed (e.g., "tonal depth" → "tonal layering"):
1. Ask user to confirm the canonical new term.
2. Find all occurrences in the document.
3. Replace consistently.
4. Check sibling docs if named by the user.
5. Diff summary: `UNIFIED: "old term" → "new term" (N occurrences in DESIGN.md, M in sibling docs)`

Note: whole-doc terminology sweeps are better handled by the rewriter's Terminology Consistency Pass.

---

## Add a YAML spec block to an existing component

1. Confirm the component already has: name, identity statement, semantic bullets.
2. Place the YAML block after the bullets, not before or between them.
3. Diff summary: `ADDED: YAML spec block to \`component-name\``

---

## Fix or update a cross-reference

E.g., a broken `Foundations → Colors → Usage Notes` path after a heading rename.

1. Find the broken reference.
2. Trace the correct current heading path.
3. Update the reference.
4. Scan for other instances of the same broken path.
5. Diff summary: `UPDATED: cross-reference "old path" → "new path" (N occurrences)`

See `references/cross-reference-rules.md` for heading-path format rules.

---

## Add/modify a section in Iteration Notes

Iteration Notes use bullet-first, concise, non-defensive writing. No prose walls.

1. Add or update the relevant bullet or entry.
2. Do not restructure surrounding content.
3. Diff summary: `UPDATED: Iteration Notes — [description of what changed]`
