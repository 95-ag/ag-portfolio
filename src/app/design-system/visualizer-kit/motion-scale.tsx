export type DurationToken = { token: string; ms: number };

// Each bar is a full 0 → max track (so lengths are comparable) with the duration anchored at the fill
// tip and 0 at the start; the slowest token fills the track, marking the max.
export function DurationScale({
  items,
  maxBarPx = 280,
}: {
  items: DurationToken[];
  maxBarPx?: number;
}) {
  const maxMs = Math.max(...items.map((t) => t.ms));
  return (
    <div className="overflow-x-auto">
      {/* Padding contains the absolutely-positioned tip/axis labels so they don't overflow the
          scroll box (which would show a scrollbar even when the bars fit). */}
      <div className="flex w-fit flex-col gap-[var(--spacing-xl)] px-[var(--spacing-lg)] py-[var(--spacing-lg)]">
        {items.map(({ token, ms }) => {
          const barPx = Math.round((ms / maxMs) * maxBarPx);
          return (
            <div
              key={token}
              className="flex items-center gap-[var(--spacing-lg)]"
            >
              <span className="mono-code w-[160px] shrink-0">{token}</span>
              <div className="relative shrink-0" style={{ width: maxBarPx }}>
                <span
                  className="mono-anchor absolute bottom-[calc(100%+4px)] -translate-x-1/2 whitespace-nowrap"
                  style={{ left: barPx }}
                >
                  {ms}ms
                </span>
                <div className="h-[6px] w-full bg-[var(--hairline)]">
                  <div
                    className="h-full bg-[var(--accent)]"
                    style={{ width: barPx }}
                  />
                </div>
                <span className="mono-anchor absolute top-[calc(100%+4px)] left-0">
                  0ms
                </span>
                <span className="mono-anchor absolute top-[calc(100%+4px)] right-0">
                  {maxMs}ms
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type EasingToken = {
  token: string;
  /** cubic-bezier control points (x1, y1, x2, y2). */
  curve: [number, number, number, number];
};

// Easing plotted on a unit square (x = time, y = value): the curve's slope encodes acceleration,
// dashed diagonal is the linear reference, hairline handles mark the control points.
function EasingPlot({
  token,
  curve,
  size,
}: {
  token: string;
  curve: [number, number, number, number];
  size: number;
}) {
  const [x1, y1, x2, y2] = curve;
  const pad = 12;
  const inner = size - pad * 2;
  const sx = (v: number) => pad + v * inner;
  const sy = (v: number) => pad + (1 - v) * inner;
  const path = `M ${sx(0)} ${sy(0)} C ${sx(x1)} ${sy(y1)} ${sx(x2)} ${sy(y2)} ${sx(1)} ${sy(1)}`;
  return (
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <div
        className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--surface-deep)]"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`Easing ${token}: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`}
        >
          <line
            x1={sx(0)}
            y1={sy(0)}
            x2={sx(1)}
            y2={sy(1)}
            stroke="var(--hairline)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1={sx(0)}
            y1={sy(0)}
            x2={sx(x1)}
            y2={sy(y1)}
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          <line
            x1={sx(1)}
            y1={sy(1)}
            x2={sx(x2)}
            y2={sy(y2)}
            stroke="var(--hairline)"
            strokeWidth="1"
          />
          <path
            d={path}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx={sx(0)} cy={sy(0)} r="3" fill="var(--ink-muted)" />
          <circle cx={sx(1)} cy={sy(1)} r="3" fill="var(--ink-muted)" />
          <circle
            cx={sx(x1)}
            cy={sy(y1)}
            r="2.5"
            fill="none"
            stroke="var(--hairline)"
          />
          <circle
            cx={sx(x2)}
            cy={sy(y2)}
            r="2.5"
            fill="none"
            stroke="var(--hairline)"
          />
        </svg>
      </div>
      <span className="mono-code">{token}</span>
      <span className="body-caption">
        cubic-bezier({x1}, {y1}, {x2}, {y2})
      </span>
    </div>
  );
}

export function EasingCurves({
  items,
  size = 180,
}: {
  items: EasingToken[];
  size?: number;
}) {
  return (
    <div className="flex flex-wrap gap-[var(--spacing-lg)]">
      {items.map((t) => (
        <EasingPlot key={t.token} {...t} size={size} />
      ))}
    </div>
  );
}
