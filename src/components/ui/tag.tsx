import { cn } from "@/lib/utils/cn";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "filled";
}

export function Tag({ children, className, variant = "outline" }: TagProps) {
  return (
    <span
      className={cn(
        "type-mono-label normal-case tracking-normal inline-block rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[2px]",
        variant === "outline" &&
          "border border-[var(--outline-variant)] text-[var(--on-surface-muted)]",
        variant === "filled" &&
          "bg-[var(--surface-sunken)] text-[var(--on-surface)] py-[1px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
