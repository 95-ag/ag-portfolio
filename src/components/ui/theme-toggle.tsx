"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type ThemeMode = "light" | "dark" | "system";

const cycle: Record<ThemeMode, ThemeMode> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const label: Record<ThemeMode, string> = {
  light: "Switch to dark theme",
  dark: "Switch to system theme",
  system: "Switch to light theme",
};

const Icon = { light: Sun, dark: Moon, system: Monitor };

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme = "system", setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted
    ? (theme as ThemeMode) in cycle
      ? (theme as ThemeMode)
      : "system"
    : "system";

  const IconComponent = Icon[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(cycle[current])}
      aria-label={label[current]}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] text-[var(--on-surface)] transition-colors duration-[var(--duration-fast)]",
        "hover:bg-[var(--accent-muted)]",
        className,
      )}
    >
      <IconComponent size={18} aria-hidden />
    </button>
  );
}
