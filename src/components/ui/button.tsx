import { cn } from "@/lib/utils/cn";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const buttonClass = (variant: "primary" | "secondary", className?: string) =>
  cn(
    "interactive-label inline-flex h-11 cursor-pointer items-center gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] px-[var(--spacing-lg)] transition-all duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
    variant === "primary" && [
      "bg-[var(--accent)] text-[var(--accent-on)]",
      "hover:opacity-90",
    ],
    variant === "secondary" && [
      "border border-[var(--outline)] bg-transparent text-[var(--on-surface)]",
      "hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)]",
    ],
    className,
  );

export function Button(props: ButtonProps) {
  const { variant = "primary", icon, children, className, ...rest } = props;

  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a
        href={href}
        className={buttonClass(variant, className)}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      type="button"
      className={buttonClass(variant, className)}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
