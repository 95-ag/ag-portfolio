"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";

// The stacked spotlight's card scales to the full screen as the page scrolls from the hero's snap point to the spotlight's
// (DESIGN.md → Home Page → Spotlight → Stacked). Scroll-linked, so Framer's `useScroll` (the motion boundary); it writes
// progress `--sf-p` (0 → 1) and the starting scale `--sf-k` = (width − 2 × the card inset) / width on the section, and CSS does
// the rest by transform. Nothing is written under reduced motion or above the stack tier, and the CSS falls back to full.
const STACK_QUERY = "(max-width: 860px)";
const CARD_INSET = 32;

export function SnapProgress() {
  const marker = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const write = (y: number) => {
    const section = marker.current?.closest<HTMLElement>("[data-spot-snap]");
    if (!section || reduced || !window.matchMedia(STACK_QUERY).matches) return;
    // Page positions of the two snap points: the top of the hero and the top of the section. Neither element is transformed
    // (the card inside the section is), so their boxes are layout.
    const pageTop = (el: Element) =>
      el.getBoundingClientRect().top + window.scrollY;
    const hero = document.querySelector("[data-snap='hero']");
    // The hero's snap point is its top less its scroll margin (the top of the page).
    const heroTop = hero
      ? pageTop(hero) -
        (Number.parseFloat(getComputedStyle(hero).scrollMarginTop) || 0)
      : 0;
    const distance = pageTop(section) - heroTop;
    const p =
      distance > 0 ? Math.min(1, Math.max(0, (y - heroTop) / distance)) : 1;
    section.style.setProperty("--sf-p", p.toFixed(4));
    section.style.setProperty(
      "--sf-k",
      ((window.innerWidth - 2 * CARD_INSET) / window.innerWidth).toFixed(4),
    );
  };

  useMotionValueEvent(scrollY, "change", write);

  // The value is also right on load (a reload mid-page) and after a resize.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `write` reads the latest scroll position itself
  useEffect(() => {
    const sync = () => write(window.scrollY);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [reduced]);

  return <span ref={marker} hidden />;
}
