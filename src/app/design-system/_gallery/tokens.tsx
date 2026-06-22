// Foundations renderers for /design-system. Tables render bare so the page's .prose-content wrapper
// applies the editorial table style. Token values mirror globals.css.

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
        usage: "Default block / section fill",
      },
      {
        token: "--surface-raised",
        name: "Surface Raised",
        usage: "One step up — cards, callouts, highlights",
      },
      {
        token: "--surface-sunken",
        name: "Surface Sunken",
        usage: "Brightest layer — images, code, diagrams",
      },
      {
        token: "--surface-nav",
        name: "Surface Nav",
        usage: "Floating nav / menu blur surface",
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
        usage: "Strong borders — buttons, h2 rule",
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
        usage: "Accent tint — hovers & selection",
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

function ColorCard({ token, name, usage }: ColorToken) {
  return (
    <div className="flex flex-col overflow-hidden border border-[var(--outline-variant)]">
      <span
        aria-hidden="true"
        className="h-20 w-full border-b border-[var(--outline-variant)]"
        style={{ background: `var(${token})` }}
      />
      <div className="flex flex-col gap-[2px] p-[var(--spacing-sm)]">
        <span className="body-emphasis">{name}</span>
        <span className="font-mono text-[11px] text-[var(--on-surface-muted)]">
          {token}
        </span>
        <span className="body-caption text-[var(--on-background)]">
          {usage}
        </span>
      </div>
    </div>
  );
}

export function ColorTokenGrid() {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {COLOR_GROUPS.map(({ group, tokens }) => (
        <div key={group} className="flex flex-col gap-[var(--spacing-md)]">
          <span className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--on-surface-muted)]">
            {group}
          </span>
          <div className="grid grid-cols-2 gap-[var(--spacing-sm)] md:grid-cols-3 xl:grid-cols-4">
            {tokens.map((t) => (
              <ColorCard key={t.token} {...t} />
            ))}
          </div>
        </div>
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
  // Responsive font-size steps from globals.css media overrides (md = 769–1279px, mobile = ≤768px);
  // only display/heading/lead tokens resize — the rest hold across breakpoints.
  responsive?: { md: number; mobile: number };
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
    responsive: { md: 52, mobile: 40 },
  },
  {
    token: "display-title",
    family: "Manrope",
    size: 56,
    weight: 600,
    lh: 64,
    sample: "Page titles for project and listing pages, set at display scale.",
    responsive: { md: 46, mobile: 36 },
  },
  {
    token: "heading-display",
    family: "Manrope",
    size: 36,
    weight: 600,
    lh: 44,
    sample: "Major section headers across the home and work pages.",
    responsive: { md: 32, mobile: 32 },
  },
  {
    token: "heading-section",
    family: "Manrope",
    size: 26,
    weight: 600,
    lh: 34,
    sample: "Secondary section headings within a page.",
    responsive: { md: 24, mobile: 24 },
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
    responsive: { md: 20, mobile: 18 },
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
          className="grid grid-cols-1 gap-[var(--spacing-sm)] border-b border-[var(--outline-variant)] py-[var(--spacing-md)] last:border-b-0 md:grid-cols-[200px_1fr] md:items-baseline md:gap-[var(--spacing-xl)]"
        >
          <div className="flex flex-col gap-[2px]">
            <span className="font-mono text-[13px] text-[var(--on-surface)]">
              .{t.token}
            </span>
            <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
              {t.family} · {t.size}px / {t.weight} / lh {t.lh}
            </span>
            {t.responsive && (
              <span className="font-mono text-[11px] text-[var(--on-surface-muted)]">
                ↘ {t.size} → {t.responsive.md} → {t.responsive.mobile}px (xl ·
                md · mobile)
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
    <div className="flex flex-wrap items-end gap-[var(--spacing-lg)]">
      {SPACING_TOKENS.map(({ token, px }) => (
        <div key={token} className="flex flex-col gap-[var(--spacing-xs)]">
          <span
            aria-hidden="true"
            className="h-7 bg-[var(--accent)]"
            style={{ width: `var(--spacing-${token})` }}
          />
          <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
            {token} · {px}
          </span>
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
    radius: "0",
    value: "0",
    usage: "Cards, sections, nav, footer",
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
    usage: "Pill nav, link pills, FAB",
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
          <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
            {token} · {value}
          </span>
          <span className="body-caption text-center">{usage}</span>
        </div>
      ))}
    </div>
  );
}

const DEPTH_LEVELS: { name: string; spec: string; className: string }[] = [
  {
    name: "Level 0 — Flat",
    spec: "no border / no shadow",
    className: "bg-[var(--surface)]",
  },
  {
    name: "Level 1 — Hairline",
    spec: "1px --outline-variant",
    className: "bg-[var(--surface)] border border-[var(--outline-variant)]",
  },
  {
    name: "Level 2 — Outline",
    spec: "1px --outline",
    className: "bg-[var(--surface)] border border-[var(--outline)]",
  },
  {
    name: "Level 3 — Raised fill",
    spec: "--surface-raised + hairline",
    className:
      "bg-[var(--surface-raised)] border border-[var(--outline-variant)]",
  },
];

export function DepthSpecimen() {
  return (
    <div className="grid grid-cols-1 gap-[var(--spacing-md)] sm:grid-cols-2 xl:grid-cols-4">
      {DEPTH_LEVELS.map(({ name, spec, className }) => (
        <div
          key={name}
          className={`flex min-h-[120px] flex-col justify-between p-[var(--spacing-md)] ${className}`}
        >
          <span className="body-emphasis">{name}</span>
          <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
            {spec}
          </span>
        </div>
      ))}
    </div>
  );
}

// Layout switches: md = 768px (pill nav ↔ hamburger; grid 4→8), xl = 1280px (grid 8→12).
const ZONES: { name: string; width: string; changes: string[] }[] = [
  {
    name: "Desktop",
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
    name: "Tablet",
    width: "768–1279px",
    changes: [
      "8-column grid",
      "Horizontal pill nav",
      "No meteor layer",
      "Display / heading type steps down",
    ],
  },
  {
    name: "Mobile",
    width: "≤ 767px",
    changes: [
      "Single reading column; 4-column grid",
      "Hamburger drawer nav",
      "Full-bleed ascii field",
      "Type at smallest step",
    ],
  },
];

// A fixed reference ruler — the box dims are an intentional standard (replicating the getdesign.md
// "Responsive Behavior" diagram), not derived from our breakpoints.
const ZONE_BARS: { w: number; label: string; boxW: number; boxH: number }[] = [
  { w: 375, label: "mobile", boxW: 48, boxH: 96 },
  { w: 640, label: "mobile", boxW: 64, boxH: 120 },
  { w: 768, label: "tablet-narrow", boxW: 100, boxH: 150 },
  { w: 1024, label: "desktop", boxW: 160, boxH: 130 },
  { w: 1280, label: "desktop-large", boxW: 220, boxH: 150 },
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
                      className="font-mono text-[13px] whitespace-nowrap align-top"
                    >
                      {z.name}
                    </td>
                    <td
                      rowSpan={z.changes.length}
                      className="font-mono text-[13px] whitespace-nowrap align-top"
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
        {ZONE_BARS.map(({ w, label, boxW, boxH }) => (
          <div
            key={w}
            className="flex shrink-0 flex-col items-center justify-end gap-[2px] border border-[var(--outline-variant)] bg-[var(--surface-raised)] p-[var(--spacing-sm)]"
            style={{ width: `${boxW}px`, height: `${boxH}px` }}
          >
            <span className="font-mono text-[13px] font-medium text-[var(--on-surface)]">
              {w}
            </span>
            <span className="font-mono text-[10px] leading-tight text-center text-[var(--on-surface-muted)]">
              {label}
            </span>
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
              Buttons stand 56px tall; link pills 36px with full-width tap
              padding.
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
          <td className="font-mono text-[13px]">--duration-fast</td>
          <td>150ms</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--duration-base</td>
          <td>200ms</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--duration-slow</td>
          <td>300ms</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--ease-standard</td>
          <td>cubic-bezier(0.2, 0, 0, 1)</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--ease-emphasis</td>
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
          <td className="font-mono text-[13px]">--z-base</td>
          <td>0</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--z-sticky-content</td>
          <td>20</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--z-scroll-to-top</td>
          <td>40</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--z-pill-nav</td>
          <td>50</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--z-mobile-menu-overlay</td>
          <td>55</td>
        </tr>
        <tr>
          <td className="font-mono text-[13px]">--z-mobile-menu-panel</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  );
}
