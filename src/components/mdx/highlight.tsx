interface HighlightProps {
  children: React.ReactNode;
}

export function Highlight({ children }: HighlightProps) {
  return (
    <p className="my-[var(--spacing-xl)] bg-[var(--accent-muted)] px-[var(--spacing-xl)] py-[var(--spacing-md)] type-body-lg font-medium text-[var(--accent)]">
      {children}
    </p>
  );
}
