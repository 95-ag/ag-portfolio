"use client";

import type { ReactNode } from "react";

// Wraps a chrome specimen so it reads as a reconstructed look + hover/focus state but does
// nothing when activated. A capture-phase click handler stops the event before it reaches any
// descendant handler — the theme toggle's setTheme, the scroll-to-top button — so the control
// stays inert. DemoViewOnly only cancels anchor navigation; button-based chrome needs this. Hover,
// focus, and active visuals are untouched, so the specimen still demonstrates interaction states.
export function InertDemo({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      onClickCapture={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {children}
    </div>
  );
}
