"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

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
      className="fixed bottom-20 right-6 flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--outline-variant)] bg-[var(--surface-overlay)] backdrop-blur-[12px] text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--on-surface)] hover:border-[var(--outline)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      style={{ zIndex: "var(--z-scroll-to-top)" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
