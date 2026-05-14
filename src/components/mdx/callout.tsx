import { cn } from "@/lib/utils/cn";

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Callout({ children, title, className }: CalloutProps) {
  return (
    <aside
      role="note"
      className={cn(
        "my-[var(--spacing-xl)] border-l-[2px] border-l-[var(--accent)] bg-[var(--surface-sunken)] p-[var(--spacing-lg)]",
        className,
      )}
    >
      {title && (
        <p className="callout-title mb-[var(--spacing-sm)] text-[var(--accent)]">
          {title}
        </p>
      )}
      <div className="body-emphasis text-[var(--on-surface)]">{children}</div>
    </aside>
  );
}
