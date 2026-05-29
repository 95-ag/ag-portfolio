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

**Prompt templates:** `.claude/docs/portfolio/reviewer-prompts.md` — use verbatim as cold subagent initial messages.

**Reviewer 1: Technical recruiter (30-second scan)**  
Checks business framing, headline outcome, scope signal, plain-language null results, Results summary paragraph, forward verdict.

**Reviewer 2: Technical hiring manager**  
Checks metric traceability to PDF source, anomaly explanation, evaluation environment clarity, trend descriptions, built-vs-reused separation, no fabricated claims, no overstated weak results.

**Conflict surfacing (after both return):**  
Present both finding sets together. Flag any item where Reviewer 1 wants plainer language but Reviewer 2 passed as technically precise — do not auto-resolve. Both-flagged items are high priority.

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

## Step 5b — Figure Composition and Framing

Operational principles from the `model-extraction-attacks` asset pass. Apply before generating or cropping any figure.

### Audit before generating

Measure content bounds of every existing asset before deciding to regenerate. Use PIL or equivalent to detect non-white pixel extents. Know exactly what whitespace is present and whether it is symmetric, intentional, or a matplotlib margin artifact. Do not re-export or regenerate without this baseline — it is easy to make framing worse under the assumption you are making it better.

### Treat multi-subplot figures as single figures

If a matplotlib figure was designed with multiple subplots (e.g., CIFAR-10 / CIFAR-100 side by side, or (a)/(b) comparison panels), display it as one composed figure — not split into separate panels. Splitting forces you to fight asymmetric y-axis margins, unequal content heights, and differing internal padding. The original composition already encodes subplot semantics and labels. Respect it.

Split-panel display (DiagramRow + DiagramPanel) is appropriate for: figures that were independently composed and need side-by-side presentation for a specific comparison reason. It is not appropriate as a default layout tool for anything wide.

### Full width is the exception

Establish a width hierarchy before placing any figure. Default is constrained/centered. Full-width is reserved for the most complex, information-dense assets where the detail requires it (e.g., a pipeline diagram that genuinely needs the horizontal span). Apply `max-w-[Npx]` based on figure density — denser figures can be wider. The hierarchy for this project was:

- Extraction pipeline SVG: full prose width (high complexity, 6-node 2-row layout)
- Coreset SVG, ROC curves: max-w-[700px]
- Query budget chart, adversarial panel: max-w-[560–720px]
- Architecture heatmap: max-w-[520px]
- Output access bar chart: max-w-[420px]

### Technical inset vs editorial visual

CIFAR example images, training screenshots, and other small raster crops are technical insets — not editorial visuals. They should not be stretched into hero-like panels. Keep them compact and proportionate. The informational density does not warrant large presentation.

Matplotlib charts on white backgrounds read as embedded research figures. This is acceptable and expected in both themes. The white background is part of the figure's content (axes, grid, labels). It does not need to be eliminated — only the excess outer margins need cropping.

### Crop normalization

When cropping figures for publication:
- Always start from content bounds (measured, not estimated)
- Apply consistent padding on all sides: typically 15–28px depending on the figure type
- For multi-subplot figures: use unified y-bounds across both halves so both subplots share the same top/bottom crop
- Symmetric padding is the goal; when the source prevents symmetry (e.g., y-axis labels on one side only), prefer a single-figure crop over splitting
- Verify the final crop at 100% zoom before committing — aspect ratios in MDX must match actual pixel dimensions

### Diagram system consistency

Hand-crafted SVG diagrams for the same project must share: node dimensions, CSS class vocabulary (`.n`, `.na`, `.lbl`, `.sub`, `.conn`, `.af`), dark-mode media query structure, marker definitions, and arrowhead style. Do not mix hand-crafted SVG with Mermaid output in the same visual system — they produce incompatible node sizing, font rendering, and edge treatment.

When using Mermaid output is unavoidable, compare node dimensions and font sizes explicitly against the hand-crafted system and adjust the export configuration until they match.

### Figure numbering

Only number figures if the prose cites them by number ("see Figure 1"). Decorative numbering — numbers in captions that are never referenced from the body text — adds visual noise without navigation value. Use descriptive captions instead.

### Component abstractions

Fix composition and framing first. Add layout abstractions (e.g., DiagramRow/DiagramPanel) only after the underlying figure is correctly framed as a standalone. If the figure requires a wrapper to look acceptable, the crop is wrong. Wrappers cannot correct asymmetric margins, mismatched heights, or wrong scale choices.

---

## Step 6 — Hero Cover (last step)

Cover must encode the project's core technical idea — not the domain name, not a decorative aesthetic. Test: can someone identify the project's central tension from the cover alone?

**6a — Direction proposals (before building anything)**

Propose 3–4 distinct visual directions. For each, describe: the composition concept, the key visual elements and where they appear, and what the cover encodes. Include rough placement notes so the user can evaluate without seeing a render. Get approval on a direction before touching any code or asset.

Start with a typography-only fallback direction as the safe baseline. Escalate to diagram-based directions where the project has strong technical structure worth visualizing.

**6b — Base composition (approval gate)**

Build and approve the base composition before touching annotations. The base should work as a standalone diagram — clean, readable at thumbnail scale. Accent is permitted on a single focal highlight element in the base (one standout node or data point); not on multiple structural elements.

Use a live React SVG component when the composition requires theme-adaptive colors or will include Caveat annotations. Register by slug in `src/components/project/covers/index.ts`. Use a static asset otherwise.

**6c — Annotations (separate approval step, optional)**

Read the MDX to identify what is genuinely project-specific: algorithmic contributions, real budget or query numbers, headline metrics, distinctive design decisions. Propose 2–4 annotation directions with specific content options. Build only after the user selects a direction.

Keep to 2–3 annotations targeting distinct diagram elements. Cut anything that could belong to any project in the same domain. See `cover-system-guide.md` → Engineering Annotations for construction rules.

Verify thumbnail readability at card scale. Update `heroImage` / `heroAlt` last (omit `heroImage` if using a live component).

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

Higher tier wins on conflict. Exception: ownership, links, permissions, and framing always defer to user clarification regardless of tier — these are not derivable from artifacts.

1. **Report / documentation** — authoritative for metrics, results, structure, author/institution facts
2. **Source code** (training scripts, eval scripts, configs) — authoritative for implementation, frameworks, dataset names, hyperparameters
3. **Commit history / issues** — authoritative for timeline, evolution, known limitations, design decisions
4. **Demos / screenshots** — authoritative for UI/output behavior, qualitative results, visual appearance
5. **User clarification** — authoritative for ownership, links, logo permissions, title framing, metric framing choices

Prior draft MDX is reference only — never authoritative for any claim.

---

## Source Modes

The workflow assumes report + repo by default. When one source is missing, degrade gracefully — skip missing tiers and escalate gaps to user clarification.

### Report + repo (full)
Primary path. All tiers 1–3 available. Metrics from PDF tables; implementation from code. No extra constraints.

### Repo only
Tiers 1 and part of 3 are unavailable. Apply these constraints:

- Metrics sourced from README, eval scripts, output artifacts, or commit history — tag each as `[verified]`, `[inferred]`, or `[user-confirmed]` in your working notes before writing prose
- Architecture and data facts from code; tech stack from imports and configs
- Heavier user clarification required for results framing and any headline metric
- Never write paper-style metrics ("achieved X% on benchmark Y") without a traceable source; if no source exists, ask or omit
- Summary field must not claim precision beyond what the repo supports

**Confidence tagging (repo-only mode):**  
Before writing any factual claim, assign it a tag in your working notes:
- `[verified]` — directly readable from a file in the repo (README line, script output, eval log)
- `[inferred]` — reasonably derivable from code structure, commit messages, or naming conventions; state the inference explicitly in prose if it affects a claim
- `[user-confirmed]` — provided directly by the user in this session

Do not surface confidence tags in the final MDX prose. They govern what you write, not what the reader sees. Any unresolved `[inferred]` claim on a metric should become a clarification question before finalizing.

### Report only
Tiers 2 and 3 are unavailable. Apply these constraints:

- Framework, dataset, and structure facts from paper prose only — cannot be cross-checked against code
- Tech stack inferred from paper and flagged for user confirmation before publishing
- Typically no GitHub link; do not fabricate or guess a repo URL
- No commit history tier — timeline and evolution are unknown unless stated in the paper
