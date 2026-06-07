# Component Structure Rules

How `src/components/` is organized and named, and how it maps to `docs/DESIGN.md`. Read before adding,
moving, or renaming any component. Goal: doc↔code navigation is trivial — the name is the bridge, and a
component's folder is predictable from what it is.

## Folder map

Organized portable-first, then by feature. Each folder has one job:

- `icons/` — icon library; one icon per file. Portable.
- `ui/` — portable primitives with zero page/route/schema assumptions (Button, Tag, Heading, LinkPill,
  theme selectors, CopyLink, CopyableCode, ScrollToTop).
- `mdx/` — components available to MDX content bodies (Callout, Figure, Diagram, DiagramRow, Highlight,
  CodeBlock) plus the `mdx-components` registry. Portable. (`mdx` names a precise boundary — what MDX
  content may render — not a vague catch-all; do not rename to `content/`, which collides with `src/content/`.)
- `layout/` — portable structural primitives only: Container, Grid, Stack, Section, Divider, Sticky.
  Correspond to `docs/DESIGN.md` → Foundations → Layout.
- `shell/` — the app frame mounted in the root layout: Nav, PillNav, MobileNav, Footer, SurfaceContext.
  Site-wide, single instance, not page-bound.
- `background/` — the ambient background subsystem (BackgroundLayer, AsciiField, MeteorShower). Standalone:
  not portable, not a feature, not chrome.
- `<feature>/` — feature folders for page/route/schema-bound compositions, named for the feature
  (`project/`, `about/`). These are the "domain" components; **domain status is documented in DESIGN.md,
  not encoded as an extra folder level.**

## Where does a new component go?

1. An icon? → `icons/`.
2. Portable (no page/route/schema assumptions)?
   - structural/spacing primitive → `layout/`
   - rendered inside MDX content → `mdx/`
   - otherwise → `ui/`
3. Part of the app frame (nav, footer, app-wide provider)? → `shell/`.
4. The ambient background? → `background/`.
5. Bound to one page/route/schema? → a top-level feature folder named for it (`project/`, `about/`).
   If used by exactly one route, prefer keeping it **inline** (see Inline vs Extract); create or extend a
   feature folder only when a trigger fires.

## Naming

- One canonical name per component, the same token in three places: **DESIGN.md heading = `kebab-file.tsx`
  = `PascalExport`**.
- Names state **function** — not shape, not format, not a generic role. No abbreviations.
- One component per file where practical. A tight family may share a file, documented under one parent name.

## Inline vs Extract

Default to **inline** JSX in the page/parent. Extract into a component only when a concrete trigger fires:

- **Reuse** — used in 2+ places.
- **Own state/behavior** — has its own hooks/handlers (isolation win).
- **Testability** — worth testing in isolation.
- **Unscannable parent** — the page has grown hard to read; a named section restores it (name it for a concept).

Do not extract for a 1:1 doc mapping. Single-use static sections stay inline and are documented as page sections.

## Doc ↔ code bridge

- The shared name is the primary bridge: doc→code = grep the `PascalExport`; code→doc = search DESIGN.md
  for the name.
- In DESIGN.md, tag each Domain Components / page-section entry **`[inline]`** (lives in a page) or
  **`[standalone]`** (has its own file).
- Portable components map to DESIGN.md → Components; layout primitives to DESIGN.md → Foundations → Layout.
