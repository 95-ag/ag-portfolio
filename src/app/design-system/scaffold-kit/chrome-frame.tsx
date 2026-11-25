import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// The non-zero `transform` makes this a containing block, so `position:fixed` descendants (nav, FAB)
// resolve to the frame, not the viewport.
export function ChromeFrame({
  children,
  height,
  width,
  className,
  inert,
}: {
  children: ReactNode;
  height?: number;
  width?: number;
  className?: string;
  /** Take the framed chrome out of the tab order and the a11y tree when it duplicates a live landmark
   *  on the page; aria-hidden alone leaves its links focusable. */
  inert?: boolean;
}) {
  return (
    <div
      inert={inert}
      className={cn(
        "relative overflow-hidden border border-[var(--hairline)] bg-[var(--surface)]",
        className,
      )}
      style={{ transform: "translateZ(0)", height, width, maxWidth: "100%" }}
    >
      {children}
    </div>
  );
}
