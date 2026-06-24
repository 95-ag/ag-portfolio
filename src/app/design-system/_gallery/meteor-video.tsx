"use client";

import { useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Theme-swapped meteor clip for the gallery background section. Renders only the ACTIVE theme's short
// looping clip — never both — so the page loads one tiny video, not two. Falls back to the still poster
// before hydration and under prefers-reduced-motion (motion.md: autoplaying media honors reduced motion).
export function MeteorVideo({
  lightVideo,
  darkVideo,
  lightPoster,
  darkPoster,
  alt,
}: {
  lightVideo: string;
  darkVideo: string;
  lightPoster: StaticImageData;
  darkPoster: StaticImageData;
  alt: string;
}) {
  const reduce = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = resolvedTheme === "light";
  const poster = isLight ? lightPoster : darkPoster;
  const video = isLight ? lightVideo : darkVideo;

  const frame =
    "w-fit max-w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--surface-deep)]";

  // Pre-hydration and reduced-motion: still poster only, no autoplay.
  if (!mounted || reduce) {
    return (
      <div className={frame}>
        <Image src={poster} alt={alt} className="h-auto max-w-full" />
      </div>
    );
  }

  return (
    <div className={frame}>
      {/* key forces a remount on theme switch so the new clip loads + autoplays. */}
      <video
        key={video}
        src={video}
        poster={poster.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className="block h-auto max-w-full"
      />
    </div>
  );
}
