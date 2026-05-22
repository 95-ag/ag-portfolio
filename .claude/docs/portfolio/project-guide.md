# Portfolio Project Guide

# 1. Core Principles

- Never invent metrics, deployment, or impact.
- Pull directly from report/repo first; infer only low-risk details.
- Prioritize recruiter readability over academic writing.
- Keep content concise, skimmable, and implementation-focused.
- Clearly separate:
    - what you built
    - what was reused/pretrained
    - measured results vs inferred observations
- Featured projects get deeper technical breakdowns; smaller projects stay concise.

## Credibility Rules

Clearly distinguish:

- implemented from scratch
- adapted from papers/tutorials
- fine-tuned pretrained models
- framework-provided functionality

Do not imply novel research unless genuinely novel.

---

# 2. Project Intake Workflow

## Source Priority

1. Report/Paper
2. GitHub Repo
3. Demo/Screenshots
4. README

## Ask User Only If Missing

- contribution/ownership
- metrics/results
- technical challenges
- deployment status
- constraints/tradeoffs

## Content Workflow

1. Extract directly from sources.
2. Infer low-risk details:
    - tags
    - transferable skills
    - concise summaries
    - possible improvements
3. Ask targeted questions only for missing high-value info.
4. Refine for readability, clarity, and visual flow.

---

# 3. Writing & Presentation Rules

Structure projects as coherent engineering narratives, not documentation dumps.

## Prefer

- engineering explanations
- implementation decisions
- tradeoffs
- observations
- concise technical clarity

## Avoid

- academic filler
- generic buzzwords
- inflated claims
- unnecessary theory dumping

## Supporting Visuals

Projects should include supporting visual assets where useful.
See Asset Guide for standards, tooling, and requirements.

---

# 4. Project Structure — ML Projects

## Project Intro

### Title

Simple and descriptive; preferably pulled from report.

### Subtitle

Supports title; not a summary.

### Summary

2–3 line recruiter-friendly overview for project cards.

### Tags

3–6 recruiter-recognizable keywords. Use recognizable industry keywords recruiters may search for.

Example:

- Machine Learning
- Computer Vision
- Reinforcement Learning
- NLP
- Time Series Forecasting

### Tech Stack

Group by category and order by relevance.

Example:

- Languages: Python, C++
- Frameworks: PyTorch, TensorFlow, OpenCV
- Libraries: NumPy, Pandas, Scikit-learn
- Tools: Git, Docker, Linux, Jupyter

Pull from report/repo/README or repo scan.

### Links

Possible links:

- GitHub
- Demo
- Report/Paper
- Presentation

## Executive Overview (HR-Friendly)

### Problem / Goal

Explain:

- what problem exists
- why it matters in real systems

### What I Built

1–2 clear sentences focused on:

- solution
- system behavior
- approach

### Key Results

2–3 impact-focused bullets.

Prefer measurable improvements when available.

### Transferable Skills

Infer carefully from actual implementation work.

Examples:

- ML pipeline debugging
- Data preprocessing
- Model optimization
- Experiment tracking
- Technical documentation

## Deep Technical Dive

### Rules

- Be technical without unnecessary academic depth or oversimplification
- Main sections are expected unless clearly irrelevant to the project
- Add sub-sections as needed for clarity and project-specific organization
- Add/remove new main sections to maintain strong narrative and engineering flow
- Use supporting assets where they improve understanding:
    - diagrams
    - charts
    - comparison figures
    - workflow visuals
    - code snippets
    - insight/callout blocks

### Detailed Problem

Cover:

- failure modes
- edge cases
- why baseline methods fail
- engineering challenges

### Context Background

Include:

- domain context
- theoretical background
- operational constraints
- hardware/environment limitations

### Data

Include:

- dataset source
- preprocessing
- annotations
- augmentations
- distribution characteristics
- data challenges

### Model Architecture

Include:

- architecture/system diagrams
- component interaction
- model choice rationale
- CNN/RNN/Transformer/RL structure if relevant

### Engineering Decisions

Explain important implementation choices and tradeoffs.

Examples:

- architecture selection
- preprocessing strategy
- framework/tooling decisions
- accuracy vs latency tradeoffs
- simplicity vs performance considerations

### Algorithm & Training Design

Include:

- training pipeline
- loss/reward design
- action/state definitions (RL)
- validation/evaluation strategy
- memory/compute considerations

Optional:

- pseudocode
- workflow diagrams

### Resources / Constraints

Mention:

- GPU/CPU limitations
- latency requirements
- dataset limitations
- noisy real-world variability
- compute constraints

### Optimization (Optional)

Include only if meaningful:

- hyperparameter tuning
- memory optimization
- throughput improvements
- inference optimization
- model simplification

### Deployment (Optional)

Only include if actual deployment/inference exists.

Possible content:

- deployment environment
- APIs/UI
- ONNX/TensorRT
- runtime constraints
- system integration

Do not invent deployment details.

### Results

Include:

- quantitative metrics
- benchmark comparisons
- qualitative outputs
- before/after comparisons
- charts/tables
- failure cases if useful
- clearly separate measured metrics from qualitative observations

### Next Steps / Improvements

Examples:

- temporal smoothing
- improved augmentation
- domain adaptation
- uncertainty estimation
- architecture experimentation
- deployment optimization

Can be inferred carefully if not explicitly mentioned.

---