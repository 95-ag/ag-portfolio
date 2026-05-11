# BUILD-FLOW.md

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
* experience section
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

# Phase 4 — Create Real Project Content

## Goals

Replace placeholder/demo content with real projects before polishing visuals.

This phase validates:

* content density
* project storytelling
* layout scalability
* diagram/image handling
* recruiter scanning quality

---

## Add Real Projects

Add 2–3 fully real projects including:

* actual screenshots
* diagrams
* metrics
* technical explanations
* implementation details
* tradeoffs
* outcomes

Avoid placeholder/generated filler content.

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

Do not begin Phase 5 until real content validates the system.

---

# Phase 5 — Polish Pass

## Goals

Refine visual quality, interaction quality, and consistency after real content exists.

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

## Run Audit Passes

Perform:

* typography audit
* spacing audit
* hierarchy audit
* consistency audit
* responsiveness audit
* accessibility audit

---

## Verification Requirements

Ensure:

* portfolio feels calm and intentional
* visual polish does not reduce readability
* motion remains restrained
* layouts remain content-first
* project storytelling remains clear
* UI remains technically credible and mature

Do not begin Phase 6 until visual consistency is stable.

---

# Phase 6 — SEO + Accessibility + AI Readability

## Goals

Ensure discoverability, semantic clarity, accessibility, and AI readability.

---

## Implement SEO

Add:

* metadata
* OpenGraph
* Twitter cards
* sitemap
* robots.txt
* canonical URLs
* structured metadata
* dynamic metadata generation

---

## Implement AI Readability

Add:

* llms.txt
* semantic HTML
* clean heading hierarchy
* structured content organization
* readable metadata structure

Ensure:

* content remains easily parsable
* technical information remains semantically organized

---

## Accessibility

Audit and improve:

* keyboard navigation
* focus states
* semantic structure
* color contrast
* screen-reader compatibility
* image alt handling
* responsive readability

---

## Verification Requirements

Ensure:

* Lighthouse scores are strong
* metadata renders correctly
* accessibility issues are resolved
* semantic structure remains clean
* pages remain readable in both themes

Do not begin Phase 7 until accessibility and SEO are stable.

---

# Phase 7 — Final QA

## Goals

Validate production readiness.

---

## Cross-Check

Test:

* desktop
* tablet
* mobile
* dark/light/system themes
* long-form project pages
* navigation behavior
* broken links
* loading states
* MDX rendering
* responsive layouts

---

## Performance Optimization

Optimize:

* images
* fonts
* bundle size
* MDX loading
* animation performance
* caching behavior

Avoid premature micro-optimization.

---

## Final Review

Ensure:

* consistent design language
* stable responsive behavior
* scalable architecture
* maintainable code quality
* restrained interaction behavior
* no visual inconsistency between pages

---

# Phase 8 — Deploy

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
