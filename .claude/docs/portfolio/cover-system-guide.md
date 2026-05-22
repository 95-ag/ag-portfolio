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

Cover generation and composition rendering are separate systems.

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

Avoid:

- generic AI sci-fi aesthetics
- fake holograms/HUDs
- random circuitry graphics
- meaningless particles
- over-detailed flowcharts
- dense unreadable labels

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

May also render in project cards.

---

## Contributor Group

Optional avatar group rendered bottom-right. Maps to the `contributors[]` frontmatter field — each entry is `{name, avatar, url?}`.

Used for:

- contributors
- project contacts

Should remain visually secondary to project identity.

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
2. Suggest visual directions/composition ideas
3. Refine with user alignment and feedback
4. Generate cover background
5. Compose using reusable HTML/CSS system
6. Export responsive variants

---

# Rendering System

Composition rendering should be reusable and component-driven.

HTML/CSS layer handles:

- responsive layout
- metadata rendering
- avatar rendering
- theme adaptation
- crop behavior

Cover background asset remains independent from composition logic.

---

# Technical Constraints

- prioritize responsive crops
- optimize for card + detail layouts
- avoid excessive embedded text
- support dark/light themes
- prefer WebP/PNG exports
- avoid oversized assets

Covers should degrade gracefully across static, animated, and video-based hero media.

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

Cover visuals should encode real project structure.

If the composition could belong to any ML project, it belongs to none.
