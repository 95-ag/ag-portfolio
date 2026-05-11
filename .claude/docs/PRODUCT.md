# PRODUCT.md — Personal Portfolio

## 1. Product Overview

A personal portfolio site presenting AI/ML and software engineering work as structured project pages. The site is content-led, not animation-led. Project pages are generated from MDX so adding a new project requires only a new file — no code changes, no manual card wiring. The visual system is uniform across all pages and scales as content grows.

**Project content covers three types:** academic work, freelance projects, and personal learning projects. The presentation system is uniform; content depth varies by type — see §8.

**Primary deliverables:** Home, Work (listing), Project (detail), About. Blog ships in v2.

**Companion documents (planned):**
- `DESIGN.md` — typography, spacing, color, motion, panel style, imagery treatment, icon style, grid/layout rhythm.
- `CONTENT-SCHEMA.md` — full MDX structure, frontmatter schema, reusable fields, card metadata, project section conventions.

PRODUCT.md is the source of truth for *what* and *why*. DESIGN.md owns *how it looks*. CONTENT-SCHEMA.md owns *how content is structured*. When PRODUCT.md and DESIGN.md disagree on a visual detail, DESIGN.md wins. When PRODUCT.md and CONTENT-SCHEMA.md disagree on a content field, CONTENT-SCHEMA.md wins.

---

## 2. Audience & Goals

The site serves two audiences with distinct scanning patterns. Both reach the same homepage; the homepage CTA section provides differentiated paths.

**Full-time AI/ML/software engineering recruiters.** Scan for role fit, stack, years of experience, and shipped work in roughly 30 seconds. Need: clear positioning headline, scannable project tags, easy resume access, contact email.

**Freelance technical clients.** Evaluate scope, outcomes, communication, and reliability over 2–5 minutes. Need: project pages with concrete results, working-style signals, direct contact path.

**Implication for design.** The homepage hero and project cards must be readable in seconds (recruiter path). The project detail pages and About page must reward longer reading (client path). The project overview section is explicitly designed for non-technical recruiters/HR; the deep dive is for engineers.

---

## 3. Tech Stack

| Category | Technology | Notes |
|---|---|---|
| Language | TypeScript | Strict mode on |
| Framework | Next.js (App Router) | Static generation for content pages |
| UI | React | |
| Styling | Tailwind CSS | Single design-token config drives light/dark/system |
| Animation | Framer Motion | Used sparingly; see §6 |
| Content | MDX | Project + (v2) blog content |
| Frontmatter | gray-matter | Parse YAML metadata from MDX |
| Tooling | Biome | Format + lint |

No CMS in v1. No analytics decision in v1.

---

## 4. Site Architecture

```
/                 Home
/work             Work listing
/work/[slug]      Project detail (generated from MDX)
/about            About
/blog             Blog listing                 (v2)
/blog/[slug]      Blog post                    (v2)
```

**Content flow.** Project MDX files live in `/content/projects/*.mdx`. At build time, `/work` reads all files and renders cards; `/work/[slug]` renders individual pages. Adding a file is the only action required to publish a new project.

**Frontmatter schema.** Defined in detail in `CONTENT-SCHEMA.md`. PRODUCT.md only specifies the fields the *layout* depends on:
- `slug`, `title`, `summary`, `tags[]`, `heroImage` — drive cards.
- `projectType: academic | freelance | personal` — drives sort order on Work page and section visibility on the project page (see §8).
- `featured: boolean`, `order: number` — drive homepage selection.
- `links{ github, demo, paper }` — drive the sidebar links section.
- `relatedProjects[]` (v2) — drives related-project suggestions on the project page.

Missing optional fields are omitted from rendering — no placeholders.

**Featured projects on homepage** are determined by `featured: true`, sorted by `order`. Cap at 3.

---

## 5. Global Requirements

**Responsive.** Mobile-first. Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. All layouts must work at 375px width.

**Theme.** Light, dark, system. Default is system. Persisted in localStorage after explicit user selection. No flash of incorrect theme on load.

**Theme toggle placement.**
- **Desktop:** in the footer (right side, alongside copyright and socials).
- **Mobile:** at the bottom of the slide-out nav menu only. **Not** in the mobile footer.

**Footer (every page).** Left: copyright. Right: social icons (GitHub, LinkedIn, plus configurable list). Desktop only: theme toggle at the end. Mobile footer is compact — copyright + socials only.

**Scroll-to-top button.** Appears after the user scrolls past ~1 viewport height. Bottom-right, fixed, fades in. All long pages.

**Right-side vertical nav.**
- **Desktop:** persistent, semi-transparent backdrop while scrolling. Items: Home, About, Work, Blog (v2). Current page is shown with active styling — **not hidden**. Left side has a home-icon/logo (matches favicon) linking to `/`.
- **Mobile:** collapsed by default. Opens via tap on a menu icon (top-right) or right-edge swipe. Slides in from the right. Translucent backdrop. Theme toggle pinned at the bottom of the menu. Visual treatment (gradient, blur amount, exact opacity) is owned by `DESIGN.md`.

> **Deviation from notes:** Notes specified hiding the current page from nav. Overridden — hiding breaks the user's mental model of nav as a stable map. Standard active-state highlighting instead.

**Routing reliability.** No dead links. 404 page exists, styled, links back to Home and Work. Build fails on missing required frontmatter fields or broken `featured` flags — no broken pages reach production.

**Performance budget.** LCP < 2.0s on 4G mobile. Total JS < 150KB gzipped on the homepage. Images via `next/image` with explicit dimensions. No layout shift on theme toggle.

**Error states.** 404 → friendly page, no animation needed. Image load failure → alt text visible, no broken-icon glyph.

---

## 6. UX / Design Direction

> Detailed visual decisions (exact type scale, color tokens, spacing rhythm, motion curves, panel styling, imagery treatment, icon style) live in `DESIGN.md`. PRODUCT.md sets only the philosophy and constraints below.

**Tone.** Modern, minimal, systems-oriented, editorial. Engineering-led, not creative-agency.

**Typography (philosophy).** One sans for UI/headings, one mono for code/tags/metadata. Strong vertical rhythm. Comfortable long-form reading.

**Color (philosophy).** Restrained palette. Two neutrals plus one accent. Same semantic accent in light and dark, contrast-adjusted.

**Motion (philosophy).** Subtle and purposeful only:
- Page transitions: fade, ≤ 200ms.
- Hover/focus states: opacity/transform, ≤ 150ms.
- Hire-me CTA: a single understated attention cue (e.g., slow pulse on the icon, not the whole button).
- All Framer Motion gated by `prefers-reduced-motion`.
- No scroll-jacking, no parallax, no per-section entrance animations.

**Imagery.** Project hero images and About headshot are intentional, not decorative. Diagrams in deep dives must be production-quality. Diagram tooling decision is **deferred** — to be made when `DESIGN.md` is finalized so visual style is consistent across all diagrams.

**Avoid.** Awwwards-style layouts, scroll gimmicks, keyword-dump skill clouds, motivational copy, vague branding, LinkedIn-style resume dumps, dense walls of text, image-heavy layouts without context.

---

## 7. Page Specifications

### 7.1 Home

**Purpose.** Establish identity and route the visitor to the right next page.

**Sections, in order:**

1. **Hero.** Direct headline stating role + specialization. Sub-line with 2–3 competency signals. No tagline, no manifesto. Reused on `/about`.
2. **Featured projects.** Up to 3 cards, larger than Work-page cards. Each card shows hero image, title, one-line outcome (not just description), 2–3 tags. Full card clickable. Click affordance pattern as in §7.2.
3. **Hire-me / CTA.** Two clear paths in a single section:
   - **Recruiters:** "Resume (PDF)" download + "Email me".
   - **Freelance:** "Email me" (primary).
   - The two paths are visually distinct (separate cards / columns / labeled groups — exact treatment in `DESIGN.md`) so each audience sees a clear next step. Both resolve to email in v1.
   - Subtle motion only on the primary email CTA.
   - Single combined resume PDF for v1.
   - "Schedule a call" deferred to v2.
4. **Newsletter signup** — v2.

### 7.2 Work (`/work`)

**Purpose.** Comprehensive project list, optimized for scanning.

**Layout.** Grid of project cards. Each card: compact hero image or short looping video (muted, autoplay, max 4s), title, 1–2 line description, tag row.

**Click affordance (mandatory, three reinforcing signals):**
- Cursor changes to pointer over the entire card.
- Title styles as a link (underline on hover or equivalent — see `DESIGN.md`).
- A chevron or "View →" affordance in a consistent corner of the card.
- Hover state on desktop: slight elevation/border shift. Skipped on touch.

**Sort order.** Default: by `projectType` priority (academic + freelance first, then personal), then `order`, then `publishedAt` descending. Tunable via frontmatter `order`.

**Search/filter.** v2.

### 7.3 Project Detail (`/work/[slug]`)

**Purpose.** Recruiters extract role + stack + outcome in 30s; engineers read the deep dive in ~10 minutes. Non-technical HR readers can read the overview standalone and walk away informed.

**Layout (desktop, ≥ lg).** Sticky left sidebar (intro panel) + main content column. Main column flows vertically: hero → overview → deep dive. Overview and deep dive are visually separated (divider or spacing — exact treatment in `DESIGN.md`). The sidebar scrolls independently if its content exceeds the viewport.

**Layout (mobile).** Sidebar content stacks at the top, then hero, then overview, then deep dive.

> **Deviation from notes:** Original three-panel grid replaced with sticky-sidebar + single main column to avoid layout breakage when deep-dive content is far longer than overview. User confirmed this direction.

**Sections:**

- **Hero.** Project hero image or video. Optional logo strip below.
- **Intro sidebar (sticky).** Short title, full title (optional), tags, stack summary grouped by category, links (GitHub, demo, paper).
- **Overview (main column, top).** Problem, what I built, results, transferable skills. ~300–500 words. Plain language. **This section is the recruiter/HR-readable summary** and must stand alone without the deep dive.
- **Deep dive (main column, below overview).** Detailed problem, background, data, model architecture, algorithm/code design, resources/constraints, optimization, deployment, full results, next steps. Each subsection is optional — omitted entirely if the MDX file doesn't include it. No "TBD" placeholders.
- **Reading progress indicator.** Thin vertical bar on the left edge of the viewport, vertically positioned below the sticky sidebar's footprint. Appears after the user scrolls past the hero. Project pages only.
- **Backlink.** "← Back to Work" at the end of content.
- **Related projects** — v2. 2–3 suggested projects, displayed below the backlink.

**Section visibility by `projectType`:**

| Section | academic | freelance | personal |
|---|---|---|---|
| Hero | ✓ | ✓ | ✓ |
| Sidebar (full) | ✓ | ✓ | ✓ |
| Overview | ✓ full | ✓ full | ✓ lighter — "What I learned" replaces "Transferable Skills"; "Results" optional |
| Deep dive subsections | All applicable | All applicable | Only what's substantive; expect fewer subsections |

The system is uniform; honest content depth varies by project type. Personal projects should not be inflated into full case studies they don't merit.

**Content rendering.** MDX components: `<Diagram>`, `<Figure>`, `<Callout>`, `<Stack>`. Code blocks syntax-highlighted at build time (Shiki or similar). No client-side highlighter.

### 7.4 About (`/about`)

**Purpose.** Establish credibility, working style, and contact paths.

**Sections, in order:**

1. **Identity header.** Name (prominent), role/positioning line, social icons.
2. **Contact quick links.** "Email me" near the top, visually distinct from the social icons.
3. **Two-panel intro.** Desktop: left = headshot (B&W), right = approach/philosophy. Image height extends through the philosophy section. Mobile: stacked, image first.
4. **Two-column structured layout for sections below.** Desktop: left = section heading, right = section body. Mobile: stacked.
5. **Approach / Philosophy.** Short principles covering systems thinking, iteration, communication, modular design, balancing research and constraints. No motivational language.
6. **Technical capabilities.** Grouped by capability area. Each group: short description + tag list. No skill-bar percentages.
7. **Experience.** Structured entries: company, role, timeframe, 2–4 achievement bullets, optional image.
8. **Education.** Concise: institution, degree, specialization or short note.
9. **Testimonials** — v2.
10. **Contact section.** Direct methods at the end. v2: conversational/chat interface.

---

## 8. Content Architecture

> Full schema in `CONTENT-SCHEMA.md`. PRODUCT.md captures only the rules the layout enforces.

**Directory structure:**
```
/content
  /projects
    project-slug.mdx
  /blog                  (v2)
    post-slug.mdx
/public
  /projects/[slug]/      hero images, diagrams, etc.
  /resume.pdf
  /headshot.jpg
```

**Content rules.**
- One MDX file = one project. Slug from filename.
- Frontmatter is the source of truth for cards and sidebars. Body MDX is the source of truth for overview and deep dive.
- Image paths in MDX are relative to `/public`.
- No content duplicated between frontmatter and body.

**Project type and content depth.** The `projectType` field (`academic | freelance | personal`) determines:
- Sort priority on Work page.
- Visible sections on the project page (see §7.3 table).
- Acceptable content density. Personal projects may legitimately have a short overview and a brief or absent deep dive. Academic and freelance projects are expected to be more thorough.

**`projectType` is internal metadata, not displayed on the site.** No "Academic" / "Freelance" / "Personal" badge on cards or project pages. The field drives layout and sort behavior only. Project nature comes through in the content itself (mention of client, coursework, paper, etc.) — not a label.

**Resume.** Single combined PDF at `/public/resume.pdf`. Updated manually. v1 ships one resume for both audiences.

---

## 9. Responsive Behavior

| Element | Mobile (< md) | Tablet (md–lg) | Desktop (≥ lg) |
|---|---|---|---|
| Right vertical nav | Slide-out from right via menu icon or swipe; theme toggle at bottom of menu | Visible, narrower | Visible, full |
| Footer | Compact: copyright + socials only | Full inline | Full inline incl. theme toggle |
| Featured project cards | 1 col | 2 col | 3 col |
| Work grid | 1 col | 2 col | 3 col |
| About two-panel intro | Stacked, image first | Stacked | Side-by-side |
| About structured sections | Stacked | Stacked | Two-column |
| Project detail | Single column, sidebar content at top | Single column | Sticky sidebar + main |
| Reading progress bar | Hidden | Visible | Visible |

Touch devices: no hover-only affordances. All hover content also reachable via focus or tap.

---

## 10. Accessibility & SEO

**Accessibility.**
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`.
- Keyboard navigable: all interactive elements reachable in logical order, visible focus rings.
- Color contrast meets WCAG AA in both themes.
- Images have meaningful `alt` text; decorative images use `alt=""`.
- Motion respects `prefers-reduced-motion`.
- Headings hierarchical (one H1 per page).

**SEO.**
- Per-page `<title>` and `<meta description>` from frontmatter.
- Open Graph + Twitter card meta tags. Default OG image; per-project OG image when `heroImage` is set.
- `sitemap.xml` and `robots.txt` generated at build.
- JSON-LD: `Person` schema on Home/About; `CreativeWork` or `Article` on project pages.
- Clean, descriptive slugs.

**AI-agent readability.** All text content present in initial HTML (Next.js static generation handles this).

---

## 11. V2 Features

- **Blog.** `/blog` listing + `/blog/[slug]` detail. Reuses MDX pipeline.
- **Newsletter signup.** Provider TBD when v2 is scoped.
- **Search & filter on Work page.** By tag, stack, title, keyword. Client-side over the build-time index.
- **Related projects on project pages.** 2–3 suggested projects below the back-to-Work link, driven by `relatedProjects[]` frontmatter (or auto-derived from shared tags as fallback).
- **Testimonials section on About.** Card layout. Splits to `/testimonials` if it grows.
- **Conversational contact interface.** Chat-style inquiry form on About.
- **Analytics.** Plausible or Vercel Analytics, post-launch decision.
- **"Schedule a call"** CTA on Home and About. Requires a scheduling tool (Cal.com, Calendly, or similar). Deferred to v2.

---

## 12. Non-Goals / Avoid

- No CMS in v1. MDX files in repo.
- No i18n.
- No comments on projects or blog.
- No login/auth, no user accounts.
- No client-side syntax highlighter — build-time only.
- No animation libraries beyond Framer Motion.
- No Awwwards-style scroll experiences, parallax, cursor effects, or per-section entrance animations.
- No skill-bar percentages, keyword clouds, or LinkedIn-style resume dumps.
- No motivational/branding copy.
- No final diagrams generated by NotebookLM.
- No hidden current-page items in nav.
- No hover-revealed CTAs on project cards.
- No inflating personal learning projects into full case studies.

---

## Open Questions

1. **Diagram tooling** — deferred to DESIGN.md finalization. Decide before any project page goes to production.
2. **`projectType` display** — currently spec'd as **internal only** (no badges on cards). Reconsider if you want a "Freelance" badge specifically as a credibility signal for paid work.
