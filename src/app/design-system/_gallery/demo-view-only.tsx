"use client";

import type { ReactNode } from "react";

// The gallery's <article> (SectionProgressNav scrapes its h2s for the rail). Cancels anchor clicks
// only — so demos can't navigate away, but buttons and copy still fire.
export function DemoViewOnly({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={className}
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest("a[href]")) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </article>
  );
}
