import { cn } from "@/lib/utils/cn";

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Two-column layout: sticky sidebar + constrained reading-width main.
 * Below `lg`, stacks vertically (sidebar first).
 * Implements DESIGN.md §11 project sticky sidebar.
 */
export function SidebarLayout({
  sidebar,
  children,
  className,
}: SidebarLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-2xl)] lg:flex-row",
        className,
      )}
    >
      <aside className="w-full shrink-0 lg:w-[280px] lg:border-r lg:border-[var(--outline-variant)] lg:pr-[var(--spacing-xl)]">
        {sidebar}
      </aside>
      <div className="min-w-0 flex-1 lg:max-w-[720px] lg:pl-[var(--spacing-xl)]">
        {children}
      </div>
    </div>
  );
}
