import { GitHubIcon } from "@/components/icons/brands/github";
import { LinkedInIcon } from "@/components/icons/brands/linkedin";
import { ArticleIcon } from "@/components/icons/material/article";
import { CheckIcon } from "@/components/icons/material/check";
import { ChevronLeftIcon } from "@/components/icons/material/chevron-left";
import { ChevronRightIcon } from "@/components/icons/material/chevron-right";
import { CloseIcon } from "@/components/icons/material/close";
import { ComputerIcon } from "@/components/icons/material/computer";
import { ContentCopyIcon } from "@/components/icons/material/content-copy";
import { DarkModeIcon } from "@/components/icons/material/dark-mode";
import { DeployedCodeIcon } from "@/components/icons/material/deployed-code";
import { DescriptionIcon } from "@/components/icons/material/description";
import { DownloadIcon } from "@/components/icons/material/download";
import { EastIcon } from "@/components/icons/material/east";
import { FingerprintIcon } from "@/components/icons/material/fingerprint";
import { FolderCodeIcon } from "@/components/icons/material/folder-code";
import { LightModeIcon } from "@/components/icons/material/light-mode";
import { MailIcon } from "@/components/icons/material/mail";
import { MenuIcon } from "@/components/icons/material/menu";
import { NorthIcon } from "@/components/icons/material/north";
import { NorthEastIcon } from "@/components/icons/material/north-east";
import { OpenInNewIcon } from "@/components/icons/material/open-in-new";
import { PauseIcon } from "@/components/icons/material/pause";
import { PlayArrowIcon } from "@/components/icons/material/play-arrow";
import { RefreshIcon } from "@/components/icons/material/refresh";
import { RssFeedIcon } from "@/components/icons/material/rss-feed";
import { SlideshowIcon } from "@/components/icons/material/slideshow";
import { SouthIcon } from "@/components/icons/material/south";
import { StickyNoteIcon } from "@/components/icons/material/sticky-note";
import { WestIcon } from "@/components/icons/material/west";
import { Divider } from "@/components/layout/divider";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Sticky } from "@/components/layout/sticky";
import {
  GallerySection,
  Specimen,
  SpecimenGroup,
} from "../scaffold-kit/catalog";
import {
  type BarItem,
  BarScale,
  DepthGrid,
  type DepthLevel,
  DurationScale,
  type DurationToken,
  EasingCurves,
  type EasingToken,
  type ShapeItem,
  ShapeRow,
  SwatchGrid,
  type SwatchGroup,
  TypeScaleList,
  type TypeToken,
} from "../visualizer-kit";

// Token data mirrors src/styles/theme.css + typography.css — keep in sync.

const PROJECT_COLOUR_SLOTS = Array.from({ length: 12 }, (_, i) => i + 1);

// Slots 1–12 as text (`ink`); the cover roles derive from them (DESIGN.md → Colors → Covers).
const PROJECT_COLOUR_GROUPS: SwatchGroup[] = [
  {
    label: "Project colours · ink",
    tokens: PROJECT_COLOUR_SLOTS.map((n) => ({
      token: `--project-${n}-ink`,
      name: `Slot ${n} Ink`,
      usage: "The colour as text: hover titles, tags, tab bars, page colour",
    })),
  },
];

const POST_HUE_GROUPS: SwatchGroup[] = [
  {
    label: "Post hues",
    note: "Four hues for the twelve post types: short, how-to, long read, critique. Light tiles take the tint; in dark every tile is surface-tag.",
    tokens: (["short", "howto", "long", "critique"] as const).flatMap((g) => [
      {
        token: `--post-${g}-ink`,
        name: `Post ${g} Ink`,
        usage: "Type label, add-on markers",
      },
      {
        token: `--post-${g}-tint`,
        name: `Post ${g} Tint`,
        usage: "Post-tile ground",
        lightOnly: true,
      },
    ]),
    darkNote: (
      <>
        In dark every post tile is{" "}
        <span className="mono-code">surface-tag</span>; only the four inks above
        are defined for dark.
      </>
    ),
  },
];

const COLOR_GROUPS: SwatchGroup[] = [
  {
    label: "Surfaces",
    tokens: [
      {
        token: "--surface",
        name: "Surface",
        usage: "Page ground and default content surface",
      },
      {
        token: "--surface-elevated",
        name: "Surface Elevated",
        usage:
          "Callouts, highlighted panels and marker covers; a gently lifted neutral",
      },
      {
        token: "--surface-deep",
        name: "Surface Deep",
        usage: "Diagram regions and the project detail hero; equals the ground",
      },
      {
        token: "--surface-floating",
        name: "Surface Floating",
        usage:
          "The frosted fill of floating nav and utility surfaces (55% of the ground)",
      },
      {
        token: "--edge-floating",
        name: "Edge Floating",
        usage: "The 1px edge of a frosted surface (ink at 10%)",
      },
      {
        token: "--surface-active",
        name: "Surface Active",
        usage: "Active nav item / selected fill",
      },
      {
        token: "--surface-tag",
        name: "Surface Tag",
        usage: "Neutral control fill: the neutral Button's hover",
      },
    ],
  },
  {
    label: "Text",
    tokens: [
      {
        token: "--ink",
        name: "Ink",
        usage: "Primary text and headings (on page and surfaces)",
      },
      {
        token: "--ink-muted",
        name: "Ink Muted",
        usage: "Secondary text, metadata, captions",
      },
      {
        token: "--ink-lead",
        name: "Ink Lead",
        usage: "The Home hero lead, a cool grey quieter than the headline",
      },
    ],
  },
  {
    label: "Borders",
    tokens: [
      {
        token: "--hairline-strong",
        name: "Hairline Strong",
        usage:
          "Default borders, dividers, the neutral Button outline, the scrollbar thumb",
      },
      {
        token: "--hairline",
        name: "Hairline",
        usage: "Subtle borders and low-contrast dividers",
      },
    ],
  },
  {
    label: "Accent",
    tokens: [
      {
        token: "--accent",
        name: "Accent",
        usage:
          "Links, marks, eyebrows on main pages, focus rings, the email cue's sheen",
      },
      {
        token: "--accent-tint",
        name: "Accent Tint",
        usage: "Hover backgrounds, accent-tinted surfaces",
      },
    ],
  },
  ...PROJECT_COLOUR_GROUPS,
  ...POST_HUE_GROUPS,
  {
    label: "Semantic",
    tokens: [
      {
        token: "--focus-ring",
        name: "Focus Ring",
        usage: "Keyboard :focus-visible ring",
      },
      {
        token: "--text-selection",
        name: "Text Selection",
        usage: "Text-selection highlight",
      },
    ],
  },
];

// Responsive steps mirror the typography.css media overrides (tablet = 769–1279px, mobile = ≤768px);
// only display/heading/lead resize.
const TYPE_TOKENS: TypeToken[] = [
  {
    token: "display-primary",
    family: "Manrope",
    size: 76,
    weight: 600,
    lh: 84,
    sample: "The hero display line, the single largest statement on a page.",
    responsive: { tablet: 52, mobile: 40 },
  },
  {
    token: "display-title",
    family: "Manrope",
    size: 56,
    weight: 600,
    lh: 64,
    sample: "Page titles for project and listing pages, set at display scale.",
    responsive: { tablet: 46, mobile: 36 },
  },
  {
    token: "heading-display",
    family: "Manrope",
    size: 52,
    weight: 600,
    lh: 58,
    sample: "The About page's positioning line.",
    responsive: { tablet: 32, mobile: 32 },
  },
  {
    token: "site-name",
    family: "Manrope",
    size: 24,
    weight: 600,
    lh: 34,
    sample: "Aishwarya Ganesan",
    responsive: { tablet: 20, mobile: 18 },
  },
  {
    token: "heading-section",
    family: "Manrope",
    size: 26,
    weight: 600,
    lh: 34,
    sample: "Secondary section headings within a page.",
    responsive: { tablet: 24, mobile: 24 },
  },
  {
    token: "heading-component",
    family: "Manrope",
    size: 22,
    weight: 600,
    lh: 30,
    sample: "Component-level titles, such as project card headings.",
  },
  {
    token: "heading-narrative",
    family: "Manrope",
    size: 20,
    weight: 600,
    lh: 28,
    sample: "Narrative sub-headings inside long-form deep dives.",
  },
  {
    token: "body-lead",
    family: "Inter",
    size: 24,
    weight: 400,
    lh: 34,
    sample: "Lead paragraph that opens a section at a larger reading size.",
    responsive: { tablet: 20, mobile: 18 },
  },
  {
    token: "body-primary",
    family: "Inter",
    size: 18,
    weight: 400,
    lh: 28,
    sample:
      "Default paragraph copy carries every body section and list item at a comfortable reading size.",
  },
  {
    token: "body-secondary",
    family: "Inter",
    size: 18,
    weight: 400,
    lh: 28,
    sample: "Supporting, muted copy for descriptions and secondary detail.",
  },
  {
    token: "body-emphasis",
    family: "Inter",
    size: 18,
    weight: 500,
    lh: 28,
    sample: "Emphasised body line for callouts and highlighted statements.",
  },
  {
    token: "body-caption",
    family: "Inter",
    size: 14,
    weight: 400,
    lh: 20,
    sample:
      "Caption and metadata text for figures, footnotes, and small print.",
  },
  {
    token: "callout-title",
    family: "Inter",
    size: 16,
    weight: 600,
    lh: 20,
    sample: "The bold title that opens a callout or aside.",
  },
  {
    token: "interactive-label",
    family: "Inter",
    size: 14,
    weight: 500,
    lh: 20,
    sample: "Button and link labels on interactive controls.",
  },
  {
    token: "nav-link",
    family: "Inter",
    size: 14,
    weight: 500,
    lh: 20,
    sample: "Navigation links in the nav row and the menu card.",
  },
  {
    token: "support-meta",
    family: "Inter",
    size: 13,
    weight: 400,
    lh: 20,
    sample: "Supporting metadata such as footer notes and rail labels.",
  },
  {
    token: "mono-anchor",
    family: "JetBrains Mono",
    size: 15,
    weight: 500,
    lh: 20,
    sample: "Mono anchor for section indices and structural markers.",
  },
  {
    token: "insight-label",
    family: "JetBrains Mono",
    size: 13,
    weight: 500,
    lh: 16,
    sample: "Mono label that tags a key insight or pull-quote.",
  },
  {
    token: "mono-code",
    family: "JetBrains Mono",
    size: 16,
    weight: 400,
    lh: 24,
    sample: "Token names, measurements, and scale readouts.",
  },
];

const SPACING_TOKENS: BarItem[] = [
  { token: "xs", px: 4 },
  { token: "sm", px: 8 },
  { token: "md", px: 16 },
  { token: "lg", px: 24 },
  { token: "xl", px: 32 },
  { token: "2xl", px: 48 },
  { token: "3xl", px: 64 },
  { token: "4xl", px: 96 },
  { token: "5xl", px: 128 },
];

// Layout-specific spacing (gutter + responsive page margins) — not part of the geometric xs–5xl scale.
const LAYOUT_SPACING_TOKENS: BarItem[] = [
  { token: "gutter", px: 24 },
  { token: "margin-mobile", px: 20 },
  { token: "margin-tablet", px: 24 },
  { token: "margin-desktop", px: 64 },
];

const RADIUS_TOKENS: ShapeItem[] = [
  {
    token: "none",
    radius: "var(--radius-none)",
    value: "0px",
    usage: "Code blocks, inline code, callouts; sharp containers",
  },
  {
    token: "xs",
    radius: "var(--radius-xs)",
    value: "3px",
    usage:
      "Post tiles, the dog-ear's fold, copyable code chips, the popover panel",
  },
  {
    token: "md",
    radius: "var(--radius-md)",
    value: "8px",
    usage:
      "Headshot, hero images, card and spotlight covers, figures, diagrams, highlights",
  },
  {
    token: "pill",
    radius: "var(--radius-pill)",
    value: "9999px",
    usage:
      "Nav items and button, link pills, scroll-to-top, theme toggle, credits Play / Pause, Button",
  },
];

const DEPTH_LEVELS: DepthLevel[] = [
  {
    name: "Level 0 · Flat",
    spec: "no border, no fill",
    className: "bg-[var(--surface)]",
    usage:
      "Page sections, hero regions, project cards, the Home spotlight, footer",
  },
  {
    name: "Level 1 · Border only",
    spec: "1px hairline",
    className: "bg-[var(--surface)] border border-[var(--hairline)]",
    usage: "Figure frame, prose hr, table cells",
  },
  {
    name: "Level 2 · Frosted",
    spec: "surface-glass: surface-floating (55%) + blur(20px) saturate(170%) + 1px edge-floating",
    className: "surface-glass",
    usage:
      "Nav button and menu card, scroll-to-top, theme toggle, credits Play / Pause",
  },
  {
    name: "Level 3 · Border + raised",
    spec: "surface-elevated + 1px hairline",
    className: "bg-[var(--surface-elevated)] border border-[var(--hairline)]",
    usage: "<Highlight>",
  },
  {
    name: "Level 4 · Sunken inset",
    spec: "surface-deep + 1px hairline (borderless when nested)",
    className: "bg-[var(--surface-deep)] border border-[var(--hairline)]",
    usage: "<Diagram> / <DiagramRow>, the project detail hero",
  },
  {
    name: "Level 5 · Accent left + raised",
    spec: "2px accent (left) + surface-elevated",
    className: "bg-[var(--surface-elevated)] border-l-2 border-[var(--accent)]",
    usage: "<Callout>, prose blockquote",
  },
  {
    name: "Level 6 · Tinted tile",
    spec: "the post group's tint in light, surface-tag in dark; no border",
    className: "bg-[var(--post-long-tint,var(--surface-tag))]",
    usage: "Post tiles",
  },
];

const DURATION_TOKENS: DurationToken[] = [
  { token: "--duration-fast", ms: 150 },
  { token: "--duration-base", ms: 200 },
  { token: "--duration-slow", ms: 300 },
];

const EASING_TOKENS: EasingToken[] = [
  { token: "--ease-standard", curve: [0.2, 0, 0, 1] },
  { token: "--ease-emphasis", curve: [0.3, 0, 0, 1] },
];

type IconEntry = { name: string; Icon: React.ComponentType<{ size?: number }> };

const MATERIAL_ICONS: IconEntry[] = [
  { name: "West", Icon: WestIcon },
  { name: "South", Icon: SouthIcon },
  { name: "East", Icon: EastIcon },
  { name: "NorthEast", Icon: NorthEastIcon },
  { name: "North", Icon: NorthIcon },
  { name: "Article", Icon: ArticleIcon },
  { name: "Check", Icon: CheckIcon },
  { name: "ChevronLeft", Icon: ChevronLeftIcon },
  { name: "ChevronRight", Icon: ChevronRightIcon },
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
  { name: "Refresh", Icon: RefreshIcon },
  { name: "PlayArrow", Icon: PlayArrowIcon },
  { name: "Pause", Icon: PauseIcon },
  { name: "RssFeed", Icon: RssFeedIcon },
  { name: "Slideshow", Icon: SlideshowIcon },
  { name: "StickyNote", Icon: StickyNoteIcon },
];

const BRAND_ICONS: IconEntry[] = [
  { name: "GitHub", Icon: GitHubIcon },
  { name: "LinkedIn", Icon: LinkedInIcon },
];

const ICON_SIZES = [
  {
    px: 72,
    label: "72px",
    context:
      "ScreenCarousel previous / next chevrons (the glyph draws about 36px tall)",
  },
  {
    px: 24,
    label: "24px",
    context:
      "Icon-only circles: scroll-to-top, theme toggle, the spotlight hover arrow, the copy button",
  },
  {
    px: 20,
    label: "20px",
    context: "Play / Pause and the nav menu icon; footer social icons",
  },
  { px: 18, label: "18px", context: "Buttons (outline and filled)" },
  {
    px: 16,
    label: "16px",
    context:
      "Nav items, LinkPill icons, link arrows, the small post tile arrow",
  },
  {
    px: 12,
    label: "12–14px",
    context: "Inline indicators (the new-tab icon)",
  },
];

// The standalone-control size; used for the catalog grids (icons not in a button/nav context).
const ICON_GRID_SIZE = 20;

const GRID_CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function FoundationsSections() {
  return (
    <>
      <GallerySection
        id="colors"
        title="Foundations · Colors"
        mapsTo="Foundations → Colors"
        source="src/styles/theme.css → :root / [data-theme]"
        intro="Neutrals, one site accent, the twelve project colours and the four post hues, each resolving to the live theme. There is no second accent; a project or post page lifts its own colour slot into the accent family."
      >
        <SwatchGrid groups={COLOR_GROUPS} />
      </GallerySection>

      <GallerySection
        id="typography"
        title="Foundations · Typography"
        mapsTo="Foundations → Typography"
        source="src/styles/typography.css"
        intro="Eighteen semantic type tokens, each fixing a family, size, weight, and line-height for one role. Dark theme applies grayscale font-smoothing so weight hierarchy holds."
      >
        <TypeScaleList tokens={TYPE_TOKENS} />
      </GallerySection>

      <GallerySection
        id="prose"
        title="Foundations · Prose"
        mapsTo="Foundations → Prose"
        source="src/styles/prose.css → .prose-content"
        intro="Base editorial styling for rendered MDX bodies: headings, paragraphs, lists, links, inline code, blockquote, tables, and rules."
      >
        <div className="prose-content [&>*:first-child]:mt-0">
          <h3>A heading in prose</h3>
          <h4>A narrative subhead</h4>
          <p>
            Body copy with a <a href="#ds-prose">link</a>, some{" "}
            <strong>strong emphasis</strong>, and <code>inline code</code>.
            Paragraphs hold the reading-column measure and rhythm.
          </p>
          <ul>
            <li>An unordered list item with an accent marker.</li>
            <li>A second item.</li>
          </ul>
          <ol>
            <li>An ordered list item.</li>
            <li>A second ordered item.</li>
          </ol>
          <blockquote>
            A blockquote, an aside set off from the body copy.
          </blockquote>
          <table>
            <thead>
              <tr>
                <th>Column</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Row label</td>
                <td>A cell value</td>
              </tr>
              <tr>
                <td>Another row</td>
                <td>A second value</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <p>Body text following a horizontal rule.</p>
        </div>
      </GallerySection>

      <GallerySection
        id="spacing"
        title="Foundations · Spacing"
        mapsTo="Foundations → Spacing"
        source="--spacing-*"
        intro="A strict 4px base scale. Every padding, margin, gap, and section rhythm steps geometrically from 4px to 128px."
      >
        <div className="flex flex-col gap-[var(--spacing-xl)]">
          <BarScale items={SPACING_TOKENS} varPrefix="--spacing-" />
          <div className="flex flex-col gap-[var(--spacing-md)]">
            <span className="mono-anchor">Layout spacing</span>
            <BarScale items={LAYOUT_SPACING_TOKENS} varPrefix="--spacing-" />
          </div>
        </div>
      </GallerySection>

      <GallerySection
        id="shapes"
        title="Foundations · Shapes"
        mapsTo="Foundations → Shapes"
        source="--radius-*"
        intro="Four radius categories, from sharp structural containers through tiles and small chips and media surfaces to a full pill for floating and link controls."
      >
        <ShapeRow items={RADIUS_TOKENS} />
      </GallerySection>

      <GallerySection
        id="elevation"
        title="Foundations · Elevation & Depth"
        mapsTo="Foundations → Elevation & Depth"
        source="DESIGN.md → Elevation & Depth"
        intro="Depth without shadow. Seven levels built from tonal surface layering, subtle borders and a tinted tile fill in light."
      >
        <DepthGrid levels={DEPTH_LEVELS} />
      </GallerySection>

      <GallerySection
        id="motion"
        title="Foundations · Motion"
        mapsTo="Foundations → Motion & Interaction"
        source="--duration-* / --ease-*"
        intro="Three durations and two easing curves, used sparingly. Every animation is gated on prefers-reduced-motion."
      >
        <SpecimenGroup title="Durations">
          <DurationScale items={DURATION_TOKENS} />
        </SpecimenGroup>
        <SpecimenGroup title="Easing">
          <EasingCurves items={EASING_TOKENS} />
        </SpecimenGroup>
      </GallerySection>

      <GallerySection
        id="layout"
        title="Foundations · Layout"
        mapsTo="Foundations → Layout"
        intro="Structural and spacing primitives. Stack, Grid, and Divider render live; the page-shaping wrappers (Container, Section, Sticky) shape this page directly."
      >
        <Specimen
          id="layout-container"
          name="Container"
          source="@/components/layout/container"
          description="Two widths. default: a 1200px box. cap: the 1440px content box with the page margin each side — Home, About, Work and Writing. Padding is the page margin on both: 20px to 767px, 24px from 768px, 64px from 1280px. The corners (name, nav, scroll-to-top, theme toggle) stand on the 1440 box on every page."
        >
          <table className="body-caption w-full">
            <thead>
              <tr className="text-left">
                <th>Window</th>
                <th>Page margin</th>
                <th>cap content width</th>
                <th>Corner offset</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>390</td>
                <td>20px</td>
                <td>350px</td>
                <td>20px</td>
              </tr>
              <tr>
                <td>768</td>
                <td>24px</td>
                <td>720px</td>
                <td>24px</td>
              </tr>
              <tr>
                <td>1280</td>
                <td>64px</td>
                <td>1152px</td>
                <td>64px</td>
              </tr>
              <tr>
                <td>1568</td>
                <td>64px</td>
                <td>1440px</td>
                <td>64px</td>
              </tr>
              <tr>
                <td>1920</td>
                <td>64px</td>
                <td>1440px</td>
                <td>235px</td>
              </tr>
            </tbody>
          </table>
        </Specimen>

        <Specimen
          id="layout-stack"
          name="Stack"
          source="@/components/layout/stack"
          spec="vertical flex column · gap token xs–3xl"
        >
          <Stack gap="md">
            <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-deep)] p-[var(--spacing-sm)]">
              gap=&quot;md&quot;, item one
            </div>
            <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-deep)] p-[var(--spacing-sm)]">
              item two
            </div>
            <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-deep)] p-[var(--spacing-sm)]">
              item three
            </div>
          </Stack>
        </Specimen>

        <Specimen
          id="layout-grid"
          name="Grid"
          source="@/components/layout/grid"
          description="Responsive column grid: 4 columns on mobile, 8 at md, 12 at xl. Resize the window to watch it reflow."
        >
          <Grid>
            {GRID_CELLS.map((n) => (
              <div
                key={n}
                className="body-caption flex h-12 items-center justify-center border border-[var(--hairline)] bg-[var(--surface-deep)]"
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
          description="Hairline rule in --hairline, horizontal or vertical."
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
          description="Page-scaffold wrappers: Container (max-w 1200px + responsive padding), Section (vertical rhythm), Sticky (scroll-pinned). Container and Section shape this page directly; Sticky is demoed below."
        >
          <p className="body-caption">
            Container and Section are best seen in context: this page is wrapped
            in Section › Container. Sticky pins the section-progress rail on
            /work pages and is shown live below.
          </p>
          <div className="flex h-[200px] flex-col gap-[var(--spacing-md)] overflow-y-auto border border-[var(--hairline)] bg-[var(--surface-deep)] p-[var(--spacing-md)]">
            <Sticky top="0">
              <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-elevated)] p-[var(--spacing-sm)]">
                Sticky element — scroll this box; it pins to the top.
              </div>
            </Sticky>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="body-caption shrink-0">
                Scrolling content line {n}
              </div>
            ))}
          </div>
        </Specimen>
      </GallerySection>

      <GallerySection
        id="imagery"
        title="Foundations · Imagery"
        mapsTo="Foundations → Imagery"
        source="DESIGN.md → Foundations → Imagery"
        intro="Imagery treatment and diagram tooling: rules rather than components, listed here for completeness."
      >
        <div className="prose-content">
          <p className="body-emphasis">Photography</p>
          <ul>
            <li>
              Monochrome or muted, restrained saturation, editorial composition.
            </li>
            <li>Supports understanding — never decorative or dominant.</li>
            <li>
              Avoid stock imagery, oversaturated visuals, and oversized heroes
              without context.
            </li>
          </ul>
          <p className="body-emphasis">Diagrams</p>
          <ul>
            <li>
              Hand-authored SVG (shared theme) — primary tool for flows,
              pipelines, and architecture.
            </li>
            <li>
              matplotlib → SVG/PNG — charts where source data exists;
              script-reproducible.
            </li>
            <li>
              tldraw → SVG — fallback only for layouts the SVG theme cannot
              express.
            </li>
          </ul>
        </div>
      </GallerySection>

      <GallerySection
        id="iconography"
        title="Foundations · Iconography"
        mapsTo="Foundations → Iconography"
        intro="Two icon families: Material Symbols for system actions, monochrome marks for brands. All inherit currentColor at the requested size."
      >
        <div className="prose-content">
          <ul>
            <li>Icons communicate function, not decoration.</li>
            <li>Navigation pairs an icon with a text label.</li>
            <li>
              A Button carries exactly one icon, after the label to navigate or
              open a new tab, before it to go back or name the action.
            </li>
          </ul>
        </div>

        <Specimen
          id="icons-material"
          name="Material icons"
          source="@/components/icons/material/*"
          description="UI / system icons. Material Symbols Outlined, inline SVG inheriting currentColor."
        >
          <div className="grid grid-cols-3 gap-[var(--spacing-lg)] text-[var(--ink)] sm:grid-cols-4 md:grid-cols-6">
            {MATERIAL_ICONS.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-[var(--spacing-xs)]"
              >
                <Icon size={ICON_GRID_SIZE} />
                <span className="mono-code">{name}</span>
              </div>
            ))}
          </div>
        </Specimen>

        <Specimen
          id="icons-brand"
          name="Brand icons"
          source="@/components/icons/brands/*"
          description="Brand and platform marks: official monochrome SVGs, kept distinct from the Material style."
        >
          <div className="flex flex-wrap gap-[var(--spacing-2xl)] text-[var(--ink)]">
            {BRAND_ICONS.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-[var(--spacing-xs)]"
              >
                <Icon size={ICON_GRID_SIZE} />
                <span className="mono-code">{name}</span>
              </div>
            ))}
          </div>
        </Specimen>

        <Specimen
          id="icons-sizes"
          name="Icon sizes"
          source="DESIGN.md → Iconography"
          description="Contextual sizes, each tied to a specific UI role; shown at actual size."
        >
          <div className="grid grid-cols-1 gap-[var(--spacing-xl)] sm:grid-cols-2">
            {ICON_SIZES.map(({ px, label, context }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-[var(--spacing-sm)]"
              >
                <div className="flex h-8 items-center text-[var(--ink)]">
                  <EastIcon size={px} />
                </div>
                <span className="mono-anchor">icon · {label}</span>
                <span className="body-caption">{context}</span>
              </div>
            ))}
          </div>
        </Specimen>
      </GallerySection>
    </>
  );
}
