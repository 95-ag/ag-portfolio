# Rewrite Passes

Five pass types. Run one per invocation unless explicitly combined.

---

## 1. Structure-Only Pass

**Purpose:** Reorganize section hierarchy and ordering without altering prose content.

What changes:
- Top-level and subsection ordering aligned to canonical schema.
- Orphaned subsections relocated to correct parent.
- Heading levels normalized (no deeper than H4).
- Duplicate section titles resolved.

What does NOT change:
- Paragraph content, bullet text, token values, tables — untouched.
- Terminology — unchanged (use the Terminology pass for that).

**Empty placeholder headings** — headings with no content are a distinct category. Do not classify them as structural violations requiring moves or merges. Flag them using `PLACEHOLDER` (see Manifest Entry Types below) and leave them in place.

Manifest entries: MOVED, REORDERED, RENAMED (heading only), PLACEHOLDER.

---

## Manifest Entry Types

Use these exact entry types across all passes. Keep each entry to one line.

| Entry | When to use |
|---|---|
| `MOVED` | Content relocated from one section to another |
| `REORDERED` | Section moved within its parent without content change |
| `RENAMED` | Heading text changed — cross-references need updating |
| `MERGED` | Two sections consolidated (requires user confirmation) |
| `SPLIT` | One section divided into two |
| `UNIFIED` | Terminology replaced doc-wide (old → new, count) |
| `COMPRESSED` | Prose or bullets reformatted for compression |
| `REFORMATTED` | Token format, YAML, or component structure normalized |
| `MERGED-BULLETS` | Fragmented bullets combined into semantic clusters |
| `REMOVED-DUPLICATE-YAML` | YAML block removed because prose covers same content |
| `PLACEHOLDER` | Empty heading with no content — flagged, not moved, not deleted |
| `FLAGGED` | Potentially duplicative content — user confirmation required before action |
| `NOTED` | Observation outside the pass scope — no action taken |

**`PLACEHOLDER` vs `FLAGGED`:** Use `PLACEHOLDER` exclusively for empty headings. Use `FLAGGED` for headings or sections that have content but may be duplicative or misplaced. Never conflate the two.

---

## 2. Normalization Pass

**Purpose:** Apply the contract's formatting rules to prose, bullets, and YAML.

What changes:
- Prose walls broken into bullets or compressed to ≤ 5 lines.
- Bullets exceeding 2 visual lines compressed.
- Components reordered to: identity statement → semantic bullets → YAML spec.
- YAML blocks that duplicate prose removed (prose preserved, YAML removed).
- Semantically fragmented bullets merged into compact clusters.
- Token references reformatted to `{token.name}` (resolved-value) style.

What does NOT change:
- Section structure, heading text, ordering — use Structure pass first.
- Terminology — use Terminology pass.

Manifest entries: COMPRESSED, REFORMATTED, MERGED-BULLETS, REMOVED-DUPLICATE-YAML.

---

## 3. Section-by-Section Rewrite Pass

**Purpose:** Deep rewrite of one named section (or all sections sequentially) for contract compliance.

Scope: user specifies target section(s). If whole-doc, process top-level sections one at a time and list each in the manifest.

What changes:
- Section content rewritten to match writing mode for its category (see contract § Section-Type Writing Modes).
- Anti-patterns removed.
- Component sections brought to: name → 1-line identity → 3–5 semantic bullets → optional YAML.

What does NOT change:
- Canonical ordering, heading text, tokens — structural changes go in Structure pass.

Manifest entries: REWRITTEN (section name), COMPONENT-REFORMATTED, ANTI-PATTERN-REMOVED.

---

## 4. Migration / Reorganization Pass

**Purpose:** Move content from one structural layout to another — e.g., adopting a new top-level taxonomy.

Use when: the user wants to adopt the canonical portfolio schema, merge subsections across sections, or split an oversized section.

Rules:
- Prefer section-preserving migrations. Keep existing section boundaries unless duplication is substantial and explicit.
- Every content move is logged with source → destination anchor.
- Content that doesn't fit the new layout is flagged, not discarded.

Manifest entries: MOVED (source → destination), SPLIT, MERGED (only when approved), FLAGGED.

---

## 5. Terminology Consistency Pass

**Purpose:** Unify synonym drift across the whole document.

What changes:
- Identifies multiple phrases used for the same concept.
- Proposes canonical term (from contract stable-terminology vocabulary or project-local vocabulary).
- Replaces all occurrences after user confirms the mapping.

Output before replacement:
- List proposed unifications: `"tonal depth" → "tonal layering" (5 occurrences)`
- Ask for confirmation before applying.

Manifest entries: UNIFIED (old → new, count).

---

## Combined Passes

If the user requests more than one pass, run them in this order:
1. Structure-Only
2. Migration (if needed)
3. Normalization
4. Section-by-Section Rewrite
5. Terminology

Segment the manifest by pass type with a `--- PASS: name ---` divider.
