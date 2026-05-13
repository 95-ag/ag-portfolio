interface HighlightProps {
  children: React.ReactNode;
}

export function Highlight({ children }: HighlightProps) {
  return (
    <p className="my-[var(--spacing-md)] type-body-md font-medium text-[var(--accent)]">
      {children}
    </p>
  );
}
