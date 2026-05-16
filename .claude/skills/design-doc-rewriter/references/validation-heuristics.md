# Rewriter Validation Heuristics

Run these checks after producing the rewritten document, before reporting done. Failed checks surface as a short remediation list.

---

## Structural

- Canonical top-level ordering preserved (Overview → Foundations → Layout & Composition → Do's & Don'ts → Components → Accessibility → Technical Conventions → Iteration Notes).
- All required portfolio sections present.
- No heading deeper than H4.
- No duplicate section titles within the same parent.

## Compression

- No paragraph exceeds 5 visual lines.
- No bullet exceeds 2 visual lines.
- No component has more than 6 semantic bullets before a YAML spec block.
- No uninterrupted YAML block spans more than ~20 lines without a prose break.

## Tokens & Terminology

- Token references use `{token.name}` (resolved-value) format wherever the contract requires it.
- No new tokens introduced that aren't declared in the Foundations section.
- Stable vocabulary is consistent across the doc — no synonym drift introduced by the rewrite.

## Lossless

- Token inventory: every token name present in the input appears in the output (or is logged in the manifest as a terminology unification).
- Table row counts: preserved unless the manifest documents a merge.
- Every input section's semantic content is traceable to an output location or a manifest entry.

## Manifest Completeness

- Every structural change in the output has a corresponding manifest entry.
- No manifest entry references a location that doesn't exist in the output.
