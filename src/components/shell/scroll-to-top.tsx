"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpwardIcon } from "@/components/icons/material/arrow-upward";

const REST_BOTTOM = 24; // px — resting offset from the viewport bottom
const FOOTER_GAP = 16; // px — clearance kept above the footer

// `forceVisible` pins the FAB visible at its resting position regardless of scroll — used by the
// dev design-system gallery to preview it in a bounded frame. Production callers omit it.
export function ScrollToTop({
  forceVisible = false,
}: {
  forceVisible?: boolean;
} = {}) {
  const [visible, setVisible] = useState(false);
  const [bottom, setBottom] = useState(REST_BOTTOM);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (forceVisible) return; // demo: pinned visible at rest; skip scroll/footer tracking
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 400);
      // Lift the button so it never overlaps the footer once it scrolls in. Use the LAST footer:
      // the page's real footer is always last in the DOM, so this stays correct even when another
      // <footer> appears earlier (e.g. the dev design-system gallery rendering a Footer specimen).
      const footers = document.querySelectorAll("footer");
      const footer = footers[footers.length - 1];
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
      const lift = window.innerHeight - footerTop + FOOTER_GAP;
      setBottom(Math.max(REST_BOTTOM, lift));
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
  }, [forceVisible]);

  if (!forceVisible && !visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: prefersReduced ? "auto" : "smooth",
        })
      }
      className="fixed right-4 lg:right-[max(1rem,calc(50vw-36rem))] flex items-center justify-center h-11 w-11 xl:h-12 xl:w-12 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-nav)] backdrop-blur-[12px] text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--on-surface)] hover:border-[var(--outline)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      style={{ zIndex: "var(--z-scroll-to-top)", bottom: `${bottom}px` }}
    >
      <ArrowUpwardIcon size={20} />
    </button>
  );
}
