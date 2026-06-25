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
        usage: "One step up: cards, callouts, highlights",
      },
      {
        token: "--surface-deep",
        name: "Surface Deep",
        usage: "Diagram regions, card media well, hero; brightest in light",
      },
      {
        token: "--surface-floating",
        name: "Surface Floating",
        usage: "Floating nav and utility blur surfaces",
      },
      {
        token: "--surface-active",
        name: "Surface Active",
        usage: "Active nav item / selected fill",
      },
      {
        token: "--surface-tag",
        name: "Surface Tag",
        usage: "Tag and chip background",
      },
    ],
  },
  {
    // Reading-mode surfaces re-scoped to .ds-reading so the cards preview the data-read="long" override
    // live and theme-adaptive (gallery.css mirrors the :root blocks).
    label: "Surfaces · reading mode",
    scopeClassName: "ds-reading",
    darkOnlyClassName: "ds-reading-darkonly",
    note: (
      <>
        Long-read pages (<span className="mono-code">/work/[slug]</span>,{" "}
        <span className="mono-code">data-read=&quot;long&quot;</span>) soften
        the surface values for easier reading. Only changed tokens are shown;
        light keeps raised and sunken, so fewer cards appear.
      </>
    ),
    tokens: [
      {
        token: "--surface",
        name: "Surface",
        usage: "Reading ground, softer than the showcase default",
      },
      {
        token: "--surface-elevated",
        name: "Surface Elevated",
        usage: "Lighter than surface in dark reading",
        darkOnly: true,
      },
      {
        token: "--surface-deep",
        name: "Surface Deep",
        usage: "Darker than elevated in dark reading",
        darkOnly: true,
      },
      {
        token: "--surface-floating",
        name: "Surface Floating",
        usage: "Reading nav / menu blur surface",
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
        token: "--ink-on-accent",
        name: "Ink On Accent",
        usage: "Text / icon on an accent fill",
      },
    ],
  },
  {
    label: "Borders",
    tokens: [
      {
        token: "--hairline-strong",
        name: "Hairline Strong",
        usage: "Default borders and dividers (stronger than hairline)",
      },
      {
        token: "--hairline",
        name: "Hairline",
        usage: "Hairline dividers and card borders",
      },
    ],
  },
  {
    label: "Accent",
    tokens: [
      {
        token: "--accent",
        name: "Accent",
        usage: "Links, primary action, active state",
      },
      {
        token: "--accent-tint",
        name: "Accent Tint",
        usage: "Hover backgrounds, accent-tinted surfaces",
      },
    ],
  },
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
    size: 64,
    weight: 600,
    lh: 70,
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
    size: 36,
    weight: 600,
    lh: 44,
    sample: "Major section headers across the home and work pages.",
    responsive: { tablet: 32, mobile: 32 },
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
    sample: "Navigation links in the pill nav and mobile menu.",
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
    token: "tag-chip",
    family: "JetBrains Mono",
    size: 12,
    weight: 500,
    lh: 16,
    sample: "Mono uppercase text inside tags and chips.",
  },
  {
    token: "mono-code",
    family: "JetBrains Mono",
    size: 16,
    weight: 400,
    lh: 24,
    sample: "Monospaced code for inline snippets and code blocks.",
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
  { token: "margin-mobile", px: 16 },
  { token: "margin-desktop", px: 64 },
];

const RADIUS_TOKENS: ShapeItem[] = [
  {
    token: "none",
    radius: "var(--radius-none)",
    value: "0px",
    usage: "Cards, code blocks, callouts; sharp containers",
  },
  {
    token: "sm",
    radius: "var(--radius-sm)",
    value: "4px",
    usage: "Tags, buttons, small fills",
  },
  {
    token: "md",
    radius: "var(--radius-md)",
    value: "8px",
    usage: "Figures, panels, hero media",
  },
  {
    token: "pill",
    radius: "var(--radius-pill)",
    value: "9999px",
    usage: "Pill nav, link pills, scroll-to-top, theme selector",
  },
];

const DEPTH_LEVELS: DepthLevel[] = [
  {
    name: "Level 0 · Flat",
    spec: "no border, no fill",
    className: "bg-[var(--surface)]",
    usage: "Page sections, hero regions, footer",
  },
  {
    name: "Level 1 · Border only",
    spec: "1px hairline",
    className: "bg-[var(--surface)] border border-[var(--hairline)]",
    usage: "Figure frame, prose hr, table cells",
  },
  {
    name: "Level 2 · Border + blur",
    spec: "backdrop-blur(12px) + surface-floating + 1px hairline (mobile panel borderless)",
    className:
      "bg-[var(--surface-floating)] border border-[var(--hairline)] [backdrop-filter:blur(12px)]",
    usage: "Pill nav, mobile trigger, scroll-to-top",
  },
  {
    name: "Level 3 · Border + raised",
    spec: "surface-elevated + 1px hairline",
    className: "bg-[var(--surface-elevated)] border border-[var(--hairline)]",
    usage: "Project cards, <Highlight>",
  },
  {
    name: "Level 4 · Sunken inset",
    spec: "surface-deep + 1px hairline (borderless when nested)",
    className: "bg-[var(--surface-deep)] border border-[var(--hairline)]",
    usage: "<Diagram> / <DiagramRow>, card media well",
  },
  {
    name: "Level 5 · Accent left + raised",
    spec: "2px accent (left) + surface-elevated",
    className: "bg-[var(--surface-elevated)] border-l-2 border-[var(--accent)]",
    usage: "<Callout>, prose blockquote",
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

const ICON_SIZES = [
  {
    px: 20,
    label: "20px",
    context: "Standalone icon-only controls (footer social, scroll-to-top)",
  },
  { px: 18, label: "18px", context: "Buttons; mobile-nav trigger and close" },
  {
    px: 16,
    label: "16px",
    context: "Nav items, LinkPill icons, project-card chevron",
  },
  {
    px: 12,
    label: "12–14px",
    context: "Inline indicators (copy, external-link)",
  },
];

// Largest size in the scale; used for the catalog grids (icons not in a button/nav context).
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
        intro="Semantic color tokens for surfaces, text, borders, accent, and state, each resolving to the live theme. One accent only; accent-strong is intentionally absent, and interaction states derive from these tokens."
      >
        <SwatchGrid groups={COLOR_GROUPS} />
      </GallerySection>

      <GallerySection
        id="typography"
        title="Foundations · Typography"
        mapsTo="Foundations → Typography"
        source="src/styles/typography.css"
        intro="Nineteen semantic type tokens, each fixing a family, size, weight, and line-height for one role. Dark theme applies grayscale font-smoothing so weight hierarchy holds."
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
        intro="Four radius categories, from sharp structural containers to a full pill for floating and link controls."
      >
        <ShapeRow items={RADIUS_TOKENS} />
      </GallerySection>

      <GallerySection
        id="elevation"
        title="Foundations · Elevation & Depth"
        mapsTo="Foundations → Elevation & Depth"
        source="DESIGN.md → Elevation & Depth"
        intro="Depth without shadow. Six levels built from tonal surface layering and subtle borders."
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
          id="layout-stack"
          name="Stack"
          source="@/components/layout/stack"
          spec="vertical flex column · gap token xs–3xl"
        >
          <Stack gap="md">
            <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-elevated)] p-[var(--spacing-sm)]">
              gap=&quot;md&quot;, item one
            </div>
            <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-elevated)] p-[var(--spacing-sm)]">
              item two
            </div>
            <div className="body-caption border border-[var(--hairline)] bg-[var(--surface-elevated)] p-[var(--spacing-sm)]">
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
                className="body-caption flex h-12 items-center justify-center border border-[var(--hairline)] bg-[var(--surface-elevated)]"
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
          <ul>
            <li>Photography: monochrome / muted, restrained, editorial.</li>
            <li>
              Diagrams: hand-authored SVG, matplotlib charts, tldraw fallback.
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
          description="Four contextual sizes, each tied to a specific UI role; shown at actual size."
        >
          <div className="grid grid-cols-1 gap-[var(--spacing-xl)] sm:grid-cols-2">
            {ICON_SIZES.map(({ px, label, context }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-[var(--spacing-sm)]"
              >
                <div className="flex h-8 items-center text-[var(--ink)]">
                  <ArrowForwardIcon size={px} />
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
