// Foundations renderers for /design-system. Tables render bare so the page's .prose-content wrapper
// applies the editorial table style. Token values mirror globals.css.

import { Fragment } from "react";

type ColorToken = { token: string; name: string; usage: string };

const COLOR_GROUPS: { group: string; tokens: ColorToken[] }[] = [
  {
    group: "Surfaces",
    tokens: [
      {
        token: "--background",
        name: "Background",
        usage: "Page ground, behind all content",
      },
      {
        token: "--surface",
        name: "Surface",
        usage: "Default content surface (= background)",
      },
      {
        token: "--surface-raised",
        name: "Surface Raised",
        usage: "One step up — cards, callouts, highlights",
      },
      {
        token: "--surface-sunken",
        name: "Surface Sunken",
        usage: "Diagram regions, card media well, hero — brightest in light",
      },
      {
        token: "--surface-nav",
        name: "Surface Nav",
        usage: "Floating nav + utility blur surfaces",
      },
      {
        token: "--surface-selection",
        name: "Surface Selection",
        usage: "Active nav item / selected fill",
      },
      {
        token: "--surface-tag",
        name: "Surface Tag",
        usage: "Tag & chip background",
      },
    ],
  },
  {
    group: "Text",
    tokens: [
      {
        token: "--on-background",
        name: "On Background",
        usage: "Body text on the page ground",
      },
      {
        token: "--on-surface",
        name: "On Surface",
        usage: "Primary text & headings",
      },
      {
        token: "--on-surface-muted",
        name: "On Surface Muted",
        usage: "Secondary text, metadata, captions",
      },
    ],
  },
  {
    group: "Borders",
    tokens: [
      {
        token: "--outline",
        name: "Outline",
        usage: "Default borders & dividers (stronger than hairline)",
      },
      {
        token: "--outline-variant",
        name: "Outline Variant",
        usage: "Hairline dividers & card borders",
      },
    ],
  },
  {
    group: "Accent",
    tokens: [
      {
        token: "--accent",
        name: "Accent",
        usage: "Links, primary action, active state",
      },
      {
        token: "--accent-on",
        name: "Accent On",
        usage: "Text / icon on an accent fill",
      },
      {
        token: "--accent-muted",
        name: "Accent Muted",
        usage: "Hover backgrounds, accent-tinted surfaces",
      },
    ],
  },
  {
    group: "Semantic",
    tokens: [
      {
        token: "--focus-ring",
        name: "Focus Ring",
        usage: "Keyboard :focus-visible ring",
      },
      {
        token: "--selection",
        name: "Selection",
        usage: "Text-selection highlight",
      },
    ],
  },
];

function ColorCard({
  token,
  name,
  usage,
  className = "",
}: ColorToken & { className?: string }) {
  return (
    <div
      className={`flex flex-col overflow-hidden border border-[var(--outline-variant)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-20 w-full border-b border-[var(--outline-variant)]"
        style={{ background: `var(${token})` }}
      />
      <div className="flex flex-col gap-[2px] p-[var(--spacing-sm)]">
        <span className="body-emphasis">{name}</span>
        <span className="mono-code">{token}</span>
        <span className="body-caption text-[var(--on-background)]">
          {usage}
        </span>
      </div>
    </div>
  );
}

// Reading-mode surfaces — the only tokens that change under data-read="long" (globals.css). Rendered as
// ColorCards inside the .ds-reading scope so they preview live + theme-adaptive, same as the showcase grid.
const READING_SURFACES: (ColorToken & { darkOnly?: boolean })[] = [
  {
    token: "--background",
    name: "Background",
    usage: "Reading ground — softer than the showcase default",
  },
  {
    token: "--surface",
    name: "Surface",
    usage: "Reading surface (tracks background)",
  },
  {
    token: "--surface-raised",
    name: "Surface Raised",
    usage: "Lighter than background in dark reading",
    darkOnly: true,
  },
  {
    token: "--surface-sunken",
    name: "Surface Sunken",
    usage: "Darker than raised in dark reading",
    darkOnly: true,
  },
  {
    token: "--surface-nav",
    name: "Surface Nav",
    usage: "Reading nav / menu blur surface",
  },
];

function ReadingModeGroup() {
  return (
    <div className="flex flex-col gap-[var(--spacing-md)]">
      <span className="mono-anchor">Surfaces · reading mode</span>
      <p className="body-caption text-[var(--on-surface-muted)]">
        Long-read pages (<span className="font-mono">/work/[slug]</span>,{" "}
        <span className="font-mono">data-read=&quot;long&quot;</span>) soften
        the surface values for easier reading. Only changed tokens are shown —
        light keeps raised and sunken, so fewer cards appear.
      </p>
      <div className="ds-reading grid grid-cols-2 gap-[var(--spacing-sm)] md:grid-cols-3 xl:grid-cols-4">
        {READING_SURFACES.map(({ darkOnly, ...t }) => (
          <ColorCard
            key={t.token}
            {...t}
            className={darkOnly ? "ds-reading-darkonly" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function ColorTokenGrid() {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {COLOR_GROUPS.map(({ group, tokens }) => (
        <Fragment key={group}>
          <div className="flex flex-col gap-[var(--spacing-md)]">
            <span className="mono-anchor">{group}</span>
            <div className="grid grid-cols-2 gap-[var(--spacing-sm)] md:grid-cols-3 xl:grid-cols-4">
              {tokens.map((t) => (
                <ColorCard key={t.token} {...t} />
              ))}
            </div>
          </div>
          {group === "Surfaces" && <ReadingModeGroup />}
        </Fragment>
      ))}
    </div>
  );
}

type TypeToken = {
  token: string;
  family: string;
  size: number;
  weight: number;
  lh: number;
  sample: string;
  // Responsive font-size steps from globals.css media overrides (tablet = 769–1279px, mobile = ≤768px);
  // only display/heading/lead tokens resize — the rest hold across breakpoints.
  responsive?: { tablet: number; mobile: number };
};

// Each sample is self-descriptive — it states the token's own role, set in that token's
// real style — so the scale reads as a usage guide, not arbitrary specimen text.
const TYPE_TOKENS: TypeToken[] = [
  {
    token: "display-primary",
    family: "Manrope",
    size: 64,
    weight: 600,
    lh: 70,
    sample: "The hero display line — the single largest statement on a page.",
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

export function TypeScaleSpecimen() {
  return (
    <div className="flex flex-col">
      {TYPE_TOKENS.map((t) => (
        <div
          key={t.token}
          className="grid grid-cols-1 gap-[var(--spacing-sm)] border-b border-[var(--outline-variant)] py-[var(--spacing-md)] last:border-b-0 md:grid-cols-[280px_1fr] md:items-baseline md:gap-[var(--spacing-xl)]"
        >
          <div className="flex flex-col gap-[2px]">
            <span className="mono-code">.{t.token}</span>
            <span className="mono-anchor">
              {t.family} · {t.size}px / {t.weight} / lh {t.lh}
            </span>
            {t.responsive && (
              <span className="body-caption">
                ↘ desktop: {t.size}px → tablet: {t.responsive.tablet}px →
                mobile: {t.responsive.mobile}px
              </span>
            )}
          </div>
          <div className={`${t.token} min-w-0`}>{t.sample}</div>
        </div>
      ))}
    </div>
  );
}

const SPACING_TOKENS: { token: string; px: number }[] = [
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

export function SpacingScaleSpecimen() {
  return (
    <div className="flex flex-col gap-[var(--spacing-sm)]">
      {SPACING_TOKENS.map(({ token, px }) => (
        <div key={token} className="flex items-center gap-[var(--spacing-md)]">
          <span className="mono-anchor w-[112px] shrink-0">
            {token} · {px}
          </span>
          <span
            aria-hidden="true"
            className="h-5 shrink-0 bg-[var(--accent)]"
            style={{ width: `var(--spacing-${token})` }}
          />
        </div>
      ))}
    </div>
  );
}

const RADIUS_TOKENS: {
  token: string;
  radius: string;
  value: string;
  usage: string;
}[] = [
  {
    token: "none",
    radius: "var(--radius-none)",
    value: "0px",
    usage: "Cards, code blocks, callouts — sharp containers",
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

export function RadiusScaleSpecimen() {
  return (
    <div className="flex flex-wrap gap-[var(--spacing-xl)]">
      {RADIUS_TOKENS.map(({ token, radius, value, usage }) => (
        <div
          key={token}
          className="flex w-40 flex-col items-center gap-[var(--spacing-sm)]"
        >
          <span
            aria-hidden="true"
            className="h-16 w-16 border border-[var(--outline-variant)] bg-[var(--surface-raised)]"
            style={{ borderRadius: radius }}
          />
          <span className="mono-anchor">
            {token} · {value}
          </span>
          <span className="body-caption text-center">{usage}</span>
        </div>
      ))}
    </div>
  );
}

const DEPTH_LEVELS: {
  name: string;
  spec: string;
  className: string;
  usage: string;
}[] = [
  {
    name: "Level 0 — Flat",
    spec: "no border, no fill",
    className: "bg-[var(--surface)]",
    usage: "Page sections, hero regions, footer",
  },
  {
    name: "Level 1 — Border only",
    spec: "1px outline-variant",
    className: "bg-[var(--surface)] border border-[var(--outline-variant)]",
    usage: "Figure frame, prose hr, table cells",
  },
  {
    name: "Level 2 — Border + blur",
    spec: "backdrop-blur(12px) + surface-nav + 1px outline-variant",
    className:
      "bg-[var(--surface-nav)] border border-[var(--outline-variant)] [backdrop-filter:blur(12px)]",
    usage: "Pill nav, mobile trigger, scroll-to-top",
  },
  {
    name: "Level 3 — Border + raised",
    spec: "surface-raised + 1px outline-variant",
    className:
      "bg-[var(--surface-raised)] border border-[var(--outline-variant)]",
    usage: "Project cards, <Highlight>",
  },
  {
    name: "Level 4 — Sunken inset",
    spec: "surface-sunken + 1px outline-variant",
    className:
      "bg-[var(--surface-sunken)] border border-[var(--outline-variant)]",
    usage: "<Diagram> / <DiagramRow>, card media well",
  },
  {
    name: "Level 5 — Accent left + raised",
    spec: "2px accent (left) + surface-raised",
    className: "bg-[var(--surface-raised)] border-l-2 border-[var(--accent)]",
    usage: "<Callout>, prose blockquote",
  },
];

export function DepthSpecimen() {
  return (
    <div className="grid grid-cols-1 gap-[var(--spacing-md)] sm:grid-cols-2 xl:grid-cols-3">
      {DEPTH_LEVELS.map(({ name, spec, className, usage }) => (
        <div
          key={name}
          className={`flex min-h-[120px] flex-col justify-between p-[var(--spacing-md)] ${className}`}
        >
          <span className="body-emphasis">{name}</span>
          <div className="flex flex-col gap-[2px]">
            <span className="mono-anchor">{spec}</span>
            <span className="body-caption text-[var(--on-surface-muted)]">
              {usage}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Layout switches: md = 768px (pill nav ↔ hamburger; grid 4→8), xl = 1280px (grid 8→12).
const ZONES: { name: string; width: string; changes: string[] }[] = [
  {
    name: "Desktop (xl)",
    width: "1280px +",
    changes: [
      "1200px max content column",
      "12-column grid",
      "Section-progress rail",
      "Meteor layer active",
      "Type at full scale",
    ],
  },
  {
    name: "Tablet (md)",
    width: "768–1279px",
    changes: [
      "8-column grid",
      "Horizontal pill nav",
      "No meteor layer",
      "Display / heading type steps down",
    ],
  },
  {
    name: "Mobile (base)",
    width: "≤ 767px",
    changes: [
      "Single reading column; 4-column grid",
      "Hamburger drawer nav",
      "Full-bleed ascii field",
      "Type at smallest step",
    ],
  },
];

// Fixed canonical breakpoint ruler (Tailwind v4 defaults). Every stop carries a device name; `px` is the
// min-width floor (base = 0). `used` flags the breakpoints this project actually uses — drawn as a deeper
// sunken box (elevation Level 4) against a raised box (Level 3) for the unused standard stops.
const ZONE_BARS: {
  px: string;
  device: string;
  token: string;
  used: boolean;
  boxW: number;
  boxH: number;
}[] = [
  // Aspect ratios mirror real device viewports — portrait phones (tall, narrow) widening through to
  // landscape desktops (wide, short), with the tablet the tallest. Width grows monotonically with the
  // breakpoint; text sits inside, and the device name uses body-caption so it doesn't crowd the small shapes.
  {
    px: "0",
    device: "Mobile",
    token: "base",
    used: true,
    boxW: 64,
    boxH: 128,
  },
  {
    px: "640",
    device: "Large mobile",
    token: "sm",
    used: false,
    boxW: 76,
    boxH: 138,
  },
  {
    px: "768",
    device: "Tablet",
    token: "md",
    used: true,
    boxW: 104,
    boxH: 162,
  },
  {
    px: "1024",
    device: "Laptop",
    token: "lg",
    used: false,
    boxW: 168,
    boxH: 140,
  },
  {
    px: "1280",
    device: "Desktop",
    token: "xl",
    used: true,
    boxW: 210,
    boxH: 150,
  },
  {
    px: "1536",
    device: "Ultra wide",
    token: "2xl",
    used: false,
    boxW: 264,
    boxH: 152,
  },
];

export function ResponsiveSpecimen() {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Width</th>
            <th>Key Changes</th>
          </tr>
        </thead>
        <tbody>
          {ZONES.flatMap((z) =>
            z.changes.map((change, i) => (
              <tr key={`${z.name}-${change}`}>
                {i === 0 && (
                  <>
                    <td
                      rowSpan={z.changes.length}
                      className="mono-anchor whitespace-nowrap align-top"
                    >
                      {z.name}
                    </td>
                    <td
                      rowSpan={z.changes.length}
                      className="mono-anchor whitespace-nowrap align-top"
                    >
                      {z.width}
                    </td>
                  </>
                )}
                <td>{change}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>

      <div className="flex items-end gap-[var(--spacing-md)] overflow-x-auto pb-[var(--spacing-xs)]">
        {ZONE_BARS.map(({ px, device, token, used, boxW, boxH }) => (
          <div
            key={token}
            className={`flex shrink-0 flex-col items-center justify-end gap-[2px] border border-[var(--outline-variant)] p-[var(--spacing-sm)] ${
              used ? "bg-[var(--surface-sunken)]" : "bg-[var(--surface-raised)]"
            }`}
            style={{ width: `${boxW}px`, height: `${boxH}px` }}
          >
            <span className="mono-code">{px}</span>
            <span className="body-caption text-center leading-tight">
              {device}
            </span>
            <span className="mono-code leading-tight">{token}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[var(--spacing-xl)]">
        <div className="flex flex-col gap-[var(--spacing-xs)]">
          <p className="body-emphasis">Touch targets</p>
          <ul>
            <li>
              Minimum 44×44px for every interactive element on touch devices.
            </li>
            <li>
              Buttons stand 56px tall; LinkPill is the one known exception at
              36px (below the 44px minimum).
            </li>
            <li>
              Icon-only controls (theme, scroll-to-top, menu) sit in a ≥44px hit
              area.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[var(--spacing-xs)]">
          <p className="body-emphasis">Collapsing strategy</p>
          <ul>
            <li>
              Primary nav: horizontal pill (md+) → mobile hamburger drawer
              (below md).
            </li>
            <li>Grids: multi-column (4 / 8 / 12) → single column on mobile.</li>
            <li>
              Type: display/heading scales step down at ≤1279px and again at
              ≤768px.
            </li>
            <li>
              Background: meteor layer desktop-only; ascii field goes full-bleed
              on mobile.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function MotionTokenTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mono-code">--duration-fast</td>
          <td>150ms</td>
        </tr>
        <tr>
          <td className="mono-code">--duration-base</td>
          <td>200ms</td>
        </tr>
        <tr>
          <td className="mono-code">--duration-slow</td>
          <td>300ms</td>
        </tr>
        <tr>
          <td className="mono-code">--ease-standard</td>
          <td>cubic-bezier(0.2, 0, 0, 1)</td>
        </tr>
        <tr>
          <td className="mono-code">--ease-emphasis</td>
          <td>cubic-bezier(0.3, 0, 0, 1)</td>
        </tr>
      </tbody>
    </table>
  );
}

export function ZIndexTokenTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mono-code">--z-base</td>
          <td>0</td>
        </tr>
        <tr>
          <td className="mono-code">--z-sticky-content</td>
          <td>20</td>
        </tr>
        <tr>
          <td className="mono-code">--z-scroll-to-top</td>
          <td>40</td>
        </tr>
        <tr>
          <td className="mono-code">--z-pill-nav</td>
          <td>50</td>
        </tr>
        <tr>
          <td className="mono-code">--z-mobile-menu-overlay</td>
          <td>55</td>
        </tr>
        <tr>
          <td className="mono-code">--z-mobile-menu-panel</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  );
}
