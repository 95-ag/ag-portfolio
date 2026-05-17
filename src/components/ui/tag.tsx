import { cn } from "@/lib/utils/cn";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "tag-chip inline-block rounded-[var(--radius-sm)] bg-[var(--surface-tag)] px-[var(--spacing-sm)] py-[2px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
