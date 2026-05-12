"use client";

import { Briefcase, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils/cn";

// Pages linked from the nav (Home is handled by the logo)
const NAV_ITEMS = [
  { href: "/about", label: "About", Icon: User },
  { href: "/work", label: "Work", Icon: Briefcase },
] as const;

// Round logo mark — replace with next/image when a real logo asset exists in /public
function LogoMark() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-80"
    >
      <span className="type-mono-label text-[10px]" aria-hidden="true">
        AG
      </span>
    </Link>
  );
}

export function PillNav() {
  const pathname = usePathname();

  return (
    /* Outer wrapper constrains centering to the 1200px content column */
    <div className="pointer-events-none fixed top-[var(--spacing-lg)] right-0 left-0 z-[var(--z-pill-nav)] flex justify-center px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-gutter)] xl:px-[var(--spacing-margin-desktop)]">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex h-11 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] border border-[var(--outline-variant)] bg-[var(--surface-overlay)] px-[var(--spacing-sm)] backdrop-blur-[12px]"
      >
        {/* Logo — home link */}
        <LogoMark />

        {/* Divider between logo and nav items */}
        <div
          aria-hidden="true"
          className="h-5 w-px bg-[var(--outline-variant)]"
        />

        {/* Nav items */}
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-8 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] px-[var(--spacing-md)] text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-on)]"
                  : "text-[var(--on-surface)] hover:bg-[var(--accent-muted)]",
              )}
            >
              <Icon size={16} aria-hidden />
              {label}
            </Link>
          );
        })}

        {/* Divider before theme toggle */}
        <div
          aria-hidden="true"
          className="h-5 w-px bg-[var(--outline-variant)]"
        />

        <ThemeToggle />
      </nav>
    </div>
  );
}
