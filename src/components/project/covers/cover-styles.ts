import type { CSSProperties } from "react";

// Shared style presets for project cover SVGs — one source of truth so covers don't drift.
// Typography for now; extend with other shared cover style values as covers converge on them.
// Sizes are raw px (covers are decorative aria-hidden SVG and can't consume the HTML type-scale
// classes) and theme-independent; color is applied per use via the SVG `fill` attribute, never here.

const COVER_MONO: CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  letterSpacing: "0.06em",
};

// Primary structural label — pair with --ink.
export const COVER_LABEL: CSSProperties = {
  ...COVER_MONO,
  fontSize: 18,
  letterSpacing: "0.05em",
};

// Secondary label (source names, frame captions) — pair with --ink-muted.
export const COVER_SUBLABEL: CSSProperties = { ...COVER_MONO, fontSize: 15 };

// Gate-3 Caveat annotation — pair with --accent.
export const COVER_ANNOTATION: CSSProperties = {
  fontFamily: "var(--font-caveat)",
  fontSize: 30,
};
