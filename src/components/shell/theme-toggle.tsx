"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeIcon } from "@/components/icons/material/dark-mode";
import { LightModeIcon } from "@/components/icons/material/light-mode";
import { useFooterLift } from "@/components/shell/use-footer-lift";

type Mode = "light" | "dark";

// `site` saves the choice site-wide (the dev server and previews). `page` is the production gallery: it changes this page
// only, writes nothing to storage, and gives the visitor their system preference back when they leave.
export function ThemeToggle({ mode }: { mode: "site" | "page" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [pageTheme, setPageTheme] = useState<Mode | null>(null);
  const [mounted, setMounted] = useState(false);
  const bottom = useFooterLift();

  useEffect(() => setMounted(true), []);

  // The theme provider keeps `data-theme` in step with its own state, so the page override is applied here and undone on
  // unmount by writing back the provider's resolved value.
  useEffect(() => {
    if (mode !== "page" || pageTheme === null) return;
    const root = document.documentElement;
    const resolved = resolvedTheme === "dark" ? "dark" : "light";
    root.dataset.theme = pageTheme;
    root.style.colorScheme = pageTheme;
    return () => {
      root.dataset.theme = resolved;
      root.style.colorScheme = resolved;
    };
  }, [mode, pageTheme, resolvedTheme]);

  const current: Mode =
    mode === "page" && pageTheme
      ? pageTheme
      : resolvedTheme === "dark"
        ? "dark"
        : "light";
  const next: Mode = current === "dark" ? "light" : "dark";

  const flip = () => {
    if (mode === "page") setPageTheme(next);
    else setTheme(next);
  };

  return (
    <button
      type="button"
      data-theme-toggle
      aria-label={mounted ? `Switch to ${next} theme` : "Switch theme"}
      onClick={flip}
      className="surface-glass fixed left-[var(--corner)] z-[var(--z-scroll-to-top)] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[var(--ink-muted)] motion-safe:transition-[color,border-color] motion-safe:duration-[var(--duration-fast)] hover:border-[var(--hairline-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] xl:h-12 xl:w-12"
      style={{ bottom: `${bottom}px` }}
    >
      {/* Both icons render and the theme attribute chooses, so the first paint never shows the wrong one. */}
      <DarkModeIcon size={24} className="block [[data-theme=dark]_&]:hidden" />
      <LightModeIcon size={24} className="hidden [[data-theme=dark]_&]:block" />
    </button>
  );
}
