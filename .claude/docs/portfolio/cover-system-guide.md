# Project Cover/Hero System Guide

The cover system defines the visual composition and metadata overlays used for project hero/cover assets across cards and project pages.

# Philosophy

Project covers are structured editorial compositions that communicate:

- project identity
- technical concept
- system architecture
- visual tone

Covers should feel technically grounded, visually cohesive, and recognizable at thumbnail size.

Prefer scientific/editorial composition over decorative AI artwork.

Prefer technical abstraction over cinematic spectacle.

---

# Composition Architecture

Project covers are built from layered components:

1. Cover background
2. Surface/background layer
3. Metadata Layers

Cover generation and composition rendering are separate systems for static assets. For live SVG components, all layers are unified in a single React component — no pre-rendered asset exists.

Covers should remain identifiable even when heavily cropped in card layouts.

Fallback covers may use typography-only compositions when meaningful cover generation is unavailable or unnecessary.

---

# Cover Background

## Purpose

The cover background communicates the project's core technical idea visually.

It should represent:

- architecture
- workflows
- data movement
- model behavior
- domain context
- technical abstractions

Not literal documentation screenshots.

---

## Preferred Visual Style

- scientific/editorial
- technically grounded
- minimal decorative noise
- diagram-informed compositions
- clean spatial hierarchy
- structural elements in `on-surface`; accent used sparingly for a single focal highlight in the base diagram (one standout element) and for annotation text and arrow strokes
- handwritten-style annotations when they encode specific project insights

Avoid:

- generic AI sci-fi aesthetics
- fake holograms/HUDs
- random circuitry graphics
- meaningless particles
- over-detailed flowcharts
- dense unreadable labels
- annotations that could belong to any project
- accent color on more than one structural diagram element

---

## Cover Content Sources

Extract cover concepts from:

- reports/papers
- architecture diagrams
- datasets
- outputs/predictions
- workflows/pipelines
- domain-specific structures
- technical constraints/themes
- engineering decisions/tradeoffs

Generate cover directions before generating final artwork.

---

## Theme System

Cover backgrounds may use transparency.

Composition surface/background colors come from site theme tokens.

This allows:

- dark/light adaptation
- theme-aware rendering
- distinct project palettes without duplicating assets

Cover visuals should maintain readability across both themes.

---

# Composition Layout

## Safe Zones

Important visual content should remain visible in:

- project cards
- detail pages
- mobile crops

Avoid placing critical elements near extreme edges.

---

## Focal Structure

Prefer:

- single dominant focal area
- layered depth
- asymmetric balance
- preserved whitespace
- readable thumbnail silhouette
- left-to-right narrative flow for pipeline and process diagrams — elements read as a sequence with consistent sizing and clean connectors
- terminal element at the far right holding the key result or output

Avoid:

- split compositions with disconnected upper and lower halves
- dead horizontal space that breaks the reading flow
- mixed element sizes and label styles within the same diagram
- compositions where no narrative direction is legible

---

## Responsive Behavior

Covers should remain readable on narrow layouts.

Prefer:

- simplified compositions
- large visual anchors
- minimal small text
- stable crop regions
- vertically stackable metadata components

---

# Metadata Layer

## Organization / Logo Group

Optional logo group rendered bottom-left. Maps to the `logos[]` frontmatter field — each entry is `{src, alt}`.

Used for:

- organizations
- clients
- institutions
- companies

Rendered on project detail pages. Each logo: 40×40px circle, white background, `outline-variant` border, `object-contain` with 4px inner padding.

---

## Contributor Group

Optional avatar group rendered bottom-right. Maps to the `contributors[]` frontmatter field — each entry is `{name, avatar, url?}`.

Used for:

- contributors
- project contacts

Rendered on project detail pages. 24×24px circular avatars, −6px overlap stack, `outline-variant` border. Links active on detail page when `url` present. Should remain visually secondary to project identity.

---

## Metadata Rules

- keep metadata density low
- maintain safe spacing from edges
- limit avatar/logo counts
- preserve cover readability
- metadata should not obscure focal content

Metadata interaction rules:

- metadata overlays are presentational only in project cards — no interactive affordances
- `logos[]` and `contributors[]` link groups may be interactive in project detail pages when `url` is present
- interactions should not interfere with crop/readability

---

# Generation Workflow

1. Extract technical concepts from project sources
2. Propose 3–4 distinct visual directions — for each, describe the composition concept and the key visual elements (what appears, where, what it encodes). Include rough placement notes so the user can evaluate without seeing a render. Get approval before building.
3. Build base composition — static asset or live React SVG component
4. Get base composition approved as a standalone diagram before touching annotations
5. If annotations are appropriate, propose 2–4 annotation directions with content options sourced from the project's specific technical contributions; build only after user selects
6. Verify thumbnail readability at card scale before finalizing

---

# Rendering System

Covers render in two modes.

**Static asset** — `next/image` or `<video>` via frontmatter. Use for pre-rendered diagrams, charts, and screenshot crops.

**Live React SVG component** — registered in the cover component registry keyed by project slug. Renders in the same 16:9 wrapper as static covers. Use when the composition requires theme-adaptive colors or handwritten annotations that must change between light and dark surfaces.

Live component rules:

- all colors via CSS custom properties only — no hardcoded values
- fixed viewBox `0 0 1200 675`
- `aria-hidden` on both the wrapper and the SVG — covers are decorative

---

# Engineering Annotations

Annotations add handwritten-style callouts to live SVG covers. Use only when the annotation encodes a real project-specific insight — not decoration.

The base composition must work as a standalone diagram before annotations are added. Annotations are a second-pass enhancement approved separately from the base.

Keep to 2–3 annotations maximum. Each must target a distinct diagram element — do not cluster multiple annotations at the same region. If an annotation could belong to any project in the same domain, cut it.

Good annotation sources: algorithm names and techniques, real budget or query numbers, headline accuracy or fidelity metrics, distinctive architectural decisions.

Construction rules:

- font: Caveat (`var(--font-caveat)`) only — no UI font tokens in SVG
- color: accent (`var(--accent)`) for both text and arrow strokes — no other color in annotations
- arrows: bezier path ends 7–9px before the tip; arrowhead is two independent `<line>` elements — path endpoint and arrowhead coordinates must not share a point
- path starts from the edge of the label text nearest the target, not from the far edge

---

# Technical Constraints

- prioritize responsive crops
- optimize for card + detail layouts
- avoid excessive embedded text
- support dark/light themes
- static assets: prefer WebP/PNG, avoid oversized files
- live SVG components: no asset export needed — theme adaptation is built in

Covers should degrade gracefully across static, animated, video-based, and live SVG hero media.

---

# Anti-Patterns

Avoid:

- generic AI art
- fake dashboards
- visual clutter
- unreadable typography
- excessive glow effects
- literal documentation screenshots
- dense UML-style diagrams
- overly symmetrical compositions
- decorative visuals without technical meaning
- exporting a theme-adaptive diagram as a static PNG — use a live SVG component instead
- annotations that don't encode project-specific content
- split compositions with disconnected regions and no reading direction
- accent color spread across multiple structural elements — one focal highlight maximum in the base diagram
- building annotations before the base composition is approved

Cover visuals should encode real project structure.

If the composition could belong to any ML project, it belongs to none.
