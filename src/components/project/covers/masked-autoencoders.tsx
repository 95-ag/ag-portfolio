// Cover — "heavy masking → asymmetric autoencoder → reconstruct" (the MAE signature).
// The single focal SUBJECT is the masked input: a 6×6 patch grid where the visible 25%
// are ACCENT and the masked 75% recede — the project's headline (masking) carries the
// accent, the rest of the pipeline is neutral structure. Center: an encoder/decoder
// funnel — encoder trapezoid narrowing toward the latent, a smaller DASHED decoder
// trapezoid widening toward the output (dashed = discarded after pretraining; the size
// gap reads as the lightweight-decoder asymmetry). Right: a uniform soft grid — the
// reconstruction, recovered but blurry at reduced scale.

const COLS = 6;
const ROWS = 6;
const PITCH = 45; // cell-to-cell spacing
const RECT = 40; // patch size; the 5px remainder is the inter-patch gap
const GRID_Y0 = 202; // grid top; spans to 467, vertically centered on AXIS_Y
const LEFT_X0 = 120; // masked-input grid left edge
const RIGHT_X0 = 808; // reconstruction grid left edge
const AXIS_Y = 337; // pipeline centerline (canvas vertical center)

// 9 visible patches of 36 (25% kept, 75% masked) — deterministic scatter so the build
// is reproducible (Math.random is unavailable at static-generation time).
const VISIBLE = new Set([
  "0-1",
  "0-4",
  "1-2",
  "2-0",
  "2-5",
  "3-3",
  "4-1",
  "4-4",
  "5-2",
]);

const CELLS = Array.from({ length: ROWS }, (_, row) =>
  Array.from({ length: COLS }, (_, col) => ({ row, col })),
).flat();

// Masked cells need a faint neutral that stays visible against the page surface in both
// themes — surface-sunken collapses into the background — so the full grid reads as
// "75% blanked", not scattered patches. Graded color-mix steps keep it theme-aware.
const MASKED_FILL = "color-mix(in srgb, var(--on-surface) 16%, var(--surface))";
const RECON_FILL = "color-mix(in srgb, var(--on-surface) 38%, var(--surface))";
const ENCODER_FILL = "color-mix(in srgb, var(--on-surface) 8%, var(--surface))";

// Encoder/decoder funnel (autoencoder iconography). Encoder narrows L→R toward the
// latent; the smaller decoder widens L→R toward the reconstruction.
const ENCODER_POINTS = "468,237 556,289 556,385 468,437";
const DECODER_POINTS = "648,305 712,287 712,387 648,369";

export function MaskedAutoencodersCover() {
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains-mono)",
    fontSize: 18,
    letterSpacing: "0.08em",
    fill: "var(--on-surface)",
  };

  const caveatStyle: React.CSSProperties = {
    fontFamily: "var(--font-caveat)",
    fontSize: 30,
    fill: "var(--accent)",
  };

  const arrow = (x1: number, x2: number, key: string) => (
    <g key={key}>
      <line
        x1={x1}
        y1={AXIS_Y}
        x2={x2}
        y2={AXIS_Y}
        stroke="var(--on-surface)"
        strokeWidth="2"
      />
      <polyline
        points={`${x2 - 8},${AXIS_Y - 8} ${x2},${AXIS_Y} ${x2 - 8},${AXIS_Y + 8}`}
        fill="none"
        stroke="var(--on-surface)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  );

  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <svg
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── MASKED INPUT (left grid, the focal subject) ── visible 25% accent */}
        {CELLS.map(({ row, col }) => {
          const visible = VISIBLE.has(`${row}-${col}`);
          return (
            <rect
              key={`in-${row}-${col}`}
              x={LEFT_X0 + col * PITCH}
              y={GRID_Y0 + row * PITCH}
              width={RECT}
              height={RECT}
              rx={2}
              fill={visible ? "var(--accent)" : MASKED_FILL}
            />
          );
        })}
        <text x="252" y="497" textAnchor="middle" style={labelStyle}>
          MASKED INPUT
        </text>

        {/* ── ARROW 1 ── masked input → encoder */}
        {arrow(398, 460, "a1")}

        {/* ── ENCODER (neutral funnel — narrows toward the latent) ── */}
        <polygon
          points={ENCODER_POINTS}
          fill={ENCODER_FILL}
          stroke="var(--on-surface)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="512" y="462" textAnchor="middle" style={labelStyle}>
          ENCODER
        </text>

        {/* ── ARROW 2 ── encoder → decoder */}
        {arrow(564, 640, "a2")}

        {/* ── DECODER (neutral, dashed = discarded; smaller funnel — widens to output) ── */}
        <polygon
          points={DECODER_POINTS}
          fill="none"
          stroke="var(--on-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeDasharray="6 5"
        />
        <text x="680" y="410" textAnchor="middle" style={labelStyle}>
          DECODER
        </text>

        {/* ── ARROW 3 ── decoder → reconstruction */}
        {arrow(720, 800, "a3")}

        {/* ── RECONSTRUCTION (right grid) ── uniform soft fill: recovered but blurry */}
        {CELLS.map(({ row, col }) => (
          <rect
            key={`out-${row}-${col}`}
            x={RIGHT_X0 + col * PITCH}
            y={GRID_Y0 + row * PITCH}
            width={RECT}
            height={RECT}
            rx={2}
            fill={RECON_FILL}
          />
        ))}
        <text x="940" y="497" textAnchor="middle" style={labelStyle}>
          RECONSTRUCTION
        </text>

        {/* ════════════════════════════════════════
            ANNOTATIONS — Caveat, accent color only
            ════════════════════════════════════════ */}

        {/* 1. visible (accent) patch in the masked grid → "75% masking / sweet spot".
               Notebook gesture: the arrow runs FROM the figure TO the handwritten note,
               so the arrowHEAD sits at the text. Fixed 8px gap at BOTH ends: tail (320,194)
               = 8px above the patch top (320,202); tip (393,101) = 8px left of the text
               block's left-middle (401,101). Final tangent u≈(0.64,-0.77); barbs ±28°. */}
        <text x="468" y="96" textAnchor="middle" style={caveatStyle}>
          75% masking
        </text>
        <text x="468" y="126" textAnchor="middle" style={caveatStyle}>
          sweet spot
        </text>
        <path
          d="M 320,194 C 322,150 369,130 388,107"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="393"
          y1="101"
          x2="384"
          y2="105"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="393"
          y1="101"
          x2="391"
          y2="111"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 2. the ENCODER label → "66.85% / linear-probe acc". Linear-probe accuracy is
               measured on the FROZEN ENCODER (the kept artifact). Notebook gesture: the
               arrow runs FROM the figure TO the note, so the arrowHEAD sits at the text.
               Fixed 8px gap at BOTH ends: tail (516,475) = 8px below the ENCODER label
               bottom (467); tip (610,529) = 8px left of the text block's left-middle
               (618,529). Curve is convex-DOWN (controls below the chord, sagging); final
               tangent u≈(0.96,0.29) (down-right); barbs splay ±28°. */}
        <text x="700" y="524" textAnchor="middle" style={caveatStyle}>
          66.85%
        </text>
        <text x="700" y="554" textAnchor="middle" style={caveatStyle}>
          linear-probe acc
        </text>
        <path
          d="M 516,475 C 540,498 569,517 602,527"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="610"
          y1="529"
          x2="603"
          y2="522"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="610"
          y1="529"
          x2="600"
          y2="531"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
