import rehypeShiki from "@shikijs/rehype";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { GitHubIcon } from "@/components/icons/brands/github";
import { MailIcon } from "@/components/icons/material/mail";
import { Callout } from "@/components/mdx/callout";
import { Diagram } from "@/components/mdx/diagram";
import { DiagramPanel, DiagramRow } from "@/components/mdx/diagram-row";
import { Figure } from "@/components/mdx/figure";
import type { FigureWidth } from "@/components/mdx/figure-width";
import { Highlight } from "@/components/mdx/highlight";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Footer } from "@/components/shell/footer";
import { MobileNavPanel } from "@/components/shell/mobile-nav";
import { PillNav } from "@/components/shell/pill-nav";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { Button } from "@/components/ui/controls/button";
import {
  InlineThemeSelector,
  PillThemeSelector,
} from "@/components/ui/controls/theme-selector";
import { CopyableCode } from "@/components/ui/display/copyable-code";
import { Heading } from "@/components/ui/display/heading";
import { LightboxTrigger } from "@/components/ui/display/lightbox";
import { Popover, PopoverDescription } from "@/components/ui/display/popover";
import { Related } from "@/components/ui/display/related";
import { Tag } from "@/components/ui/display/tag";
import { Breadcrumbs } from "@/components/ui/links/breadcrumbs";
import { CopyLink } from "@/components/ui/links/copy-link";
import { LinkPill } from "@/components/ui/links/link-pill";
import {
  GallerySection,
  Specimen,
  SpecimenGroup,
} from "../scaffold-kit/catalog";
import { ChromeFrame } from "../scaffold-kit/chrome-frame";
import { InertDemo } from "../scaffold-kit/click-guards";

// Rendered through the real MDX + Shiki pipeline (not hand-fed) so the highlighting matches a real
// content code fence.
const FIGURE_WIDTHS: { width: FigureWidth; px: number }[] = [
  { width: "xs", px: 380 },
  { width: "sm", px: 460 },
  { width: "md", px: 560 },
  { width: "lg", px: 640 },
  { width: "xl", px: 720 },
];

const SAMPLE_SIDE_BY_SIDE_MDX = `<SideBySide>
  <Diagram src="/design-system/samples/diagram.svg" alt="Neutral sample diagram beside its table" caption="SideBySide: figure at width xs" width="xs" />

| Setting | Result |
|---|---|
| Baseline | 32.7% |
| Variant A | 64.3% |
| Variant B | 66.9% |

</SideBySide>`;

const SAMPLE_CODE_MDX = `\`\`\`ts
export function add(a: number, b: number) {
  return a + b;
}
\`\`\``;

const buttonVariants = [
  {
    token: "primary",
    spec: "bg accent · text ink-on-accent · radius-sm · 56px tall",
    render: <Button variant="primary">Primary</Button>,
  },
  {
    token: "secondary",
    spec: "1px hairline-strong · transparent · hover accent tint",
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

export function ComponentsSections() {
  return (
    <>
      <GallerySection
        id="shell"
        title="Components · Shell"
        intro="Site-wide chrome mounted once in the root layout, live around this page and shown live in bounded frames here."
        mapsTo="Components → Shell"
      >
        <Specimen
          id="shell-nav"
          name="PillNav"
          source="@/components/shell/pill-nav"
          description="Floating pill nav (md+), with routing-aware active state."
        >
          <ChromeFrame height={120} inert>
            <PillNav />
          </ChromeFrame>
        </Specimen>

        <Specimen
          id="shell-mobile-nav"
          name="MobileNav"
          source="@/components/shell/mobile-nav"
          description="Mobile hamburger drawer (below md): logomark, nav links, and theme selector, sliding in from the right. The live drawer is on this page at mobile widths; resize below 768px and tap the menu."
        >
          <InertDemo>
            <ChromeFrame height={420} inert>
              <div
                aria-hidden
                className="absolute inset-0 bg-[var(--ink)]/30"
              />
              <div className="absolute top-0 right-0 h-full w-[min(280px,80%)]">
                <MobileNavPanel pathname="/about" />
              </div>
            </ChromeFrame>
          </InertDemo>
        </Specimen>

        <Specimen
          id="shell-footer"
          name="Footer"
          source="@/components/shell/footer"
          description="Site-wide footer: copyright, repo link, social and feed icons. Full-width, in document flow."
        >
          <ChromeFrame inert>
            <Footer />
          </ChromeFrame>
        </Specimen>

        <Specimen
          id="shell-scroll-to-top"
          name="ScrollToTop"
          source="@/components/shell/scroll-to-top"
          description="Floating button that appears after 400px of scroll and sits above the footer. Mounted once in the root layout. The live instance is on this page; scroll down to see it."
        >
          <InertDemo>
            <ChromeFrame height={160}>
              <ScrollToTop forceVisible />
            </ChromeFrame>
          </InertDemo>
        </Specimen>
      </GallerySection>

      <GallerySection
        id="ui"
        title="Components · UI"
        intro="Reusable-everywhere primitives with no page, route, or schema assumptions."
        mapsTo="Components → UI"
      >
        <SpecimenGroup title="Controls / Actions">
          <Specimen
            id="ui-button"
            name="Button"
            source="@/components/ui/controls/button"
            description="Primary action and link control; used for CTAs and actions across the site."
            headingLevel={4}
          >
            <InertDemo>
              <div className="grid grid-cols-1 gap-[var(--spacing-xl)] sm:grid-cols-2">
                {buttonVariants.map((v) => (
                  <div
                    key={v.token}
                    className="flex flex-col items-start gap-[var(--spacing-sm)]"
                  >
                    <div className="py-[var(--spacing-xs)]">{v.render}</div>
                    <span className="mono-anchor">button · {v.token}</span>
                    <span className="body-caption">{v.spec}</span>
                  </div>
                ))}
              </div>
            </InertDemo>
          </Specimen>

          <Specimen
            id="ui-theme-selector"
            name="ThemeSelector"
            source="@/components/ui/controls/theme-selector"
            description="The three-option theme control (system / light / dark). Two variants from one file: a collapsed pill that expands on hover or keyboard focus (pill nav) and an always-expanded inline row (mobile menu + this page's header)."
            headingLevel={4}
          >
            <div className="flex flex-wrap items-start gap-[var(--spacing-2xl)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Pill (hover to expand)</span>
                <InertDemo className="flex">
                  <PillThemeSelector />
                </InertDemo>
              </div>
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Inline</span>
                <InertDemo className="flex">
                  <InlineThemeSelector />
                </InertDemo>
              </div>
            </div>
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Links">
          <Specimen
            id="ui-link-pill"
            name="LinkPill"
            source="@/components/ui/links/link-pill"
            description="Compact pill link with a leading icon; used for external and social links."
            headingLevel={4}
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
            source="@/components/ui/links/copy-link"
            description="Inline value with a copy-to-clipboard affordance; used for the contact email. The call site sets the tap area: at least 24px tall, never overlapping a neighbouring control."
            headingLevel={4}
          >
            <CopyLink
              value="hello@example.com"
              className="-my-[var(--spacing-xs)] py-[var(--spacing-xs)]"
            />
          </Specimen>

          <Specimen
            id="ui-breadcrumbs"
            name="Breadcrumbs"
            source="@/components/ui/links/breadcrumbs"
            description="Location trail above the page title on Project Detail and Blog Post. Ancestors link; the trailing segment is the current page and is not a link. Selection is suppressed: it is chrome."
            spec="support-meta · ink-muted, current page ink · / separator · accent on ancestor hover"
            headingLevel={4}
          >
            <div className="flex flex-col gap-[var(--spacing-xl)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Project trail</span>
                <Breadcrumbs
                  trail={[
                    { name: "Home", href: "#ui-breadcrumbs" },
                    { name: "Work", href: "#ui-breadcrumbs" },
                    {
                      name: "Evaluating Masked Autoencoders for Computer Vision",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Longest project title</span>
                <Breadcrumbs
                  trail={[
                    { name: "Home", href: "#ui-breadcrumbs" },
                    { name: "Work", href: "#ui-breadcrumbs" },
                    {
                      name: "The agent that writes, illustrates, and ships this portfolio",
                    },
                  ]}
                />
              </div>
            </div>
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Display">
          <Specimen
            id="ui-heading"
            name="Heading"
            source="@/components/ui/display/heading"
            description="Maps a heading level (h1–h6) to a semantic type token, keeping level (a11y) and visual style decoupled. Used by the page headers on home, about, work, and 404. The six type values are in Foundations → Typography; demoed at level 4 below."
            headingLevel={4}
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
            id="ui-tag"
            name="Tag"
            source="@/components/ui/display/tag"
            description="Mono uppercase metadata chip; labels stack and topic tags on cards and project pages."
            spec="mono uppercase chip · surface-tag · radius-sm"
            headingLevel={4}
          >
            <div className="flex flex-wrap gap-[var(--spacing-xs)]">
              <Tag>PyTorch</Tag>
              <Tag>Next.js</Tag>
              <Tag>Computer Vision</Tag>
            </div>
          </Specimen>

          <Specimen
            id="ui-copyable-code"
            name="CopyableCode"
            source="@/components/ui/display/copyable-code"
            description="Inline code with a copy button; used for shell and install commands."
            headingLevel={4}
          >
            <CopyableCode
              value="npm install"
              ariaLabel="Copy install command"
            />
          </Specimen>

          <Specimen
            id="ui-popover"
            name="Popover"
            source="@/components/ui/display/popover"
            description="Hover-, focus- and tap-revealed detail attached to a compact mark: name on line one, location or role on line two. Opens below the mark, or above it when there is no room below, aligned to its outer edge, and appears instantly. The panel is portaled, so it is never clipped by its container. The trigger is a real button, or a link when it has an href: hover or focus reveals, click follows, and on touch the first tap reveals and the second follows (this page cancels link clicks, so the link specimen reveals only)."
            spec="surface-elevated · hairline · radius-sm · body-caption · z-popover (45) · 44×44 hit area"
            headingLevel={4}
          >
            <div className="flex flex-col gap-[var(--spacing-md)]">
              <span className="mono-anchor">
                Start-aligned, button · end-aligned, with a link
              </span>
              <div className="flex items-center justify-between gap-[var(--spacing-md)] rounded-[var(--radius-md)] bg-[var(--surface-deep)] p-[var(--spacing-md)]">
                <Popover
                  label="Sample logo A"
                  description={
                    <PopoverDescription
                      name="Sample Institute"
                      detail="Stockholm, Sweden"
                    />
                  }
                  align="start"
                >
                  <span className="relative block h-10 w-10 overflow-hidden rounded-full border border-[var(--hairline)] bg-white">
                    <Image
                      src="/design-system/samples/logo-a.svg"
                      alt=""
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </span>
                </Popover>
                <Popover
                  label="Sample Two"
                  description={
                    <PopoverDescription
                      name="Sample Two"
                      detail="Sample role"
                    />
                  }
                  align="end"
                  href="https://example.com"
                >
                  <Image
                    src="/design-system/samples/avatar-b.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full border border-[var(--hairline)] object-cover"
                    unoptimized
                  />
                </Popover>
              </div>
            </div>
          </Specimen>

          <Specimen
            id="ui-lightbox"
            name="Lightbox"
            source="@/components/ui/display/lightbox"
            description="Full-size view of a figure whose detail exceeds the reading column. The media box is the trigger: a button with a zoom-in cursor and the focus ring, no icon. Opens a modal over a surface backdrop with the caption beneath the image: a raster never renders larger than its natural size, while a vector diagram scales to fit. Traps focus, locks scroll, and closes on Esc, a backdrop click or the close button, returning focus to the trigger. The open transition is opacity-only and instant under reduced motion. Figure, Diagram and DiagramPanel carry it; cards and heroes do not."
            spec="surface at 95% · 44×44 close button, 20px icon · z-lightbox (70) · opacity on duration-base"
            headingLevel={4}
          >
            <div className="w-full sm:w-1/2">
              <LightboxTrigger
                src="/design-system/samples/figure.svg"
                alt="Neutral sample image, opened at full size"
                caption="Lightbox: the vector figure scaled to fit, caption beneath"
              >
                <span className="relative block aspect-video w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)]">
                  <Image
                    src="/design-system/samples/figure.svg"
                    alt="Neutral sample image, opened at full size"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </span>
              </LightboxTrigger>
            </div>
          </Specimen>

          <Specimen
            id="ui-related"
            name="Related"
            source="@/components/ui/display/related"
            description="Curated next reads at the end of a long-form page: up to 3 items mixing projects and posts, each a type label, title and one-line summary. Renders its own H2 and nothing at all when given no items. Stacked through tablet, three columns from lg."
            spec="mono-anchor H2 · full-width hairline above the list, and between stacked items below lg · title underlines on hover"
            headingLevel={4}
          >
            <div className="flex flex-col gap-[var(--spacing-2xl)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Three mixed items</span>
                <Related
                  items={[
                    {
                      kind: "project",
                      title:
                        "Evaluating Masked Autoencoders for Computer Vision",
                      summary:
                        "Reconstruction-based pretraining measured against supervised baselines on a small labelled set.",
                      href: "#ui-breadcrumbs",
                    },
                    {
                      kind: "post",
                      title: "What a measurement overturned",
                      summary:
                        "Three decisions that looked settled until the data said otherwise.",
                      href: "#ui-tag",
                    },
                    {
                      kind: "project",
                      title:
                        "The agent that writes, illustrates, and ships this portfolio",
                      summary:
                        "A four-skill pipeline that turns a research report and a repository into a finished case study page.",
                      href: "#ui-related",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">One item</span>
                {/* Inert: a second live region named "Related" would duplicate the one above. */}
                <div inert>
                  <Related
                    items={[
                      {
                        kind: "post",
                        title: "What a measurement overturned",
                        summary:
                          "Three decisions that looked settled until the data said otherwise.",
                        href: "#ui-tag",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Specimen>
        </SpecimenGroup>
      </GallerySection>

      <GallerySection
        id="document"
        title="Components · Document"
        intro="Components composed by authors inside MDX content bodies, rendered on the page background as in a work page."
        mapsTo="Components → Document"
      >
        <SpecimenGroup title="Annotations">
          <Specimen
            id="mdx-callout"
            name="Callout"
            source="@/components/mdx/callout"
            description="Accent-bordered aside for notes inside MDX deep-dives."
            headingLevel={4}
          >
            <Callout title="Note">
              A short aside with an accent left-border and raised fill.
            </Callout>
          </Specimen>

          <Specimen
            id="mdx-highlight"
            name="Highlight"
            source="@/components/mdx/highlight"
            description="Editorial pull-quote panel for a key insight inside MDX content."
            headingLevel={4}
          >
            <Highlight heading="Key insight">
              An editorial pull-quote panel: elevation via border and raised
              fill, no shadow.
            </Highlight>
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Figures & Media">
          <Specimen
            id="mdx-figure"
            name="Figure"
            source="@/components/mdx/figure"
            description="Bordered image with object-cover and an optional caption."
            headingLevel={4}
          >
            <Figure
              src="/design-system/samples/figure.svg"
              alt="Neutral sample image"
              caption="Figure: object-cover in a bordered, radius-md frame"
            />
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Diagrams & Charts">
          <Specimen
            id="mdx-diagram"
            name="Diagram"
            source="@/components/mdx/diagram"
            description="Like Figure but object-contain on a sunken surface, for technical diagrams."
            headingLevel={4}
          >
            <Diagram
              src="/design-system/samples/diagram.svg"
              alt="Neutral sample input–model–output diagram"
              caption="Diagram: object-contain on a neutral field"
            />
          </Specimen>

          <Specimen
            id="mdx-figure-width"
            name="Figure width scale"
            source="@/components/mdx/figure-width"
            description="One width prop shared by Figure, Diagram and DiagramRow. default fills the column; xs–xl centre and cap the figure; wide caps at 960px. Shown here on Diagram."
            spec="xs 380 · sm 460 · md 560 · lg 640 · xl 720 · wide 960"
            headingLevel={4}
          >
            {FIGURE_WIDTHS.map(({ width, px }) => (
              <Diagram
                key={width}
                src="/design-system/samples/diagram.svg"
                alt={`Neutral sample diagram at the ${width} width`}
                caption={`width="${width}" · ${px}px`}
                width={width}
              />
            ))}
          </Specimen>

          <Specimen
            id="mdx-diagram-row"
            name="DiagramRow · DiagramPanel"
            source="@/components/mdx/diagram-row"
            description="Two or three labelled panels in a row."
            headingLevel={4}
          >
            <DiagramRow caption="DiagramRow: two labelled panels">
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

          <Specimen
            id="mdx-side-by-side"
            name="SideBySide"
            source="@/components/mdx/side-by-side"
            description="A figure beside the table it summarises: stacked below md, two equal columns vertically centred from md. The figure keeps its own width; its block margin is dropped."
            spec="stacked gap spacing-lg · md: 2 columns, gap spacing-xl, items centred · margin spacing-2xl"
            headingLevel={4}
          >
            {/* Through MDX, so the table takes the same registry wrapper and prose styling as content. */}
            <div className="prose-content">
              <MDXRemote
                source={SAMPLE_SIDE_BY_SIDE_MDX}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Code">
          <Specimen
            id="mdx-code-block"
            name="CodeBlock"
            source="@/components/mdx/code-block"
            description="Build-time Shiki highlighting (dual-theme, vitesse) via the same MDX pipeline as content — the pre maps to CodeBlock."
            headingLevel={4}
          >
            {/* Wrapped in prose-content: the Shiki dual-theme colouring CSS that maps the
                emitted --shiki-light/dark vars to actual colours is scoped to .prose-content. */}
            <div className="prose-content">
              <MDXRemote
                source={SAMPLE_CODE_MDX}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      [
                        rehypeShiki,
                        {
                          themes: {
                            light: "vitesse-light",
                            dark: "vitesse-dark",
                          },
                          defaultColor: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </Specimen>
        </SpecimenGroup>
      </GallerySection>
    </>
  );
}
