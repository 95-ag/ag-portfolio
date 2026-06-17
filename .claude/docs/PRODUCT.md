# PRODUCT.md — Personal Portfolio

> PRODUCT.md owns *what* and *why*.
> DESIGN.md owns *how it looks* — when the two disagree on a visual detail, DESIGN.md wins.
> CONTENT-SCHEMA.md owns *how content is structured* — when the two disagree on a content field, CONTENT-SCHEMA.md wins.

---

## Product Overview

- A personal portfolio presenting AI/ML and software engineering work as structured project pages.
- Content-led, not animation-led.
- Project pages are generated from MDX — adding a project requires only a new file; no code changes, no manual card wiring.
- The visual system is uniform across all pages and scales as content grows.

**Project content covers three types:** academic work, freelance projects, and personal learning. The presentation system is uniform; content depth varies by type — see → Content Architecture.

**Primary pages:** Home, Work (listing), Project (detail), About. Blog — v2.

**Companion documents:**
- `DESIGN.md` — typography, color, spacing, motion, component specs, imagery, grid.
- `CONTENT-SCHEMA.md` — MDX structure, frontmatter schema, card metadata, section conventions.

---

## Audience & Goals

Two audiences with distinct scanning patterns. Both reach the same homepage.

**Full-time AI/ML/software engineering recruiters:**
- Scan for role fit, stack, years of experience, and shipped work in roughly 30 seconds.
- Need: clear positioning headline, scannable project tags, resume access, contact path.

**Freelance technical clients:**
- Evaluate scope, outcomes, communication, and reliability over 2–5 minutes.
- Need: project pages with concrete results, working-style signals, direct contact path.

**Implication for design:**
- The homepage hero and project cards must be readable in seconds — the recruiter path.
- Project detail pages and the About page must reward longer reading — the client path.
- The project overview section targets non-technical recruiters and HR; the deep dive targets engineers.

---

## Tech Stack

| Category | Technology | Notes |
|---|---|---|
| Language | TypeScript | Strict mode on |
| Framework | Next.js (App Router) | Static generation for content pages |
| UI | React | |
| Styling | Tailwind CSS | Single design-token config drives light/dark/system |
| Animation | Framer Motion | Used sparingly — see → UX / Design Direction → Motion |
| Content | MDX | Project content; blog — v2 |
| Frontmatter | yaml | Parses YAML metadata from MDX |
| Tooling | Biome | Format + lint |

No CMS in v1. No analytics decision in v1.

---

## Site Architecture

```
/                 Home
/work             Work listing
/work/[slug]      Project detail (generated from MDX)
/about            About
/blog             Blog listing     — v2
/blog/[slug]      Blog post        — v2
```

**Content flow:**
- Project MDX files live in `/content/projects/*.mdx`.
- At build time, `/work` reads all files and renders cards; `/work/[slug]` renders individual pages.
- Adding a file is the only action required to publish a new project.

**Frontmatter fields that drive layout** — full schema in `CONTENT-SCHEMA.md`:
- `title`, `summary`, `tags[]`, `heroImage` — drive cards.
- `projectType: academic | freelance | personal` — drives sort order on the Work page and section visibility on the project page — see → Content Architecture.
- `featured: boolean`, `order: number` — drive homepage selection.
- `links{ github, demo, paper, report, presentation }` — drive the project header links row.
- `relatedProjects[]` — drives related-project suggestions — v2.

Missing optional fields are omitted from rendering — no placeholders.

**Featured projects on the homepage** are determined by `featured: true`, sorted by `order`. Cap at 3.

---

## Global Requirements

**Responsive:**
- Mobile-first.
- All layouts must work at 375px width.

**Theme:**
- Light, dark, and system. System is the default.
- Persisted in localStorage after explicit user selection.
- No flash of incorrect theme on load.

**Theme toggle placement:**
- Desktop: in the floating pill nav, right side after a divider. Not in the footer.
- Mobile: at the bottom of the slide-out menu only. Not in the mobile footer.

**Floating pill nav:**
- Desktop: fixed, floating pill centered relative to the content column. Items in order: logo mark → About, Work → theme toggle. The logo mark links to home — no separate Home nav item. Active page is highlighted.
- Mobile: pill nav hidden. A fixed trigger (top-right) opens a slide-out menu containing About, Work, and the theme toggle at the bottom. The logo mark in the menu top-left serves as the home link — no separate Home nav item. Translucent backdrop, focus-trapped while open.
- Visual spec: `DESIGN.md → Components → Navigation`.

**Footer (every page):**
- Left: copyright.
- Right: GitHub, LinkedIn, email icon links.
- No theme toggle.
- Single compact row on all viewport sizes.

**Routing:**
- No dead links.
- 404 page: styled, links back to Home and Work.
- Build fails on missing required frontmatter or broken `featured` flags — no broken pages reach production.

**Performance budget:**
- LCP < 2.0s on 4G mobile.
- Total JS < 150KB gzipped on the homepage.
- Images use explicit dimensions. No layout shift on theme toggle.

**Error states:**
- 404 → friendly page, no animation needed.
- Image load failure → alt text visible, no broken-icon glyph.

---

## UX / Design Direction

> Detailed visual decisions — exact type scale, color tokens, spacing rhythm, motion curves, panel styling, imagery treatment, icon style — live in `DESIGN.md`. PRODUCT.md sets only the philosophy and constraints below.

**Tone:** modern, minimal, systems-oriented, editorial. Engineering-led, not creative-agency.

**Typography philosophy:**
- One sans for UI and headings, one mono for code, tags, and metadata.
- Strong vertical rhythm.
- Comfortable long-form reading.

**Color philosophy:**
- Restrained palette: two neutrals plus one accent.
- Same semantic accent in light and dark, contrast-adjusted.

**Motion philosophy:**
- Subtle and purposeful only.
- Page transitions: short fade.
- Hover and focus states: brief opacity or transform transition.
- All animation gated by `prefers-reduced-motion`.
- No scroll-jacking, no parallax, no per-section entrance animations.

**Imagery:**
- Project hero images and the About headshot are intentional, not decorative.
- Diagrams in project deep dives must be production-quality and visually consistent across projects.

**Diagram tooling philosophy:**
- Diagrams encode technical meaning — no decorative illustrations.
- Tool choice follows content type: flow and architecture diagrams differ from metric charts and spatial layouts.
- Full tooling rules, directory structure, and export standards live in `asset-guide.md`.
- Visual consistency rules live in `DESIGN.md → Foundations → Imagery`.

**Avoid:**
- Awwwards-style layouts, scroll gimmicks, keyword-dump skill clouds.
- Motivational copy, vague branding, LinkedIn-style resume dumps.
- Dense walls of text, image-heavy layouts without supporting context.

---

## Page Specifications

### Home

**Purpose:** establish identity and route the visitor to the right next page.

**Sections, in order:**

1. **Hero.** The first screen carries both the positioning and the primary next step — the recruiter path needs the action visible without scrolling, which is why CTAs are integrated here rather than deferred to a separate section below the fold.
   - Two-column layout on desktop: statement block on the left, portrait on the right.
   - Portrait is hidden on mobile — the statement block remains as the primary content.
   - Content: name/role eyebrow, direct headline stating role and specialization, short tagline, two-action CTA row.
   - Two actions of differentiated weight: primary routes to featured work; secondary opens direct contact.
   - Visual and portrait spec: `DESIGN.md → Domain Components → Home Page → Hero`.

2. **Featured projects.** Up to 3 cards, anchored as the scroll target for the primary hero CTA.
   - Each card: hero image, title, one-line outcome (not just description), 2–3 tags.
   - Full card is clickable. Click affordance: title underlines on hover; card border shifts on hover. Desktop hover only.

3. **Newsletter signup** — v2.

### Work

**Purpose:** comprehensive project list, optimized for scanning.

**Layout:**
- Grid of project cards.
- Each card: hero image or short looping video (muted, autoplay, max 4s), title, 1–2 line description, tag row.

**Page header:**
- Single heading ("Work") followed directly by the grid.
- No eyebrow label, no intro paragraph.

**Click affordance:**
- Title underlines on card hover; card border shifts on card hover.
- Desktop hover only; touch shows the resting state.

**Sort order:**
- Primary: `projectType` priority — academic and freelance first, then personal.
- Secondary: `order` (ascending).
- Tertiary: `publishedAt` (descending).
- Tunable via frontmatter `order`.

**Search/filter** — v2.

### Project Detail

**Purpose:** visitors scanning quickly extract role, stack, and outcome from the overview alone. Engineers reading deeply use the deep dive. Both reading modes are supported without requiring either.

**Layout:**
- Single-column editorial layout, centered, capped at a comfortable reading width.
- No sidebar at any breakpoint.
- Content renders in this order: header → hero → overview → tech stack → deep dive → backlink.

The original spec described a sticky sidebar with a main column. That was replaced with the single-column layout — the sidebar added structural friction without reading value given the content length and density.

**Sections:**

- **Header.** Tags row, title, optional subtitle, optional links row. Links row renders only when the project has external links (`github`, `demo`, `paper`, `report`, `presentation`).
- **Hero.** Project hero image or video.
- **Overview.** Problem, what I built, results, transferable skills — rendered as a structured label/value grid. This section must stand alone without the deep dive.
- **Tech Stack.** Languages, frameworks, libraries, tools — same structured grid, rendered only if at least one category has entries.
- **Deep dive.** Detailed MDX content. Each H2 is a chapter anchor. Subsections are optional — omitted if absent from the MDX file.
- **Section progress nav.** Desktop-only sticky table of contents derived from H2 headings. Appears after the hero scrolls out of view. Highlights the active section. Hidden on mobile.
- **Backlink.** "← Back to Work" at the end of content.
- **Related projects** — v2. 2–3 suggested projects below the backlink.

**Content depth by `projectType`** — authoring convention; the page renders sections by field presence, not by type:

| Section | academic | freelance | personal |
|---|---|---|---|
| Header | ✓ | ✓ | ✓ |
| Hero | ✓ | ✓ | ✓ |
| Overview | ✓ full | ✓ full | ✓ lighter — "Learnings" replaces "Transferable Skills"; "Results" optional |
| Tech Stack | ✓ | ✓ | ✓ if entries exist |
| Deep dive | All applicable | All applicable | Only what's substantive; expect fewer subsections |

The system is uniform; content depth honestly reflects the work. Personal projects are not inflated into full case studies they don't merit.

**Content rendering:** `<Diagram>`, `<DiagramRow>`, `<DiagramPanel>`, `<Figure>`, `<Callout>`, `<Stack>`, `<Highlight>`. Code blocks syntax-highlighted at build time. No client-side highlighter.

### About

**Purpose:** establish credibility, working style, and contact paths.

**Sections, in order:**

1. **Identity & contact.** Name prominent, role subordinate. Below the name: a row of social and contact affordances — GitHub, LinkedIn, email.

2. **Portrait & editorial intro.** Desktop: headshot panel on the left, editorial intro on the right. Intro: an opening statement followed by supporting paragraphs covering how this engineer thinks and works. Mobile: stacked, portrait first.

3. **Capabilities.** Grouped by capability area. Each group: short description and tag list. No skill-bar percentages.

4. **Approach.** Short principles — systems thinking, iteration, communication, modular design, balancing research and real-world constraints. No motivational language.

5. **Work with me.** Available for freelance projects and full-time roles. Two actions: primary opens direct email contact; secondary downloads the resume. Email also available as a copyable inline link below the primary action.
   - Conversational contact interface and scheduling button — v2.

6. **Testimonials** — v2. Card layout.

---

## Content Architecture

> Full schema in `CONTENT-SCHEMA.md`. PRODUCT.md captures only the rules the layout enforces.

**Directory structure:**
```
/content
  /projects
    project-slug.mdx
  /blog              — v2
    post-slug.mdx
/public
  /projects/[slug]/  hero images, diagrams, etc.
  /AishwaryaGanesan_Resume.pdf
  /headshot.jpeg
```

**Content rules:**
- One MDX file = one project. Slug derived from filename.
- Frontmatter is the source of truth for cards, the project header, and the overview and tech-stack sections.
- Body MDX is the source of truth for the deep dive.
- No content duplicated between frontmatter and body.

**Project type and content depth.** The `projectType` field determines:
- Sort priority on the Work page.
- Acceptable content density (a convention, not enforced at render). Personal projects may have a short overview and brief or absent deep dive; academic and freelance projects are expected to be more thorough.

Section visibility is driven by which frontmatter fields are present, not by `projectType` — see → Page Specifications → Project Detail.

**`projectType` is internal metadata — not displayed.** No badge on cards or project pages. Drives sort order only; project nature surfaces through content, not a label.

**Resume.** Single PDF at `/public/AishwaryaGanesan_Resume.pdf`. Updated manually. One resume for both audiences in v1.

---

## Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Nav | Slide-out from right (trigger top-right); About, Work, theme toggle | — | Floating pill nav |
| Footer | Single row: copyright + socials | Single row | Single row |
| Featured project cards | 1 col | 2 col | 3 col |
| Work grid | 1 col | 2 col | 3 col |
| About portrait + intro | Stacked, portrait first | Stacked | Side-by-side |
| About structured sections | Stacked | Stacked | Two-column |
| Project detail | Single column | Single column | Single column, reading-width centered |
| Section progress nav | Hidden | Hidden | Visible, sticky right of content |

Touch devices: no hover-only affordances. All hover content is also reachable via focus or tap.

---

## Accessibility & SEO

**Accessibility:**
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`.
- All interactive elements keyboard-navigable in logical order with visible focus rings.
- Color contrast meets WCAG AA in both themes.
- Images have meaningful `alt` text; decorative images use `alt=""`.
- Motion respects `prefers-reduced-motion`.
- One H1 per page; heading hierarchy is logical and sequential.

**SEO:**
- Per-page title and meta description from frontmatter.
- Open Graph and Twitter card meta tags.
- Default OG image generated dynamically via the `/opengraph-image` route.
- Per-project OG image from `ogImage` frontmatter when present, falling back to `heroImage`.
- `sitemap.xml` and `robots.txt` generated at build.
- JSON-LD: `WebSite` site-wide; `Person` on Home and About; `CreativeWork` and `BreadcrumbList` on project pages.
- Clean, descriptive slugs.

**AI-agent readability.**
- All text content present in initial HTML — Next.js static generation handles this.
- `robots.txt` explicitly allows major AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot).
- `/llms.txt` endpoint summarizes the site (about, capabilities, projects) for AI agents.

---

## V2 Features

- **Blog.** `/blog` listing + `/blog/[slug]` detail. Reuses the MDX pipeline.
- **Newsletter signup.** Provider TBD when v2 is scoped.
- **Search & filter on Work page.** By tag, stack, title, keyword. Client-side over the build-time index.
- **Related projects on project pages.** 2–3 suggested projects below the back-to-Work link, driven by `relatedProjects[]` frontmatter or auto-derived from shared tags as fallback.
- **Testimonials section on About.** Card layout; splits to `/testimonials` if it grows.
- **Conversational contact interface.** Chat-style inquiry on About.
- **Scheduling button.** "Schedule a call" CTA on Home and About — requires a scheduling tool (Cal.com, Calendly, or similar).
- **Analytics.** Plausible or Vercel Analytics, post-launch decision.

---

## Non-Goals

- No CMS in v1 — MDX files in repo.
- No i18n.
- No comments on projects or blog.
- No login, auth, or user accounts.
- No client-side syntax highlighter — build-time only.
- No animation libraries beyond Framer Motion.
- No Awwwards-style scroll experiences, parallax, cursor effects, or per-section entrance animations.
- No skill-bar percentages, keyword clouds, or LinkedIn-style resume dumps.
- No motivational or branding copy.
- No hidden current-page items in nav.
- No hover-revealed CTAs on project cards.
- No inflating personal learning projects into full case studies they don't merit.

---

## Open Questions

- **`projectType` display** — currently internal only; no badges on cards. Reconsider if a "Freelance" badge would serve as a specific credibility signal for paid work.
