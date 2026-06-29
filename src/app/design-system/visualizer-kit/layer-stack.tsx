export type LayerItem = { token: string; value: string; role: string };

// Fill maps to the z-index sign, not order: negative = sunken, 0 = flat, positive = raised.
function depthClass(value: string) {
  const z = Number(value);
  if (z < 0) return "bg-[var(--surface-deep)] border border-[var(--hairline)]";
  if (z === 0) return "bg-[var(--surface)]";
  return "bg-[var(--surface-elevated)] border border-[var(--hairline)]";
}

// Diagonal cascade (after the MDN z-index illustration): each plane is offset down-right over the one
// below, lowest z at the back. Overlap (planeHeight − dy) reads as depth; dy ≈ the 3-line label band so
// each plane's label clears the next.
export function LayerStack({ items }: { items: LayerItem[] }) {
  const ordered = [...items].sort((a, b) => Number(a.value) - Number(b.value));
  const count = ordered.length;
  const dx = 44;
  const dy = 104;
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
            className={`absolute flex flex-col gap-[var(--spacing-xs)] overflow-hidden rounded-[var(--radius-none)] p-[var(--spacing-md)] ${depthClass(item.value)}`}
            style={{
              top: i * dy,
              left: i * dx,
              width: `calc(100% - ${(count - 1) * dx}px)`,
              minHeight: planeHeight,
              zIndex: i,
            }}
          >
            <span className="body-primary">{item.role}</span>
            <span className="mono-code">{item.token}</span>
            <span className="mono-anchor">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
