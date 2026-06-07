# IMPLEMENTATION-PLAN.md

# Implementation Rules

Before implementing any phase:

* Read and follow:

  * PRODUCT.md
  * DESIGN.md
  * CONTENT-SCHEMA.md

These documents are the source of truth for:

* product requirements
* UX behavior
* design system direction
* content architecture
* project structure
* rendering rules

Implementation decisions must remain consistent with these documents unless explicitly overridden.

Do not:

* invent additional product requirements
* introduce conflicting design systems
* add unnecessary libraries or abstractions
* over-engineer architecture
* create temporary implementations that require major rewrites later

Prioritize:

* maintainability
* scalability
* content-first architecture
* reusable systems
* technical clarity
* restrained and consistent UI behavior

Complete work phase-by-phase in order.
Do not skip ahead unless dependencies require it.

---

# Phase 1 — Initialize Base Project

## Goals

Set up the complete architectural foundation for the portfolio before building UI pages or visual polish.

The result of this phase should be:

* stable project architecture
* scalable MDX content pipeline
* reusable layout foundation
* working theme system
* validated content structure
* clean developer experience

---

## Create Project

Initialize Next.js project with:

* App Router
* TypeScript
* Tailwind CSS

Install and configure:

* Framer Motion
* MDX support
* Biome
* next-themes
* required typography/font packages
* Zod for content validation

---

## Configure Project Foundations

Configure:

* TypeScript
* Tailwind
* Biome
* path aliases
* font loading
* dark/light/system theme support
* metadata configuration
* responsive breakpoints
* global CSS structure

---

## Set Up Core Architecture

Create:

* routing structure
* reusable layout system
* global providers
* navigation shell
* footer shell
* typography system
* theme provider
* design-token structure

---

## Set Up Content Infrastructure

Create and configure:

* MDX content directory structure
* frontmatter validation
* filename-based slug generation
* dynamic project routing
* reusable MDX utilities
* project-card extraction system
* content parsing utilities

Ensure:

* adding a project MDX file automatically generates:

  * project page
  * Work-page card

---

## Create Initial Folder Structure

Recommended structure:

```txt
app/
components/
components/ui/
components/layout/
components/mdx/
content/
content/projects/
content/blog/
lib/
lib/content/
lib/utils/
styles/
public/
public/projects/
```

---

## Verification Requirements

Ensure:

* app builds successfully
* MDX renders correctly
* routing works
* theme switching works
* TypeScript passes
* Biome passes
* no broken imports
* no hydration issues
* no temporary placeholder architecture

Do not begin Phase 2 until the architecture is stable.

---

# Phase 2 — Build Design System

## Goals

Build the reusable visual system before building full pages.

This phase establishes:

* layout rhythm
* typography hierarchy
* spacing consistency
* reusable UI primitives
* interaction behavior

Do not build polished pages yet.

---

## Define Design Tokens

Implement:

* typography scale
* spacing scale
* radius system
* color tokens
* container widths
* grid system
* z-index system
* motion timing/easing tokens

Ensure implementation matches DESIGN.md.

---

## Build Layout Components

Create reusable layout primitives:

* Container
* Section
* Panel
* Grid
* Stack
* Divider
* Sidebar layout
* Sticky section wrappers

Components should prioritize:

* composability
* responsiveness
* readability
* consistent spacing behavior

---

## Build Core UI Components

Create reusable:

* Button
* Card
* Heading
* Tag
* Callout
* Metadata row
* Navigation items
* Footer items
* Image wrapper
* Theme toggle

Avoid page-specific implementations.

---

## Build MDX Components

Create reusable MDX rendering components:

* Figure
* Diagram
* Callout
* Stack
* Code block wrapper

Keep component surface area intentionally small.

---

## Define Interaction Patterns

Implement:

* hover states
* focus states
* transition behavior
* navigation interactions
* panel/card interactions
* active states
* keyboard accessibility behavior

Motion should remain:

* subtle
* restrained
* functional

Avoid decorative animation systems.

---

## Verification Requirements

Ensure:

* visual consistency
* spacing consistency
* typography consistency
* responsive behavior
* accessibility basics
* reusable composition patterns
* dark/light theme consistency
* interaction consistency

Do not begin Phase 3 until the design system is stable.

---

# Phase 3 — Build Skeleton Pages

## Goals

Build complete page structures without final polish or advanced animation.

Focus on:

* layout architecture
* content hierarchy
* responsive structure
* content rendering

Do not focus on visual perfection yet.

---

## Build Pages In This Order

1. Home
2. Work
3. Project Template
4. About

---

## Home Page

Implement:

* hero structure
* featured projects section
* CTA section
* navigation integration
* footer integration

Focus on:

* hierarchy
* scanning
* structure

Avoid:

* decorative effects
* heavy animations

---

## Work Page

Implement:

* project listing layout
* MDX-powered project cards
* metadata rendering
* tags/categories
* responsive card grid/list behavior

Ensure:

* project discovery remains fast
* layout scales cleanly

---

## Project Template

Implement:

* dynamic MDX rendering
* sidebar metadata
* structured content layout
* image/diagram handling
* reusable MDX components
* technical section hierarchy

Project pages should feel like:

* engineering case studies
  not:
* blog posts
* marketing pages

---

## About Page

Implement:

* two-panel intro layout
* structured content sections
* sticky/structured headings where appropriate
* technical capability section
* contact section

Maintain:

* readability
* editorial structure
* calm spacing rhythm

---

## Verification Requirements

Ensure:

* layouts work responsively
* content hierarchy feels correct
* pages remain readable without polish
* navigation flow works cleanly
* MDX integration remains stable
* layouts scale with long-form content

Do not begin Phase 4 until page structure is stable.

---

# Phase 4 — Initial Content Scaffold

## Goals

Add placeholder project content to validate the content pipeline and layout system before visual polish.

This phase validates:

* project-card generation and routing
* MDX rendering and component behavior
* content hierarchy and layout scalability
* frontmatter schema and Zod validation

Real authoring happens in Phase 6. Placeholder content here is intentional.

---

## Add Placeholder Projects

Add 2–3 placeholder projects covering the intended project types (academic, freelance, personal) with:

* representative frontmatter fields
* minimal but structurally correct MDX body
* placeholder hero images

Avoid investing in real writing or assets at this stage.

---

## Validate Content System

Verify:

* project-card generation
* metadata rendering
* long-form readability
* image handling
* MDX component behavior
* section consistency
* responsive content behavior

---

## Refine Content Structure

Adjust:

* spacing rhythm
* section hierarchy
* sidebar behavior
* content density
* callout usage
* diagram placement
* metadata visibility

---

## Verification Requirements

Ensure:

* project pages feel like engineering case studies
* recruiter scanning works
* deep technical reading works
* layouts scale with real content
* visuals support understanding rather than dominate layouts

Do not begin Phase 5 until page structure is stable.

---

# Phase 5 — UI Polish

## Goals

Refine visual quality, interaction quality, and consistency after the skeleton pages exist.

Do not introduce unnecessary complexity during polish.

---

## Visual Refinement

Refine:

* typography hierarchy
* spacing rhythm
* layout balance
* image treatment
* visual consistency
* panel hierarchy
* metadata styling

---

## Interaction Refinement

Refine:

* hover interactions
* transitions
* motion restraint
* navigation feel
* CTA emphasis
* theme transitions

Motion should remain:

* subtle
* calm
* responsive
* secondary to content

---

## Verification Requirements

Ensure:

* portfolio feels calm and intentional
* visual polish does not reduce readability
* motion remains restrained
* layouts remain content-first
* UI remains technically credible and mature

Do not begin Phase 6 until visual consistency is stable.

---

# Phase 6 — Project Content

## Goals

Replace placeholder MDX projects with real content before running audits or SEO.

This phase validates:

* content density and storytelling
* layout scalability with real assets
* diagram and image handling
* recruiter scanning quality at card and detail level

---

## Add Real Projects

Add 2–3 fully real projects including:

* actual screenshots or demo recordings
* diagrams (hand-authored SVG via the shared theme, or matplotlib, per asset-guide.md)
* metrics and outcomes
* technical explanations, tradeoffs, implementation details

Avoid placeholder or generated filler content.

---

## Validate Content System

Verify:

* project-card generation and metadata rendering
* long-form MDX readability
* image and diagram handling
* MDX component behavior (`<Figure>`, `<Diagram>`, `<Callout>`, `<Highlight>`)
* section consistency across project types
* responsive content behavior at 375px / 768px / 1280px

---

## Verification Requirements

Ensure:

* project pages feel like engineering case studies, not blog posts
* recruiter scanning works — overview readable without deep dive
* deep technical reading works — deep dive adds real detail
* layouts scale with real content and real assets
* visuals support understanding rather than dominate layout

Do not begin Phase 6.5 until at least two real projects are fully authored and verified.

---

# Phase 6.5 — UI Polish

## Goals

Targeted reading-experience, navigation, color, and brand refinements — surfaced now that real
content exists, before SEO and audits. This phase is **iterative**: several items below are open
investigations resolved with the user, not settled decisions. Color/surface items touch design
tokens and must go through the `design-update` / `design-rewrite` skills (they edit DESIGN.md).

Do not over-engineer; keep changes restrained and content-first.

---

## Backlog

### 1. Reading experience

* ASCII background — fade toward the content center; none on small screens. Investigate biasing the
  pattern into corners / free space (away from center) so it never disrupts body text on
  project/about/home — or another method.
* Inline code — currently unreadable; try an accent (green) treatment, aiming for a Notion-like feel. *(decide)*
* Code blocks — currently unreadable; try ink text with bold accent highlights. *(decide)*
* Tables — currently grey; switch to ink with bold accent highlights. *(decide)*

### 2. Navigation & global UI

* Add active-state nav for the Home page (currently missing).

### 3. Colors *(touches DESIGN.md → via design-update / design-rewrite)*

* Accent in dark theme still reads minty — adjust.
* Light-theme raised surface is a clashing grey — fix.
* Revisit surface hierarchy: user leans toward a ChatGPT-like hierarchy over the current one
  (current is hard to maintain; ink color is harsh on the eyes). Evaluate against the bg design and
  both themes before committing. *(investigate — possible larger token change)*

### 4. Brand / hero area

* New hero image (e.g. a person working at a desk / similar).
* On mobile, stack the hero image **below** the hero paragraph + buttons.

---

## Verification Requirements

Ensure:

* reading surfaces (inline code, code blocks, tables) are legible in both light and dark themes
* the background never disrupts body text at any breakpoint; absent on small screens
* nav active state is correct on every route including Home
* color/surface changes preserve WCAG AA contrast in both themes and remain token-driven
* hero reads well on desktop and stacks correctly on mobile

Gate: user approves the polish set. Do not begin Phase 7 until the polish set is approved.

---

# Phase 7 — SEO + AI Readability

## Goals

Ensure discoverability, semantic clarity, and AI readability.

---

## Implement SEO

Add:

* per-page `<title>` and `<meta description>` from frontmatter
* OpenGraph + Twitter card meta tags
* default OG image fallback; per-project OG image when `heroImage` is set
* sitemap.xml and robots.txt generated at build
* canonical URLs
* dynamic metadata generation for project and about pages

---

## Implement AI Readability

Add:

* llms.txt
* JSON-LD: `Person` schema on Home + About; `CreativeWork` on project pages

Ensure:

* content remains easily parsable from static HTML
* technical information is semantically organized
* clean heading hierarchy across all routes

---

## Verification Requirements

Ensure:

* metadata renders correctly on all routes
* OG previews render in link unfurlers
* sitemap and robots.txt are valid
* JSON-LD validates without errors
* semantic structure is clean

Do not begin Phase 8 until SEO and AI readability are stable.

---

# Phase 8 — Audits

## Goals

Systematic quality sweep across typography, spacing, accessibility, and cross-page consistency after real content and SEO exist.

---

## Audit Passes

Perform:

* typography audit — scale, hierarchy, line-height, weight contrast
* spacing audit — rhythm, section gaps, component padding
* hierarchy audit — visual attention flow, heading levels
* consistency audit — tokens used correctly, no raw values
* responsiveness audit — 375px / 768px / 1280px across all routes
* accessibility audit — WCAG AA contrast, keyboard nav, focus rings, semantic HTML, screen-reader structure, image alt coverage

---

## Verification Requirements

Ensure:

* Lighthouse scores are strong
* WCAG AA passes in both light and dark themes
* no token violations (raw hex, arbitrary px outside scale)
* all interactive elements keyboard-reachable with visible focus rings
* heading hierarchy is logical and sequential on every page
* responsive layouts hold at all three breakpoints

Do not begin Phase 9 until all audit findings are resolved.

---

# Phase 9 — Refactor / Clean / Align


## Goals

Code quality, documentation, and doc–implementation alignment pass before deploy.

---

## Code Cleanup

* remove dead code, unused imports, unused components
* remove any temporary hacks or commented-out experiments
* ensure no raw values remain in components (all tokens)
* verify Biome passes with zero errors

---

## Doc Alignment

* verify DESIGN.md reflects current implementation
* verify CONTENT-SCHEMA.md Zod schemas match current field usage
* verify `.claude/work/session.md` is current
* resolve any known gaps flagged during earlier phases

---

## Verification Requirements

Ensure:

* `npm run build` passes
* TypeScript strict mode passes with zero errors
* Biome passes with zero errors
* no hydration errors in browser console
* all docs reflect actual implementation state

Do not begin Phase 10 until the codebase is clean and docs are aligned.

---

# Phase 10 — Deploy

## Goals

Deploy stable production version.

---

## Deployment

Deploy using:

* Vercel

---

## Configure Production

Configure:

* custom domain
* analytics
* metadata previews
* caching behavior
* production environment settings

---

## Post-Deploy Validation

Verify:

* production routing
* metadata rendering
* MDX rendering
* SEO indexing
* theme behavior
* mobile responsiveness
* loading performance
* no production-only rendering issues

---

# General Principles

Throughout all phases:

Prioritize:

* clarity
* maintainability
* structured content presentation
* restrained visual polish
* technical credibility
* scalable architecture

Avoid:

* overengineering
* excessive abstractions
* unnecessary dependencies
* decorative UI complexity
* animation-heavy implementations
* inconsistent layout patterns
* premature optimization
