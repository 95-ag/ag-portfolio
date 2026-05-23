# Project Extraction Workflow

Operational guide for converting a research project (report + repo + user context) into a schema-aligned portfolio MDX. Refined from the `model-extraction-attacks` pass.

---

## Sequencing

```
Source intake → MDX (fresh) → [stop: user approval] → Assets → [stop: user approval] → Hero cover
```

Never skip approval checkpoints. Never start assets before content is approved. Never start hero cover before assets are stable.

---

## Step 1 — Source Intake

**Sources in priority order:**

| Source | Use for |
|---|---|
| Report / paper PDF | All metrics, structure, figures, author/institution facts |
| Repository | Framework names, dataset names, file structure, README claims |
| User clarification | Ownership, links, logo permissions, metric framing choices, tone |

**Do first:**
- Dump PDF text; read end-to-end before writing anything
- Inventory all tables → these are the only authoritative metric sources
- Inventory all figures → these determine what assets can be regenerated vs. must be cropped
- Scan repo: README, training script, dataset names, framework versions
- Build a numeric-claim correction log if a prior draft exists — this is audit-only, not a transformation map

**Human clarification is typically needed for:**
- GitHub URL (fork vs. original vs. org repo)
- Co-author inclusion (skip by default unless asked)
- Logo / brand asset permissions
- Title framing (paper title vs. recruiter-readable)
- Metric framing when multiple defensible headlines exist

---

## Step 2 — MDX Content Build

**Discard existing body. Start fresh.**

The old MDX body is reference material, not a transformation input. Prior drafts accumulate errors, academic phrasing, and structural drift. Rebuilding fresh against the source is faster and more reliable than editing.

Keep only the file path and any frontmatter fields that are already correct.

**Standard H2 spine for ML projects (default order — reorder only when readability clearly improves, sections optional):**

1. Detailed Problem
2. Background
3. Architecture
4. Data
5. Engineering Decisions
6. Algorithm & Training Design
7. Results
8. Constraints & Limitations
9. Next Steps

Project-specific content lives at H3/H4 under these H2s. H4 is used intentionally — only when a nested concept genuinely improves flow and can't be absorbed into prose.

**Frontmatter checklist before writing body:**
- Title: prefer recruiter-readable and action-led; use the paper title only if it's already clear and compelling on its own
- Summary: one sentence, specific metric, honest framing
- Tags: 4–5, no duplicates with stack
- Stack: languages / frameworks / libraries / tools — no CUDA as a library dependency
- Links: confirm GitHub URL with user; add paper PDF path if report is in `/public/`
- Logos: only with confirmed brand permission

**Standalone readability requirement:** a technical reader should not need the paper or repo open beside the portfolio page to understand the project.

**Narrative arc to verify:**
- Detailed Problem → why this matters and what makes it hard
- Architecture/Data → what was actually built and what fed into it
- Results → what the experiments showed, headline finding first
- Constraints → honest scope caveats, not defensive hedging
- Next Steps → where the work goes, not filler bullets

---

## Step 3 — Content Review (before assets)

Run two separate reviewer passes — do not blend them. Each reviewer should be cold (no shared context with the other).

**Reviewer 1: Non-technical / HR recruiter**

Check for:
- Is the business/threat framing legible without ML background? (add one plain-language sentence if not)
- Is the timeline/scope signal present? (lightweight — don't surface it prominently above the hero)
- Does the OOD or hardest experimental track have enough surface area?
- Are null results explained in plain language, not just reported?
- Does the Results section have a summary paragraph before the subsections?

**Reviewer 2: Technical hiring manager**

Check for:
- Are all metrics traceable to a source? (PDF table/figure cell, not prose interpretation)
- Are anomalies in results explained or explicitly flagged as unexplained?
- Is the victim/attacker interface clarified (simulated vs. real API)?
- Does the curve/trend description accompany chart references (not just endpoint values)?
- Is the strongest/most distinctive result identifiable at a glance?

**Common drift patterns to catch in review:**
- Fabricated speedup claims (e.g., "3× improvement") not in the source
- Overstatement of weak results ("meaningful but not perfect")
- Data-free success framing when the actual result was failure (30% accuracy ≠ convergence)
- Inline code noise in prose where tables or plain language would be cleaner
- Broken anchor links (verify slugs against the actual slugify function)

---

## Step 4 — Density Reduction Checklist

Run before finalizing content. Setup and configuration tables are a common density problem in long-form ML project pages — they accumulate before any results are established and slow reading momentum without adding analytical value.

**Tables that earn their place:**
- Two-column comparison with analytical content (e.g., victim vs. attacker normalization)
- Results data that can't be expressed as prose without losing precision
- OOD dataset construction breakdown with provenance notes

**Tables that should become prose:**
- Standard dataset properties (classes, image counts) — one sentence
- Architecture layer groups (blocks, channels, downsampling) — one sentence
- Hyperparameter dumps where only one parameter (e.g., cyclic LR) is actually interesting — pull that one into prose with its rationale, drop the rest

**Figures and tables on the same result:**
If a table already expresses the result precisely, the figure is redundant unless it shows something the table doesn't (trend shape, spatial layout, image examples). Remove the redundant one.

**Lists:**
- Prose lists should behave like prose (normal document flow, readable indent, text wraps naturally)
- Don't force prose lists into metadata-row flex layouts — those are for overview component bullets, which are a separate rendering context
- Ordered lists stay native and clearly ordered
- Visual consistency comes from token usage (marker color from `--outline-variant`), not from sharing implementation mechanics with overview bullets

---

## Step 5 — Asset Categorization

Before generating any asset, categorize every visual the MDX references:

| Type | When to use | Output |
|---|---|---|
| Mermaid flow | Sequential pipelines, stage diagrams, selection processes | SVG |
| matplotlib | Any result that has source numbers | SVG or PNG |
| Legacy crop | Figure exists in PDF but no raw data for regeneration | High-DPI PNG crop |
| Composition | Annotated layouts, side-by-side comparisons | PNG |

**Do not generate an asset without a source file** (Mermaid `.mmd`, Python script, or documented crop procedure). The one exception is legacy crops from PDF figures.

**Shared tooling to create once, reuse across all Phase-6 projects:**
- `assets-source/mermaid/_theme.*` — Mermaid theme config with site tokens
- `assets-source/matplotlib/_portfolio.mplstyle` — shared style: site token colors, Inter/system sans, hairline strokes, transparent bg, no shadows

---

## Step 6 — Hero Cover (last step)

Start with typography-first. Produce a typography-only fallback composition before any stylized direction. This is the safe baseline.

Cover must encode the project's core technical idea — not the domain name, not a decorative aesthetic. Test: can someone identify the project's central tension from the cover alone?

Verify thumbnail readability before finalizing. Update `heroImage` and `heroAlt` last.

---

## Reviewer / Subagent Separation

Run content reviewers as separate cold subagents, not blended single-pass reviews. Each reviewer simulates a distinct audience (non-technical recruiter vs. technical hiring manager) and should not share context with the other.

Don't spawn subagents for linear tasks. Reserve them for: parallel audience reviews, broad codebase exploration, research that would bloat main context.

---

## What Should NOT Become Part of This Workflow

- Preserving / transforming old MDX body content — always rebuild fresh
- Sharing implementation mechanics between overview metadata bullets and prose list rendering — they serve different reading contexts
- Abstractions that span only one project (e.g., the cyclic LR rationale is content, not a workflow pattern)
- Documenting project-specific decisions here — those belong in commit messages or the project MDX itself
- Three-reviewer passes — two is sufficient (recruiter + technical); a third blended pass dilutes both perspectives

---

## Source-of-Truth Hierarchy (for any disputed claim)

1. PDF table cell or figure — authoritative
2. Repository file (README, training script) — authoritative for implementation details
3. User clarification — authoritative for ownership, links, framing choices
4. Prior draft MDX — reference only, never authoritative
