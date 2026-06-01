"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpwardIcon } from "@/components/icons/material/arrow-upward";

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
      className="fixed bottom-20 right-4 lg:right-[max(1rem,calc(50vw-36rem))] flex items-center justify-center h-11 w-11 xl:h-12 xl:w-12 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-nav)] backdrop-blur-[12px] text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--on-surface)] hover:border-[var(--outline)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      style={{ zIndex: "var(--z-scroll-to-top)" }}
    >
      <ArrowUpwardIcon size={20} />
    </button>
  );
}
