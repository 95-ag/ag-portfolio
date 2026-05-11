# CONTENT-SCHEMA.md

> Contract between MDX content files and the rendering layer.
> PRODUCT.md owns *what* and *why*. DESIGN.md owns *how it looks*. This document owns *how content is structured*.
> When PRODUCT.md and this document disagree on a content field, this document wins.

---

## 1. Scope & Principles

This document defines:

- The directory structure and file conventions for content.
- Frontmatter schemas with required and optional fields.
- The MDX components available in body content.
- Section conventions for project deep dives.
- Validation behavior at build time.

This document does **not** define:

- Writing style or tone (no `WRITING_GUIDE.md` exists yet).
- v2 blog content schema beyond a placeholder reference.
- Components that don't exist yet — new MDX components are added when a project needs them, not pre-emptively.

### Authoring principles

- **Frontmatter is for structured, uniform fields.** Cards, sidebars, and overview subsections — anywhere visual consistency matters across projects.
- **MDX body is for variable, free-form content.** Deep-dive subsections, prose, embedded components.
- **Required fields fail the build.** Missing optional fields render nothing — never placeholders, never "TBD."
- **Slug is the filename.** No `slug:` field. Filename is the source of truth.

---

## 2. Directory Structure

```
/content
  /projects
    lane-refinement-rl.mdx
    distributed-task-queue.mdx
    ...
  /blog                       # v2
    post-slug.mdx
  /about
    about.mdx                 # body content for /about page (optional, see §7)
/public
  /projects
    /[slug]
      hero.jpg                # or hero.mp4
      diagram-architecture.svg
      ...
  /resume.pdf
  /headshot.jpg
  /og-default.png             # fallback Open Graph image
```

### File naming rules

- Filenames are kebab-case: `lane-refinement-rl.mdx`.
- Slug is derived from the filename, lowercased, `.mdx` extension stripped.
- One MDX file = one project. No multi-project files.
- Image paths in MDX and frontmatter are written as **web paths from `/public`** (e.g., `/projects/lane-rl/hero.jpg`), not as filesystem-relative paths. This matches Next.js's static-asset convention.

---

## 3. Project Frontmatter Schema

Frontmatter is YAML. Validated at build time against the Zod schema in §10. Build fails on schema violations.

### Full schema

```yaml
---
# === Required: identity ===
title: "Lane Refinement with Double DQN"
shortTitle: "Lane Refinement"          # used in sticky sidebar; falls back to title if omitted
summary: "Two-stage RL pipeline that corrects lane-detection errors in occluded driving scenes."
projectType: academic                   # academic | freelance | personal

# === Required: dates and ordering ===
publishedAt: "2024-09-15"               # ISO 8601 string
order: 10                               # lower = earlier in lists; ties broken by publishedAt desc

# === Required: hero ===
heroImage: "/projects/lane-rl/hero.jpg"     # image, video, or animated SVG (see §3.6)
heroAlt: "Side-by-side comparison of baseline vs RL-refined lane detection on an occluded curve."
heroPoster: "/projects/lane-rl/hero-poster.jpg"   # required if heroImage is a video
heroVideoLoop: true                                # optional, defaults true for videos

# === Required: tags ===
tags:
  - Reinforcement Learning
  - Computer Vision
  - Autonomous Driving

# === Required: stack (categorized; categories fixed) ===
stack:
  languages: [Python, C++]
  frameworks: [PyTorch, OpenCV]
  libraries: [NumPy, Pandas, scikit-learn]
  tools: [Docker, Git, Linux]

# === Required: overview (renders the recruiter-readable section) ===
overview:
  problem: |
    Lane detection fails in shadows and sharp curves, which compromises
    safe lane-keeping in autonomous vehicles operating in non-ideal conditions.
  built: |
    A two-stage pipeline: a CNN produces an initial lane prediction, then
    a Double DQN agent iteratively refines lane-point positions using
    image features as state.
  results:
    - "Improved lane-point accuracy by 18% on occluded segments"
    - "Reduced curvature errors by 23% on the tightest-radius test set"
    - "Maintained near real-time inference (38ms per frame on a single GPU)"
  transferableSkills:                   # rendered as "Transferable Skills" for academic/freelance
    - Designing modular ML pipelines
    - Working with noisy perception data
    - Optimizing models under latency constraints
    - Communicating technical work clearly
  # For projectType: personal, use `learnings` instead of `transferableSkills`.
  # See §3.3 below.

# === Optional: full title ===
fullTitle: "Two-Stage Deep Reinforcement Learning Pipeline for Lane Boundary Refinement"

# === Optional: external links ===
links:
  github: "https://github.com/user/lane-rl"
  demo: "https://lane-rl.example.com"
  paper: "/projects/lane-rl/paper.pdf"

# === Optional: featured on homepage ===
featured: true                          # default false; cap of 3 enforced at build

# === Optional: associated entities ===
logos:
  - src: "/projects/lane-rl/sfu-logo.svg"
    alt: "Simon Fraser University"
  - src: "/projects/lane-rl/clientco-logo.svg"
    alt: "ClientCo"

# === Optional: SEO ===
ogImage: "/projects/lane-rl/og.png"     # falls back to heroImage if omitted
metaDescription: "..."                  # falls back to summary if omitted

# === v2: related projects (frontmatter prepared, rendering deferred) ===
relatedProjects:
  - distributed-task-queue
  - serverless-media-api
---
```

### 3.1 Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Full project title used in headers, OG tags, browser tab |
| `shortTitle` | string | no | Used in sticky sidebar header. Falls back to `title` |
| `fullTitle` | string | no | Long descriptive title (e.g., research-paper style). Renders below `shortTitle` in sidebar if present |
| `summary` | string | yes | One-line description. Used on cards and meta description fallback |
| `projectType` | enum | yes | `academic` \| `freelance` \| `personal` |
| `publishedAt` | ISO date string | yes | Drives sort order tiebreak |
| `order` | number | yes | Primary sort key. Lower = earlier |
| `heroImage` | string | yes | Web path under `/public`. Accepts image (`.jpg`/`.png`/`.svg`), video (`.mp4`/`.webm`), or animated SVG. See §3.6 |
| `heroAlt` | string | yes | Alt text for accessibility. Required for all hero types including video |
| `heroPoster` | string | conditional | Required if `heroImage` is a video. Web path to a still image used as the video poster |
| `heroVideoLoop` | boolean | no | Default `true`. Only applies when `heroImage` is a video |
| `tags` | string[] | yes | 3–6 recommended. Free-form strings |
| `stack` | object | yes | See §3.2 |
| `overview` | object | yes | See §3.3 |
| `links` | object | no | Optional `github`, `demo`, `paper`. Each is a URL string |
| `featured` | boolean | no | Default `false`. Triggers homepage inclusion |
| `logos` | array | no | Associated org/company logos. Each `{src, alt}` |
| `ogImage` | string | no | Falls back to `heroImage` |
| `metaDescription` | string | no | Falls back to `summary` |
| `relatedProjects` | string[] | no | Array of slugs. v2 — validated at build but not rendered in v1 |

### 3.2 Stack categories

Fixed enum. New categories require a schema change, not free-form additions.

```yaml
stack:
  languages: [...]      # Python, C++, TypeScript, Go, etc.
  frameworks: [...]     # PyTorch, Next.js, FastAPI, etc.
  libraries: [...]      # NumPy, Pandas, recharts, etc.
  tools: [...]          # Docker, Git, Linux, AWS, etc.
```

All four keys are required objects but may be empty arrays. Empty arrays render nothing. Missing keys fail the build.

### 3.3 Overview structure

The `overview` object renders the recruiter/HR-readable section on the project page (PRODUCT.md §7.3). Four subsections, structured for visual uniformity.

```yaml
overview:
  problem: string             # markdown-allowed paragraph; multi-line OK with YAML `|`
  built: string               # markdown-allowed paragraph
  results: string[]           # bulleted list, 2–4 items recommended (optional)
  transferableSkills: string[]   # optional
  learnings: string[]            # optional
```

**Convention (author discipline, not enforced by build):**
- `academic` and `freelance` projects use `transferableSkills`.
- `personal` projects use `learnings` and may omit `results`.
- Use only one of `transferableSkills` or `learnings` per project — pick the one that fits the work.

The renderer displays whichever field is present. If both are present, both render (not a build error, but visually awkward — avoid). If neither is present, that section is omitted from the overview.

### 3.4 Featured projects

Frontmatter field `featured: true` marks a project for homepage inclusion. Build validates:

- Maximum 3 featured projects across the entire content set. More than 3 fails the build.
- Featured projects sort by `order` on the homepage (independent of Work-page sort).

### 3.5 Validation rules summary

Build fails on:

- Missing required field.
- Invalid `projectType` enum value.
- More than 3 projects with `featured: true`.
- `relatedProjects` references that don't resolve to existing slugs.
- Image paths that don't start with `/`.
- `heroImage` is a video (`.mp4`/`.webm`) but `heroPoster` is missing.

Build warns (does not fail) on:

- Empty `tags` array (recommend 3–6).
- More than 6 tags.
- `summary` longer than 200 characters.
- `metaDescription` longer than 160 characters.

### 3.6 Hero media

The `heroImage` field accepts three formats. The renderer detects the type from the file extension and behaves accordingly.

**Image** (`.jpg`, `.png`, `.webp`):
- Renders as a static image via `next/image`.
- `heroPoster` ignored.
- `heroVideoLoop` ignored.

**Video** (`.mp4`, `.webm`):
- Renders as a `<video>` element.
- `autoplay`, `muted`, `playsinline` always on (required for autoplay on mobile browsers).
- `loop` defaults to `true`; override via `heroVideoLoop: false`.
- **`heroPoster` is required** — used as the loading state and for users with autoplay disabled.
- Recommended length: ≤ 8 seconds. Loops should feel seamless (last frame ≈ first frame).
- Recommended encoding: H.264 MP4 + VP9 WebM, both ≤ 2 MB. Browsers pick what they support.

**Animated SVG** (`.svg` with embedded `<animate>` or CSS animations):
- Renders as `<img>` (animations play natively).
- `heroPoster` ignored.
- Animation must respect `prefers-reduced-motion` — if it doesn't, don't use it.

**Rules across all types:**
- `heroAlt` is required regardless of media type. For videos, describe what the video shows, not "video of...".
- Aspect ratio: 16:9 recommended. Other ratios work but may letterbox.
- Reduced-motion fallback: video heroes display only the poster image (no autoplay) for users with `prefers-reduced-motion: reduce`. Animated SVGs that can't be paused this way should be replaced with static images.

**What not to use:**
- GIFs. Large files, poor quality, no audio control. Use video instead.
- Lottie / JSON animations. Heavy dependency, not justified for a hero in v1.
- Auto-playing audio. All videos render muted; no exception.

---

## 4. Project Body MDX

Body MDX renders below the hero and overview, as the **deep-dive section** of the project page (PRODUCT.md §7.3).

### Section conventions

The deep dive uses H2 headings. Recommended sections (all optional — include only what's substantive):

```mdx
## Detailed Problem

Prose explaining edge cases, failure modes, why standard approaches fall short.

## Background

Domain context, theoretical background, hardware/environment constraints,
operational requirements.

## Data

Dataset source, preprocessing, annotations, augmentations, distribution
characteristics, challenges.

## Architecture

<Diagram src="/projects/lane-rl/architecture.svg" alt="..." />

Prose explaining the design.

## Algorithm & Code Design

State/action definitions, reward shaping, training loop, memory and compute
considerations. Pseudocode where helpful.

```python
def step(state, action):
    ...
```

## Constraints & Resources

Latency targets, hardware limits, real-world variability.

## Optimization

Hyperparameter tuning, memory work, throughput improvements, model simplification.

## Deployment

Environment, format (ONNX, TensorRT), runtime constraints, system interface.

## Results

Quantitative metrics, qualitative examples, before/after comparisons.

<Figure src="/projects/lane-rl/results-curve.png" caption="..." />

## Next Steps

Engineering maturity — what would improve this further.
```

**Rules:**

- H2 (`##`) is reserved for deep-dive section headings. Do not use H1 in body content (one H1 per page is rendered by the layout from `title`).
- H3 (`###`) and below are free for sub-structuring within sections.
- Section ordering above is a recommendation, not a requirement. Adjust to fit the project.
- `personal` projects may have a single short section or skip the deep dive entirely. Acceptable.

### Reading width

Body MDX renders inside a constrained `~720px` column (DESIGN.md §6). Wide content (full-bleed diagrams, tables) can use the `<Figure wide>` variant — see §5.

---

## 5. MDX Components

Four custom components plus standard markdown. New components are added when a project needs them, not pre-emptively.

### `<Figure>`

Image with optional caption and width control.

```mdx
<Figure
  src="/projects/lane-rl/results-curve.png"
  alt="Training reward curve showing convergence at episode 4000"
  caption="Reward converges around episode 4000; later episodes show fine-tuning."
  width="default"   {/* "default" (720px) | "wide" (960px) | "full" (page width) */}
/>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | string | yes | Web path under `/public` |
| `alt` | string | yes | Accessibility |
| `caption` | string | no | Renders below image, `body-sm` muted |
| `width` | enum | no | Default `"default"` |

Renders with a subtle border (`outline-variant`) and `radius: md`.

### `<Diagram>`

Architecture diagrams, flow charts, system illustrations. Same props as `<Figure>` plus a slightly different default treatment (more vertical breathing room, no border by default since most diagrams have their own background).

```mdx
<Diagram
  src="/projects/lane-rl/architecture.svg"
  alt="Two-stage pipeline: CNN backbone feeds initial predictions to a DQN refinement agent."
  caption="Two-stage refinement pipeline."
/>
```

### `<Callout>`

Editorial highlight for key insights, tradeoffs, or decisions.

```mdx
<Callout type="insight">
The reward function only penalized lateral error — adding a curvature
penalty would likely close the remaining gap on tight turns.
</Callout>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `type` | enum | no | `"insight"` (default) \| `"tradeoff"` \| `"warning"` |
| `title` | string | no | Optional bold lead-in |

Visual treatment in DESIGN.md §1 (Callouts feel editorial, not promotional). `type` drives the accent color (insight = `accent`, tradeoff = `secondary`, warning = `tertiary`).

### `<Stack>`

A vertical stack of items with consistent spacing. Used for grouped lists where default markdown spacing is too tight or inconsistent.

```mdx
<Stack gap="md">
  <Callout>...</Callout>
  <Callout>...</Callout>
</Stack>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `gap` | enum | no | `"sm"` \| `"md"` (default) \| `"lg"` |

### Code blocks

Standard fenced code blocks. Syntax-highlighted at build time via Shiki (PRODUCT.md §7.3). Language hint required for highlighting.

````mdx
```python
def reward(state, next_state):
    return -lateral_error(next_state)
```
````

Inline code uses single backticks: `` `like this` ``. Renders per DESIGN.md §3 `code-inline` token.

---

## 6. Standard Markdown Conventions

Within MDX body, standard markdown is used:

| Element | Use |
|---|---|
| `**bold**` | Emphasis. Use sparingly. |
| `*italic*` | Term introduction, foreign words, emphasis. |
| `[link](url)` | Inline links. Open external links in new tabs (handled by the renderer for `http://`/`https://`). |
| `> quote` | Blockquote. Renders per DESIGN.md `blockquote` token. |
| `---` | Horizontal rule. Use to separate major shifts within a section, sparingly. |
| Lists | Unordered or ordered. List items follow DESIGN.md `list-item` spacing. |
| Tables | GFM tables. Render with `outline-variant` borders. |

### What not to do

- No raw HTML in MDX body. Use components instead.
- No `<br>` for spacing — let the layout handle it.
- No styling inline (no `style=`, no class names).
- No multiple consecutive blank lines.

---

## 7. About Page Content

PRODUCT.md §7.4 specifies About-page sections. Content for these sections is **not** in MDX body — it lives in structured frontmatter on a single `/content/about/about.mdx` file.

Reason: the About page has a structured two-column layout (DESIGN.md §11) where each section's heading and body must be rendered consistently. Frontmatter enforces structure better than MDX body for this case.

```yaml
---
# /content/about/about.mdx (frontmatter only; body is unused)

# Identity
name: "Your Name"
role: "AI/ML Engineer"
positioning: "Building practical ML systems for real-world constraints."
headshot: "/headshot.jpg"
headshotAlt: "Portrait of [Your Name]"
socials:
  github: "https://github.com/..."
  linkedin: "https://linkedin.com/in/..."
  # extend as needed

# Contact quick links
contactEmail: "you@example.com"

# Approach (rendered as numbered or bulleted principles per DESIGN.md)
approach:
  - title: "Systems thinking"
    body: "..."
  - title: "Iteration over speculation"
    body: "..."
  # 4–6 recommended

# Capabilities (grouped per PRODUCT.md §7.4 #6)
capabilities:
  - area: "ML Systems"
    description: "End-to-end model development, deployment, and monitoring."
    tags: [PyTorch, ONNX, Triton, scikit-learn]
  - area: "Computer Vision"
    description: "..."
    tags: [OpenCV, Detectron2]
  - area: "Backend & Infra"
    description: "..."
    tags: [FastAPI, Postgres, Docker]

# Experience
experience:
  - company: "Company"
    role: "Role"
    timeframe: "2022 — Present"
    achievements:
      - "Quantified achievement 1"
      - "Quantified achievement 2"
    image:                      # optional
      src: "/about/company-product.png"
      alt: "..."

# Education
education:
  - institution: "University"
    degree: "MSc Computer Science"
    specialization: "Machine Learning"
    timeframe: "2020 — 2022"
---
```

### About frontmatter rules

- All top-level fields except `image` (in experience) and `socials` are required.
- `socials` requires at least one entry.
- `experience` and `education` are arrays; minimum one entry each.
- `capabilities` minimum two entries (single-area capabilities read as thin).
- Date strings are free-form for human readability ("2022 — Present", "Sep 2024") because they're displayed verbatim, not sorted.

### Body content

The MDX body of `about.mdx` is unused in v1. Reserved for v2 if a need arises. Validation does not check body content.

---

## 8. Resume

Single PDF at `/public/resume.pdf`. Updated manually. No content schema — it's a binary asset.

The recruiter CTA on the homepage links directly to `/resume.pdf` for download.

---

## 9. Blog (v2)

Blog content schema is **deferred to v2**. When v2 is scoped:

- Blog posts will reuse the MDX pipeline.
- Frontmatter will share `title`, `summary`, `publishedAt`, `tags`, `heroImage`, `ogImage`, `metaDescription` with projects (consider extracting a shared base schema).
- Blog posts will have free-form body MDX (no equivalent of `overview` frontmatter).
- Blog-specific fields (e.g., `readingTime`, `series`) are TBD.

Do not pre-create blog frontmatter fields in v1.

---

## 10. Validation Implementation

Frontmatter is validated at build time using Zod. All schemas live in `/lib/schemas/`.

```ts
// /lib/schemas/project.ts
import { z } from 'zod'

const StackSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  libraries: z.array(z.string()),
  tools: z.array(z.string()),
})

const OverviewSchema = z.object({
  problem: z.string().min(1),
  built: z.string().min(1),
  results: z.array(z.string()).optional(),
  transferableSkills: z.array(z.string()).min(1).optional(),
  learnings: z.array(z.string()).min(1).optional(),
})

const LinksSchema = z.object({
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  paper: z.string().optional(),                // can be relative path
}).optional()

const LogoSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(1),
})

const VIDEO_EXTENSIONS = ['.mp4', '.webm']
const isVideo = (path: string) =>
  VIDEO_EXTENSIONS.some(ext => path.toLowerCase().endsWith(ext))

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1),
  shortTitle: z.string().optional(),
  fullTitle: z.string().optional(),
  summary: z.string().min(1).max(200),
  projectType: z.enum(['academic', 'freelance', 'personal']),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order: z.number(),
  heroImage: z.string().startsWith('/'),
  heroAlt: z.string().min(1),
  heroPoster: z.string().startsWith('/').optional(),
  heroVideoLoop: z.boolean().optional().default(true),
  tags: z.array(z.string()).min(1).max(8),
  stack: StackSchema,
  overview: OverviewSchema,
  links: LinksSchema,
  featured: z.boolean().optional().default(false),
  logos: z.array(LogoSchema).optional(),
  ogImage: z.string().startsWith('/').optional(),
  metaDescription: z.string().max(160).optional(),
  relatedProjects: z.array(z.string()).optional(),
}).refine(
  (data) => !isVideo(data.heroImage) || !!data.heroPoster,
  { message: 'heroPoster is required when heroImage is a video', path: ['heroPoster'] }
)

// Cross-project validation runs after parsing all files:
// - featured count ≤ 3
// - relatedProjects slugs all exist
```

The build script:

1. Reads every `.mdx` file under `/content/projects/`.
2. Parses frontmatter with `gray-matter`.
3. Validates against `ProjectFrontmatterSchema`.
4. Validates cross-project rules (featured count, related-project slugs).
5. Fails the build with file-and-field-specific error messages on any violation.

Same approach applies to `/content/about/about.mdx` against an `AboutFrontmatterSchema`.

---

## 11. Adding a New Project — Author Workflow

1. Create `/content/projects/my-project.mdx`.
2. Fill in required frontmatter (see §3).
3. Add hero image to `/public/projects/my-project/hero.jpg`.
4. Write the deep dive in MDX body using H2 section headings.
5. Run `npm run build` (or local dev server) — build will fail with specific errors if frontmatter is incomplete or invalid.
6. The new project appears automatically on `/work` and at `/work/my-project`.
7. To feature on homepage: add `featured: true` (max 3 across all projects).

No code changes. No card-component edits. No manual route registration.

---

## 12. Open Decisions

1. **Tag normalization.** Tags are currently free-form strings, which means "Computer Vision" and "computer vision" are different tags for v2 search/filter. Decide before v2: case-insensitive matching, or a controlled tag vocabulary?
2. **Stack vs tags overlap.** A project tagged `["Reinforcement Learning"]` with stack `frameworks: [PyTorch]` works, but the boundary is fuzzy. v1 ships as-is; revisit if it causes drift.
3. **Multi-author / collaborator credit.** No field for co-authors or team members in v1. Add an optional `collaborators[]` field if/when needed — not pre-emptively.
