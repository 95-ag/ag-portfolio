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

// Dense-reading pages — the WebGL meteor layer is suppressed and the ASCII field uses the
// quiet, gutter-masked treatment (dropped entirely on mobile, see AsciiField). Covers project
// detail pages AND the dev-only /design-system gallery, which previews components against the
// work-page backdrop. The /design-system route is pruned from production, so that branch is
// inert there.
const READING_PAGE_PATTERN = /^\/(work\/.+|design-system)$/;

// Mobile/desktop divider — matches AsciiField's MIN_WIDTH. The meteor must honor
// the same floor (and re-check on resize) so a hover-capable laptop dragged below
// 768px doesn't keep meteors over the full-bleed mobile ASCII field.
const MOBILE_BREAKPOINT = 768;

// WebGL on a software rasterizer (no GPU: SwiftShader/llvmpipe, hardware accel
// disabled, headless) renders the full-screen meteor shader at 500–800ms/frame —
// continuous main-thread jank and battery drain. Decline the meteor there, the same
// way we decline on reduced-motion/touch/low-core; capable GPU users are unaffected.
// Memoized: GPU capability is constant for the session.
let softwareWebGL: boolean | undefined;
function isSoftwareWebGL(): boolean {
  if (softwareWebGL !== undefined) return softwareWebGL;
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) {
      softwareWebGL = true; // no WebGL at all — the meteor can't run regardless
      return softwareWebGL;
    }
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    // Skip only on a POSITIVE software match — privacy browsers that mask the
    // renderer (renderer === "") keep the meteor, as they are likely GPU-backed.
    softwareWebGL = /swiftshader|llvmpipe|softpipe|basic render|software/i.test(
      renderer,
    );
  } catch {
    softwareWebGL = false;
  }
  return softwareWebGL;
}

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
  // Software-GL guard: the shader is GPU-cheap but CPU-brutal on a software rasterizer.
  if (isSoftwareWebGL()) return false;
  return true;
}

export function BackgroundLayer() {
  const pathname = usePathname();
  const isReadingPage = READING_PAGE_PATTERN.test(pathname);
  const [mountMeteor, setMountMeteor] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    const evaluate = () => {
      setMountMeteor(
        !isReadingPage &&
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
  }, [isReadingPage]);

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
      <AsciiField isProjectDetail={isReadingPage} />
      {mountMeteor && <MeteorShower opacity={0.42} />}
    </div>
  );
}
