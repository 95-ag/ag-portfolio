import { cn } from "@/lib/utils/cn";

interface StickyProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Top offset as a CSS value. Defaults to `var(--spacing-4xl)` (96px),
   * which clears the nav (its row or button sits between 16px and 70px from the top).
   */
  top?: string;
}

export function Sticky({
  children,
  className,
  top = "var(--spacing-4xl)",
}: StickyProps) {
  return (
    <div style={{ top }} className={cn("sticky self-start", className)}>
      {children}
    </div>
  );
}
