interface HighlightProps {
  children: React.ReactNode;
}

export function Highlight({ children }: HighlightProps) {
  return (
    <p className="my-[var(--spacing-lg)] type-body-lg font-medium text-[var(--accent)]">
      {children}
    </p>
  );
}
