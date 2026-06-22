"use client";

import type { ReactNode } from "react";

// Makes the gallery demos read as view-only specimens: any click that would navigate,
// download, or switch pages is suppressed, so the demos never leave the page. It only
// cancels anchor clicks (ProjectCard's Next <Link>, LinkPill, project-header links,
// Button-as-anchor / download) — every <button> interaction (theme selector, copy)
// still fires, and hover/active/focus states are untouched. The real page chrome (nav,
// theme toggle, scroll-to-top, section rail) lives OUTSIDE this wrapper, so it stays live.
// Renders the gallery's <article> (the landmark SectionProgressNav scrapes for h2s) with
// the capture-phase guard attached, so wrapping the demos adds no extra nesting.
export function DemoViewOnly({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    // A capture-phase guard that only cancels link navigation on dev-only demos —
    // not an interactive control, so no keyboard handler is needed.
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
