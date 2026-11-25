"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { IconProps } from "@/components/icons/icon-base";
import { CloseIcon } from "@/components/icons/material/close";
import { FingerprintIcon } from "@/components/icons/material/fingerprint";
import { FolderCodeIcon } from "@/components/icons/material/folder-code";
import { MenuIcon } from "@/components/icons/material/menu";
import { StickyNoteIcon } from "@/components/icons/material/sticky-note";
import { LogoMark } from "@/components/shell/logo-mark";
import { cn } from "@/lib/utils/cn";
import { useFocusTrap } from "@/lib/utils/focus-trap";
import "./nav.css";

type NavIconComponent = (props: IconProps) => React.ReactElement;

const NAV_ITEMS: { href: string; label: string; Icon: NavIconComponent }[] = [
  { href: "/about", label: "About", Icon: FingerprintIcon },
  { href: "/work", label: "Work", Icon: FolderCodeIcon },
  { href: "/writing", label: "Writing", Icon: StickyNoteIcon },
];

// Where the row collapses and expands again: the gap keeps it from flickering around one scroll position.
const COLLAPSE_AFTER = 80;
const EXPAND_UNDER = 24;
// The row shows from here up; at and below `stack` only the button and the card exist.
const ROW_QUERY = "(min-width: 861px)";

// `page` on the page itself, `true` on a detail page inside the section. Matching is by path segment.
function currentOf(
  pathname: string,
  href: string,
): "page" | "true" | undefined {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "true";
  return undefined;
}

function navItems(showWriting: boolean) {
  return showWriting
    ? NAV_ITEMS
    : NAV_ITEMS.filter(({ href }) => href !== "/writing");
}

function itemClasses(current: boolean) {
  return cn(
    "nav-link nav-item",
    current
      ? "bg-[var(--surface-active)] text-[var(--ink)]"
      : "text-[var(--ink-muted)] hover:bg-[var(--surface-deep)] hover:text-[var(--ink)]",
  );
}

interface NavViewProps {
  pathname: string;
  // The wide row has collapsed into the button.
  collapsed: boolean;
  open: boolean;
  // The row is on screen (861px and up); without it only the button and the card exist.
  wide: boolean;
  // Writing is listed only once a post is published (PROJECT.md → Writing).
  showWriting: boolean;
  onToggle?: () => void;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  toggleRef?: React.RefObject<HTMLButtonElement | null>;
}

// Presentational: the root `Nav` holds the scroll, open and resize state; the design-system gallery renders this directly.
export function NavView({
  pathname,
  collapsed,
  open,
  wide,
  showWriting,
  onToggle,
  cardRef,
  toggleRef,
}: NavViewProps) {
  const rowRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const items = navItems(showWriting);

  // Each row item slides to the button's centre when the row collapses: measure how far, from layout (not from a
  // transformed rect), on mount, on resize and once the font has settled the widths.
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const buttonHalf = row.offsetHeight / 2;
      for (const item of row.querySelectorAll<HTMLElement>("[data-nav-item]")) {
        const centre = item.offsetLeft + item.offsetWidth / 2;
        item.style.setProperty(
          "--dx",
          `${row.offsetWidth - buttonHalf - centre}px`,
        );
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const showButton = collapsed || !wide;
  return (
    <div
      className="nav"
      data-mode={showButton ? "button" : "row"}
      data-open={open}
      // The card's height follows its rows: Home plus the items.
      style={{ "--nav-count": items.length + 1 } as CSSProperties}
    >
      <nav
        ref={rowRef}
        aria-label="Primary"
        data-nav-row
        className="nav-row"
        inert={collapsed}
      >
        <Link
          href="/"
          aria-label="Home"
          aria-current={currentOf(pathname, "/")}
          data-nav-item
          className="group nav-logo"
        >
          <LogoMark />
        </Link>
        {items.map(({ href, label, Icon }) => {
          const current = currentOf(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={current}
              data-nav-item
              className={itemClasses(Boolean(current))}
            >
              <Icon
                size={16}
                className={current ? "text-[var(--accent)]" : ""}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div ref={cardRef} data-nav-card className="contents">
        <div
          data-nav-box
          aria-hidden="true"
          className="nav-box surface-glass"
        />
        <button
          ref={toggleRef}
          type="button"
          data-nav-toggle
          aria-label="Navigation menu"
          aria-expanded={open}
          aria-controls={menuId}
          inert={!showButton}
          onClick={onToggle}
          className="nav-toggle"
        >
          <MenuIcon size={20} className="nav-icon-menu" />
          <CloseIcon size={20} className="nav-icon-close" />
        </button>
        <nav
          id={menuId}
          aria-label="Menu"
          data-nav-list
          className="nav-list"
          inert={!open}
        >
          <Link
            href="/"
            aria-current={currentOf(pathname, "/")}
            className={itemClasses(pathname === "/")}
          >
            <span aria-hidden="true" className="nav-mark">
              <LogoMark animated={false} pathname={pathname} />
            </span>
            Home
          </Link>
          {items.map(({ href, label, Icon }) => {
            const current = currentOf(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={current}
                className={itemClasses(Boolean(current))}
              >
                <Icon
                  size={16}
                  className={current ? "text-[var(--accent)]" : ""}
                />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function Nav({ showWriting }: { showWriting: boolean }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(cardRef, open, toggleRef);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setCollapsed((was) => (was ? y >= EXPAND_UNDER : y > COLLAPSE_AFTER));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // The row appearing or going away is a different layout: the card closes either way.
  useEffect(() => {
    const query = window.matchMedia(ROW_QUERY);
    setWide(query.matches);
    const onChange = (event: MediaQueryListEvent) => {
      setWide(event.matches);
      setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the pathname is the trigger, setOpen is stable
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && (
        // An invisible catcher: with no overlay, a tap outside the card still dismisses it.
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[var(--z-nav)]"
        />
      )}
      <NavView
        pathname={pathname}
        collapsed={collapsed}
        open={open}
        wide={wide}
        showWriting={showWriting}
        onToggle={() => setOpen((was) => !was)}
        cardRef={cardRef}
        toggleRef={toggleRef}
      />
    </>
  );
}
