import type { ReactNode } from "react";

// The figure's own block margin would offset it from the table's centre line in the two-column layout.
export function SideBySide({ children }: { children: ReactNode }) {
  return (
    <div className="my-[var(--spacing-2xl)] flex flex-col gap-[var(--spacing-lg)] md:grid md:grid-cols-2 md:items-center md:gap-[var(--spacing-xl)] [&>figure]:my-0">
      {children}
    </div>
  );
}
