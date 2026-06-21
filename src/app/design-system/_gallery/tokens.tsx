// Dev-only Foundations renderers for /design-system. Token names + usage mirror
// globals.css / DESIGN.md (the single source of truth). Tables render bare so the
// page's .prose-content wrapper gives them the editorial table style. Cards use the
// ProjectCard treatment (sharp corners, hairline border). Color tokens are theme-
// dependent, so each card shows the token name + a live swatch that re-scopes per theme.

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
      <div className="flex flex-col gap-[2px] p-[var(--spacing-md)]">
        <span className="body-emphasis">{name}</span>
        <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
          {token}
        </span>
        <span className="body-caption">{usage}</span>
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
            [+] {group}
          </span>
          <div className="grid grid-cols-1 gap-[var(--spacing-md)] sm:grid-cols-2">
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
};

// Sample text reflects how each token is actually used on the site.
const TYPE_TOKENS: TypeToken[] = [
  {
    token: "display-primary",
    family: "Manrope",
    size: 64,
    weight: 600,
    lh: 70,
    sample: "I build for production",
  },
  {
    token: "display-title",
    family: "Manrope",
    size: 56,
    weight: 600,
    lh: 64,
    sample: "Model Extraction Attacks",
  },
  {
    token: "heading-display",
    family: "Manrope",
    size: 36,
    weight: 600,
    lh: 44,
    sample: "Selected work",
  },
  {
    token: "heading-section",
    family: "Manrope",
    size: 26,
    weight: 600,
    lh: 34,
    sample: "Capabilities",
  },
  {
    token: "heading-component",
    family: "Manrope",
    size: 22,
    weight: 600,
    lh: 30,
    sample: "Project card title",
  },
  {
    token: "heading-narrative",
    family: "Manrope",
    size: 20,
    weight: 600,
    lh: 28,
    sample: "What I built",
  },
  {
    token: "body-lead",
    family: "Inter",
    size: 24,
    weight: 400,
    lh: 34,
    sample:
      "AI prototypes are easy — building systems that survive real users is the harder part.",
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
    sample: "Supporting and muted descriptive copy.",
  },
  {
    token: "body-emphasis",
    family: "Inter",
    size: 18,
    weight: 500,
    lh: 28,
    sample: "Emphasised line inside a callout or highlight.",
  },
  {
    token: "body-caption",
    family: "Inter",
    size: 14,
    weight: 400,
    lh: 20,
    sample: "Figure caption · metadata · small print",
  },
  {
    token: "callout-title",
    family: "Inter",
    size: 16,
    weight: 600,
    lh: 20,
    sample: "Note",
  },
  {
    token: "interactive-label",
    family: "Inter",
    size: 14,
    weight: 500,
    lh: 20,
    sample: "View projects",
  },
  {
    token: "nav-link",
    family: "Inter",
    size: 14,
    weight: 500,
    lh: 20,
    sample: "About",
  },
  {
    token: "support-meta",
    family: "Inter",
    size: 13,
    weight: 400,
    lh: 20,
    sample: "Designed & developed by me.",
  },
  {
    token: "mono-anchor",
    family: "JetBrains Mono",
    size: 15,
    weight: 500,
    lh: 20,
    sample: "Tech stack",
  },
  {
    token: "insight-label",
    family: "JetBrains Mono",
    size: 13,
    weight: 500,
    lh: 16,
    sample: "Key insight",
  },
  {
    token: "tag-chip",
    family: "JetBrains Mono",
    size: 12,
    weight: 500,
    lh: 16,
    sample: "PyTorch",
  },
  {
    token: "mono-code",
    family: "JetBrains Mono",
    size: 16,
    weight: 400,
    lh: 24,
    sample: "const accuracy = 0.97",
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
            className="h-16 w-16 border border-[var(--outline)] bg-[var(--surface-raised)]"
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

const BREAKPOINTS: { zone: string; width: string; changes: string }[] = [
  {
    zone: "mobile",
    width: "≤ 768px",
    changes:
      "Single column; pill nav → hamburger drawer; type scales down; full-bleed ascii field",
  },
  {
    zone: "tablet / desktop",
    width: "769 – 1279px",
    changes: "Mid-tier type; multi-column grids; horizontal pill nav",
  },
  {
    zone: "desktop-large",
    width: "1280px +",
    changes: "Full layout; 1200px max content column; meteor layer active",
  },
];

const ZONE_CARDS = [
  { w: 375, label: "mobile" },
  { w: 768, label: "md / nav switch" },
  { w: 1280, label: "xl / desktop-large" },
];

export function ResponsiveSpecimen() {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      <table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Width</th>
            <th>Key changes</th>
          </tr>
        </thead>
        <tbody>
          {BREAKPOINTS.map((b) => (
            <tr key={b.zone}>
              <td className="font-mono text-[13px] whitespace-nowrap">
                {b.zone}
              </td>
              <td className="font-mono text-[13px] whitespace-nowrap">
                {b.width}
              </td>
              <td>{b.changes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap items-end gap-[var(--spacing-md)]">
        {ZONE_CARDS.map(({ w, label }) => (
          <div key={w} className="flex flex-col gap-[var(--spacing-xs)]">
            <span
              aria-hidden="true"
              className="h-16 border border-[var(--outline-variant)] bg-[var(--surface-raised)]"
              style={{ width: `${Math.round(w / 8)}px` }}
            />
            <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
              {w}
            </span>
            <span className="body-caption">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-[var(--spacing-xl)] md:grid-cols-2">
        <div>
          <span className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--on-surface-muted)]">
            [+] Touch targets
          </span>
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
        <div>
          <span className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--on-surface-muted)]">
            [+] Collapsing strategy
          </span>
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
