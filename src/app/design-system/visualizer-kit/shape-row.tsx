export type ShapeItem = {
  token: string;
  /** Full CSS radius value, e.g. "var(--radius-md)". */
  radius: string;
  value: string;
  usage: string;
};

export function ShapeRow({ items }: { items: ShapeItem[] }) {
  return (
    <div className="flex flex-wrap gap-[var(--spacing-xl)]">
      {items.map(({ token, radius, value, usage }) => (
        <div
          key={token}
          className="flex w-40 flex-col items-center gap-[var(--spacing-sm)]"
        >
          <span
            aria-hidden="true"
            className="h-16 w-16 border border-[var(--hairline)] bg-[var(--surface-elevated)]"
            style={{ borderRadius: radius }}
          />
          <span className="mono-anchor">
            {token} · {value}
          </span>
          <span className="body-caption text-center">{usage}</span>
        </div>
      ))}
    </div>
  );
}
