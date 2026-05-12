import { cn } from "@/lib/utils/cn";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "type-mono-label inline-block rounded-[var(--radius-sm)] border border-[var(--outline-variant)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--on-surface-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
