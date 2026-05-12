import { cn } from "@/lib/utils/cn";

interface StickyProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Top offset as a CSS value. Defaults to `var(--spacing-4xl)` (96px),
   * which clears the pill nav (top: 24px + height: 56px + gap: 16px).
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
