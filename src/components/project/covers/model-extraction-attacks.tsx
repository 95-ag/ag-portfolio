export function ModelExtractionAttacksCover() {
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains-mono)",
    fontSize: 20,
    letterSpacing: "0.05em",
    fill: "var(--on-surface)",
  };

  const mutedStyle: React.CSSProperties = {
    ...labelStyle,
    fill: "var(--background)",
  };

  const dotCols = 4;
  const dotRows = 4;
  const dotGap = 28;
  const dotRadius = 5;
  const matrixOriginX = 130 - ((dotCols - 1) * dotGap) / 2;
  const matrixOriginY = 337 - ((dotRows - 1) * dotGap) / 2;
  // Accent dot: row 1, col 2 (0-indexed) — near center-top of matrix
  const accentDotRow = 1;
  const accentDotCol = 2;

  const dots = Array.from({ length: dotRows }, (_, row) =>
    Array.from({ length: dotCols }, (_, col) => {
      const isAccent = row === accentDotRow && col === accentDotCol;
      return { row, col, isAccent };
    }),
  ).flat();

  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <svg
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* ── QUERIES ── */}
        <text x="130" y="240" textAnchor="middle" style={labelStyle}>
          QUERIES
        </text>

        {/* Dot matrix */}
        {dots.map(({ row, col, isAccent }) => (
          <circle
            key={`${row}-${col}`}
            cx={matrixOriginX + col * dotGap}
            cy={matrixOriginY + row * dotGap}
            r={isAccent ? 9 : dotRadius}
            fill={isAccent ? "var(--accent)" : "var(--on-surface)"}
          />
        ))}

        {/* ── ARROW 1 ── */}
        <line
          x1="230"
          y1="337"
          x2="340"
          y2="337"
          stroke="var(--on-surface)"
          strokeWidth="2"
        />
        <polyline
          points="332,329 340,337 332,345"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ── VICTIM ── */}
        <rect
          x="360"
          y="247"
          width="240"
          height="180"
          fill="var(--on-surface)"
          opacity="0.9"
          rx="2"
        />
        <text x="480" y="332" textAnchor="middle" style={mutedStyle}>
          VICTIM
        </text>
        <text x="480" y="358" textAnchor="middle" style={mutedStyle}>
          API
        </text>

        {/* ── ARROW 2 ── */}
        <line
          x1="600"
          y1="337"
          x2="710"
          y2="337"
          stroke="var(--on-surface)"
          strokeWidth="2"
        />
        <polyline
          points="702,329 710,337 702,345"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ── PSEUDO LABELS ── */}
        <text x="800" y="240" textAnchor="middle" style={labelStyle}>
          PSEUDO LABELS
        </text>

        {/* Three stacked bars — evoke softmax distribution */}
        <rect
          x="740"
          y="272"
          width="120"
          height="14"
          fill="var(--on-surface)"
          rx="2"
        />
        <rect
          x="740"
          y="296"
          width="78"
          height="14"
          fill="var(--on-surface)"
          rx="2"
          opacity="0.65"
        />
        <rect
          x="740"
          y="320"
          width="38"
          height="14"
          fill="var(--on-surface)"
          rx="2"
          opacity="0.35"
        />

        {/* ── ARROW 3 ── */}
        <line
          x1="870"
          y1="337"
          x2="980"
          y2="337"
          stroke="var(--on-surface)"
          strokeWidth="2"
        />
        <polyline
          points="972,329 980,337 972,345"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ── SURROGATE ── */}
        <rect
          x="1000"
          y="247"
          width="160"
          height="180"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="3"
          rx="2"
        />
        <text x="1080" y="337" textAnchor="middle" style={labelStyle}>
          SURROGATE
        </text>
      </svg>
    </div>
  );
}
