"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AsciiField } from "./ascii-field";

// Lazy-load MeteorShower — keeps `three` out of the initial bundle.
// Only mounted after client-side capability checks pass.
const MeteorShower = dynamic(
  () => import("./meteor-shower").then((m) => ({ default: m.MeteorShower })),
  { ssr: false, loading: () => null },
);

// Project detail pages — dense reading. The WebGL meteor layer is suppressed
// here, and the ASCII field is dropped entirely on mobile (see AsciiField).
const PROJECT_DETAIL_PATTERN = /^\/work\/.+/;

// Mobile/desktop divider — matches AsciiField's MIN_WIDTH. The meteor must honor
// the same floor (and re-check on resize) so a hover-capable laptop dragged below
// 768px doesn't keep meteors over the full-bleed mobile ASCII field.
const MOBILE_BREAKPOINT = 768;

function isMeteorCapable(): boolean {
  // Honor reduced-motion system preference — non-negotiable.
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Exclude small touchscreen-only devices (phones, tablets without a mouse).
  // Hybrid devices (Surface, iPad with keyboard) report both touch and hover,
  // so (hover: hover) alone would exclude them — check screen width instead.
  const isSmallTouch =
    !matchMedia("(hover: hover)").matches && window.innerWidth < 1024;
  if (isSmallTouch) return false;
  // Low-CPU guard: skip on devices with fewer than 4 logical cores.
  if (
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency < 4
  )
    return false;
  return true;
}

export function BackgroundLayer() {
  const pathname = usePathname();
  const isProjectDetail = PROJECT_DETAIL_PATTERN.test(pathname);
  const [mountMeteor, setMountMeteor] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    const evaluate = () => {
      setMountMeteor(
        !isProjectDetail &&
          window.innerWidth >= MOBILE_BREAKPOINT &&
          isMeteorCapable(),
      );
    };
    evaluate();
    const onResize = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(evaluate, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (t) window.clearTimeout(t);
    };
  }, [isProjectDetail]);

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
      <AsciiField isProjectDetail={isProjectDetail} />
      {mountMeteor && <MeteorShower opacity={0.42} />}
    </div>
  );
}
