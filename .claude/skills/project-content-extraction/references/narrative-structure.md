# Narrative Structure

What a well-structured portfolio project looks like from a narrative standpoint —
the target the extraction skill is building toward. Authoritative reference for the project-content-extraction skill.

---

## Core Credibility Rules

Always clearly separate:

- **Built from scratch** — implemented from first principles
- **Adapted from a paper/tutorial** — architecture or algorithm taken from literature
- **Fine-tuned pretrained model** — started from an existing checkpoint
- **Framework-provided functionality** — used a library's built-in feature

Do not imply novel research unless the work is genuinely novel. The distinction between
"I implemented X" and "I used X from library Y" must be explicit throughout.

---

## Audience Framing

Two audiences read a portfolio project page in sequence:

**Recruiter (30-second scan):**
- Needs a plain-language problem statement and a concrete headline outcome
- Does not have ML domain knowledge
- Decides on the first paragraph whether to forward the page

**Technical hiring manager (deep read):**
- Traces every metric back to a source
- Checks whether the candidate can explain tradeoffs, not just report results
- Evaluates whether what was built-from-scratch vs. reused is clearly maintained

Write the problem statement and summary for the recruiter. Write the deep-dive sections
for the technical reader. Both must be served by the same page.

---

## Standard H2 Narrative Spine (ML Projects)

Default section order. Reorder only when readability clearly improves; all sections
are optional but most should be present:

1. **Detailed Problem** — failure modes, edge cases, why baseline methods fail, engineering challenges
2. **Background** — domain context, theoretical background, operational constraints, hardware limits
3. **Architecture** — system diagrams, component interaction, model choice rationale
4. **Data** — dataset source, preprocessing, annotations, augmentations, distribution characteristics
5. **Engineering Decisions** — implementation choices and tradeoffs (architecture selection, accuracy vs latency, etc.)
6. **Algorithm & Training Design** — training pipeline, loss/reward design, validation strategy, memory/compute
7. **Results** — quantitative metrics, benchmark comparisons, failure cases; opens with a summary paragraph
8. **Constraints & Limitations** — honest scope caveats, not defensive hedging
9. **Next Steps** — where the work goes; can be carefully inferred if not in the source

Project-specific content lives at H3/H4 under these H2s. H1 is rendered by the layout — never written in MDX body.

---

## Executive Overview vs. Deep Technical Dive

The overview component (frontmatter `overview.*` fields) serves the recruiter:
- `overview.problem` — what problem exists and why it matters in real systems
- `overview.built` — 1–2 sentences on solution, system behavior, approach
- `overview.results` — 2–3 impact-focused bullets with measurable improvements when available
- `overview.skills` — transferable skills inferred from actual implementation work

The MDX body is the deep technical dive. Do not repeat the executive overview verbatim
in the body — the body adds technical depth, not a paraphrase of the frontmatter.

---

## Standalone Readability

A technical reader should not need the paper or repo open beside the portfolio page
to understand the project. This means:

- Explain the evaluation environment (simulated? real API? which dataset?)
- Describe what results mean in plain terms, not just as numbers
- Identify the headline finding explicitly — do not make the reader infer it
- For failure results: explain them in plain language, not just report the number

---

## Writing Rules

**Prefer:**
- Engineering explanations and implementation decisions
- Tradeoffs between choices made
- Specific observations from experiments
- Concise technical clarity

**Avoid:**
- Academic filler and passive voice
- Generic buzzwords ("state-of-the-art", "robust", "novel approach")
- Inflated claims about deployment or impact that aren't sourced
- Theory dumps that don't connect to what was actually built
- Copying the paper's abstract as the project summary

Structure the page as an engineering narrative, not a documentation dump.
