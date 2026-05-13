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
        "type-mono-label normal-case tracking-normal inline-block rounded-[var(--radius-sm)] px-[10px] py-[4px]",
        variant === "outline" &&
          "border border-[var(--outline-variant)] text-[var(--on-surface-muted)]",
        variant === "filled" &&
          "bg-[var(--surface-raised)] text-[var(--on-surface)] border border-[var(--outline-variant)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
