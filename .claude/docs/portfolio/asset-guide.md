# Asset Guide

# Philosophy

Assets should be:

- reproducible when practical
- lightweight and optimized
- visually consistent across projects
- maintainable long-term

Prefer systems over one-off manual design work.

---

# Shared Visual System

Use shared visual conventions across projects:

- typography scale
- spacing
- stroke widths
- color palette
- dark/light compatibility

Assets across projects should feel visually cohesive.

---

# Directory Structure

## Editable Sources

```
/assets-source/
  mermaid/
  matplotlib/
  tldraw/
  raw/
```

Contains:

- editable originals
- scripts/notebooks
- datasets
- drafts/work files

---

## Production Assets

```
/public/projects/[slug]/
```

Contains optimized final exports only.

---

# Asset Standards

| Category | Preferred format |
| --- | --- |
| Diagrams | SVG |
| Charts | SVG preferred, PNG acceptable |
| Raster images/photos | WebP |
| Transparency required | PNG |

## Rules

- Prefer SVG whenever practical
- Prefer WebP for raster assets
- Maintain consistent typography and visual styling across tools
- Assets should support both dark and light themes when embedded in UI
- Avoid oversized exports and duplicate variants
- Avoid browser chrome screenshots unless context is necessary
- Avoid excessive decorative effects

---

# Accessibility

- Maintain sufficient contrast
- Avoid color-only meaning in charts
- Keep labels readable on mobile
- Prefer vector text over rasterized text

---

# Asset Types

| Asset type | Authoring | Output | Notes |
| --- | --- | --- | --- |
| Flow / pipeline / state / sequence diagrams | Mermaid | SVG | Shared theme config |
| Data charts (source data available) | matplotlib + shared `.mplstyle` | SVG/PNG | Must be reproducible from scripts/data |
| Legacy charts (no source data) | Manual crop/edit | PNG | Preserve data integrity; avoid visual distortion during cleanup |
| Annotated comparisons / image layouts | MDX components + real assets | WebP/PNG | Layout handled in component layer |
| Complex/custom architecture diagrams | tldraw (fallback only) | SVG | Use only when Mermaid is insufficient |
| Hero covers / cover visuals | Live React SVG component (preferred) or static export | none / WebP/PNG | Theme-adaptive covers: live component registered by slug in `src/components/project/covers/index.ts`. Static export only when theme adaptation is not needed. See `cover-system-guide.md`. |

---

# Tooling Rules

Prefer SVG for diagrams/charts unless raster output is materially better.

## Mermaid

Use for:

- flows
- pipelines
- sequences
- dependency/state diagrams

Avoid for:

- highly custom spatial layouts
- artistic/manual compositions

**Generation:** `mmdc -i <file>.mmd -o <out>.svg -c assets-source/mermaid/_theme.json`  
The shared theme config lives at `assets-source/mermaid/_theme.json` — never inline `%%{init}%%` blocks in `.mmd` files.

---

## matplotlib

- All charts should be regeneratable
- Store scripts and datasets with source assets
- Use shared style system
- Prefer readability over density

---

## tldraw

Use only when Mermaid cannot reasonably express the diagram.

Rules:

- maintain consistent typography, spacing, and grid alignment
- avoid rasterized text/decorative styling

---

## MDX Figure Components

Use reusable components for:

- side-by-side comparisons
- annotated visuals
- responsive figure layouts
- captions/references

Assets live in `/public`; layout logic lives in components.

---

# Performance Budget

Prefer fast-loading assets.

Avoid:

- oversized PNG exports
- excessive embedded raster graphics
- unnecessary animation
- multi-MB hero images

---

# Optimization Checklist

Before commit:

- optimized file size
- consistent spacing/typography
- readable labels
- no duplicate exports
- descriptive stable filenames
- source retained if reproducibility is expected

---

# Responsive Constraints

Assets should remain legible on narrow/mobile layouts.

Prefer:

- fewer simultaneous labels
- larger text at small sizes
- vertically stacked layouts on mobile
- simplified wide/horizontal diagrams

---

# Naming Convention

## Production

```
/public/projects/[slug]/
  architecture-overview.svg
  benchmark-chart.svg
  hero-cover.webp          # cover system background (see cover-system-guide.md)
  hero-video-poster.jpg    # video still fallback — maps to `heroPoster` frontmatter field
```

## Source

```
/assets-source/matplotlib/[project]/
  benchmark.py
  benchmark.ipynb
  benchmark.csv
```

---

# Reproducibility

Reproducible assets should retain source definitions/scripts/data.

Examples:

- Mermaid diagrams
- matplotlib charts

Editorial assets may retain editable sources when practical.

Examples:

- hero posters
- annotated compositions

---

# Source Assets & Export Policy

Editable source assets are authoritative.

Production assets should be treated as final exports.

Regenerate exports from source assets instead of manually modifying production files.

---

# Anti-Patterns

Avoid:

- screenshots instead of exports
- inconsistent visual styles/fonts
- oversized PNG charts
- unreadable labels
- overly decorative visuals that reduce technical clarity
- manually edited charts that should be script-generated
- inconsistent padding/alignment across assets

---