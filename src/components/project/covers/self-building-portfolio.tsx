// Cover — "sources → gated pipeline → page" (the spec-as-contract signature).
// Three source nodes (REPO, REPORT, SOURCES) fan into a single junction, then a four-stage
// pipeline where each stage is the SAME project page gaining one element: Content writes
// prose, Assets lands a figure, Cover adds the hero band, Review signs off. The single focal
// subject is the gate system — bold accent gate badges between stages, the human-approval
// discipline that anchors the agent. Two rails labeled DOCS · RULES · GATES frame it.

import { COVER_ANNOTATION, COVER_LABEL, COVER_SUBLABEL } from "./cover-styles";

// A tonal ladder inside each page builds the dark anchor the composition needs (cf. the
// house covers' single bold element): faint text < medium figure < solid-ink hero band.
const SOURCE_FILL = "var(--surface-tag)";
const TEXT_OP = 0.24;
const FIGURE_OP = 0.42;
const HERO_OP = 0.85;

// Notebook-gesture leader: a curve that leaves the figure (tail) along startDeg and arrives
// into the note (tip) along endDeg — the chosen final tangent — so the arrowhead aligns to
// the curve, not the straight tail→tip line. Returns the path and the two barb endpoints.
function leader(
  tail: [number, number],
  tip: [number, number],
  startDeg: number,
  endDeg: number,
  startLen = 34,
  endLen = 30,
) {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const sdx = Math.cos(rad(startDeg)); // exit direction leaving the figure
  const sdy = Math.sin(rad(startDeg));
  const edx = Math.cos(rad(endDeg)); // final tangent — the direction INTO the tip
  const edy = Math.sin(rad(endDeg));
  const sx = tail[0] + 8 * sdx; // 8px off the figure, leaving along startDeg
  const sy = tail[1] + 8 * sdy;
  const ex = tip[0] - 8 * edx; // path ends 8px before the tip, arriving along endDeg
  const ey = tip[1] - 8 * edy;
  // Long control arms make the curve curl (candy-cane); short arms keep it a gentle arc.
  const p1x = sx + startLen * sdx; // lock the start tangent
  const p1y = sy + startLen * sdy;
  const p2x = ex - endLen * edx; // lock the end tangent so the arrowhead is tangent to the curve
  const p2y = ey - endLen * edy;
  const th = rad(28);
  const L = 10;
  // barbs splay ±θ about −endDir (pointing back from the tip along the curve)
  const barb = (s: number): [number, number] => [
    tip[0] + L * (-edx * Math.cos(s * th) + edy * Math.sin(s * th)),
    tip[1] + L * (-edx * Math.sin(s * th) - edy * Math.cos(s * th)),
  ];
  return {
    d: `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${p1x.toFixed(1)} ${p1y.toFixed(1)} ${p2x.toFixed(1)} ${p2y.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
    b1: barb(1),
    b2: barb(-1),
  };
}

const AXIS_Y = 337; // canvas vertical center
const BOX_W = 132;
const BOX_H = 238;
const BOX_TOP = AXIS_Y - BOX_H / 2;
const BOX_BOT = BOX_TOP + BOX_H;

export function SelfBuildingPortfolioCover() {
  const stages = [
    { x: 245, label: "CONTENT", hero: false, figure: false },
    { x: 461, label: "ASSETS", hero: false, figure: true },
    { x: 677, label: "COVER", hero: true, figure: true },
    { x: 893, label: "REVIEW", hero: true, figure: true },
  ];

  // Midpoint of each 84px gap between stages.
  const gateXs = [419, 635, 851];

  const sources = [
    { cy: 240, label: "REPO" },
    { cy: 337, label: "REPORT" },
    { cy: 434, label: "SOURCES" },
  ];
  const srcX = 70;
  const srcW = 88;
  const srcH = 54;
  const junctionX = 194;
  const stage0X = 245;

  const pageX = 1076;
  const pageW = 52;
  const pageH = 68;
  const pageY = AXIS_Y - pageH / 2;

  const railTop = 202;
  const railBot = 468;
  const railX1 = 225;
  const railX2 = 1045;

  // Gate-3 annotations — a note per zone, balanced (two above, two below), each anchored
  // to the element that produces its claim. tail = figure, tip = arrowhead at the note.
  const notes: {
    lines: string[];
    x: number;
    y: number;
    tail: [number, number];
    tip: [number, number];
    startDeg: number;
    endDeg: number;
    startLen?: number;
    endLen?: number;
  }[] = [
    {
      lines: ["no source,", "no claim"],
      x: 182,
      y: 548,
      tail: [118, 476],
      tip: [122, 560],
      startDeg: 100,
      endDeg: 0,
      startLen: 16,
      endLen: 18,
    },
    {
      lines: ["the agent drafts,", "the human decides"],
      x: 455,
      y: 112,
      tail: [419, 320],
      tip: [450, 154],
      startDeg: 290,
      endDeg: 255,
    },
    {
      // candy-cane: leaves the sign-off, bulges right, arrowhead curls into the note's RIGHT edge pointing left
      lines: ["two cold reviewers", "no shared notes"],
      x: 970,
      y: 560,
      tail: [1050, 430],
      tip: [1075, 565],
      startDeg: 50,
      endDeg: 180,
      startLen: 45,
      endLen: 60,
    },
    {
      lines: ["reusable —", "not a one-off"],
      x: 1035,
      y: 110,
      tail: [1085, 304],
      tip: [1056, 152],
      startDeg: 245,
      endDeg: 262,
    },
  ];

  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <svg
        viewBox="0 0 1200 675"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── GROUNDING RAILS ── */}
        {[railTop, railBot].map((ry) => (
          <g key={ry}>
            <line
              x1={railX1}
              y1={ry}
              x2={railX2}
              y2={ry}
              stroke="var(--hairline-strong)"
              strokeWidth={1}
            />
            <line
              x1={railX1}
              y1={ry}
              x2={railX1}
              y2={ry === railTop ? ry + 9 : ry - 9}
              stroke="var(--hairline-strong)"
              strokeWidth={1}
            />
            <line
              x1={railX2}
              y1={ry}
              x2={railX2}
              y2={ry === railTop ? ry + 9 : ry - 9}
              stroke="var(--hairline-strong)"
              strokeWidth={1}
            />
          </g>
        ))}
        <text
          x={635}
          y={186}
          textAnchor="middle"
          style={
            {
              ...COVER_SUBLABEL,
              letterSpacing: "0.16em",
            } as React.CSSProperties
          }
          fill="var(--ink-muted)"
        >
          DOCS · RULES · GATES
        </text>

        {/* ── SOURCE NODES ── */}
        {sources.map(({ cy, label }, si) => {
          const by = cy - srcH / 2;
          return (
            <g key={label}>
              <rect
                x={srcX}
                y={by}
                width={srcW}
                height={srcH}
                rx={4}
                fill={SOURCE_FILL}
                stroke="var(--hairline-strong)"
                strokeWidth={1}
              />
              {si === 0 && (
                <text
                  x={srcX + srcW / 2}
                  y={cy + 6}
                  textAnchor="middle"
                  style={
                    {
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 16,
                    } as React.CSSProperties
                  }
                  fill="var(--ink)"
                  opacity={0.42}
                >
                  {"</>"}
                </text>
              )}
              {si === 1 &&
                [0.7, 0.5, 0.78].map((fw, i) => (
                  <rect
                    key={`rep-${fw}`}
                    x={srcX + 12}
                    y={by + 14 + i * 12}
                    width={(srcW - 24) * fw}
                    height={5}
                    rx={1}
                    fill="var(--ink)"
                    opacity={0.2}
                  />
                ))}
              {si === 2 &&
                [0, 1].flatMap((row) =>
                  [0, 1].map((col) => (
                    <rect
                      key={`${row}-${col}`}
                      x={srcX + 20 + col * 24}
                      y={by + 14 + row * 15}
                      width={18}
                      height={11}
                      rx={1}
                      fill="var(--ink)"
                      opacity={0.2}
                    />
                  )),
                )}
              <text
                x={srcX + srcW / 2}
                y={by + srcH + 18}
                textAnchor="middle"
                style={COVER_SUBLABEL}
                fill="var(--ink-muted)"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* ── FUNNEL ── */}
        {sources.map(({ cy, label }) => (
          <line
            key={label}
            x1={srcX + srcW}
            y1={cy}
            x2={junctionX}
            y2={AXIS_Y}
            stroke="var(--ink)"
            strokeWidth={1}
            opacity={0.32}
            strokeLinecap="round"
          />
        ))}
        <circle
          cx={junctionX}
          cy={AXIS_Y}
          r={3.5}
          fill="var(--ink)"
          opacity={0.7}
        />
        <line
          x1={junctionX + 4}
          y1={AXIS_Y}
          x2={stage0X - 8}
          y2={AXIS_Y}
          stroke="var(--ink)"
          strokeWidth={1.75}
          opacity={0.5}
        />
        <polyline
          points={`${stage0X - 10},${AXIS_Y - 4} ${stage0X - 4},${AXIS_Y} ${stage0X - 10},${AXIS_Y + 4}`}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.75}
          opacity={0.5}
          strokeLinejoin="round"
        />

        {/* ── STAGE MINI-PAGES ── */}
        {stages.map(({ x, label, hero, figure }) => {
          const innerX = x + 15;
          const innerW = BOX_W - 30;
          const contentTop = BOX_TOP + (hero ? 46 : 24);
          const topLines = [innerW * 0.9, innerW * 0.66, innerW * 0.82];
          const figY = contentTop + 3 * 16 + 6;
          const figH = 48;
          const botLines = [innerW * 0.86, innerW * 0.58];
          const isReview = label === "REVIEW";
          return (
            <g key={label}>
              <rect
                x={x}
                y={BOX_TOP}
                width={BOX_W}
                height={BOX_H}
                rx={5}
                fill="var(--surface)"
                stroke="var(--hairline-strong)"
                strokeWidth={1}
              />
              {/* Bottom corners squared so the hero band reads as a band, not a pill. */}
              {hero && (
                <path
                  d={`M ${x + 1} ${BOX_TOP + 6} q 0 -5 5 -5 h ${BOX_W - 12} q 5 0 5 5 v 26 h ${-(BOX_W - 2)} Z`}
                  fill="var(--ink)"
                  opacity={HERO_OP}
                />
              )}
              {topLines.map((w, i) => (
                <rect
                  key={`t-${w}`}
                  x={innerX}
                  y={contentTop + i * 16}
                  width={w}
                  height={5}
                  rx={1}
                  fill="var(--ink)"
                  opacity={TEXT_OP}
                />
              ))}
              {figure ? (
                <>
                  <rect
                    x={innerX}
                    y={figY}
                    width={innerW}
                    height={figH}
                    rx={2}
                    fill="var(--ink)"
                    opacity={FIGURE_OP}
                  />
                  {botLines.map((w, i) => (
                    <rect
                      key={`b-${w}`}
                      x={innerX}
                      y={figY + figH + 12 + i * 16}
                      width={w}
                      height={5}
                      rx={1}
                      fill="var(--ink)"
                      opacity={TEXT_OP}
                    />
                  ))}
                </>
              ) : (
                [innerW * 0.7, innerW * 0.88, innerW * 0.6, innerW * 0.8].map(
                  (w, i) => (
                    <rect
                      key={`e-${w}`}
                      x={innerX}
                      y={contentTop + (3 + i) * 16}
                      width={w}
                      height={5}
                      rx={1}
                      fill="var(--ink)"
                      opacity={TEXT_OP}
                    />
                  ),
                )
              )}
              {/* Accent OUTLINE (not a filled badge) so the sign-off joins the gate system
                  as one coherent accent subject without adding a competing focal. */}
              {isReview && (
                <>
                  <circle
                    cx={x + BOX_W - 24}
                    cy={BOX_BOT - 26}
                    r={12}
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth={1.75}
                  />
                  <path
                    d={`M ${x + BOX_W - 30} ${BOX_BOT - 26} L ${x + BOX_W - 25.5} ${BOX_BOT - 21} L ${x + BOX_W - 17} ${BOX_BOT - 31}`}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
              <text
                x={x + BOX_W / 2}
                y={BOX_BOT + 42}
                textAnchor="middle"
                style={COVER_LABEL}
                fill="var(--ink)"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* ── GATE BADGES ── */}
        {gateXs.map((gx, i) => {
          const fromX = stages[i].x + BOX_W;
          const toX = stages[i + 1].x;
          return (
            <g key={gx}>
              <line
                x1={fromX}
                y1={AXIS_Y}
                x2={gx - 17}
                y2={AXIS_Y}
                stroke="var(--ink)"
                strokeWidth={1.75}
                opacity={0.5}
              />
              <line
                x1={gx + 17}
                y1={AXIS_Y}
                x2={toX - 8}
                y2={AXIS_Y}
                stroke="var(--ink)"
                strokeWidth={1.75}
                opacity={0.5}
              />
              <polyline
                points={`${toX - 10},${AXIS_Y - 4} ${toX - 4},${AXIS_Y} ${toX - 10},${AXIS_Y + 4}`}
                fill="none"
                stroke="var(--ink)"
                strokeWidth={1.75}
                opacity={0.5}
                strokeLinejoin="round"
              />
              <circle cx={gx} cy={AXIS_Y} r={17} fill="var(--accent)" />
              <path
                d={`M ${gx - 7} ${AXIS_Y + 0.5} L ${gx - 2} ${AXIS_Y + 6} L ${gx + 7.5} ${AXIS_Y - 6.5}`}
                fill="none"
                stroke="var(--ink-on-accent)"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* ── OUTPUT PAGE ── */}
        <line
          x1={stages[3].x + BOX_W}
          y1={AXIS_Y}
          x2={pageX - 8}
          y2={AXIS_Y}
          stroke="var(--ink)"
          strokeWidth={1.75}
          opacity={0.5}
        />
        <polyline
          points={`${pageX - 10},${AXIS_Y - 4} ${pageX - 4},${AXIS_Y} ${pageX - 10},${AXIS_Y + 4}`}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.75}
          opacity={0.5}
          strokeLinejoin="round"
        />
        <path
          d={`M ${pageX} ${pageY + 4} q 0 -4 4 -4 h ${pageW - 18} l 14 14 v ${pageH - 14} q 0 4 -4 4 h ${-(pageW - 4)} q -4 0 -4 -4 Z`}
          fill="var(--surface)"
          stroke="var(--hairline-strong)"
          strokeWidth={1.25}
        />
        <path
          d={`M ${pageX + pageW - 14} ${pageY} v 10 q 0 4 4 4 h 10`}
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth={1.25}
        />
        {/* Offset to clear the folded corner. */}
        <rect
          x={pageX + 8}
          y={pageY + 12}
          width={pageW - 30}
          height={13}
          rx={2}
          fill="var(--ink)"
          opacity={HERO_OP}
        />
        {[0.86, 0.6, 0.78, 0.5].map((fw, i) => (
          <rect
            key={`pl-${fw}`}
            x={pageX + 8}
            y={pageY + 34 + i * 8}
            width={(pageW - 16) * fw}
            height={4}
            rx={1}
            fill="var(--ink)"
            opacity={TEXT_OP}
          />
        ))}

        {/* ── ANNOTATIONS (Caveat, accent — notebook gesture, head at the note) ── */}
        {notes.map((n) => {
          const { d, b1, b2 } = leader(
            n.tail,
            n.tip,
            n.startDeg,
            n.endDeg,
            n.startLen,
            n.endLen,
          );
          return (
            <g key={n.lines[0]}>
              {n.lines.map((line, i) => (
                <text
                  key={line}
                  x={n.x}
                  y={n.y + i * 30}
                  textAnchor="middle"
                  style={COVER_ANNOTATION}
                  fill="var(--accent)"
                >
                  {line}
                </text>
              ))}
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <line
                x1={n.tip[0]}
                y1={n.tip[1]}
                x2={b1[0]}
                y2={b1[1]}
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <line
                x1={n.tip[0]}
                y1={n.tip[1]}
                x2={b2[0]}
                y2={b2[1]}
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
