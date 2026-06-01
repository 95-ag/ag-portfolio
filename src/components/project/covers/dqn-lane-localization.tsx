// Cover — "crooked prediction on a curving road".
// The whole road follows ONE centerline curve (a C-bend, like the TuSimple lanes),
// and every lane is that centerline offset by a width that narrows uniformly toward
// the vanishing point — so the road keeps a constant width and bends as a unit rather
// than bulging in the middle. The camera is offset (VP in the right third) for an
// asymmetric composition. Built only from neutral surface tokens (sky / roadside /
// road). The center-left lane carries neutral ground-truth circles (TuSimple dot
// sequence); the DQL prediction is crooked ACCENT dots offset from truth with a faint
// motion trail — never settling onto ground truth. Encodes the honest negative result.

const VP_X = 960; // vanishing point in the right third (offset camera, shifted right)
const VP_Y = 150; // high horizon
const BOTTOM_Y = 675; // road reaches the image bottom
const BOT_CX = 580; // road centerline x at the bottom (road shifted right)
const CTRL_X = 620; // centerline control x — < straight midpoint bows it into a C
const HALF_W = 440; // road half-width at the bottom (near the viewer)
const HORIZON_HALF = 48; // road half-width at the horizon (gentler taper)

// Control point at the y-midpoint keeps y LINEAR in t, so dot sampling is exact:
//   y(t) = VP_Y + t*(BOTTOM_Y - VP_Y).
const CTRL_Y = (VP_Y + BOTTOM_Y) / 2;
const tAtY = (y: number) => (y - VP_Y) / (BOTTOM_Y - VP_Y);

// A lane = the centerline shifted by `frac` of the road half-width. Because the
// half-width narrows linearly from HALF_W (bottom) to HORIZON_HALF (top), every lane
// is still a single quadratic Bézier — the offset folds cleanly into its control point.
const topX = (frac: number) => VP_X + frac * HORIZON_HALF;
const botX = (frac: number) => BOT_CX + frac * HALF_W;
const ctrlX = (frac: number) => CTRL_X + frac * ((HALF_W + HORIZON_HALF) / 2);

const laneXAtY = (frac: number, y: number) => {
  const t = tAtY(y);
  const a = topX(frac);
  const c = ctrlX(frac);
  const b = botX(frac);
  return (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;
};
const lanePath = (frac: number) =>
  `M ${topX(frac)} ${VP_Y} Q ${ctrlX(frac)} ${CTRL_Y} ${botX(frac)} ${BOTTOM_Y}`;

// Lane dividers at ±1/3 of the half-width; the road edges (±1) are the fill boundary.
const DIVIDER_FRACS = [-1 / 3, 1 / 3];
const DOT_LANE_FRAC = -1 / 3; // dots run ALONG the left lane divider line

// Road surface fill — left edge down, across the bottom, up the right edge.
const roadPath = () =>
  [
    `M ${topX(-1)} ${VP_Y}`,
    `Q ${ctrlX(-1)} ${CTRL_Y} ${botX(-1)} ${BOTTOM_Y}`,
    `L ${botX(1)} ${BOTTOM_Y}`,
    `Q ${ctrlX(1)} ${CTRL_Y} ${topX(1)} ${VP_Y}`,
    "Z",
  ].join(" ");

// Markers run end-to-end down the lane at a fixed y-interval (like TuSimple's
// fixed-y annotations) — dense and uniformly spaced. Uniform size (no perspective
// scaling) so the row reads as one consistent point sequence.
const FIRST_Y = 168; // just below the horizon
const ROW_STEP = 26; // uniform y-spacing → dense sequence
const ROW_YS = Array.from(
  { length: Math.floor((BOTTOM_Y - FIRST_Y) / ROW_STEP) + 1 },
  (_, i) => FIRST_Y + i * ROW_STEP,
);

const CIRCLE_R = 6; // ground-truth (hollow) circles — all identical
const DOT_R = 3.5; // predicted (filled) dots — uniform, smaller than the circles
const GHOST_R = 2.5; // trail echoes — smallest
const PRED_NUDGE = 6; // base rightward offset so the predicted dots clear the lane
const PRED_GAP = 70; // extra gap that grows toward the bottom (widest near the viewer)

export function DqnLaneLocalizationCover() {
  const truth = ROW_YS.map((y) => ({
    y,
    x: laneXAtY(DOT_LANE_FRAC, y),
  }));

  // Predicted lane sits right of the truth lane by a gap that GROWS toward the viewer:
  // tight near the middle of the sequence, widest at the bottom — the DQL prediction
  // drifts further off the lane the closer (larger) the points get. Gap = PRED_NUDGE +
  // PRED_GAP·f² (f = fraction top→bottom), plus light deterministic jitter for noise.
  const topY = ROW_YS[0];
  const botY = ROW_YS[ROW_YS.length - 1];
  const predicted = truth.map((p, i) => {
    const f = (p.y - topY) / (botY - topY);
    const gap = PRED_NUDGE + PRED_GAP * f * f;
    const jitter = Math.sin(i * 1.7) * 3; // deterministic, no Math.random
    return { ...p, x: p.x + gap + jitter };
  });
  const predLine = predicted.map((p) => `${p.x},${p.y}`).join(" ");

  // Ghost trail — 3 echoes to the RIGHT of each predicted dot (away from the lane),
  // packed close so the dot reads as having moved leftward toward the lane. Distinct
  // grey SHADES (not opacity) that recede toward the page in each theme: the base
  // (--outline-variant) is light in light mode and dark in dark mode, and each step
  // mixes further into --surface, so echoes get lighter-in-light / darker-in-dark.
  const GHOST_STEPS = [0.22, 0.46, 0.72]; // rightward offset past the predicted dot
  const GHOST_SHADES = [
    "var(--outline-variant)",
    "color-mix(in srgb, var(--outline-variant) 65%, var(--surface))",
    "color-mix(in srgb, var(--outline-variant) 35%, var(--surface))",
  ];
  const ghosts = predicted.flatMap((p, i) => {
    const gap = p.x - truth[i].x;
    return GHOST_STEPS.map((g, j) => ({
      key: `${i}-${j}`,
      x: p.x + gap * g,
      y: p.y,
      shade: GHOST_SHADES[j],
    }));
  });

  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <svg
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Scene bands (neutral surface tokens) ── */}
        {/* Sky — tag tone nudged toward --on-surface (near-neutral, theme-flipping):
            darker than the card (--surface-raised) in light, lighter than it in dark,
            and distinct from the --surface-tag ground band — without a green cast. */}
        <rect
          x="0"
          y="0"
          width="1200"
          height={VP_Y}
          fill="color-mix(in srgb, var(--surface-tag) 90%, var(--on-surface))"
        />
        {/* Roadside ground */}
        <rect
          x="0"
          y={VP_Y}
          width="1200"
          height={675 - VP_Y}
          fill="var(--surface-tag)"
        />
        {/* Road surface — borderless; the fill contrast carries the road edge */}
        <path d={roadPath()} fill="var(--surface-sunken)" />

        {/* Lane dividers (solid grey, perspective) */}
        {DIVIDER_FRACS.map((frac) => (
          <path
            key={`div-${frac}`}
            d={lanePath(frac)}
            fill="none"
            stroke="var(--outline-variant)"
            strokeWidth="1.25"
          />
        ))}

        {/* Ground-truth points — uniform unfilled circles along the real (curved) lane */}
        {truth.map((p) => (
          <circle
            key={`truth-${p.y}`}
            cx={p.x}
            cy={p.y}
            r={CIRCLE_R}
            fill="none"
            stroke="var(--on-surface)"
            strokeWidth="1.5"
          />
        ))}

        {/* Ghost trail — light-grey echoes of the agent nudging toward the lane */}
        {ghosts.map((g) => (
          <circle
            key={`ghost-${g.key}`}
            cx={g.x}
            cy={g.y}
            r={GHOST_R}
            fill={g.shade}
          />
        ))}

        {/* Predicted lane — thin green line threading the predicted dots (thinner
            than the lane stroke), the straighter chord on the lane's right. */}
        <polyline
          points={predLine}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.75"
        />

        {/* Predicted points — uniform accent dots, smaller than the truth circles.
            The single focal structure: prediction that fails to track the curve. */}
        {predicted.map((p) => (
          <circle
            key={`pred-${p.y}`}
            cx={p.x}
            cy={p.y}
            r={DOT_R}
            fill="var(--accent)"
          />
        ))}

        {/* ── ANNOTATION (Caveat, accent) — the headline negative result. Text sits in
              the open ground on the LEFT (vertical middle); a curved arrow sweeps to the
              gap between the truth lane and the predicted dots near the mid-bottom. ── */}
        <text
          x={256}
          y={330}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-caveat)" }}
          fontSize={28}
          fill="var(--accent)"
        >
          localized acc 0.892
        </text>
        <text
          x={256}
          y={360}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-caveat)" }}
          fontSize={28}
          fill="var(--accent)"
        >
          worse than baseline 0.900
        </text>
        {/* Arrow: from the text's CENTER-bottom, a pronounced curve down to a point
            just OUTSIDE (left of) the truth lane at ~(472,556); the truth circle there
            is at x≈495. Path stops 8px before the arrowhead tip. */}
        {/* notebook gesture: tail at the truth-vs-prediction gap (figure), head up-left
            at the note's bottom edge. Final tangent u≈(-0.6,-0.8); barbs splay ±28°. */}
        <path
          d="M 472,556 C 405,548 291,423 261,383"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="256"
          y1="377"
          x2="258"
          y2="387"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="256"
          y1="377"
          x2="265"
          y2="381"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
