"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconProps } from "@/components/icons/icon-base";
import { FingerprintIcon } from "@/components/icons/material/fingerprint";
import { FolderCodeIcon } from "@/components/icons/material/folder-code";
import { StickyNoteIcon } from "@/components/icons/material/sticky-note";
import { LogoMark } from "@/components/shell/logo-mark";
import { PillThemeSelector } from "@/components/ui/controls/theme-selector";
import { cn } from "@/lib/utils/cn";

type NavIconComponent = (props: IconProps) => React.ReactElement;

const NAV_ITEMS: { href: string; label: string; Icon: NavIconComponent }[] = [
  { href: "/about", label: "About", Icon: FingerprintIcon },
  { href: "/work", label: "Work", Icon: FolderCodeIcon },
  { href: "/writing", label: "Writing", Icon: StickyNoteIcon },
];

export function PillNav() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed top-[var(--spacing-lg)] right-0 left-0 z-[var(--z-pill-nav)] flex justify-center px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-gutter)] xl:px-[var(--spacing-margin-desktop)]">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex h-11 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] border border-[var(--hairline)] bg-[var(--surface-floating)] px-[var(--spacing-sm)] backdrop-blur-[12px]"
      >
        <Link
          href="/"
          aria-label="Home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        >
          <LogoMark />
        </Link>

        <div aria-hidden="true" className="h-5 w-px bg-[var(--hairline)]" />

        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "nav-link flex h-8 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] px-[var(--spacing-md)] motion-safe:transition-[color,background-color] motion-safe:duration-[var(--duration-fast)]",
                isActive
                  ? "bg-[var(--surface-active)] text-[var(--ink)]"
                  : "text-[var(--ink-muted)] hover:bg-[var(--surface-deep)] hover:text-[var(--ink)]",
              )}
            >
              <Icon
                size={16}
                className={isActive ? "text-[var(--accent)]" : ""}
              />
              {label}
            </Link>
          );
        })}

        <div aria-hidden="true" className="h-5 w-px bg-[var(--hairline)]" />

        <PillThemeSelector />
      </nav>
    </div>
  );
}
