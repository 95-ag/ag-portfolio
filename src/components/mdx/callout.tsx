import { cn } from "@/lib/utils/cn";

// CONTENT-SCHEMA.md §5: type drives accent color
// insight = accent, tradeoff = secondary, warning = tertiary
type CalloutType = "insight" | "tradeoff" | "warning";

const borderClass: Record<CalloutType, string> = {
  insight: "border-l-[var(--accent)]",
  tradeoff: "border-l-[var(--secondary)]",
  warning: "border-l-[var(--tertiary)]",
};

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}

export function Callout({
  children,
  type = "insight",
  title,
  className,
}: CalloutProps) {
  return (
    <aside
      role="note"
      className={cn(
        "my-[var(--spacing-2xl)] rounded-[var(--radius-md)] border-l-[3px] bg-[var(--surface-raised)] p-[var(--spacing-lg)]",
        borderClass[type],
        className,
      )}
    >
      {title && (
        <strong className="type-body-md mb-[var(--spacing-sm)] block font-semibold text-[var(--on-surface)]">
          {title}
        </strong>
      )}
      {children}
    </aside>
  );
}
