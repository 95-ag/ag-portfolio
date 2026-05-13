interface HighlightProps {
  heading?: string;
  children: React.ReactNode;
}

export function Highlight({ heading, children }: HighlightProps) {
  return (
    <figure className="highlight-panel my-[var(--spacing-2xl)] rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-raised)] px-[var(--spacing-2xl)] py-[var(--spacing-xl)]">
      {heading && (
        <figcaption className="type-mono-label mb-[var(--spacing-lg)] text-[var(--on-surface-muted)]">
          {heading}
        </figcaption>
      )}
      <div className="type-body-md font-medium text-[var(--on-surface)] leading-relaxed">
        {children}
      </div>
    </figure>
  );
}
