"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconProps } from "@/components/icons/icon-base";
import { FingerprintIcon } from "@/components/icons/material/fingerprint";
import { FolderCodeIcon } from "@/components/icons/material/folder-code";
import { PillThemeSelector } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils/cn";

type NavIconComponent = (props: IconProps) => React.ReactElement;

const NAV_ITEMS: { href: string; label: string; Icon: NavIconComponent }[] = [
  { href: "/about", label: "About", Icon: FingerprintIcon },
  { href: "/work", label: "Work", Icon: FolderCodeIcon },
];

function LogoMark() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity duration-[var(--duration-fast)] hover:opacity-80"
    >
      <Image
        src="/cat_head_icon.svg"
        alt=""
        width={32}
        height={32}
        className="rounded-full"
        unoptimized
      />
    </Link>
  );
}

export function PillNav() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed top-[var(--spacing-lg)] right-0 left-0 z-[var(--z-pill-nav)] flex justify-center px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-gutter)] xl:px-[var(--spacing-margin-desktop)]">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex h-11 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] border border-[var(--outline-variant)] bg-[var(--surface-nav)] px-[var(--spacing-sm)] backdrop-blur-[12px]"
      >
        <LogoMark />

        <div
          aria-hidden="true"
          className="h-5 w-px bg-[var(--outline-variant)]"
        />

        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "nav-link flex h-8 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] px-[var(--spacing-md)] transition-colors duration-[var(--duration-fast)]",
                isActive
                  ? "bg-[var(--surface-selection)] text-[var(--on-surface)]"
                  : "text-[var(--on-surface-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--on-surface)]",
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

        <div
          aria-hidden="true"
          className="h-5 w-px bg-[var(--outline-variant)]"
        />

        <PillThemeSelector />
      </nav>
    </div>
  );
}
