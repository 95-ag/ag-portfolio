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

// Routes where the meteor layer is suppressed (WebGL canvas distracts from
// dense prose content on project detail pages).
const METEOR_EXCLUDED_PATTERN = /^\/work\/.+/;

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
  const [mountMeteor, setMountMeteor] = useState(false);

  useEffect(() => {
    const excluded = METEOR_EXCLUDED_PATTERN.test(pathname);
    if (!excluded && isMeteorCapable()) {
      setMountMeteor(true);
    } else {
      setMountMeteor(false);
    }
  }, [pathname]);

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
      <AsciiField />
      {mountMeteor && <MeteorShower opacity={0.42} />}
    </div>
  );
}
