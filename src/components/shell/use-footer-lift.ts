"use client";

import { useEffect, useState } from "react";

const REST_BOTTOM = 24; // px — resting offset from the viewport bottom
const FOOTER_GAP = 16; // px — clearance kept above the footer

// The `bottom` offset for a fixed corner control: it rests 24px above the viewport bottom and lifts to stay 16px clear of
// the footer once the footer scrolls into view. `enabled` false skips the tracking and returns the resting offset.
export function useFooterLift(enabled = true) {
  const [bottom, setBottom] = useState(REST_BOTTOM);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // The page's real footer is always last in the DOM, so this stays right even when the design-system gallery renders a
      // Footer specimen earlier.
      const footers = document.querySelectorAll("footer");
      const footerTop =
        footers[footers.length - 1]?.getBoundingClientRect().top ?? Infinity;
      setBottom(
        Math.max(REST_BOTTOM, window.innerHeight - footerTop + FOOTER_GAP),
      );
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return bottom;
}
