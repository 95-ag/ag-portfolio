"use client";

import { usePathname } from "next/navigation";
import { AsciiField } from "./ascii-field";

// Dense-reading pages — the ASCII field uses the quiet, gutter-masked treatment (dropped
// entirely on mobile, see AsciiField). Covers project detail pages, blog posts AND the
// /design-system gallery, which previews components against the work-page backdrop.
const READING_PAGE_PATTERN = /^\/(work\/.+|blog\/.+|design-system)$/;

export function BackgroundLayer() {
  const pathname = usePathname();
  const isReadingPage = READING_PAGE_PATTERN.test(pathname);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        isolation: "isolate",
      }}
    >
      <AsciiField isReadingPage={isReadingPage} />
    </div>
  );
}
