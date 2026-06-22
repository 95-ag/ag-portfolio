"use client";

import type { ReactNode } from "react";

// Makes button-based chrome (theme toggle, scroll-to-top) inert while hover/focus stay live —
// DemoViewOnly only cancels anchors, so buttons need their own guard.
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
