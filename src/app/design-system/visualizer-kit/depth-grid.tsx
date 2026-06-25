export type DepthLevel = {
  name: string;
  spec: string;
  className: string;
  usage: string;
};

export function DepthGrid({ levels }: { levels: DepthLevel[] }) {
  return (
    <div className="grid grid-cols-1 gap-[var(--spacing-md)] sm:grid-cols-2 xl:grid-cols-3">
      {levels.map(({ name, spec, className, usage }) => (
        <div
          key={name}
          className={`flex min-h-[180px] flex-col justify-between p-[var(--spacing-lg)] ${className}`}
        >
          <span className="body-emphasis">{name}</span>
          <div className="flex flex-col gap-[var(--spacing-xs)]">
            <span className="mono-anchor">{spec}</span>
            <span className="body-caption">{usage}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
