"use client";

import { useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FRAME =
  "w-fit max-w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--surface-deep)]";

// Theme-swapped static screenshot pair for full-viewport background layers that can't render live in
// the gallery. .ds-shot-* reveals only the active theme.
export function ThemeShot({
  light,
  dark,
  alt,
}: {
  light: StaticImageData;
  dark: StaticImageData;
  alt: string;
}) {
  return (
    <div className={FRAME}>
      <Image
        src={light}
        alt={`${alt} (light theme)`}
        className="ds-shot-light h-auto max-w-full"
      />
      <Image
        src={dark}
        alt={`${alt} (dark theme)`}
        className="ds-shot-dark h-auto max-w-full"
      />
    </div>
  );
}

// Theme-swapped looping clip; loads only the ACTIVE theme's clip, never both. Falls back to the still
// poster before hydration and under prefers-reduced-motion.
export function ThemeVideo({
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

  if (!mounted || reduce) {
    return (
      <div className={FRAME}>
        <Image src={poster} alt={alt} className="h-auto max-w-full" />
      </div>
    );
  }

  return (
    <div className={FRAME}>
      {/* key forces a remount on theme switch so the new clip loads and autoplays. */}
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
