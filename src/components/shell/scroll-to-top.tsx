"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NorthIcon } from "@/components/icons/material/north";
import { useFooterLift } from "@/components/shell/use-footer-lift";

const SHOW_AFTER = 400; // px of scroll

// A short, fixed page opts out by marking its root `data-scroll-top="off"` (Home, About, the 404 and error screens); the
// button looks for the marker on each update, so there is no list of paths to keep in step with the routes.
const OPT_OUT = '[data-scroll-top="off"]';

// `forceVisible` pins the button visible at its resting position regardless of scroll — used by the design-system
// gallery to preview it in a bounded frame. Site pages omit it.
export function ScrollToTop({
  forceVisible = false,
}: {
  forceVisible?: boolean;
} = {}) {
  const [visible, setVisible] = useState(false);
  const bottom = useFooterLift(!forceVisible);
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: the pathname re-checks the new page's marker once it has committed
  useEffect(() => {
    if (forceVisible) return;
    const update = () =>
      setVisible(
        window.scrollY > SHOW_AFTER && !document.querySelector(OPT_OUT),
      );
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [forceVisible, pathname]);

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
      className="surface-glass fixed right-[var(--corner)] z-[var(--z-scroll-to-top)] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[var(--ink-muted)] motion-safe:transition-[color,border-color] motion-safe:duration-[var(--duration-fast)] hover:border-[var(--hairline-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] xl:h-12 xl:w-12"
      style={{ bottom: `${bottom}px` }}
    >
      <NorthIcon size={24} />
    </button>
  );
}
