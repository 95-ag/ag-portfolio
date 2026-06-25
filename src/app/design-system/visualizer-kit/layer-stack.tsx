export type LayerItem = { token: string; value: string; role: string };

// Elevation Levels 0–3 (DESIGN.md), back to front. Level 4 (sunken inset) is excluded — it reads as a
// recessed well, not a raised layer. Level 2 carries the sanctioned backdrop-blur.
const DEPTH_CLASS = [
  "bg-[var(--surface)]",
  "bg-[var(--surface)] border border-[var(--hairline)]",
  "bg-[var(--surface-floating)] border border-[var(--hairline)] [backdrop-filter:blur(12px)]",
  "bg-[var(--surface-elevated)] border border-[var(--hairline)]",
];

// Diagonal stacking diagram (after the MDN z-index illustration): each plane is offset down-right from
// the layer below it, overlapping so the cascade reads as depth. Lowest z sits at the back (top-left),
// highest at the front (bottom-right); each plane's label stays in its exposed top band. Planes span the
// full width (minus the cumulative offset) so labels have room; a min-width keeps them legible while the
// container scrolls horizontally on narrow viewports.
export function LayerStack({ items }: { items: LayerItem[] }) {
  const ordered = [...items].sort((a, b) => Number(a.value) - Number(b.value));
  const count = ordered.length;
  const dx = 44;
  // dy must clear the 3-line label band so each layer's label stays readable above the next plane.
  const dy = 88;
  const planeHeight = 150;
  return (
    <div className="overflow-x-auto pb-[var(--spacing-xs)]">
      <div
        className="relative"
        style={{ height: planeHeight + (count - 1) * dy, minWidth: 480 }}
      >
        {ordered.map((item, i) => (
          <div
            key={item.token}
            className={`absolute flex flex-col gap-[var(--spacing-xs)] overflow-hidden rounded-[var(--radius-none)] p-[var(--spacing-md)] ${DEPTH_CLASS[Math.min(i, 3)]}`}
            style={{
              top: i * dy,
              left: i * dx,
              width: `calc(100% - ${(count - 1) * dx}px)`,
              zIndex: i,
            }}
          >
            <span className="body-caption">{item.role}</span>
            <span className="mono-code">{item.token}</span>
            <span className="mono-anchor">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
