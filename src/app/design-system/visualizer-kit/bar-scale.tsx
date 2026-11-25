export type BarItem = { token: string; px: number };

export function BarScale({
  items,
  varPrefix,
}: {
  items: BarItem[];
  /** CSS custom-property prefix the bar width reads live, e.g. "--spacing-". */
  varPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-sm)]">
      {items.map(({ token, px }) => (
        <div key={token} className="flex items-center gap-[var(--spacing-md)]">
          <span className="mono-anchor w-[112px] shrink-0">
            {token} · {px}
          </span>
          <span
            aria-hidden="true"
            className="h-5 shrink-0 bg-[var(--accent)]"
            style={{ width: `var(${varPrefix}${token})` }}
          />
        </div>
      ))}
    </div>
  );
}
