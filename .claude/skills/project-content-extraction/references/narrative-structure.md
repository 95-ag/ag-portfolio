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

## Identify the project differentiator before writing

Before writing any content, identify what makes the project credible and memorable.
Not the algorithm or framework used — what was *done* with it and what the outcome
reveals.

- For reproduction projects: the differentiator is audit depth and honest evaluation
- For negative results: the differentiator is rigor and scope of the investigation
- For novel systems: the differentiator is the specific tradeoff navigated and measured

The central narrative arc should be explicit in the body and reflected in the overview.
Name the arc before drafting: "reproduce → audit → repair → evaluate → report honestly"
is a clearer target than "write about the DQL project." That arc shapes which decisions
to foreground and which to treat as background.

---

## Standard H2 Narrative Spine (ML Projects)

Default section order. Reorder only when readability clearly improves; all sections
are optional but most should be present:

1. **Detailed Problem** — opens with the research question or engineering hypothesis, rather than repeating
   the high-level motivation already covered in `overview.problem`. After establishing the question, explain
   the technical difficulty: failure modes, constraints, edge cases, why naive approaches fall short, and
   the engineering tradeoffs that make the problem non-trivial.
   (`overview.problem` = why the problem matters; Detailed Problem = what is being asked and why answering it is hard)
2. **Background** — domain context, theoretical background, operational constraints, hardware limits
3. **Architecture** — system diagrams, component interaction, model choice rationale
4. **Data** — dataset source, preprocessing, annotations, augmentations, distribution characteristics
5. **Engineering Decisions** — implementation choices and tradeoffs (architecture selection, accuracy vs latency, etc.)
6. **Algorithm & Training Design** — training pipeline, loss/reward design, validation strategy, memory/compute
7. **Results** — opens with the primary conclusion stated explicitly in the first sentence, before any
   table, diagram, or supporting metric. ("DQL did not outperform the baseline detector." not "The
   results are summarized in Table 1.") Supporting metrics, comparisons, and interpretation follow.
   For negative results: state the non-finding directly; explain causes; emphasize rigor of the
   investigation, not the size of the metric.
8. **Constraints & Limitations** — scope caveats only: what the results *can't* conclude and why.
   Do not re-explain mechanisms already covered in Results. The distinction: Results explains
   *what happened and why*; Constraints explains *what that means for generalizability*.
9. **Next Steps** — where the work goes; can be carefully inferred if not in the source

Project-specific content lives at H3/H4 under these H2s. H1 is rendered by the layout — never written in MDX body.

---

## Executive Overview vs. Deep Technical Dive

The overview component (frontmatter `overview.*` fields) serves the recruiter:
- `overview.problem` — what problem exists and why it matters in real systems
- `overview.built` — what was *done*, not what was built. Describe the shape of the
  work: reproduce, audit, repair, extend, evaluate. Architecture names and algorithm
  labels belong in the body, not here.
- `overview.results` — 2–3 outcome-led bullets. Lead with the result, not the metric
  name. One number per bullet. Avoid metric abbreviations (FPR, FNR) unless self-explanatory.
- `overview.transferableSkills` — demonstrated capability, not a task list. Lead with
  the highest-signal skill. Frame as "Reproducing and auditing published research
  implementations" not "Used D-DQN with prioritized replay". Negative results are a
  skill signal if framed as evidence-based evaluation. 4 bullets maximum; each must
  be distinct.

The overview must be scannable in under 60 seconds. If the combined problem + built +
results fields take longer, they are too dense.

The MDX body is the deep technical dive. Do not repeat the executive overview verbatim
in the body — the body adds technical depth, not a paraphrase of the frontmatter.

**Overview describes what was done, not what was built.** The biggest signal shift
comes from work-centric language over architecture-centric language. "Reproduced a
published pipeline, audited 14 implementation errors, repaired the codebase, and
evaluated rigorously" is more distinctive than "built a D-DQN agent with prioritized
experience replay." The former communicates research engineering capability; the latter
describes a configuration choice.

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
- In-text citations: `[1]`, `[4]`, `Zhao et al.`, "as discussed in Section X",
  "as mentioned above". The portfolio page is not an academic document. Readers
  do not have the paper open. State findings directly; reference external work by
  description if needed, not by citation.

**Abbreviations:** expand on first use, then use the short form throughout. Do not
assume domain familiarity. Any abbreviation a non-specialist reader would not recognize
should be spelled out at first occurrence and defined if the meaning isn't obvious from
the expansion alone.

Structure the page as an engineering narrative, not a documentation dump. The right
register is an engineering case study: explain decisions and outcomes, not just document
them. Each section opens with a clear statement of purpose, not a definition. Assume a
technical reader — do not over-explain the obvious.

When revising a draft: apply targeted improvements to the existing text, not a wholesale
rewrite. Refinement, not substitution — a rewrite discards valid content and resets voice.

**Concept density per section:** a section that introduces more than 2–3 new concepts
at once forces the reader to context-switch mid-paragraph.

- Background should cover problem framing, RL/algorithmic formulation, and any
  extension hypothesis as separate paragraphs — not merged into one dense block.
- Engineering Decisions should explain *why* a choice was made, not re-explain *what*
  it is. If a concept was introduced in Background or Architecture, reference it by
  name — don't redefine it.
- Algorithm & Training Design owns implementation detail; Background owns conceptual
  framing. Do not merge them.

If a section is doing work that belongs to another section, split or move — don't compress.

---

## Narrative Space Allocation

Allocate body depth proportionally to finding weight. Depth signals importance to the
reader — a secondary experiment that consumes the same space as the core finding implies
equal significance.

- **Core finding** — the result that defines the project's value: full Results section,
  subsections explaining why, supported by the table and key diagram.
- **Supporting findings** — configurations that extend or nuance the core finding:
  captured in the results table, briefly interpreted in prose.
- **Secondary experiments** — extensions that don't materially change the conclusion:
  one subsection covering hypothesis, result, and likely cause. Not a parallel narrative.

Apply this test before finalizing: if a secondary experiment has as much body space as
the core finding, reduce it.
