export type TypeToken = {
  token: string;
  family: string;
  size: number;
  weight: number;
  lh: number;
  sample: string;
  /** Responsive font-size steps for tokens that resize across breakpoints. */
  responsive?: { tablet: number; mobile: number };
};

export function TypeScaleList({ tokens }: { tokens: TypeToken[] }) {
  return (
    <div className="flex flex-col">
      {tokens.map((t) => (
        <div
          key={t.token}
          className="grid grid-cols-1 gap-[var(--spacing-sm)] border-b border-[var(--hairline)] py-[var(--spacing-md)] last:border-b-0 md:grid-cols-[280px_1fr] md:items-baseline md:gap-[var(--spacing-xl)]"
        >
          <div className="flex flex-col gap-[var(--spacing-xs)]">
            <span className="mono-code">.{t.token}</span>
            <span className="mono-anchor">
              {t.family} · {t.size}px / {t.weight} / lh {t.lh}
            </span>
            {t.responsive && (
              <span className="body-caption">
                ↘ desktop: {t.size}px → tablet: {t.responsive.tablet}px →
                mobile: {t.responsive.mobile}px
              </span>
            )}
          </div>
          <div className={`${t.token} min-w-0`}>{t.sample}</div>
        </div>
      ))}
    </div>
  );
}
