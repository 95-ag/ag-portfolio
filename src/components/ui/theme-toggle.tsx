"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ComputerIcon } from "@/components/icons/material/computer";
import { DarkModeIcon } from "@/components/icons/material/dark-mode";
import { LightModeIcon } from "@/components/icons/material/light-mode";
import { cn } from "@/lib/utils/cn";

type ThemeMode = "light" | "dark" | "system";
type IconComponent = (props: {
  size?: number;
  className?: string;
}) => React.ReactElement;

const MODES: ThemeMode[] = ["light", "dark", "system"];

const ICON: Record<ThemeMode, IconComponent> = {
  light: LightModeIcon,
  dark: DarkModeIcon,
  system: ComputerIcon,
};

const LABEL: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

function useCurrentTheme() {
  const { theme = "system", setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current: ThemeMode =
    mounted && (theme as ThemeMode) in LABEL ? (theme as ThemeMode) : "system";
  return { current, setTheme };
}

/* ── Pill nav mode: shows active icon; hover expands to all 3 ── */
export function PillThemeSelector() {
  const { current, setTheme } = useCurrentTheme();
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [expanded]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover expand wrapper; all interactive elements are buttons inside
    <div
      ref={containerRef}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="flex items-center"
    >
      {MODES.map((mode) => {
        const isSelected = mode === current;
        // Selected button is always visible; others appear only when expanded
        const visible = isSelected || expanded;
        const ModeIcon = ICON[mode];
        return (
          <div
            key={mode}
            className={cn(
              "overflow-hidden transition-[width,opacity] ease-[var(--ease-standard)] duration-[var(--duration-slow)]",
              visible ? "w-8 opacity-100" : "w-0 opacity-0",
            )}
          >
            <button
              type="button"
              onClick={() => setTheme(mode)}
              aria-label={`Set ${LABEL[mode]} theme`}
              aria-pressed={isSelected}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-[var(--radius-pill)]",
                "transition-colors duration-[var(--duration-fast)]",
                isSelected
                  ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                  : "text-[var(--on-surface-muted)] hover:text-[var(--on-surface)]",
              )}
            >
              <ModeIcon size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ── Inline mode: all 3 always visible (mobile nav) ── */
export function InlineThemeSelector({ className }: { className?: string }) {
  const { current, setTheme } = useCurrentTheme();

  return (
    <div
      className={cn(
        "flex w-fit items-center rounded-[var(--radius-pill)] bg-[var(--surface-sunken)] p-1",
        className,
      )}
    >
      {MODES.map((mode) => {
        const isSelected = mode === current;
        const ModeIcon = ICON[mode];
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            aria-label={`Set ${LABEL[mode]} theme`}
            aria-pressed={isSelected}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[var(--radius-pill)]",
              "transition-colors duration-[var(--duration-fast)]",
              isSelected
                ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                : "text-[var(--on-surface-muted)] hover:text-[var(--on-surface)]",
            )}
          >
            <ModeIcon size={16} />
          </button>
        );
      })}
    </div>
  );
}

/* ── Legacy export ── */
export function ThemeToggle() {
  return <PillThemeSelector />;
}
