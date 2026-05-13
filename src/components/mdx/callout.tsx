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
        "my-[var(--spacing-xl)] border-l-[2px] bg-[var(--surface-sunken)] p-[var(--spacing-lg)]",
        borderClass[type],
        className,
      )}
    >
      {title && (
        <strong className="type-body-sm mb-[var(--spacing-sm)] block font-semibold text-[var(--accent)]">
          {title}
        </strong>
      )}
      {children}
    </aside>
  );
}
