const CAVEAT: React.CSSProperties = { fontFamily: "var(--font-caveat)" };

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
  const matrixOriginX = 136 - ((dotCols - 1) * dotGap) / 2; // = 94; shifted +6 to center composition
  const matrixOriginY = 337 - ((dotRows - 1) * dotGap) / 2; // = 295
  const accentDotRow = 1;
  const accentDotCol = 2;
  // Accent dot: x = 94 + 2*28 = 150, y = 295 + 28 = 323

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
        <text x="136" y="240" textAnchor="middle" style={labelStyle}>
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

        {/* ── ARROW 1 ── (90px) */}
        <line
          x1="236"
          y1="337"
          x2="326"
          y2="337"
          stroke="var(--on-surface)"
          strokeWidth="2"
        />
        <polyline
          points="318,329 326,337 318,345"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ── VICTIM ── */}
        <rect
          x="346"
          y="247"
          width="240"
          height="180"
          fill="var(--on-surface)"
          opacity="0.9"
          rx="2"
        />
        <text x="466" y="332" textAnchor="middle" style={mutedStyle}>
          VICTIM
        </text>
        <text x="466" y="358" textAnchor="middle" style={mutedStyle}>
          API
        </text>

        {/* ── ARROW 2 ── (90px) */}
        <line
          x1="586"
          y1="337"
          x2="676"
          y2="337"
          stroke="var(--on-surface)"
          strokeWidth="2"
        />
        <polyline
          points="668,329 676,337 668,345"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ── PSEUDO LABELS ── */}
        <text x="766" y="240" textAnchor="middle" style={labelStyle}>
          PSEUDO LABELS
        </text>

        {/* Three stacked bars — evoke softmax distribution */}
        <rect
          x="706"
          y="272"
          width="120"
          height="14"
          fill="var(--on-surface)"
          rx="2"
        />
        <rect
          x="706"
          y="296"
          width="78"
          height="14"
          fill="var(--on-surface)"
          rx="2"
          opacity="0.65"
        />
        <rect
          x="706"
          y="320"
          width="38"
          height="14"
          fill="var(--on-surface)"
          rx="2"
          opacity="0.35"
        />

        {/* ── ARROW 3 ── (90px) */}
        <line
          x1="836"
          y1="337"
          x2="926"
          y2="337"
          stroke="var(--on-surface)"
          strokeWidth="2"
        />
        <polyline
          points="918,329 926,337 918,345"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ── SURROGATE ── */}
        <rect
          x="946"
          y="247"
          width="160"
          height="180"
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="3"
          rx="2"
        />
        <text x="1026" y="337" textAnchor="middle" style={labelStyle}>
          SURROGATE
        </text>

        {/* ════════════════════════════════════════
            ANNOTATIONS — Caveat, accent color only
            ════════════════════════════════════════ */}

        {/* 1. "entropy-ranked / selection" → QUERIES dot matrix as a whole
               Text is below the target; path starts from TOP of text block (closest edge to matrix). */}
        <text
          x="225"
          y="490"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          entropy-ranked
        </text>
        <text
          x="225"
          y="522"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          selection
        </text>
        {/* notebook gesture: tail at the matrix, convex sweep bowing LEFT, head into the note */}
        <path
          d="M 115,388 C 88,435 97,469 129,476"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="137"
          y1="478"
          x2="129"
          y2="472"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="137"
          y1="478"
          x2="127"
          y2="481"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 2. "25K queries" → arrow 1 midpoint (281, 337)
               Path starts 10px below text baseline; tip stops 7px above the arrow line. */}
        <text
          x="310"
          y="168"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          only 25K queries
        </text>
        {/* notebook gesture: tail at arrow 1, tall convex sweep up (bows left), head at the note */}
        <path
          d="M 305,330 C 289,288 302,225 309,192"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="311"
          y1="184"
          x2="305"
          y2="192"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="311"
          y1="184"
          x2="314"
          y2="194"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 3. "82.88% fidelity" → SURROGATE box bottom (y=427)
               Text is below the target; path starts from TOP of text (closest edge to box). */}
        <text
          x="820"
          y="505"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          82.88% fidelity
        </text>
        {/* notebook gesture: tail below the surrogate, hooks out right then sweeps left, head at the note */}
        <path
          d="M 1000,450 C 1045,478 948,494 914,497"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="906"
          y1="498"
          x2="915"
          y2="502"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="906"
          y1="498"
          x2="914"
          y2="493"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
