import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// A bounded "stage" that renders fixed/route-aware chrome LIVE. A non-zero `transform`
// establishes a containing block, so `position:fixed` descendants resolve to this frame (not the
// viewport) — the clean way to box fixed chrome without faking it. `overflow:hidden` clips the
// overflow; the frame sits on the page --background like the rest of the gallery. `height` sizes
// the stage; `width` optionally narrows it (e.g. a phone-width frame for the mobile drawer).
export function ChromeFrame({
  children,
  height = 220,
  width,
  className,
}: {
  children: ReactNode;
  height?: number;
  width?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[var(--outline-variant)] bg-[var(--background)]",
        className,
      )}
      // translateZ(0) creates the containing block for fixed descendants; size bounds the stage.
      style={{ transform: "translateZ(0)", height, width, maxWidth: "100%" }}
    >
      {children}
    </div>
  );
}
