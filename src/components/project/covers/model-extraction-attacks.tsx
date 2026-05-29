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

        {/* ── ARROW 1 ── (90px, was 110px) */}
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
          x="136"
          y="452"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          entropy-ranked
        </text>
        <text
          x="136"
          y="484"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          selection
        </text>
        <path
          d="M 136,428 C 134,415 133,400 136,381"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="136"
          y1="373"
          x2="130"
          y2="381"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="136"
          y1="373"
          x2="142"
          y2="381"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 2. "25K queries" → arrow 1 midpoint (281, 337)
               Path starts 10px below text baseline; tip stops 7px above the arrow line. */}
        <text
          x="281"
          y="255"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          25K queries
        </text>
        <path
          d="M 281,265 C 276,282 278,304 280,322"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="280"
          y1="330"
          x2="274"
          y2="322"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="280"
          y1="330"
          x2="287"
          y2="322"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 3. "82.88% fidelity" → SURROGATE box bottom (y=427)
               Text is below the target; path starts from TOP of text (closest edge to box). */}
        <text
          x="1026"
          y="490"
          textAnchor="middle"
          style={{ ...CAVEAT, fontSize: 30, fill: "var(--accent)" }}
        >
          82.88% fidelity
        </text>
        <path
          d="M 1026,465 C 1020,455 1023,445 1026,440"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="1026"
          y1="432"
          x2="1020"
          y2="440"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="1026"
          y1="432"
          x2="1032"
          y2="440"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
