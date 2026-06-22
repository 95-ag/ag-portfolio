import type { Metadata } from "next";
import { GitHubIcon } from "@/components/icons/brands/github";
import { LinkedInIcon } from "@/components/icons/brands/linkedin";
import { ArrowDownwardIcon } from "@/components/icons/material/arrow-downward";
import { ArrowForwardIcon } from "@/components/icons/material/arrow-forward";
import { ArrowUpwardIcon } from "@/components/icons/material/arrow-upward";
import { ArticleIcon } from "@/components/icons/material/article";
import { CheckIcon } from "@/components/icons/material/check";
import { CloseIcon } from "@/components/icons/material/close";
import { ComputerIcon } from "@/components/icons/material/computer";
import { ContentCopyIcon } from "@/components/icons/material/content-copy";
import { DarkModeIcon } from "@/components/icons/material/dark-mode";
import { DeployedCodeIcon } from "@/components/icons/material/deployed-code";
import { DescriptionIcon } from "@/components/icons/material/description";
import { DownloadIcon } from "@/components/icons/material/download";
import { FingerprintIcon } from "@/components/icons/material/fingerprint";
import { FolderCodeIcon } from "@/components/icons/material/folder-code";
import { LightModeIcon } from "@/components/icons/material/light-mode";
import { MailIcon } from "@/components/icons/material/mail";
import { MenuIcon } from "@/components/icons/material/menu";
import { OpenInNewIcon } from "@/components/icons/material/open-in-new";
import { SlideshowIcon } from "@/components/icons/material/slideshow";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { Diagram } from "@/components/mdx/diagram";
import { DiagramPanel, DiagramRow } from "@/components/mdx/diagram-row";
import { Figure } from "@/components/mdx/figure";
import { Highlight } from "@/components/mdx/highlight";
import { coverComponents } from "@/components/project/covers";
import { HeroMedia } from "@/components/project/hero-media";
import { HeroMetaOverlay } from "@/components/project/hero-meta-overlay";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { SectionProgressNav } from "@/components/project/section-progress-nav";
import { TechStack } from "@/components/project/tech-stack";
import { Footer } from "@/components/shell/footer";
import { PillNav } from "@/components/shell/pill-nav";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/ui/copy-link";
import { CopyableCode } from "@/components/ui/copyable-code";
import { Heading } from "@/components/ui/heading";
import { LinkPill } from "@/components/ui/link-pill";
import { Tag } from "@/components/ui/tag";
import { InlineThemeSelector } from "@/components/ui/theme-selector";
import type { Project } from "@/lib/content/projects";
import backgroundAsciiDark from "../../../public/design-system/background-ascii-dark.png";
import backgroundAsciiLight from "../../../public/design-system/background-ascii-light.png";
import backgroundMeteorDark from "../../../public/design-system/background-meteor-dark.png";
import backgroundMeteorLight from "../../../public/design-system/background-meteor-light.png";
import { ChromeFrame } from "./_gallery/chrome-frame";
import { DemoViewOnly } from "./_gallery/demo-view-only";
import { InertDemo } from "./_gallery/inert-demo";
import { Card, GallerySection, Specimen } from "./_gallery/section";
import { ThemeShot } from "./_gallery/theme-shot";
import {
  ColorTokenGrid,
  DepthSpecimen,
  MotionTokenTable,
  RadiusScaleSpecimen,
  ResponsiveSpecimen,
  SpacingScaleSpecimen,
  TypeScaleSpecimen,
  ZIndexTokenTable,
} from "./_gallery/tokens";

// Dev-only component gallery. Renders every real component ONCE under one global theme (a header
// toggle previews the other), grouped to mirror rules/web-frontend/component-structure.md and laid
// out like a work-detail page (prose h2 headings + SectionProgressNav rail) on the page
// --background. Fixed/route-aware chrome + the ambient background render live in bounded
// ChromeFrames. A click guard keeps demos view-only. The route is pruned from the production
// snapshot (release.sh) — it never ships.
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

type IconEntry = { name: string; Icon: React.ComponentType<{ size?: number }> };

const MATERIAL_ICONS: IconEntry[] = [
  { name: "ArrowDownward", Icon: ArrowDownwardIcon },
  { name: "ArrowForward", Icon: ArrowForwardIcon },
  { name: "ArrowUpward", Icon: ArrowUpwardIcon },
  { name: "Article", Icon: ArticleIcon },
  { name: "Check", Icon: CheckIcon },
  { name: "Close", Icon: CloseIcon },
  { name: "Computer", Icon: ComputerIcon },
  { name: "ContentCopy", Icon: ContentCopyIcon },
  { name: "DarkMode", Icon: DarkModeIcon },
  { name: "DeployedCode", Icon: DeployedCodeIcon },
  { name: "Description", Icon: DescriptionIcon },
  { name: "Download", Icon: DownloadIcon },
  { name: "Fingerprint", Icon: FingerprintIcon },
  { name: "FolderCode", Icon: FolderCodeIcon },
  { name: "LightMode", Icon: LightModeIcon },
  { name: "Mail", Icon: MailIcon },
  { name: "Menu", Icon: MenuIcon },
  { name: "OpenInNew", Icon: OpenInNewIcon },
  { name: "Slideshow", Icon: SlideshowIcon },
];

const BRAND_ICONS: IconEntry[] = [
  { name: "GitHub", Icon: GitHubIcon },
  { name: "LinkedIn", Icon: LinkedInIcon },
];

const SAMPLE_CODE = `export function add(a: number, b: number) {
  return a + b;
}`;

const GRID_CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Descriptor placeholder data so the domain components read as schema demos, not a
// real project. The cover image reuses a real slug (images may be reused).
const demoProject: Project = {
  slug: "model-extraction-attacks",
  body: "",
  frontmatter: {
    title: "Project Title",
    subtitle: "A one-line subtitle describing the project",
    summary:
      "A short project summary shown on the card — two or three lines describing the work and the outcome it produced.",
    projectType: "personal",
    publishedAt: "2026-01-01",
    order: 0,
    heroAlt: "Project cover",
    heroVideoLoop: true,
    featured: false,
    tags: ["tag-one", "tag-two", "tag-three"],
    stack: {
      languages: ["Language"],
      frameworks: ["Framework"],
      libraries: ["Library A", "Library B"],
      tools: ["Tool"],
    },
    overview: {
      problem: "The problem this project solves, stated in a sentence or two.",
      built: "What was built — the system, model, or tool, described briefly.",
      results: ["A measurable result", "Another concrete outcome"],
      learnings: ["A transferable learning", "Another takeaway"],
    },
    links: { github: "https://github.com", demo: "https://example.com" },
  },
};

export default function DesignSystemPage() {
  const buttonVariants = [
    {
      token: "primary",
      spec: "bg accent · text accent-on · radius-sm · 56px tall",
      render: <Button variant="primary">Primary</Button>,
    },
    {
      token: "secondary",
      spec: "1px outline · transparent · hover accent tint",
      render: <Button variant="secondary">Secondary</Button>,
    },
    {
      token: "primary + icon",
      spec: "leading icon (18px) + label",
      render: (
        <Button variant="primary" icon={<MailIcon size={18} />}>
          Email me
        </Button>
      ),
    },
    {
      token: "as link",
      spec: "renders an <a> when href is set",
      render: (
        <Button href="#ui-button" variant="secondary">
          As link
        </Button>
      ),
    },
    {
      token: "download link",
      spec: "href + download attr → <a download> (the resume action on About)",
      render: (
        <Button
          href="#ui-button"
          download
          variant="secondary"
          icon={<DownloadIcon size={18} />}
        >
          Resume
        </Button>
      ),
    },
  ];

  return (
    <Section>
      <Container>
        <SectionProgressNav />
        <header className="mb-[var(--spacing-3xl)] flex flex-col gap-[var(--spacing-lg)]">
          <Heading level={1} type="display-title">
            Design System
          </Heading>
          <p className="body-lead">
            Every component, rendered live under one theme and grouped to mirror
            the component folder map. Toggle to preview the other theme.
          </p>
          {/* The dedicated theme control for this page — the real InlineThemeSelector, OUTSIDE the
              view-only article below so it works. The UI catalog points here rather than duplicating it. */}
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <span className="insight-label">Theme</span>
            <InlineThemeSelector />
          </div>
          <div className="body-caption text-[var(--on-background)]">
            Dev-only reference — excluded from the production build. Components
            render on the page background; fixed and route-aware chrome render
            live in bounded frames.
          </div>
        </header>

        <DemoViewOnly className="flex flex-col gap-[var(--spacing-4xl)]">
          {/* ── Foundations ── */}
          <GallerySection
            id="foundations"
            title="Foundations"
            intro="The design tokens every component composes from — globals.css is the single source of truth."
            mapsTo="Foundations"
          >
            <Specimen
              id="foundations-color"
              name="Color tokens"
              source="globals.css → :root / [data-theme]"
              description="Semantic surfaces, text, borders, accent, and state colors — each swatch reflects the current page theme."
            >
              <ColorTokenGrid />
            </Specimen>

            <Specimen
              id="foundations-type"
              name="Typography scale"
              source="globals.css → @layer components"
              description="19 semantic type tokens — family, size, weight, line-height, and a self-descriptive sample in each token's real style."
            >
              <TypeScaleSpecimen />
            </Specimen>

            <Specimen
              id="foundations-spacing"
              name="Spacing scale"
              source="--spacing-*"
              description="Strict 4px base — every padding, margin, gap, and section rhythm steps geometrically from 4px to 128px."
            >
              <SpacingScaleSpecimen />
            </Specimen>

            <Specimen
              id="foundations-radius"
              name="Radius scale"
              source="--radius-*"
              description="Four surface categories, each a fixed radius — sharp structural containers, 4px controls, 8px media surfaces, and a full pill for floating and link controls."
            >
              <RadiusScaleSpecimen />
            </Specimen>

            <Specimen
              id="foundations-depth"
              name="Elevation & depth"
              source="DESIGN.md → Elevation"
              description="No box-shadow. Depth comes from hairline borders and tonal surface layering."
            >
              <DepthSpecimen />
            </Specimen>

            <Specimen
              id="foundations-responsive"
              name="Responsive"
              source="DESIGN.md → Layout"
              description="Breakpoint zones (name, width, key changes — clustered one change per row), a zone-width ruler, touch targets, and the collapse strategy."
            >
              <div className="prose-content">
                <ResponsiveSpecimen />
              </div>
            </Specimen>

            <Specimen
              id="foundations-motion"
              name="Motion tokens"
              source="--duration-* / --ease-*"
              description="Three durations and two easing curves. Motion is sparing and every animation is gated on prefers-reduced-motion."
            >
              <div className="prose-content mx-auto w-full max-w-[480px]">
                <MotionTokenTable />
              </div>
            </Specimen>

            <Specimen
              id="foundations-zindex"
              name="Z-index scale"
              source="--z-*"
              description="An ordered layering scale — base content up through the sticky rail, scroll-to-top, the floating pill nav, and the mobile menu overlay and panel."
            >
              <div className="prose-content mx-auto w-full max-w-[480px]">
                <ZIndexTokenTable />
              </div>
            </Specimen>
          </GallerySection>

          {/* ── Components · UI ── */}
          <GallerySection
            id="ui"
            title="Components · UI"
            intro="Reusable-everywhere primitives — no page, route, or schema assumptions."
            mapsTo="Components"
          >
            <Specimen
              id="ui-button"
              name="Button"
              source="@/components/ui/button"
            >
              <div className="grid grid-cols-1 gap-[var(--spacing-xl)] sm:grid-cols-2">
                {buttonVariants.map((v) => (
                  <div
                    key={v.token}
                    className="flex flex-col items-start gap-[var(--spacing-sm)]"
                  >
                    <div className="py-[var(--spacing-xs)]">{v.render}</div>
                    <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
                      button · {v.token}
                    </span>
                    <span className="body-caption">{v.spec}</span>
                  </div>
                ))}
              </div>
            </Specimen>

            <Specimen
              id="ui-tag"
              name="Tag"
              source="@/components/ui/tag"
              spec="mono uppercase chip · surface-tag · radius-sm"
            >
              <div className="flex flex-wrap gap-[var(--spacing-xs)]">
                <Tag>PyTorch</Tag>
                <Tag>Next.js</Tag>
                <Tag>Computer Vision</Tag>
              </div>
            </Specimen>

            <Specimen
              id="ui-heading"
              name="Heading"
              source="@/components/ui/heading"
              description="Maps a heading level (h1–h6) to a semantic type token, keeping level (a11y) and visual style decoupled. Used by the page headers on home, about, work, and 404. The six type values are in Foundations → Typography; demoed at level 4 below."
            >
              <div className="flex flex-col gap-[var(--spacing-md)]">
                <Heading level={4} type="heading-display">
                  heading-display
                </Heading>
                <Heading level={4} type="heading-section">
                  heading-section
                </Heading>
                <Heading level={4} type="heading-component">
                  heading-component
                </Heading>
              </div>
            </Specimen>

            <Specimen
              id="ui-link-pill"
              name="LinkPill"
              source="@/components/ui/link-pill"
            >
              <div className="flex flex-wrap gap-[var(--spacing-sm)]">
                <LinkPill
                  href="#ui-link-pill"
                  icon={<GitHubIcon size={16} />}
                  external
                >
                  GitHub
                </LinkPill>
                <LinkPill href="#ui-link-pill" icon={<MailIcon size={16} />}>
                  Email
                </LinkPill>
              </div>
            </Specimen>

            <Specimen
              id="ui-copy-link"
              name="CopyLink"
              source="@/components/ui/copy-link"
            >
              <CopyLink value="hello@example.com" />
            </Specimen>

            <Specimen
              id="ui-copyable-code"
              name="CopyableCode"
              source="@/components/ui/copyable-code"
            >
              <CopyableCode
                value="npm install"
                ariaLabel="Copy install command"
              />
            </Specimen>

            <Specimen
              id="ui-theme-selector"
              name="InlineThemeSelector"
              source="@/components/ui/theme-selector"
              description="The page-theme control — three segments (system / light / dark) reflecting the active theme. Shown here as an inert reconstruction (look + hover only); the working instance is the toggle in the page header above."
            >
              <InertDemo className="flex">
                <InlineThemeSelector />
              </InertDemo>
            </Specimen>
          </GallerySection>

          {/* ── Components · Layout ── */}
          <GallerySection
            id="layout"
            title="Components · Layout"
            intro="Structural and spacing primitives. Stack, Grid, and Divider render live; the page-shaping wrappers (Container, Section, Sticky) shape this very page rather than a boxed demo."
            mapsTo="Foundations → Layout"
          >
            <Specimen
              id="layout-stack"
              name="Stack"
              source="@/components/layout/stack"
              spec="vertical flex column · gap token xs–3xl"
            >
              <Stack gap="md">
                <div className="body-caption border border-[var(--outline-variant)] bg-[var(--surface-raised)] p-[var(--spacing-sm)]">
                  gap=&quot;md&quot; — item one
                </div>
                <div className="body-caption border border-[var(--outline-variant)] bg-[var(--surface-raised)] p-[var(--spacing-sm)]">
                  item two
                </div>
                <div className="body-caption border border-[var(--outline-variant)] bg-[var(--surface-raised)] p-[var(--spacing-sm)]">
                  item three
                </div>
              </Stack>
            </Specimen>

            <Specimen
              id="layout-grid"
              name="Grid"
              source="@/components/layout/grid"
              description="Responsive column grid — 4 columns on mobile, 8 at md, 12 at xl. Resize the window to watch it reflow."
            >
              <Grid>
                {GRID_CELLS.map((n) => (
                  <div
                    key={n}
                    className="body-caption flex h-12 items-center justify-center border border-[var(--outline-variant)] bg-[var(--surface-raised)]"
                  >
                    {n}
                  </div>
                ))}
              </Grid>
            </Specimen>

            <Specimen
              id="layout-divider"
              name="Divider"
              source="@/components/layout/divider"
              description="Hairline rule in --outline-variant — horizontal or vertical."
            >
              <div className="flex flex-col gap-[var(--spacing-md)]">
                <span className="body-caption">above the rule</span>
                <Divider />
                <span className="body-caption">below the rule</span>
              </div>
            </Specimen>

            <Specimen
              id="layout-scaffold"
              name="Container · Section · Sticky"
              source="@/components/layout/*"
              description="Page-scaffold wrappers — Container (max-w 1200px + responsive padding), Section (vertical rhythm), Sticky (scroll-pinned). They shape this very page; an isolated box would misrepresent them."
            >
              <p className="body-caption text-[var(--on-surface-muted)]">
                Structural wrappers — best seen in context. This page is wrapped
                in Section › Container; Sticky pins the section-progress rail on
                /work pages.
              </p>
            </Specimen>
          </GallerySection>

          {/* ── Components · MDX (render on the page --background, as in a work page) ── */}
          <GallerySection
            id="mdx"
            title="Components · MDX"
            intro="Components available inside MDX content bodies only — shown on the page background, as they appear in a work page."
            mapsTo="Components (MDX)"
          >
            <Specimen
              id="mdx-callout"
              name="Callout"
              source="@/components/mdx/callout"
            >
              <Callout title="Note">
                A short aside with an accent left-border and raised fill.
              </Callout>
            </Specimen>

            <Specimen
              id="mdx-highlight"
              name="Highlight"
              source="@/components/mdx/highlight"
            >
              <Highlight heading="Key insight">
                An editorial pull-quote panel — elevation via border and raised
                fill, no shadow.
              </Highlight>
            </Specimen>

            <Specimen
              id="mdx-code-block"
              name="CodeBlock"
              source="@/components/mdx/code-block"
            >
              <CodeBlock>
                <code>{SAMPLE_CODE}</code>
              </CodeBlock>
            </Specimen>

            <Specimen
              id="mdx-figure"
              name="Figure"
              source="@/components/mdx/figure"
              description="Bordered image with object-cover and an optional caption."
            >
              <Figure
                src="/design-system/samples/figure.svg"
                alt="Neutral sample image"
                caption="Figure — object-cover in a bordered, radius-md frame"
              />
            </Specimen>

            <Specimen
              id="mdx-diagram"
              name="Diagram"
              source="@/components/mdx/diagram"
              description="Like Figure but object-contain on a sunken surface — for technical diagrams."
            >
              <Diagram
                src="/design-system/samples/diagram.svg"
                alt="Neutral sample input–model–output diagram"
                caption="Diagram — object-contain on a neutral field"
              />
            </Specimen>

            <Specimen
              id="mdx-diagram-row"
              name="DiagramRow · DiagramPanel"
              source="@/components/mdx/diagram-row"
              description="Two or three labelled panels in a row."
            >
              <DiagramRow caption="DiagramRow — two labelled panels">
                <DiagramPanel
                  src="/design-system/samples/panel-a.svg"
                  alt="Neutral sample panel A"
                  label="Before"
                />
                <DiagramPanel
                  src="/design-system/samples/panel-b.svg"
                  alt="Neutral sample panel B"
                  label="After"
                />
              </DiagramRow>
            </Specimen>
          </GallerySection>

          {/* ── Components · Icons ── */}
          <GallerySection
            id="icons"
            title="Components · Icons"
            intro="The icon set — all inherit currentColor at the requested size."
            mapsTo="Components"
          >
            <Specimen
              id="icons-material"
              name="Material icons"
              source="@/components/icons/material/*"
            >
              <div className="grid grid-cols-3 gap-[var(--spacing-lg)] text-[var(--on-surface)] sm:grid-cols-4 md:grid-cols-6">
                {MATERIAL_ICONS.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-[var(--spacing-xs)]"
                  >
                    <Icon size={24} />
                    <span className="font-mono text-[11px] text-[var(--on-surface-muted)]">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </Specimen>

            <Specimen
              id="icons-brand"
              name="Brand icons"
              source="@/components/icons/brands/*"
            >
              <div className="flex flex-wrap gap-[var(--spacing-2xl)] text-[var(--on-surface)]">
                {BRAND_ICONS.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-[var(--spacing-xs)]"
                  >
                    <Icon size={24} />
                    <span className="font-mono text-[11px] text-[var(--on-surface-muted)]">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </Specimen>
          </GallerySection>

          {/* ── App frame · Shell (live in bounded frames) ── */}
          <GallerySection
            id="shell"
            title="App frame · Shell"
            intro="Site-wide chrome mounted once in the root layout — live around this page and shown live in bounded frames here."
            mapsTo="Domain Components → Shell"
          >
            <Specimen
              id="shell-nav"
              name="PillNav"
              source="@/components/shell/pill-nav"
              description="Floating pill nav (md+), with routing-aware active state. Fixed positioning is bounded to the frame."
            >
              <ChromeFrame height={120}>
                <PillNav />
              </ChromeFrame>
            </Specimen>

            <Specimen
              id="shell-mobile-nav"
              name="MobileNav"
              source="@/components/shell/mobile-nav"
              description="Mobile hamburger drawer (below md). It is live on this page at mobile widths — resize below 768px and tap the menu to open the slide-out drawer."
            >
              <p className="body-caption text-[var(--on-background)]">
                Live below 768px — resize the window and open the menu to see
                the slide-out drawer.
              </p>
            </Specimen>

            <Specimen
              id="shell-footer"
              name="Footer"
              source="@/components/shell/footer"
            >
              <Footer />
            </Specimen>

            <Specimen
              id="shell-scroll-to-top"
              name="ScrollToTop"
              source="@/components/shell/scroll-to-top"
              description="Floating FAB that appears after 400px of scroll and lifts above the footer. Mounted once in the root layout. Shown forced-visible in a bounded frame (look + hover only, inert); the working instance is live on this page — scroll down to see it."
            >
              <InertDemo>
                <ChromeFrame height={160}>
                  <ScrollToTop forceVisible />
                </ChromeFrame>
              </InertDemo>
            </Specimen>
          </GallerySection>

          {/* ── Background (static captures — the live WebGL meteor is GPU-only) ── */}
          <GallerySection
            id="background"
            title="Background"
            intro="The ambient layer composited by BackgroundLayer. Both layers are full-viewport, so they're shown as committed static captures — the WebGL meteor is GPU-only and brutal on software WebGL, so it isn't rendered live in the gallery."
            mapsTo="Background subsystem"
          >
            <Specimen
              id="ascii-field"
              name="AsciiField"
              source="@/components/background/ascii-field"
              description="Seeded glyph field in the page gutters — three tonal tiers (accent, ink, mute). Also live behind this page; shown here as a static capture."
            >
              <ThemeShot
                light={backgroundAsciiLight}
                dark={backgroundAsciiDark}
                alt="AsciiField glyph background"
              />
            </Specimen>
            <Specimen
              id="meteor-shower"
              name="MeteorShower"
              source="@/components/background/meteor-shower"
              description="Three.js shader — additive neon streaks in dark, inverted ink streaks in light. GPU-gated (CPU-brutal on software WebGL); shown as a static capture."
            >
              <ThemeShot
                light={backgroundMeteorLight}
                dark={backgroundMeteorDark}
                alt="MeteorShower background"
              />
            </Specimen>
          </GallerySection>

          {/* ── Domain · Project ── */}
          <GallerySection
            id="project"
            title="Domain · Project"
            intro="Page/route/schema-bound compositions, shown with placeholder content (images reuse a real cover)."
            mapsTo="Domain Components → Project"
          >
            <Specimen
              id="project-card"
              name="ProjectCard"
              source="@/components/project/project-card"
              description="Card link to a project page — hero cover, title, summary, up to three tags."
            >
              {/* Constrained to a natural card width, left-aligned (not centred, not full-bleed). */}
              <div className="max-w-[420px]">
                <ProjectCard project={demoProject} />
              </div>
            </Specimen>

            <Specimen
              id="project-header"
              name="ProjectHeader"
              source="@/components/project/project-header"
            >
              <ProjectHeader frontmatter={demoProject.frontmatter} />
            </Specimen>

            <Specimen
              id="project-hero-media"
              name="HeroMedia · HeroMetaOverlay"
              source="@/components/project/hero-media"
              description="Dispatches to a live cover component, video, or image by slug. The overlay renders logos/contributors when the project provides them."
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-sunken)]">
                <HeroMedia slug={demoProject.slug} alt="Project cover" />
                <HeroMetaOverlay
                  logos={demoProject.frontmatter.logos}
                  contributors={demoProject.frontmatter.contributors}
                />
              </div>
            </Specimen>

            <Specimen
              id="project-covers"
              name="Cover components"
              source="@/components/project/covers"
              description="Self-contained illustrated SVG covers, keyed by slug."
            >
              <div className="grid grid-cols-1 gap-[var(--spacing-lg)] md:grid-cols-3">
                {Object.entries(coverComponents).map(([slug, Cover]) => (
                  <Card key={slug} label={slug} className="aspect-video p-0">
                    <div className="relative h-full w-full overflow-hidden">
                      <Cover />
                    </div>
                  </Card>
                ))}
              </div>
            </Specimen>

            <Specimen
              id="project-overview"
              name="ProjectOverview"
              source="@/components/project/project-overview"
            >
              <div className="prose-content">
                <ProjectOverview overview={demoProject.frontmatter.overview} />
              </div>
            </Specimen>

            <Specimen
              id="project-tech-stack"
              name="TechStack"
              source="@/components/project/tech-stack"
              description="Definition list of the project's stack. The 'Tech Stack' heading is owned by the page (like Overview), so the component is heading-less and no longer pollutes the section rail."
            >
              <div className="prose-content">
                <TechStack stack={demoProject.frontmatter.stack} />
              </div>
            </Specimen>

            <Specimen
              id="project-section-progress"
              name="SectionProgressNav"
              source="@/components/project/section-progress-nav"
              description="Fixed left-rail TOC that scrapes an article's <h2>s via IntersectionObserver. It is live on this page — the rail at the left edge (xl+) is this component, tracking these sections."
            >
              <p className="body-caption text-[var(--on-background)]">
                ← Live as the left-rail TOC on this page (xl+), tracking the
                sections above.
              </p>
            </Specimen>
          </GallerySection>
        </DemoViewOnly>
      </Container>
    </Section>
  );
}
