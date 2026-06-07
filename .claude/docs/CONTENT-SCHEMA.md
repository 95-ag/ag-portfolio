# CONTENT-SCHEMA.md

> Contract between MDX content files and the rendering layer.
> PRODUCT.md owns *what* and *why*. DESIGN.md owns *how it looks*. This document owns *how content is structured*.
> When PRODUCT.md and this document disagree on a content field, this document wins.

---

## Scope & Principles

This document defines:
- Directory structure and file conventions for content.
- Frontmatter schemas with required and optional fields.
- MDX components available in body content.
- Section conventions for project deep dives.
- Validation behavior at build time.

This document does **not** define:
- Writing style or tone — no writing guide exists yet.
- Blog content schema beyond a placeholder reference — v2.
- Components that don't exist yet — new MDX components are added when a project needs them, not pre-emptively.

**Authoring principles:**
- Frontmatter is for structured, uniform fields — cards, sidebars, overview subsections, anywhere visual consistency matters across projects.
- MDX body is for variable, free-form content — deep-dive subsections, prose, embedded components.
- Required fields fail the build. Missing optional fields render nothing — never placeholders, never "TBD."
- Slug is the filename — no `slug:` field. Filename is the source of truth.

---

## Directory Structure

```
/content
  /projects
    project-slug.mdx
  /blog                       — v2
    post-slug.mdx
  /about
    about.mdx                 frontmatter only; body unused in v1
/public
  /projects
    /[slug]
      cover.png               dark-theme cover screenshot (for OG + heroImage)
      diagram-name.svg
      ...
  /AishwaryaGanesan_Resume.pdf
  /headshot.jpeg
```

**File naming rules:**
- Filenames are kebab-case: `lane-refinement-rl.mdx`.
- Slug is derived from the filename, lowercased, `.mdx` extension stripped.
- One MDX file = one project. No multi-project files.
- Image paths in MDX and frontmatter are **web paths from `/public`** — e.g. `/projects/lane-rl/hero.jpg` — not filesystem-relative paths.

---

## Project Frontmatter Schema

Frontmatter is YAML. Validated at build time against the Zod schema in → Validation Implementation. Build fails on schema violations.

### Full schema

```yaml
---
# === Required: identity ===
title: "Lane Refinement with Double DQN"
summary: "Two-stage RL pipeline that corrects lane-detection errors in occluded driving scenes."
projectType: academic                   # academic | freelance | personal

# === Required: dates and ordering ===
publishedAt: "2024-09-15"               # ISO 8601 string
order: 10                               # lower = earlier in lists; ties broken by publishedAt desc

# === Required: hero (live cover OR heroImage) ===
# Preferred: register a live React SVG cover by slug in
# src/components/project/covers/index.ts — heroImage may then be omitted.
# Otherwise heroImage is required. Build fails if a project has neither.
heroImage: "/projects/lane-rl/cover.png"    # optional when live cover is registered
heroAlt: "Side-by-side comparison of baseline vs RL-refined lane detection on an occluded curve."
heroPoster: "/projects/lane-rl/hero-poster.jpg"   # required if heroImage is a video
heroVideoLoop: true                                # optional; defaults true for videos

# === Required: tags ===
tags:
  - Reinforcement Learning
  - Computer Vision
  - Autonomous Driving

# === Required: stack (fixed categories) ===
stack:
  languages: [Python, C++]
  frameworks: [PyTorch, OpenCV]
  libraries: [NumPy, Pandas, scikit-learn]
  tools: [Docker, Git, Linux]

# === Required: overview ===
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
  transferableSkills:                   # academic/freelance; use `learnings` for personal
    - Designing modular ML pipelines
    - Working with noisy perception data

# === Optional: subtitle ===
subtitle: "Two-Stage Deep Reinforcement Learning Pipeline for Lane Boundary Refinement"

# === Optional: external links ===
links:
  github: "https://github.com/user/lane-rl"
  demo: "https://lane-rl.example.com"
  paper: "/projects/lane-rl/paper.pdf"
  report: "/projects/lane-rl/report.pdf"
  presentation: "/projects/lane-rl/slides.pdf"

# === Optional: featured on homepage ===
featured: true                          # default false; cap of 3 enforced at build

# === Optional: associated entities ===
logos:
  - src: "/projects/lane-rl/sfu-logo.svg"
    alt: "Simon Fraser University"

# === Optional: contributors ===
contributors:
  - name: "Jane Smith"
    avatar: "/projects/lane-rl/jane-smith.jpg"
    url: "https://janesmith.dev"        # optional
  - name: "Alex Lee"
    avatar: "/projects/lane-rl/alex-lee.jpg"

# === Optional: SEO ===
ogImage: "/projects/lane-rl/og.png"     # falls back to heroImage if omitted
metaDescription: "..."                  # falls back to summary if omitted

# === v2: related projects ===
relatedProjects:
  - distributed-task-queue
  - serverless-media-api
---
```

### Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Full project title used in headers, OG tags, browser tab |
| `subtitle` | string | no | Long descriptive title. Renders below `title` in the project header |
| `summary` | string | yes | One-line description. Used on cards; fallback for meta description |
| `projectType` | enum | yes | `academic` \| `freelance` \| `personal` |
| `publishedAt` | ISO date string | yes | Drives sort order tiebreak |
| `order` | number | yes | Primary sort key. Lower = earlier |
| `heroImage` | string | conditional | Web path under `/public`. Optional when a live cover is registered for the slug; required otherwise. Accepts image, video, or animated SVG — see → Hero Media |
| `heroAlt` | string | yes | Alt text. Required for all hero types including video |
| `heroPoster` | string | conditional | Required if `heroImage` is a video |
| `heroVideoLoop` | boolean | no | Default `true`. Applies to video `heroImage` only |
| `tags` | string[] | yes | Free-form strings; 3–6 recommended, 1–8 enforced (build fails outside) |
| `stack` | object | yes | See → Stack Categories |
| `overview` | object | yes | See → Overview Structure |
| `links` | object | no | Optional `github`, `demo` (full URLs); `paper`, `report`, `presentation` (URL or relative path) |
| `featured` | boolean | no | Default `false`. Triggers homepage inclusion |
| `logos` | array | no | Associated org/company logos. Each `{ src, alt }` |
| `contributors` | array | no | Presentational collaborator credits. Each `{ name, avatar, url? }`. `avatar` required, must start with `/`. `url` optional |
| `ogImage` | string | no | Falls back to `heroImage` |
| `metaDescription` | string | no | Falls back to `summary` |
| `relatedProjects` | string[] | no | Array of slugs. Validated at build; not rendered in v1 |

### Stack Categories

Fixed enum. New categories require a schema change, not free-form additions.

```yaml
stack:
  languages: [...]      # Python, C++, TypeScript, Go, etc.
  frameworks: [...]     # PyTorch, Next.js, FastAPI, etc.
  libraries: [...]      # NumPy, Pandas, recharts, etc.
  tools: [...]          # Docker, Git, Linux, AWS, etc.
```

All four keys are required but may be empty arrays. Empty arrays render nothing. Missing keys fail the build.

### Overview Structure

The `overview` object renders the recruiter-readable section on the project page — see `PRODUCT.md → Page Specifications → Project Detail`.

```yaml
overview:
  problem: string             # markdown-allowed paragraph; multi-line OK with YAML `|`
  built: string               # markdown-allowed paragraph
  results: string[]           # bulleted list; 2–4 items recommended (optional)
  transferableSkills: string[]   # optional; use for academic and freelance
  learnings: string[]            # optional; use for personal
```

**Convention — not enforced by build:**
- `academic` / `freelance`: use `transferableSkills`.
- `personal`: use `learnings`; `results` optional.
- One field per project — both present renders both (valid; visually redundant).
- Neither present: that row is omitted from the overview.

### Featured Projects

`featured: true` marks a project for homepage inclusion.

**Build validates:**
- Maximum 3 featured projects across the entire content set. More than 3 fails the build.
- Featured projects sort by `order` on the homepage, independent of the Work-page sort.

### Validation Rules

**Build fails on:**
- Missing required field.
- Invalid `projectType` enum value.
- Empty `tags` array, or more than 8 tags.
- `summary` longer than 200 characters.
- `metaDescription` longer than 160 characters.
- More than 3 projects with `featured: true`.
- `relatedProjects` reference that doesn't resolve to an existing slug.
- Image path not starting with `/`.
- Video `heroImage` with no `heroPoster`.
- Project with neither a registered live cover nor a `heroImage`.

### Hero Media

Every project's hero is satisfied by one of two sources, checked by the content loader:

1. **Live cover (preferred)** — a React SVG component registered by slug in `src/components/project/covers/index.ts`. Takes precedence over `heroImage` when present. Renders on both the project page hero and the project card. When a live cover is registered, `heroImage` may be omitted.
2. **`heroImage`** — a static asset described below.

The build fails if a project has neither.

**Image** (`.jpg`, `.png`, `.webp`):
- Renders via `next/image`.
- `heroPoster` and `heroVideoLoop` are ignored.

**Video** (`.mp4`, `.webm`):
- Renders as a `<video>` element.
- `autoplay`, `muted`, `playsinline` always on.
- `loop` defaults `true`; override via `heroVideoLoop: false`.
- `heroPoster` is required — used as loading state and for users with autoplay disabled.
- Recommended length: ≤ 8 seconds. Loops should feel seamless.
- Recommended encoding: H.264 MP4 + VP9 WebM, both ≤ 2 MB.

**Animated SVG** (`.svg` with embedded `<animate>` or CSS animations):
- Renders as `<img>`.
- Animation must respect `prefers-reduced-motion`. If it can't be paused, use a static image instead.

**Rules across all types:**
- `heroAlt` is required regardless of media type. For videos, describe what the video shows — not "video of...".
- Aspect ratio: 16:9 recommended. Other ratios work but may letterbox.
- Reduced-motion fallback: video heroes display the poster only.

**No GIFs** — use video instead. **No Lottie/JSON animations** — not justified for a hero in v1. **No autoplay audio** — all videos render muted.

---

## Project Body MDX

Body MDX renders below the hero and overview as the deep-dive section — see `PRODUCT.md → Page Specifications → Project Detail`.

### Section Conventions

H2 headings divide the deep dive. Recommended sections — all optional, include only what's substantive:

```mdx
## Problem

Prose explaining edge cases, failure modes, why standard approaches fall short.

## Background

Domain context, theoretical background, hardware or environment constraints,
operational requirements.

## Data

Dataset source, preprocessing, annotations, augmentations, distribution
characteristics, challenges.

## Architecture

<Diagram src="/projects/lane-rl/architecture.svg" alt="..." />

Prose explaining the design.

## Training Design

State and action definitions, reward shaping, training loop, memory and compute
considerations. Pseudocode where helpful.

## Optimization

Hyperparameter tuning, memory work, throughput improvements, model simplification.

## Deployment

Environment, format (ONNX, TensorRT), runtime constraints, system interface.

## Results

Quantitative metrics, qualitative examples, before/after comparisons.

<Figure src="/projects/lane-rl/results-curve.png" caption="..." />

## Limitations

Honest accounting of what didn't work, binding constraints, open questions.

## Next Steps

What would improve this further — engineering maturity, not aspirational scope.
```

**Rules:**
- H2 is reserved for deep-dive section headings. No H1 in body — one H1 per page is rendered by the layout from `title`.
- H3 and below are free for sub-structuring within sections.
- Section ordering above is a recommendation, not a requirement — adjust to fit the project.
- `personal` projects may have a single short section or skip the deep dive entirely.

### Reading Width

Body MDX renders inside a single-column layout with a capped reading width — see `DESIGN.md → Domain Components → Project Detail → Project Detail Layout`. Wide content (full-bleed diagrams, tables) uses the `<Figure wide>` variant.

---

## MDX Components

Seven custom components plus standard markdown. New components are added when a project needs them, not pre-emptively.

### `<Figure>`

Image with optional caption and width control.

```mdx
<Figure
  src="/projects/lane-rl/results-curve.png"
  alt="Training reward curve showing convergence at episode 4000"
  caption="Reward converges around episode 4000."
  width="default"
/>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | string | yes | Web path under `/public` |
| `alt` | string | yes | Accessibility |
| `caption` | string | no | Renders below image, muted caption style |
| `width` | enum | no | `"default"` (full container width) \| `"wide"` (capped at 960px). Default `"default"` |
| `aspect` | string | no | Aspect ratio e.g. `"16/9"`, `"4/3"`. Default `"16/9"` |

### `<Diagram>`

Architecture diagrams, flow charts, system illustrations. Rendered in a sunken, bordered frame with the image fitted inside (`object-contain`), rather than filling edge-to-edge like `<Figure>` (`object-cover`).

```mdx
<Diagram
  src="/projects/lane-rl/architecture.svg"
  alt="Two-stage pipeline: CNN backbone feeds initial predictions to a DQN refinement agent."
  caption="Two-stage refinement pipeline."
/>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | string | yes | Web path under `/public` |
| `alt` | string | yes | Accessibility |
| `caption` | string | no | Renders below, muted caption style |
| `width` | enum | no | `"default"` (full) \| `"narrow"` (560px) \| `"wide"` (960px). Default `"default"` |
| `aspect` | string | no | Aspect ratio e.g. `"16/9"`. Default `"16/9"` |

### `<DiagramRow>`

Side-by-side panel layout for comparing two or three related diagrams. Wraps `<DiagramPanel>` children.

```mdx
<DiagramRow layout="2col" caption="Overall row caption.">
  <DiagramPanel src="/projects/example/a.png" alt="..." label="Panel A" aspect="1/1" />
  <DiagramPanel src="/projects/example/b.png" alt="..." label="Panel B" aspect="1/1" />
</DiagramRow>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `layout` | enum | no | `"2col"` (default) — two equal columns; `"2+1"` — two columns then a centered third |
| `caption` | string | no | Row-level caption rendered below all panels |
| `className` | string | no | Additional Tailwind classes (e.g. `max-w-[620px]`) |

### `<DiagramPanel>`

Single panel inside a `<DiagramRow>`. Renders the image in a sunken bordered frame with an optional sub-label.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | string | yes | Web path under `/public` |
| `alt` | string | yes | Accessibility |
| `aspect` | string | no | Aspect ratio string e.g. `"4/3"`, `"1/1"`. Default `"4/3"` |
| `label` | string | no | Sub-figure caption below the panel (e.g. "Original" / "Grad-CAM") |

### `<Callout>`

Editorial aside for key insights, decisions, or caveats.

```mdx
<Callout title="Optional lead-in">
The reward function only penalized lateral error — adding a curvature
penalty would likely close the remaining gap on tight turns.
</Callout>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `title` | string | no | Optional bold lead-in rendered in accent color |

Single visual treatment: accent left border, accent title. Visual spec: `DESIGN.md → Components → Content Surfaces → Callout`.

### `<Stack>`

Vertical stack of items with consistent spacing. Used when default markdown spacing is too tight or inconsistent.

```mdx
<Stack gap="md">
  <Callout>...</Callout>
  <Callout>...</Callout>
</Stack>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `gap` | enum | no | `"xs"` \| `"sm"` \| `"md"` (default) \| `"lg"` \| `"xl"` \| `"2xl"` \| `"3xl"` |

### `<Highlight>`

Standalone elevated pull-quote for a single key insight. A physically separated panel — not an inline callout variant.

```mdx
<Highlight heading="Key finding">
  High-entropy inputs sit near class boundaries — training on these provides
  a denser map of the victim's decision surface per query.
</Highlight>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `heading` | string | no | Renders as a small label above the body. Omit for body panel only |
| `children` | ReactNode | yes | Prose content |

Use sparingly — one per deep dive at most. Not a substitute for `<Callout>`. Callouts are inline asides; `<Highlight>` is a standalone elevated statement. Visual spec: `DESIGN.md → Components → Content Surfaces → Highlight`.

### Code Blocks

Standard fenced code blocks, syntax-highlighted at build time via Shiki. Language hint required for highlighting.

````mdx
```python
def reward(state, next_state):
    return -lateral_error(next_state)
```
````

Inline code uses single backticks. Visual spec: `DESIGN.md → Technical Conventions → Code Block Highlighting`.

---

## Standard Markdown Conventions

| Element | Use |
|---|---|
| `**bold**` | Emphasis. Use sparingly |
| `*italic*` | Term introduction, foreign words, light emphasis |
| `[link](url)` | Inline links. External `http`/`https` links open in a new tab |
| `> quote` | Blockquote |
| `---` | Horizontal rule. Use sparingly for major shifts within a section |
| Lists | Unordered or ordered |
| Tables | GFM tables |

**No raw HTML in MDX body** — use components instead. **No `<br>` for spacing.** **No inline `style=` or `className=`.**

---

## About Page Content

`PRODUCT.md → Page Specifications → About` specifies the About page sections. Content lives in structured frontmatter on a single `/content/about/about.mdx` file — not in MDX body.

The About page has a structured layout where each section's heading and body must render consistently across rebuilds. Frontmatter enforces that structure; MDX body cannot.

```yaml
---
# /content/about/about.mdx (frontmatter only; body is unused in v1)

name: "Your Name"

# Opening statement — rendered as the editorial deck under the H1.
# One concise sentence. States what you build and how you think about it.
positioning: "Building practical ML systems for real-world constraints."

# Supporting paragraphs — rendered as body-weight prose below the opening statement.
# Multi-paragraph string; paragraphs separated by a blank line.
# Covers: domain focus, how you work, what you optimise for.
detailedPositioning: |
  Systems thinking across model training, inference, and backend — these are connected problems.

  I optimise for shipping. Usable systems early, refined against real data.

headshot: "/headshot.jpeg"
headshotAlt: "Portrait of [Your Name]"

socials:
  github: "https://github.com/..."
  linkedin: "https://linkedin.com/in/..."

contactEmail: "you@example.com"

capabilities:
  - area: "ML Systems"
    description: "End-to-end model development, deployment, and monitoring."
    tags: [PyTorch, ONNX, Triton, scikit-learn]
  - area: "Computer Vision"
    description: "..."
    tags: [OpenCV, Detectron2]

approach:
  - title: "Systems thinking"
    body: "..."
  - title: "Iteration over speculation"
    body: "..."
---
```

### About Frontmatter Rules

| Field | Required | Notes |
|---|---|---|
| `name` | yes | |
| `positioning` | yes | One sentence |
| `detailedPositioning` | yes | Multi-paragraph string; paragraphs split on blank lines |
| `headshot` | yes | Web path starting with `/` |
| `headshotAlt` | yes | |
| `socials` | yes | Minimum one entry; each value is a URL |
| `contactEmail` | yes | Valid email address |
| `capabilities` | yes | Minimum two entries |
| `approach` | yes | Minimum one entry |

- `capabilities[].description` is optional — omitted fields render nothing.
- `capabilities[].tags` is required per entry.
- Date strings in any display field are free-form for human readability — they are displayed verbatim, not sorted.

**Body content:** the MDX body of `about.mdx` is unused in v1.

---

## Resume

Single PDF at `/public/AishwaryaGanesan_Resume.pdf`. Updated manually. No content schema — it's a binary asset.

---

## Blog — v2

Blog content schema is deferred to v2. When v2 is scoped:
- Blog posts will reuse the MDX pipeline.
- Frontmatter will share `title`, `summary`, `publishedAt`, `tags`, `heroImage`, `ogImage`, `metaDescription` with projects.
- Blog posts will have free-form body MDX — no `overview` frontmatter equivalent.
- Blog-specific fields (e.g. `readingTime`, `series`) are TBD.

No blog frontmatter fields in v1.

---

## Validation Implementation

Frontmatter is validated at build time using Zod. All schemas live in `/lib/schemas/`.

```ts
// /lib/schemas/project.ts (representative — refer to source for authoritative schema)
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
  paper: z.string().optional(),
  report: z.string().optional(),
  presentation: z.string().optional(),
}).optional()

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  summary: z.string().min(1).max(200),
  projectType: z.enum(['academic', 'freelance', 'personal']),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order: z.number(),
  heroImage: z.string().startsWith('/').optional(),   // optional when live cover registered
  heroAlt: z.string().min(1),
  heroPoster: z.string().startsWith('/').optional(),
  heroVideoLoop: z.boolean().optional().default(true),
  tags: z.array(z.string()).min(1).max(8),
  stack: StackSchema,
  overview: OverviewSchema,
  links: LinksSchema,
  featured: z.boolean().optional().default(false),
  logos: z.array(LogoSchema).optional(),
  contributors: z.array(ContributorSchema).optional(),
  ogImage: z.string().startsWith('/').optional(),
  metaDescription: z.string().max(160).optional(),
  relatedProjects: z.array(z.string()).optional(),
}).refine(
  (data) => !data.heroImage || !isVideo(data.heroImage) || !!data.heroPoster,
  { message: 'heroPoster is required when heroImage is a video', path: ['heroPoster'] }
)
```

**Build script flow:**
1. Read every `.mdx` file under `/content/projects/`.
2. Parse frontmatter with `gray-matter`.
3. Validate against `ProjectFrontmatterSchema`.
4. Validate cross-project rules (featured count, related-project slugs).
5. Fail with file-and-field-specific error messages on any violation.

Same approach applies to `/content/about/about.mdx` against `AboutFrontmatterSchema`.

---

## Adding a New Project — Author Workflow

1. Create `/content/projects/my-project.mdx`.
2. Fill in required frontmatter — see → Project Frontmatter Schema → Field reference.
3. Add hero asset to `/public/projects/my-project/` (image, video, or register a live cover).
4. Write the deep dive in MDX body using H2 section headings.
5. Run `npm run build` — build fails with specific errors if frontmatter is incomplete or invalid.
6. The project appears automatically on `/work` and at `/work/my-project`.
7. To feature on the homepage: add `featured: true` — max 3 across all projects.

No code changes. No card-component edits. No manual route registration.

---

## Open Questions

- **Tag normalization.** Tags are currently free-form strings — `"Computer Vision"` and `"computer vision"` are different values. Decide before v2 search/filter: case-insensitive matching or a controlled tag vocabulary?
- **Stack vs tags overlap.** A project tagged `["Reinforcement Learning"]` with `stack.frameworks: [PyTorch]` works, but the boundary is fuzzy. v1 ships as-is; revisit if it causes drift.
- **Multi-author credit.** `contributors[]` is presentational metadata (`name`, `avatar`, `url?`). No contributor profile system or cross-link architecture.
