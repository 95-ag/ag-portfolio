// Dev-only Foundations renderers for /design-system. Token NAMES + usage notes
// mirror globals.css / DESIGN.md (the single source of truth). Values shown for
// spacing/radius/depth/responsive are reference labels echoing the @theme block.
// Our color tokens are theme-dependent, so cards show the token name + the live
// swatch (which re-scopes per theme) rather than one fixed hex.

type ColorToken = { token: string; name: string; usage: string };

const COLOR_GROUPS: { group: string; tokens: ColorToken[] }[] = [
  {
    group: "Surfaces",
    tokens: [
      { token: "--background", name: "Background", usage: "Page ground" },
      { token: "--surface", name: "Surface", usage: "Default surface fill" },
      {
        token: "--surface-raised",
        name: "Surface Raised",
        usage: "Cards, callouts, highlights — a gentle tonal lift",
      },
      {
        token: "--surface-sunken",
        name: "Surface Sunken",
        usage: "Brightest layer — images, code, diagrams",
      },
      {
        token: "--surface-nav",
        name: "Surface Nav",
        usage: "Floating blur surface (pill nav, mobile menu)",
      },
      {
        token: "--surface-selection",
        name: "Surface Selection",
        usage: "Active nav / selected state fill",
      },
      {
        token: "--surface-tag",
        name: "Surface Tag",
        usage: "Tag / chip background",
      },
    ],
  },
  {
    group: "Text",
    tokens: [
      {
        token: "--on-background",
        name: "On Background",
        usage: "Ink on the page ground",
      },
      { token: "--on-surface", name: "On Surface", usage: "Primary text ink" },
      {
        token: "--on-surface-muted",
        name: "On Surface Muted",
        usage: "Secondary / metadata text",
      },
    ],
  },
  {
    group: "Borders",
    tokens: [
      {
        token: "--outline",
        name: "Outline",
        usage: "Stronger borders — secondary button, h2 rule",
      },
      {
        token: "--outline-variant",
        name: "Outline Variant",
        usage: "Hairline dividers, card borders, list markers",
      },
    ],
  },
  {
    group: "Accent",
    tokens: [
      {
        token: "--accent",
        name: "Accent",
        usage: "Links, primary CTA fill, active state — the one accent",
      },
      {
        token: "--accent-on",
        name: "Accent On",
        usage: "Text on an accent fill",
      },
      {
        token: "--accent-muted",
        name: "Accent Muted",
        usage: "Accent tint — hover backgrounds, selection",
      },
    ],
  },
  {
    group: "Semantic",
    tokens: [
      {
        token: "--focus-ring",
        name: "Focus Ring",
        usage: ":focus-visible outline",
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
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--outline-variant)]">
      <span
        aria-hidden="true"
        className="h-20 w-full border-b border-[var(--outline-variant)]"
        style={{ background: `var(${token})` }}
      />
      <div className="flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-md)]">
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
};

const TYPE_TOKENS: TypeToken[] = [
  {
    token: "display-primary",
    family: "Manrope",
    size: 64,
    weight: 600,
    lh: 70,
  },
  { token: "display-title", family: "Manrope", size: 56, weight: 600, lh: 64 },
  {
    token: "heading-display",
    family: "Manrope",
    size: 36,
    weight: 600,
    lh: 44,
  },
  {
    token: "heading-section",
    family: "Manrope",
    size: 26,
    weight: 600,
    lh: 34,
  },
  {
    token: "heading-component",
    family: "Manrope",
    size: 22,
    weight: 600,
    lh: 30,
  },
  {
    token: "heading-narrative",
    family: "Manrope",
    size: 20,
    weight: 600,
    lh: 28,
  },
  { token: "body-lead", family: "Inter", size: 24, weight: 400, lh: 34 },
  { token: "body-primary", family: "Inter", size: 18, weight: 400, lh: 28 },
  { token: "body-secondary", family: "Inter", size: 18, weight: 400, lh: 28 },
  { token: "body-emphasis", family: "Inter", size: 18, weight: 500, lh: 28 },
  { token: "body-caption", family: "Inter", size: 14, weight: 400, lh: 20 },
  { token: "callout-title", family: "Inter", size: 16, weight: 600, lh: 20 },
  {
    token: "interactive-label",
    family: "Inter",
    size: 14,
    weight: 500,
    lh: 20,
  },
  { token: "nav-link", family: "Inter", size: 14, weight: 500, lh: 20 },
  { token: "support-meta", family: "Inter", size: 13, weight: 400, lh: 20 },
  {
    token: "mono-anchor",
    family: "JetBrains Mono",
    size: 15,
    weight: 500,
    lh: 20,
  },
  {
    token: "insight-label",
    family: "JetBrains Mono",
    size: 13,
    weight: 500,
    lh: 16,
  },
  {
    token: "tag-chip",
    family: "JetBrains Mono",
    size: 12,
    weight: 500,
    lh: 16,
  },
  {
    token: "mono-code",
    family: "JetBrains Mono",
    size: 16,
    weight: 400,
    lh: 24,
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
          <p className={`${t.token} min-w-0 truncate`}>Aishwarya Ganesan</p>
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
          <span className="w-28 shrink-0 font-mono text-[12px] text-[var(--on-surface-muted)]">
            --spacing-{token}
          </span>
          <span
            aria-hidden="true"
            className="h-3 rounded-[var(--radius-sm)] bg-[var(--accent)]"
            style={{ width: `var(--spacing-${token})` }}
          />
          <span className="body-caption">{px}px</span>
        </div>
      ))}
    </div>
  );
}

const RADIUS_TOKENS: { token: string; label: string; usage: string }[] = [
  { token: "sm", label: "4px", usage: "Tags, buttons, small fills" },
  { token: "md", label: "8px", usage: "Cards, figures, panels" },
  { token: "pill", label: "9999px", usage: "Pill nav, link pills, FAB" },
];

export function RadiusScaleSpecimen() {
  return (
    <div className="flex flex-wrap gap-[var(--spacing-xl)]">
      {RADIUS_TOKENS.map(({ token, label, usage }) => (
        <div
          key={token}
          className="flex w-40 flex-col items-center gap-[var(--spacing-sm)]"
        >
          <span
            aria-hidden="true"
            className="h-16 w-16 border border-[var(--outline)] bg-[var(--surface-raised)]"
            style={{ borderRadius: `var(--radius-${token})` }}
          />
          <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
            --radius-{token} · {label}
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
          className={`flex min-h-[120px] flex-col justify-between rounded-[var(--radius-md)] p-[var(--spacing-md)] ${className}`}
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

const BREAKPOINTS: { name: string; width: string; changes: string }[] = [
  {
    name: "mobile",
    width: "≤ 768px",
    changes:
      "Single column; pill nav → mobile hamburger; type scales down; full-bleed ascii field",
  },
  {
    name: "tablet / desktop",
    width: "769–1279px",
    changes: "Mid-tier type; multi-column grids; horizontal pill nav",
  },
  {
    name: "desktop-large",
    width: "1280px+",
    changes: "Full layout; 1200px max content column; meteor layer active",
  },
];

export function ResponsiveSpecimen() {
  return (
    <div className="prose-content">
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
            <tr key={b.name}>
              <td className="font-mono text-[13px]">{b.name}</td>
              <td className="font-mono text-[13px]">{b.width}</td>
              <td>{b.changes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReferenceTable({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="editorial-dl">
      {rows.map(([term, value]) => (
        <div key={term} className="contents">
          <dt className="font-mono text-[13px] text-[var(--on-surface)]">
            {term}
          </dt>
          <dd className="body-secondary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MotionTokenTable() {
  return (
    <ReferenceTable
      rows={[
        ["--duration-fast", "150ms"],
        ["--duration-base", "200ms"],
        ["--duration-slow", "300ms"],
        ["--ease-standard", "cubic-bezier(0.2, 0, 0, 1)"],
        ["--ease-emphasis", "cubic-bezier(0.3, 0, 0, 1)"],
      ]}
    />
  );
}

export function ZIndexTokenTable() {
  return (
    <ReferenceTable
      rows={[
        ["--z-base", "0"],
        ["--z-sticky-content", "20"],
        ["--z-scroll-to-top", "40"],
        ["--z-pill-nav", "50"],
        ["--z-mobile-menu-overlay", "55"],
        ["--z-mobile-menu-panel", "60"],
      ]}
    />
  );
}
