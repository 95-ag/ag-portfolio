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
import { TechStack } from "@/components/project/tech-stack";
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/ui/copy-link";
import { CopyableCode } from "@/components/ui/copyable-code";
import { Heading } from "@/components/ui/heading";
import { LinkPill } from "@/components/ui/link-pill";
import { ResumeButton } from "@/components/ui/resume-button";
import { Tag } from "@/components/ui/tag";
import { InlineThemeSelector } from "@/components/ui/theme-selector";
import { getAllProjects } from "@/lib/content/projects";
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
import { GalleryToc } from "./_gallery/toc";
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
// rules/web-frontend/component-structure.md, with numbered sections + per-section
// rationale, token cards, and side-by-side light/dark previews (patterns borrowed
// from getdesign.md, rendered in our own tokens). The route and its screenshot
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

const TOC = [
  { id: "foundations", label: "01 · Foundations" },
  { id: "ui", label: "02 · UI" },
  { id: "layout", label: "03 · Layout" },
  { id: "mdx", label: "04 · MDX" },
  { id: "icons", label: "05 · Icons" },
  { id: "shell", label: "06 · Shell" },
  { id: "background", label: "07 · Background" },
  { id: "project", label: "08 · Project" },
];

const SAMPLE_CODE = `export function add(a: number, b: number) {
  return a + b;
}`;

export default function DesignSystemPage() {
  const sample = getAllProjects()[0];

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-[var(--spacing-xl)]">
          {/* Header */}
          <header className="flex flex-col gap-[var(--spacing-lg)]">
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
            <p className="body-caption max-w-[70ch]">
              Dev-only reference — excluded from the production build. Site
              chrome (nav, footer, background, scroll-to-top) is live around
              this page; a few fixed or full-viewport components are shown as
              static captures.
            </p>
          </header>

          <GalleryToc items={TOC} />

          {/* ── [01] Foundations ── */}
          <GallerySection
            id="foundations"
            number="01"
            title="Foundations"
            rationale="The design tokens every component composes from. globals.css is the single source of truth; values here echo it."
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
              description="19 semantic type tokens — family, size, weight, and line-height beside a live specimen."
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
              name="Responsive zones"
              source="DESIGN.md → Layout"
              description="Sanity-check breakpoints and what changes across them."
            >
              <DemoFrame>
                <ResponsiveSpecimen />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="foundations-motion"
              name="Motion tokens"
              source="--duration-* / --ease-*"
            >
              <DemoFrame>
                <MotionTokenTable />
              </DemoFrame>
            </Specimen>

            <Specimen
              id="foundations-zindex"
              name="Z-index scale"
              source="--z-*"
            >
              <DemoFrame>
                <ZIndexTokenTable />
              </DemoFrame>
            </Specimen>
          </GallerySection>

          <Divider />

          {/* ── [02] Components · UI ── */}
          <GallerySection
            id="ui"
            number="02"
            title="Components · UI"
            rationale="Reusable-everywhere primitives — no page, route, or schema assumptions."
          >
            <Specimen
              id="ui-button"
              name="Button"
              source="@/components/ui/button"
              spec="variants: primary · secondary · ±icon · renders as button or link"
            >
              <ThemePair>
                <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="primary" icon={<MailIcon size={18} />}>
                    With icon
                  </Button>
                  <Button href="#ui-button" variant="secondary">
                    As link
                  </Button>
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
              description="Maps level (h1–h6) to a semantic type token. All six type values appear in Foundations → Typography; demoed at level 4 here."
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
              id="ui-resume-button"
              name="ResumeButton"
              source="@/components/ui/resume-button"
            >
              <ThemePair>
                <ResumeButton href="#ui-resume-button" />
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
              description="Floating FAB that appears after 400px of scroll and lifts above the footer. Live on this page — scroll down to see it. Captured here because it's fixed-position and scroll-driven."
            >
              <StaticShot
                light={scrollToTopLight}
                dark={scrollToTopDark}
                alt="ScrollToTop floating button"
                note="fixed-position FAB, captured after scrolling past 400px"
              />
            </Specimen>
          </GallerySection>

          <Divider />

          {/* ── [03] Components · Layout ── */}
          <GallerySection
            id="layout"
            number="03"
            title="Components · Layout"
            rationale="Structural and spacing primitives. The outlines below are gallery guides, not part of the components."
          >
            <Specimen
              id="layout-stack"
              name="Stack"
              source="@/components/layout/stack"
              spec="vertical flex column · gap token xs–3xl"
            >
              <DemoFrame>
                <Stack gap="md">
                  <div className="rounded-[var(--radius-sm)] bg-[var(--surface-raised)] p-[var(--spacing-sm)] body-caption">
                    gap=&quot;md&quot; — item one
                  </div>
                  <div className="rounded-[var(--radius-sm)] bg-[var(--surface-raised)] p-[var(--spacing-sm)] body-caption">
                    item two
                  </div>
                  <div className="rounded-[var(--radius-sm)] bg-[var(--surface-raised)] p-[var(--spacing-sm)] body-caption">
                    item three
                  </div>
                </Stack>
              </DemoFrame>
            </Specimen>

            <Specimen
              id="layout-divider"
              name="Divider"
              source="@/components/layout/divider"
            >
              <DemoFrame>
                <div className="flex flex-col gap-[var(--spacing-md)]">
                  <span className="body-caption">above</span>
                  <Divider />
                  <span className="body-caption">below</span>
                </div>
              </DemoFrame>
            </Specimen>

            <Specimen
              id="layout-scaffold"
              name="Container · Section · Grid · Sticky"
              source="@/components/layout/*"
              description="Page-scaffold primitives — Container (max-w 1200px + responsive padding), Section (vertical rhythm), Grid (4/8/12 cols), Sticky (scroll-pinned). They shape this very page; isolated outlines would misrepresent them."
            >
              <DemoFrame note="Structural primitives — best seen in context (this page is wrapped in Section › Container). See about/page.tsx and work pages for Grid/Sticky." />
            </Specimen>
          </GallerySection>

          <Divider />

          {/* ── [04] Components · MDX ── */}
          <GallerySection
            id="mdx"
            number="04"
            title="Components · MDX"
            rationale="Components available inside MDX content bodies only."
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
                  src="/projects/masked-autoencoders/reconstructions.png"
                  alt="Masked-autoencoder reconstruction samples"
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
                  src="/projects/model-extraction-attacks/extraction-pipeline.svg"
                  alt="Model extraction attack pipeline diagram"
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
                    src="/projects/masked-autoencoders/grad-cam-original.png"
                    alt="Original input image"
                    label="Original"
                  />
                  <DiagramPanel
                    src="/projects/masked-autoencoders/grad-cam-heatmap.png"
                    alt="Grad-CAM attention heatmap"
                    label="Grad-CAM"
                  />
                </DiagramRow>
              </DemoFrame>
            </Specimen>
          </GallerySection>

          <Divider />

          {/* ── [05] Components · Icons ── */}
          <GallerySection
            id="icons"
            number="05"
            title="Components · Icons"
            rationale="The icon set — all inherit currentColor at the requested size."
          >
            <Specimen
              id="icons-material"
              name="Material icons"
              source="@/components/icons/material/*"
            >
              <DemoFrame>
                <div className="grid grid-cols-3 gap-[var(--spacing-lg)] sm:grid-cols-4 md:grid-cols-6">
                  {MATERIAL_ICONS.map(({ name, Icon }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-[var(--spacing-xs)] text-[var(--on-surface)]"
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

          <Divider />

          {/* ── [06] App frame · Shell ── */}
          <GallerySection
            id="shell"
            number="06"
            title="App frame · Shell"
            rationale="Site-wide chrome mounted once in the root layout — live around this page. Fixed/route-aware, so shown as captures."
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

          <Divider />

          {/* ── [07] Background ── */}
          <GallerySection
            id="background"
            number="07"
            title="Background subsystem"
            rationale="The ambient layer — fixed behind every non-project page, including this one. AsciiField (gutter-masked glyphs) + MeteorShower (WebGL, honors reduced-motion)."
          >
            <Specimen
              id="background-layer"
              name="BackgroundLayer · AsciiField · MeteorShower"
              source="@/components/background/*"
              description="WebGL reads the global theme (can't be wrapper-forced) and the ascii field is gutter-masked to the page edges, so this is captured in each theme rather than rendered inline."
            >
              <StaticShot
                light={backgroundLight}
                dark={backgroundDark}
                alt="Ambient background — ascii field and meteor shower"
                note="full-viewport ambient layer, captured from the home hero"
              />
            </Specimen>
          </GallerySection>

          <Divider />

          {/* ── [08] Domain · Project ── */}
          <GallerySection
            id="project"
            number="08"
            title="Domain · Project"
            rationale="Page/route/schema-bound compositions, fed a real project from the content library."
          >
            {sample ? (
              <>
                <Specimen
                  id="project-card"
                  name="ProjectCard"
                  source="@/components/project/project-card"
                  description={`Card link for /work/${sample.slug}.`}
                >
                  <ThemePair>
                    <div className="max-w-[420px]">
                      <ProjectCard project={sample} />
                    </div>
                  </ThemePair>
                </Specimen>

                <Specimen
                  id="project-header"
                  name="ProjectHeader"
                  source="@/components/project/project-header"
                >
                  <DemoFrame>
                    <ProjectHeader frontmatter={sample.frontmatter} />
                  </DemoFrame>
                </Specimen>

                <Specimen
                  id="project-overview"
                  name="ProjectOverview"
                  source="@/components/project/project-overview"
                >
                  <DemoFrame>
                    <ProjectOverview overview={sample.frontmatter.overview} />
                  </DemoFrame>
                </Specimen>

                <Specimen
                  id="project-tech-stack"
                  name="TechStack"
                  source="@/components/project/tech-stack"
                >
                  <DemoFrame>
                    <div className="prose-content">
                      <TechStack stack={sample.frontmatter.stack} />
                    </div>
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
                      <HeroMedia
                        slug={sample.slug}
                        src={sample.frontmatter.heroImage}
                        alt={sample.frontmatter.heroAlt}
                        poster={sample.frontmatter.heroPoster}
                      />
                      <HeroMetaOverlay
                        logos={sample.frontmatter.logos}
                        contributors={sample.frontmatter.contributors}
                      />
                    </div>
                  </DemoFrame>
                </Specimen>
              </>
            ) : (
              <DemoFrame note="No projects found in the content library on this branch." />
            )}

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
                      <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-md)]">
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
              description="Fixed left-rail TOC that scrapes <h2>s from a project <article> via IntersectionObserver. Needs a /work/* page, so it's captured there."
            >
              <StaticShot
                light={sectionProgressLight}
                dark={sectionProgressDark}
                alt="Section progress left-rail navigation"
                note="left rail on /work/* pages (desktop)"
              />
            </Specimen>
          </GallerySection>
        </div>
      </Container>
    </Section>
  );
}
