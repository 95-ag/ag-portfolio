"use client";

import { useEffect, useRef } from "react";

const SEED = 8675309;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GLYPHS = [
  ".",
  ".",
  ".",
  ".",
  "·",
  "·",
  "·",
  "·",
  ":",
  ":",
  "+",
  "*",
  "/",
  "`",
  "˚",
  "°",
];

const CELL = 30;
// Mobile/desktop divider — matches the site's `md` breakpoint and nav switch.
const MIN_WIDTH = 768;
const DESKTOP_DENSITY = 0.2;
// Mobile (non-project) gets a sparser, fainter full-bleed field — texture, not noise.
const MOBILE_DENSITY = 0.1;
const MOBILE_OPACITY = 0.55;
// Desktop/tablet: clear a centered band sized to the content column (+buffer) so
// glyphs sit only in the outer gutters/corners and never touch the reading column.
const GUTTER_MASK =
  "linear-gradient(to right, #000 0, #000 calc(50% - 600px), transparent calc(50% - 540px), transparent calc(50% + 540px), #000 calc(50% + 600px), #000 100%)";

interface AsciiFieldProps {
  /** Project detail pages are dense reading — kept fully clean on mobile. */
  isProjectDetail: boolean;
}

export function AsciiField({ isProjectDetail }: AsciiFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const setMask = (value: string) => {
      host.style.setProperty("mask-image", value);
      host.style.setProperty("-webkit-mask-image", value);
    };

    const build = () => {
      host.innerHTML = "";
      const W = window.innerWidth;
      const isMobile = W < MIN_WIDTH;

      // Mobile project pages: no background at all (protect dense prose).
      if (isMobile && isProjectDetail) {
        setMask("none");
        return;
      }

      const density = isMobile ? MOBILE_DENSITY : DESKTOP_DENSITY;
      setMask(isMobile ? "none" : GUTTER_MASK);
      host.style.opacity = isMobile ? String(MOBILE_OPACITY) : "1";

      const H = Math.max(
        window.innerHeight,
        document.documentElement.scrollHeight,
      );
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;
      const rand = mulberry32(SEED);
      const frag = document.createDocumentFragment();

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (rand() > density) continue;
          const s = document.createElement("span");
          s.textContent = GLYPHS[Math.floor(rand() * GLYPHS.length)];
          s.style.position = "absolute";
          s.style.userSelect = "none";
          s.style.left = `${x * CELL + (rand() - 0.5) * CELL * 0.7}px`;
          s.style.top = `${y * CELL + (rand() - 0.5) * CELL * 0.7}px`;

          const tier = rand();
          if (tier < 0.04) {
            s.className = "ascii-bg-glyph-accent";
          } else if (tier < 0.18) {
            s.className = "ascii-bg-glyph-ink";
          } else {
            s.className = "ascii-bg-glyph-mute";
          }
          frag.appendChild(s);
        }
      }
      host.appendChild(frag);
    };

    build();

    let t: number | undefined;
    const onResize = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(build, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (t) window.clearTimeout(t);
    };
  }, [isProjectDetail]);

  return (
    <div ref={ref} className="absolute inset-0 font-mono text-[13px] leading-none" />
  );
}
