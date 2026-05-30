# Extraction Procedure

Step-by-step operating guide for converting a research project into portfolio MDX.

---

## Step 1 — Source Intake

### Source priority order

1. **Report / paper PDF** — authoritative for all metrics, experimental structure,
   figures, author/institution facts
2. **Repository** — authoritative for framework names, dataset names, file structure,
   README claims, implementation details
3. **User clarification** — authoritative for ownership, links, logo permissions,
   metric framing choices, tone

### Do first (before writing anything)

- Dump PDF text; read end-to-end before writing anything
- Inventory all tables → these are the only authoritative metric sources
- Inventory all figures → these determine which assets can be regenerated vs. must
  be cropped from the PDF
- Scan repo: README, training scripts, eval scripts, config files, dataset names,
  framework versions (imports + requirements)
- Build a numeric-claim correction log if a prior draft exists — this is an audit
  only, not a transformation map

### Human clarification is typically needed for

- GitHub URL (fork vs. original vs. org repo — do not guess)
- Co-author inclusion (skip by default unless the user asks to surface them)
- Logo / brand asset permissions (do not use logos without explicit confirmation)
- Title framing (paper title vs. recruiter-readable phrasing)
- Metric framing when multiple defensible headlines exist

Ask these questions upfront, all at once. Do not interrupt the writing phase with
mid-draft clarification requests.

---

## Step 2 — MDX Content Build

### Core rule: discard existing body, start fresh

The old MDX body is reference material, not a transformation input. Prior drafts
accumulate errors, academic phrasing, and structural drift. Rebuilding fresh against
the source is faster and more reliable than editing.

Keep only: the file path, and any frontmatter fields that are already confirmed correct.

### Write frontmatter first

Before writing any body prose, complete the full frontmatter. A build failure on
frontmatter wastes body writing time. Required fields and build-fail conditions are
in `references/frontmatter-rules.md`.

**Frontmatter checklist (verify each before proceeding to body):**

- `title` — prefer recruiter-readable and action-led; use the paper title only if
  it's already clear and compelling on its own
- `summary` — one sentence, specific metric, honest framing; max 200 chars
- `tags` — 4–6 recruiter-recognizable keywords, no duplicates with stack
- `stack` — languages / frameworks / libraries / tools; no CUDA as a library
  dependency; pull from imports and requirements files
- `links.github` — confirm URL with user; do not guess or fabricate
- `links.paper` — add PDF path if the report is in `/public/`; use relative path
  `/projects/<slug>/...`
- `logos` — only with confirmed brand permission; omit entirely if uncertain
- `overview` — write all four sub-fields (problem, built, results,
  transferableSkills); see `references/frontmatter-rules.md` §overview

### Standard H2 spine for ML projects

Default order. Reorder only when readability clearly improves. All sections are
optional — include only what's substantive for this project.

1. Detailed Problem
2. Background
3. Architecture
4. Data
5. Engineering Decisions
6. Algorithm & Training Design
7. Results
8. Constraints & Limitations
9. Next Steps

Project-specific content lives at H3/H4 under these H2s. Use H4 intentionally — only
when a nested concept genuinely improves flow and cannot be absorbed into prose.

### Narrative arc — verify before finalizing

- **Detailed Problem** → opens with the research question or engineering hypothesis,
  rather than repeating the high-level motivation already in `overview.problem`. After
  establishing the question: failure modes, constraints, edge cases, why naive approaches
  fall short. Both the question and the technical challenge belong here — the question
  sets direction; the challenge establishes why it's non-trivial.
- **Architecture / Data** → what was actually built and what fed into it (not just
  what was tried — what was decided and why)
- **Results** → primary conclusion in the first sentence, stated explicitly before any table,
  diagram, or metric. Supporting data follows. For negative results: state the non-finding
  directly; do not make the reader infer it from the numbers.
- **Constraints** → honest scope caveats, not defensive hedging
- **Next Steps** → where the work goes, not filler bullets

### Standalone readability requirement

A technical reader should not need the paper or repo open beside the portfolio page
to understand the project. Every claim the body makes must be legible from the page
alone.

---

## Step 3 — Density Reduction

Run this pass before Reader Review. The reviewer should evaluate the version closest
to what the user will actually see.

### Tables that earn their place

- Two-column comparison with analytical content (e.g., victim vs. attacker
  normalization strategy)
- Results data that cannot be expressed as prose without losing precision
- OOD dataset construction breakdown with provenance notes

### Tables that should become prose

- Standard dataset properties (classes, image counts) — write as one sentence
- Architecture layer groups (blocks, channels, downsampling) — write as one sentence
- Hyperparameter dumps where only one parameter is actually interesting — pull that
  one into prose with its rationale, drop the rest

### Figures and tables on the same result

If a table already expresses the result precisely, a figure is redundant unless it
shows something the table doesn't (trend shape, spatial layout, image examples).
Remove the redundant one.

### Lists

Prose lists should behave like prose — normal document flow, readable indent, text
wraps naturally. Do not force prose lists into metadata-row flex layouts (those are
for the overview component bullets, which is a separate rendering context). Ordered
lists stay native and clearly ordered.

---

## Step 4 — Reader Review (required pre-approval gate)

Run after density reduction. Run it as a subagent to keep the main context clean.
The reviewer evaluates readability independently from technical correctness. Apply
all FLAG findings before presenting to the user.

### Checks — PASS or FLAG each

**Redundancy**
- Same information stated in multiple sections without adding depth
- Same metric or finding stated more than once within a few lines
- Overview fields that restate body content verbatim rather than summarizing it
- Constraints & Limitations re-explaining mechanisms already covered in Results
  (Constraints = scope caveats; Results = mechanisms)

**Narrative flow**
- Abrupt section transitions with no bridging sentence
- Sections that open with a definition rather than a statement of purpose
- Structurally unusual sections (e.g. bug audits) that don't explain why they exist in the narrative

**Section boundaries**
- Detailed Problem restating `overview.problem` instead of opening with the research question
- Body sections repeating the overview rather than deepening it
- Concepts introduced too late for the reader to follow the section that uses them

**Progressive disclosure**
- Key metrics used in diagrams or prose before being defined
- Conceptual explanations deferred past where the reader needs them
- Secondary experiments receiving equal narrative space to the core finding

### Output

PASS / FLAG per check, top 5 readability issues with line references, section-level
fixes only (no rewrites). Apply all flagged fixes before presenting to the user.
