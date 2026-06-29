import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// The non-zero `transform` makes this a containing block, so `position:fixed` descendants (nav, FAB)
// resolve to the frame, not the viewport.
export function ChromeFrame({
  children,
  height,
  width,
  className,
  ariaHidden,
}: {
  children: ReactNode;
  height?: number;
  width?: number;
  className?: string;
  /** Hide the framed chrome from assistive tech when it duplicates a live landmark on the page. */
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
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
