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
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/ui/copy-link";
import { CopyableCode } from "@/components/ui/copyable-code";
import { DownloadButton } from "@/components/ui/download-button";
import { Heading } from "@/components/ui/heading";
import { LinkPill } from "@/components/ui/link-pill";
import { Tag } from "@/components/ui/tag";
import { InlineThemeSelector } from "@/components/ui/theme-selector";
import type { Project } from "@/lib/content/projects";
import backgroundDark from "../../../public/design-system/background-dark.png";
import backgroundLight from "../../../public/design-system/background-light.png";
import footerDark from "../../../public/design-system/footer-dark.png";
import footerLight from "../../../public/design-system/footer-light.png";
import navMobileDark from "../../../public/design-system/nav-mobile-dark.png";
import navMobileLight from "../../../public/design-system/nav-mobile-light.png";
import navPillDark from "../../../public/design-system/nav-pill-dark.png";
import navPillLight from "../../../public/design-system/nav-pill-light.png";
import scrollToTopDark from "../../../public/design-system/scroll-to-top-dark.png";
import scrollToTopLight from "../../../public/design-system/scroll-to-top-light.png";
import sectionProgressDark from "../../../public/design-system/section-progress-dark.png";
import sectionProgressLight from "../../../public/design-system/section-progress-light.png";
import { Card, GallerySection, Specimen } from "./_gallery/section";
import { StaticShot } from "./_gallery/static-shot";
import { DemoFrame, ThemePair } from "./_gallery/theme-pair";
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

// Dev-only component gallery. Renders every real component grouped to mirror
// rules/web-frontend/component-structure.md, styled like a project detail page
// (prose h2 headings + SectionProgressNav rail) with numbered sections, per-section
// rationale, and side-by-side light/dark previews. The route and its screenshot
// assets are pruned from the production snapshot (release.sh) — they never ship.
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
  ];

  return (
    <Section>
      <Container>
        <SectionProgressNav />
        <header className="mb-[var(--spacing-3xl)] flex flex-col gap-[var(--spacing-lg)]">
          <span className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--on-surface-muted)]">
            [00] Reference
          </span>
          <Heading level={1} type="display-title">
            Design System
          </Heading>
          <p className="body-lead max-w-[70ch]">
            Every component, rendered live and grouped to mirror the component
            folder map. Token-driven pieces show light and dark side by side.
          </p>
          <div className="body-caption">
            Dev-only reference — excluded from the production build. Site chrome
            (nav, footer, background, scroll-to-top) is live around this page; a
            few fixed or full-viewport components are shown as static captures.
          </div>
        </header>

        <article className="flex flex-col gap-[var(--spacing-4xl)]">
          {/* ── [01] Foundations ── */}
          <GallerySection
            id="foundations"
            number="01"
            title="Foundations"
            intro="The design tokens every component composes from — globals.css is the single source of truth."
            mapsTo="Foundations"
          >
            <Specimen
              id="foundations-color"
              name="Color tokens"
              source="globals.css → :root / [data-theme]"
              description="Semantic surfaces, text, borders, accent, and state colors — each card's swatch re-scopes per theme."
            >
              <ThemePair>
                <ColorTokenGrid />
              </ThemePair>
            </Specimen>

            <Specimen
              id="foundations-type"
              name="Typography scale"
              source="globals.css → @layer components"
              description="19 semantic type tokens — family, size, weight, line-height, and sample text in each token's real role."
            >
              <DemoFrame>
                <TypeScaleSpecimen />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="foundations-spacing"
              name="Spacing scale"
              source="--spacing-*"
            >
              <DemoFrame>
                <SpacingScaleSpecimen />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="foundations-radius"
              name="Radius scale"
              source="--radius-*"
            >
              <DemoFrame>
                <RadiusScaleSpecimen />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="foundations-depth"
              name="Elevation & depth"
              source="DESIGN.md → Elevation"
              description="No box-shadow. Depth comes from hairline borders and tonal surface layering."
            >
              <ThemePair>
                <DepthSpecimen />
              </ThemePair>
            </Specimen>

            <Specimen
              id="foundations-responsive"
              name="Responsive"
              source="DESIGN.md → Layout"
              description="Breakpoint zones, touch targets, and the collapse strategy."
            >
              <div className="prose-content">
                <ResponsiveSpecimen />
              </div>
            </Specimen>

            <Specimen
              id="foundations-motion"
              name="Motion tokens"
              source="--duration-* / --ease-*"
            >
              <div className="prose-content">
                <MotionTokenTable />
              </div>
            </Specimen>

            <Specimen
              id="foundations-zindex"
              name="Z-index scale"
              source="--z-*"
            >
              <div className="prose-content">
                <ZIndexTokenTable />
              </div>
            </Specimen>
          </GallerySection>

          {/* ── [02] Components · UI ── */}
          <GallerySection
            id="ui"
            number="02"
            title="Components · UI"
            intro="Reusable-everywhere primitives — no page, route, or schema assumptions."
            mapsTo="Components"
          >
            <Specimen
              id="ui-button"
              name="Button"
              source="@/components/ui/button"
            >
              <ThemePair>
                <div className="grid grid-cols-1 gap-[var(--spacing-md)] sm:grid-cols-2">
                  {buttonVariants.map((v) => (
                    <div
                      key={v.token}
                      className="flex flex-col gap-[var(--spacing-xs)]"
                    >
                      <div className="flex min-h-[96px] items-center justify-center border border-[var(--outline-variant)] bg-[var(--surface-sunken)] p-[var(--spacing-lg)]">
                        {v.render}
                      </div>
                      <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
                        button · {v.token}
                      </span>
                      <span className="body-caption">{v.spec}</span>
                    </div>
                  ))}
                </div>
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-tag"
              name="Tag"
              source="@/components/ui/tag"
              spec="mono uppercase chip · surface-tag · radius-sm"
            >
              <ThemePair>
                <div className="flex flex-wrap gap-[var(--spacing-xs)]">
                  <Tag>PyTorch</Tag>
                  <Tag>Next.js</Tag>
                  <Tag>Computer Vision</Tag>
                </div>
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-heading"
              name="Heading"
              source="@/components/ui/heading"
              description="Maps a heading level (h1–h6) to a semantic type token, keeping level (a11y) and visual style decoupled. Used by the page headers on home, about, work, and 404. The six type values are in Foundations → Typography; demoed at level 4 below."
            >
              <DemoFrame>
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
              </DemoFrame>
            </Specimen>

            <Specimen
              id="ui-link-pill"
              name="LinkPill"
              source="@/components/ui/link-pill"
            >
              <ThemePair>
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
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-copy-link"
              name="CopyLink"
              source="@/components/ui/copy-link"
            >
              <ThemePair>
                <CopyLink value="hello@example.com" />
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-copyable-code"
              name="CopyableCode"
              source="@/components/ui/copyable-code"
            >
              <ThemePair>
                <CopyableCode
                  value="npm install"
                  ariaLabel="Copy install command"
                />
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-download-button"
              name="DownloadButton"
              source="@/components/ui/download-button"
              description="Generic secondary button that opens a file in a new tab and triggers a download (the résumé action on About, bound to no specific asset)."
            >
              <ThemePair>
                <DownloadButton href="#ui-download-button">
                  Resume
                </DownloadButton>
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-theme-selector"
              name="InlineThemeSelector"
              source="@/components/ui/theme-selector"
              description="Controls the page's GLOBAL theme — clicking flips the whole site, and the active state reflects the global theme, not the forced frame."
            >
              <ThemePair>
                <InlineThemeSelector />
              </ThemePair>
            </Specimen>

            <Specimen
              id="ui-scroll-to-top"
              name="ScrollToTop"
              source="@/components/ui/scroll-to-top"
              description="Floating FAB that appears after 400px of scroll and lifts above the footer. Live on this page — scroll down to see it. Fixed-position + scroll-driven, so captured here."
            >
              <StaticShot
                light={scrollToTopLight}
                dark={scrollToTopDark}
                alt="ScrollToTop floating button"
                note="fixed-position FAB, captured after scrolling past 400px"
              />
            </Specimen>
          </GallerySection>

          {/* ── [03] Components · Layout ── */}
          <GallerySection
            id="layout"
            number="03"
            title="Components · Layout"
            intro="Structural and spacing primitives. The outlines below are gallery guides, not part of the components."
            mapsTo="Foundations → Layout"
          >
            <Specimen
              id="layout-stack"
              name="Stack"
              source="@/components/layout/stack"
              spec="vertical flex column · gap token xs–3xl"
            >
              <DemoFrame>
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
              </DemoFrame>
            </Specimen>

            <Specimen
              id="layout-scaffold"
              name="Container · Section · Grid · Divider · Sticky"
              source="@/components/layout/*"
              description="Page-scaffold primitives — Container (max-w 1200px + responsive padding), Section (vertical rhythm), Grid (4/8/12 cols), Divider (hairline), Sticky (scroll-pinned). They shape this very page; isolated outlines would misrepresent them."
            >
              <DemoFrame note="Structural primitives — best seen in context (this page is wrapped in Section › Container). See about/page.tsx and work pages for Grid/Sticky." />
            </Specimen>
          </GallerySection>

          {/* ── [04] Components · MDX ── */}
          <GallerySection
            id="mdx"
            number="04"
            title="Components · MDX"
            intro="Components available inside MDX content bodies only."
            mapsTo="Components (MDX)"
          >
            <Specimen
              id="mdx-callout"
              name="Callout"
              source="@/components/mdx/callout"
            >
              <ThemePair>
                <Callout title="Note">
                  A short aside with an accent left-border and raised fill.
                </Callout>
              </ThemePair>
            </Specimen>

            <Specimen
              id="mdx-highlight"
              name="Highlight"
              source="@/components/mdx/highlight"
            >
              <ThemePair>
                <Highlight heading="Key insight">
                  An editorial pull-quote panel — elevation via border and
                  raised fill, no shadow.
                </Highlight>
              </ThemePair>
            </Specimen>

            <Specimen
              id="mdx-code-block"
              name="CodeBlock"
              source="@/components/mdx/code-block"
            >
              <ThemePair>
                <CodeBlock>
                  <code>{SAMPLE_CODE}</code>
                </CodeBlock>
              </ThemePair>
            </Specimen>

            <Specimen
              id="mdx-figure"
              name="Figure"
              source="@/components/mdx/figure"
              description="Bordered image with object-cover and an optional caption."
            >
              <DemoFrame>
                <Figure
                  src="/design-system/samples/figure.svg"
                  alt="Neutral sample image"
                  caption="Figure — object-cover in a bordered, radius-md frame"
                />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="mdx-diagram"
              name="Diagram"
              source="@/components/mdx/diagram"
              description="Like Figure but object-contain on a sunken surface — for technical diagrams."
            >
              <DemoFrame>
                <Diagram
                  src="/design-system/samples/diagram.svg"
                  alt="Neutral sample input–model–output diagram"
                  caption="Diagram — object-contain on a neutral field"
                />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="mdx-diagram-row"
              name="DiagramRow · DiagramPanel"
              source="@/components/mdx/diagram-row"
              description="Two or three labelled panels in a row."
            >
              <DemoFrame>
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
              </DemoFrame>
            </Specimen>
          </GallerySection>

          {/* ── [05] Components · Icons ── */}
          <GallerySection
            id="icons"
            number="05"
            title="Components · Icons"
            intro="The icon set — all inherit currentColor at the requested size."
            mapsTo="Components"
          >
            <Specimen
              id="icons-material"
              name="Material icons"
              source="@/components/icons/material/*"
            >
              <DemoFrame>
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
              </DemoFrame>
            </Specimen>

            <Specimen
              id="icons-brand"
              name="Brand icons"
              source="@/components/icons/brands/*"
            >
              <DemoFrame>
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
              </DemoFrame>
            </Specimen>
          </GallerySection>

          {/* ── [06] App frame · Shell ── */}
          <GallerySection
            id="shell"
            number="06"
            title="App frame · Shell"
            intro="Site-wide chrome mounted once in the root layout — live around this page. Fixed/route-aware, so shown as captures with breathing room."
            mapsTo="Domain Components → Shell"
          >
            <Specimen
              id="shell-nav"
              name="Nav · PillNav · MobileNav"
              source="@/components/shell/*"
              description="Floating pill nav (md+) and mobile hamburger drawer (below md), with routing-aware active state."
            >
              <StaticShot
                light={navPillLight}
                dark={navPillDark}
                alt="Desktop pill navigation"
                note="md+ floating pill nav"
              />
              <StaticShot
                light={navMobileLight}
                dark={navMobileDark}
                alt="Mobile navigation drawer (open)"
                note="below md, slide-out drawer"
              />
            </Specimen>

            <Specimen
              id="shell-footer"
              name="Footer"
              source="@/components/shell/footer"
            >
              <StaticShot
                light={footerLight}
                dark={footerDark}
                alt="Site footer"
                note="live at the bottom of every page"
              />
            </Specimen>
          </GallerySection>

          {/* ── [07] Background ── */}
          <GallerySection
            id="background"
            number="07"
            title="Background subsystem"
            intro="The ambient layer — fixed behind every non-project page, including this one."
            mapsTo="Background subsystem"
          >
            <Specimen
              id="background-layer"
              name="BackgroundLayer · AsciiField · MeteorShower"
              source="@/components/background/*"
              description="WebGL reads the global theme (can't be wrapper-forced) and the ascii field is gutter-masked to the page edges, so each is captured close-up in both themes rather than rendered inline."
            >
              <StaticShot
                light={backgroundLight}
                dark={backgroundDark}
                alt="Ambient background — ascii field and meteor shower"
                note="full-viewport ambient layer"
              />
            </Specimen>
          </GallerySection>

          {/* ── [08] Domain · Project ── */}
          <GallerySection
            id="project"
            number="08"
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
              <ThemePair>
                <div className="mx-auto max-w-[420px]">
                  <ProjectCard project={demoProject} />
                </div>
              </ThemePair>
            </Specimen>

            <Specimen
              id="project-header"
              name="ProjectHeader"
              source="@/components/project/project-header"
            >
              <DemoFrame>
                <ProjectHeader frontmatter={demoProject.frontmatter} />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="project-overview"
              name="ProjectOverview"
              source="@/components/project/project-overview"
            >
              <DemoFrame>
                <ProjectOverview overview={demoProject.frontmatter.overview} />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="project-hero-media"
              name="HeroMedia · HeroMetaOverlay"
              source="@/components/project/hero-media"
              description="Dispatches to a live cover component, video, or image by slug. The overlay renders logos/contributors when the project provides them."
            >
              <DemoFrame>
                <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-sunken)]">
                  <HeroMedia slug={demoProject.slug} alt="Project cover" />
                  <HeroMetaOverlay
                    logos={demoProject.frontmatter.logos}
                    contributors={demoProject.frontmatter.contributors}
                  />
                </div>
              </DemoFrame>
            </Specimen>

            <Specimen
              id="project-covers"
              name="Cover components"
              source="@/components/project/covers"
              description="Self-contained illustrated SVG covers, keyed by slug."
            >
              <DemoFrame>
                <div className="grid grid-cols-1 gap-[var(--spacing-lg)] md:grid-cols-3">
                  {Object.entries(coverComponents).map(([slug, Cover]) => (
                    <Card key={slug} label={slug} className="aspect-video p-0">
                      <div className="relative h-full w-full overflow-hidden">
                        <Cover />
                      </div>
                    </Card>
                  ))}
                </div>
              </DemoFrame>
            </Specimen>

            <Specimen
              id="project-section-progress"
              name="SectionProgressNav"
              source="@/components/project/section-progress-nav"
              description="Fixed left-rail TOC that scrapes <h2>s from a project <article> via IntersectionObserver — the same rail shown on this page (xl+)."
            >
              <StaticShot
                light={sectionProgressLight}
                dark={sectionProgressDark}
                alt="Section progress left-rail navigation"
                note="left rail on /work/* pages (desktop)"
              />
            </Specimen>
          </GallerySection>
        </article>

        {/* TechStack renders its own <h2>; kept outside the <article> so it doesn't
            pollute the SectionProgressNav rail. Reads as the final Project demo. */}
        <div className="mt-[var(--spacing-4xl)]">
          <Specimen
            id="project-tech-stack"
            name="TechStack"
            source="@/components/project/tech-stack"
            description="Renders its own 'Tech Stack' h2 — shown outside the gallery's article so it stays out of the section rail."
          >
            <DemoFrame>
              <div className="prose-content">
                <TechStack stack={demoProject.frontmatter.stack} />
              </div>
            </DemoFrame>
          </Specimen>
        </div>
      </Container>
    </Section>
  );
}
