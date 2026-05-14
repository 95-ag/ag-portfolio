import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "interactive-label inline-flex h-11 cursor-pointer items-center gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] px-[var(--spacing-lg)] transition-opacity duration-[var(--duration-fast)]",
        variant === "primary" && [
          "bg-[var(--accent)] text-[var(--accent-on)]",
          "hover:opacity-90",
        ],
        variant === "secondary" && [
          "border border-[var(--outline)] bg-transparent text-[var(--on-surface)]",
          "hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)]",
          "transition-all duration-[var(--duration-fast)]",
        ],
        className,
      )}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
