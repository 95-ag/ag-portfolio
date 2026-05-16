# Rewriter Validation Heuristics

Run these checks after producing the rewritten document, before reporting done. Failed checks surface as a short remediation list.

---

## Structural

- Canonical top-level ordering preserved: `YAML Registry → Overview → Foundations → [Semantic Systems] → Components → Interaction Rules → Accessibility Rules → Cross-Cutting Rules → Technical Conventions → [Domain Extensions] → Iteration Notes`. Bracketed entries are optional or extension-position.
- All required portfolio spine sections present (YAML Registry, Overview, Foundations, Components, Interaction Rules, Accessibility Rules, Cross-Cutting Rules). Domain extensions (Long-form Reading Layout, Editorial Composition, Project Detail Layout, About Layouts) appear after the spine.
- No heading deeper than H4.
- No duplicate section titles within the same parent.

## Two-Layer Model

- Top-of-document YAML Registry present and contains globally reusable canonical tokens (color tokens, typography tokens, spacing/radius/motion/breakpoint/z-index scales, focus-ring spec).
- Markdown body does not duplicate token *values* from the registry. Token *names* may be referenced freely.
- Local structural-spec YAML inline (component spec blocks, per-elevation specs, grid specs, semantic-systems mappings) is permitted — this is not a two-layer violation.
- No single monolithic YAML superblock — the registry collects globally reusable tokens, not every YAML block in the document.

## Semantic Systems (advisory)

- When `# Semantic Systems` exists, its subsections SHOULD NOT be silently duplicated in Foundations or Components. If a semantic role table has a canonical home in Semantic Systems, other locations must reference or specialize it — not restate it verbatim. Flag duplicates; do not auto-remove.
- Absence of `# Semantic Systems` is not a violation — semantic role tables may legitimately remain colocated in Foundations.

## Interaction Rules

- Global hover/focus/disabled/loading/responsive *defaults* are consolidated under `# Interaction Rules`. Flag duplication of defaults across multiple locations.
- Component-local interaction nuances (deviations from or specializations of the baseline) may live with the component. Do not flag component-local nuance as a duplication violation.

## Domain Extensions

- Domain extensions appear strictly after the canonical spine — not interleaved between canonical sections.
- Each domain extension SHOULD primarily extend, specialize, or compose one or more canonical spine systems. Domain extensions that function as compositional overlays or editorial orchestration systems spanning multiple canonical foundations are valid; a strict one-to-one parent relationship is not required.

## Technical Conventions Scope

- The `# Technical Conventions` section contains only implementation policy (rendering, MDX, build/runtime, performance UX, animation-rendering constraints).
- Token registries, component specs, and behavioral rules appearing inside Technical Conventions are misplaced — flag for relocation.

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

---

## Rewrite Judgment Heuristics

These are preferences and guidelines, not hard rules. Apply them with judgment — context overrides heuristic.

**Subsection density.** If a subsection's content has been reduced to ≤3 bullets and carries no independent spec or structure warranting future expansion, consider collapsing it into the parent section. Flag rather than act unilaterally.

**Labelled groups vs headings.** Small parallel rule clusters (≤3 bullets each, similar weight) often read better as bold-label bullet groups (`**Photography**` / `**Diagrams**`) than as H3/H4 headings. Prefer the group form when the clusters are genuinely parallel and brief.

**Prose removal threshold.** Remove interpretive prose when the nearby table or spec already expresses the behavior clearly. Do not remove prose that adds framing, interpretive context, or cross-cutting rules not visible in the table itself.

**Content-sufficiency language.** Do not describe sections as "thin", "underdeveloped", or "near-empty" in pass output or manifests. A short section is not a structural problem. Use `PLACEHOLDER` for empty headings; otherwise leave content-sufficiency judgments out of the manifest entirely.
