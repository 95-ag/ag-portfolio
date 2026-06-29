import rehypeShiki from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { GitHubIcon } from "@/components/icons/brands/github";
import { MailIcon } from "@/components/icons/material/mail";
import { Callout } from "@/components/mdx/callout";
import { Diagram } from "@/components/mdx/diagram";
import { DiagramPanel, DiagramRow } from "@/components/mdx/diagram-row";
import { Figure } from "@/components/mdx/figure";
import { Highlight } from "@/components/mdx/highlight";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Footer } from "@/components/shell/footer";
import { MobileNavPanel } from "@/components/shell/mobile-nav";
import { PillNav } from "@/components/shell/pill-nav";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/ui/copy-link";
import { CopyableCode } from "@/components/ui/copyable-code";
import { Heading } from "@/components/ui/heading";
import { LinkPill } from "@/components/ui/link-pill";
import { Tag } from "@/components/ui/tag";
import {
  InlineThemeSelector,
  PillThemeSelector,
} from "@/components/ui/theme-selector";
import {
  GallerySection,
  Specimen,
  SpecimenGroup,
} from "../scaffold-kit/catalog";
import { ChromeFrame } from "../scaffold-kit/chrome-frame";
import { InertDemo } from "../scaffold-kit/click-guards";

// Rendered through the real MDX + Shiki pipeline (not hand-fed) so the highlighting matches a real
// content code fence.
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
          <ChromeFrame height={120} ariaHidden>
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
            <ChromeFrame height={420} ariaHidden>
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
          description="Site-wide footer: copyright, repo link, social icons. Full-width, in document flow."
        >
          <ChromeFrame ariaHidden>
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
            source="@/components/ui/button"
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
            source="@/components/ui/theme-selector"
            description="The three-option theme control (system / light / dark). Two variants from one file: a collapsed pill that expands on hover (pill nav) and an always-expanded inline row (mobile menu + this page's header)."
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
            source="@/components/ui/link-pill"
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
            source="@/components/ui/copy-link"
            description="Inline value with a copy-to-clipboard affordance; used for the contact email."
            headingLevel={4}
          >
            <CopyLink value="hello@example.com" />
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Display">
          <Specimen
            id="ui-heading"
            name="Heading"
            source="@/components/ui/heading"
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
            source="@/components/ui/tag"
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
            source="@/components/ui/copyable-code"
            description="Inline code with a copy button; used for shell and install commands."
            headingLevel={4}
          >
            <CopyableCode
              value="npm install"
              ariaLabel="Copy install command"
            />
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
