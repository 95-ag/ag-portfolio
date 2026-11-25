import rehypeShiki from "@shikijs/rehype";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { GitHubIcon } from "@/components/icons/brands/github";
import { EastIcon } from "@/components/icons/material/east";
import { MailIcon } from "@/components/icons/material/mail";
import { NorthEastIcon } from "@/components/icons/material/north-east";
import { Callout } from "@/components/mdx/callout";
import { Clip } from "@/components/mdx/clip";
import { Diagram } from "@/components/mdx/diagram";
import { DiagramPanel, DiagramRow } from "@/components/mdx/diagram-row";
import { Figure } from "@/components/mdx/figure";
import type { FigureWidth } from "@/components/mdx/figure-width";
import { Highlight } from "@/components/mdx/highlight";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ScreenCarousel, ScreenSlide } from "@/components/mdx/screen-carousel";
import { Footer } from "@/components/shell/footer";
import { LogoMark } from "@/components/shell/logo-mark";
import { NavView } from "@/components/shell/nav";
import { PageName } from "@/components/shell/page-name";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { Button } from "@/components/ui/controls/button";
import { CopyButton } from "@/components/ui/controls/copy-button";
import { EmailButton } from "@/components/ui/controls/email-button";
import { CopyableCode } from "@/components/ui/display/copyable-code";
import { ErrorScreen } from "@/components/ui/display/error-screen";
import { Heading } from "@/components/ui/display/heading";
import { LightboxTrigger } from "@/components/ui/display/lightbox";
import { Popover, PopoverDescription } from "@/components/ui/display/popover";
import { Related } from "@/components/ui/display/related";
import { Tag } from "@/components/ui/display/tag";
import { Breadcrumbs } from "@/components/ui/links/breadcrumbs";
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
    token: "default",
    spec: "44px pill · 1px ink outline · ink label · hover fills ink, label surface",
    render: <Button>Button</Button>,
  },
  {
    token: "leading icon",
    spec: "one 18px icon, spacing-sm from the label — before it for back, action or kind (refresh, download)",
    render: <Button icon={<MailIcon size={18} />}>Leading icon</Button>,
  },
  {
    token: "filled",
    spec: "44px pill · ink fill · surface label · hover fills accent — the screen's one primary action",
    render: <Button variant="filled">Filled</Button>,
  },
  {
    token: "filled, icon after",
    spec: "navigation: the east arrow after the label (See Projects, View project)",
    render: (
      <Button
        variant="filled"
        iconPosition="trailing"
        icon={<EastIcon size={18} />}
      >
        Filled with icon
      </Button>
    ),
  },
  {
    token: "trailing icon",
    spec: "after the label where the control navigates or opens a new tab or mail",
    render: (
      <Button iconPosition="trailing" icon={<NorthEastIcon size={18} />}>
        Trailing icon
      </Button>
    ),
  },
  {
    token: "EmailButton (cue: full)",
    spec: "the address as the label, the north_east icon trailing, then the outline draw and the accent sheen twice once 60% in view; hover or focus stops it; nothing under reduced motion",
    render: <EmailButton address="hello@example.com" />,
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
          name="Nav"
          source="@/components/shell/nav"
          description="One navigation surface in three states: a plain row from 861px, the frosted round button it collapses into after 80px of scroll (and the only form at 860px and below), and the card the button opens into."
          points={[
            "Shown here in bounded frames; the live nav is on this page.",
          ]}
        >
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            <ChromeFrame height={96} inert>
              <NavView
                pathname="/work"
                collapsed={false}
                open={false}
                wide
                showWriting
              />
            </ChromeFrame>
            <ChromeFrame height={96} inert>
              <NavView
                pathname="/work"
                collapsed
                open={false}
                wide
                showWriting
              />
            </ChromeFrame>
            <ChromeFrame height={260} inert>
              <NavView
                pathname="/work"
                collapsed
                open
                wide={false}
                showWriting
              />
            </ChromeFrame>
          </div>
        </Specimen>

        <Specimen
          id="shell-page-name"
          name="PageName"
          source="@/components/shell/page-name"
          description="The site's name in the top-left corner of every page, level with the nav; it scrolls away and links Home."
          points={[
            "Shown here in a bounded frame; the live one is at the top of this page.",
          ]}
        >
          <ChromeFrame height={96} inert>
            <PageName />
          </ChromeFrame>
        </Specimen>

        <Specimen
          id="shell-logomark"
          name="LogoMark"
          source="@/components/shell/logo-mark"
          description="Route-aware cat logomark in the nav row and the menu card: sitting on Home, stretching everywhere else."
          points={[
            "Crossing the Home boundary zooms into the cat's face, cuts to the other pose's matching face and zooms out; hovering in the nav row shows the current pose's full body.",
            "Shown here static, one per pose.",
          ]}
        >
          <div inert className="flex items-center gap-[var(--spacing-xl)]">
            <figure className="flex flex-col items-center gap-[var(--spacing-xs)]">
              <LogoMark animated={false} pathname="/" />
              <figcaption className="support-meta">Home — sitting</figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-[var(--spacing-xs)]">
              <LogoMark animated={false} pathname="/work" />
              <figcaption className="support-meta">
                Elsewhere — stretching
              </figcaption>
            </figure>
          </div>
        </Specimen>

        <Specimen
          id="shell-theme-toggle"
          name="ThemeToggle"
          source="@/components/shell/theme-toggle"
          description="The floating Light / Dark toggle at the bottom-left corner — scroll-to-top's twin."
          points={[
            "Two modes, one tap flips, the icon shows the mode it switches to; flipping to the theme the system already has hands the choice back to the system.",
            "Shown on the dev server and previews (site-wide) and on this page in production (page-only).",
            "Framed here at its resting position.",
          ]}
        >
          <ChromeFrame height={140} inert>
            <ThemeToggle mode="page" contained />
          </ChromeFrame>
        </Specimen>

        <Specimen
          id="shell-footer"
          name="Footer"
          source="@/components/shell/footer"
          description="Site-wide footer on the 1440 box: © year and name, the social and feed icons, and Credits, Stylebook and Source."
          points={[
            "One row from md; stacked icons, links, © on phones.",
            "In document flow.",
          ]}
        >
          <ChromeFrame inert>
            <Footer showFeed />
          </ChromeFrame>
        </Specimen>

        <Specimen
          id="shell-scroll-to-top"
          name="ScrollToTop"
          source="@/components/shell/scroll-to-top"
          description="Frosted circle at the bottom-right corner that appears after 400px of scroll on long pages and sits above the footer."
          points={[
            "Not shown on Home, About, 404 and error pages (they mark their root data-scroll-top=off).",
            "Mounted once in the root layout; the live instance is on this page.",
          ]}
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
            description="Committed action control: an outline pill or a filled ink pill, both 44px, with exactly one optional icon."
            points={[
              "The outline carries the attention cue; the filled pill, the screen's one primary action, has none and takes the accent on hover.",
              "Used for the email actions on Home and About and the 404 and error actions.",
              "Links such as Resume are LinkPills.",
            ]}
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
            id="ui-copy-button"
            name="CopyButton"
            source="@/components/ui/controls/copy-button"
            description="Icon-only control that copies a value: the email address beside the About email action. On copy the icon turns to a check in the accent for 1500ms, then reverts; its name reads Copy email, then Email copied."
            spec="44×44 target (48×48 from xl) · no border or fill · 24px icon ink-muted, hover accent · focus ring"
            headingLevel={4}
          >
            <InertDemo>
              <CopyButton value="hello@example.com" label="email" />
            </InertDemo>
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Links">
          <Specimen
            id="ui-link-pill"
            name="LinkPill"
            source="@/components/ui/links/link-pill"
            description="Compact pill link; carries a leading kind icon, a trailing new-tab icon, both or neither. Used for external and social links."
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
              <LinkPill href="#ui-link-pill">Bare link</LinkPill>
              <LinkPill href="#ui-link-pill" external>
                Bare external
              </LinkPill>
            </div>
          </Specimen>

          <Specimen
            id="ui-breadcrumbs"
            name="Breadcrumbs"
            source="@/components/ui/links/breadcrumbs"
            description="Location trail above the page title on a Post; a project page shows none."
            points={[
              "Ancestors link; the trailing segment is the current page and is not a link.",
              "Selection is suppressed: it is chrome.",
            ]}
            spec="support-meta · ink-muted, current page ink · / separator · accent on ancestor hover"
            headingLevel={4}
          >
            <div className="flex flex-col gap-[var(--spacing-xl)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Post trail</span>
                <Breadcrumbs
                  trail={[
                    { name: "Home", href: "#shell" },
                    { name: "Writing", href: "#ui-breadcrumbs" },
                    {
                      name: "What TV Time got right",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="mono-anchor">Longest post title</span>
                <Breadcrumbs
                  trail={[
                    { name: "Home", href: "#shell" },
                    { name: "Writing", href: "#ui-breadcrumbs" },
                    {
                      name: "A long post title that has to wrap along the trail without breaking the page layout",
                    },
                  ]}
                />
              </div>
            </div>
          </Specimen>
        </SpecimenGroup>

        <SpecimenGroup title="Display">
          <Specimen
            id="ui-error-screen"
            name="ErrorScreen"
            source="@/components/ui/display/error-screen"
            description="The 404 and the route-level error share one single-screen layout: eyebrow, display H1, lead, a filled primary action and Go Home (the cat after the label)."
            points={[
              "On a window under 760px tall its spacing tightens so the screen still fits.",
              "Framed here at a fixed height.",
            ]}
            headingLevel={4}
          >
            <ChromeFrame height={520} inert>
              <div className="flex h-full flex-col">
                <ErrorScreen
                  isPage={false}
                  eyebrow="404"
                  title="This page doesn’t exist — but my work does."
                  lead="You might have followed a broken link or mistyped the URL. Either way, there’s nothing here."
                  primary={
                    <Button
                      variant="filled"
                      href="#ui-error-screen"
                      iconPosition="trailing"
                      icon={<EastIcon size={18} />}
                    >
                      See Projects
                    </Button>
                  }
                />
              </div>
            </ChromeFrame>
          </Specimen>

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
            description="A plain mono uppercase label: no fill, no padding, no shape. It takes the colour of its context: a project's ink on cards and in the spotlight, the page colour on detail pages, the accent on About's capabilities."
            spec="insight-label · currentColor"
            headingLevel={4}
          >
            <div className="flex flex-wrap gap-x-[var(--spacing-md)] text-[var(--accent)]">
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
            description="Hover-, focus- and tap-revealed detail attached to a compact mark: name on line one, location or role on line two."
            points={[
              "Opens below the mark, or above it when there is no room below, aligned to its outer edge, and appears instantly.",
              "The panel is portaled, so it is never clipped by its container.",
              "The trigger is a real button, or a link when it has an href: hover or focus reveals, click follows, and on touch the first tap reveals and the second follows (this page cancels link clicks, so the link specimen reveals only).",
            ]}
            spec="surface-elevated · hairline · radius-xs · body-caption · z-popover (45) · 44×44 hit area"
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
            description="Full-size view of a figure whose detail exceeds the reading column."
            points={[
              "The media box is the trigger: a button with a zoom-in cursor and the focus ring, no icon.",
              "Opens a modal over a surface backdrop with the caption beneath the image: a raster never renders larger than its natural size, while a vector diagram scales to fit.",
              "Traps focus, locks scroll, and closes on Esc, a backdrop click or the close button, returning focus to the trigger.",
              "The open transition is opacity-only and instant under reduced motion.",
              "Figure, Diagram and DiagramPanel carry it; cards and heroes do not.",
            ]}
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
            description="Curated next reads at the end of a long-form page: up to 3 items mixing projects and posts, each a type label, title and one-line summary."
            points={[
              "Renders its own H2 and nothing at all when given no items.",
              "Stacked through tablet, three columns from lg.",
            ]}
            spec="mono-anchor H2 · full-width hairline above the list, and between stacked items below lg · title underlines on hover"
            headingLevel={4}
          >
            <div className="flex flex-col gap-[var(--spacing-2xl)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <span className="body-caption">Three mixed items</span>
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
                <span className="body-caption">One item</span>
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
          <Specimen
            id="mdx-clip"
            name="Clip"
            source="@/components/mdx/clip"
            description="Short screen recording in the Figure frame."
            points={[
              "Poster with native controls; muted, inline, no autoplay or loop, nothing loaded before play.",
              "Takes the figure width scale; no Lightbox.",
            ]}
            headingLevel={4}
          >
            <Clip
              src="/design-system/samples/clip.mp4"
              poster="/design-system/samples/clip-poster.webp"
              alt="Neutral sample clip: a square moving left to right"
              caption="Clip: poster and native controls in a bordered, radius-md frame"
              width="md"
            />
          </Specimen>
          <Specimen
            id="mdx-screen-carousel"
            name="ScreenCarousel"
            source="@/components/mdx/screen-carousel"
            description="App screens paired with the prose that explains them, one ScreenSlide per screen."
            points={[
              "From lg on a window at least 677px tall it pages: the frame grows from 220px to 280px with the window height, with chevrons and position dots.",
              "From lg on a shorter window the screens sit side by side; below lg they stack with the frame half the screen tall.",
              "Resize the window to see each.",
            ]}
            spec={
              "<ScreenSlide image | video poster alt caption?>prose</ScreenSlide>"
            }
            headingLevel={4}
          >
            <div className="prose-content">
              <ScreenCarousel label="Sample screens">
                <ScreenSlide
                  image="/design-system/samples/screen-1.svg"
                  alt="Neutral sample phone screen"
                  caption="A full phone screen fills the frame"
                >
                  <p>
                    Each slide pairs one screen with the prose that explains it,
                    so the reader looks from the text to the screen without
                    scrolling.
                  </p>
                </ScreenSlide>
                <ScreenSlide
                  image="/design-system/samples/screen-2.svg"
                  alt="Neutral sample screen, shorter than a full phone"
                  caption="A shorter screen sits at the top of the frame"
                >
                  <p>
                    Every screen takes the same frame, so paging never resizes
                    the carousel.
                  </p>
                </ScreenSlide>
                <ScreenSlide
                  video="/design-system/samples/clip.mp4"
                  poster="/design-system/samples/clip-poster.webp"
                  alt="Neutral sample clip: a square moving left to right"
                  caption="A clip plays as Clip does; with no prose, the frame centres"
                />
              </ScreenCarousel>
            </div>
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
            description="One width prop shared by Figure, Clip, Diagram and DiagramRow. default fills the column; xs–xl centre and cap the figure; wide caps at 960px. Shown here on Diagram."
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
            description="Build-time Shiki highlighting (dual-theme, light-plus / dark-plus) via the same MDX pipeline as content — the pre maps to CodeBlock."
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
                            light: "light-plus",
                            dark: "dark-plus",
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
