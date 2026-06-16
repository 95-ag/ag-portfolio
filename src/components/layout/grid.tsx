import { cn } from "@/lib/utils/cn";

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive grid: 4-col mobile → 8-col tablet → 12-col desktop.
 * Per DESIGN.md §6. Override via className if a page needs a fixed layout.
 */
export function Grid({ children, className }: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-[var(--spacing-gutter)] md:grid-cols-8 xl:grid-cols-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
