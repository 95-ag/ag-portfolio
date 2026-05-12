"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Home, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils/cn";
import { useFocusTrap } from "@/lib/utils/focus-trap";

// Home is included in mobile nav since there's no persistent logo link on mobile
const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: User },
  { href: "/work", label: "Work", Icon: Briefcase },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, open);

  // Close on route change
  // pathname is intentionally the trigger — setOpen is stable
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, setOpen is stable
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // When reduced motion: instant enter/exit (duration 0, no transform/opacity games).
  // Panel is always opacity:1 in both states so reduced-motion users still see it.
  const panelVariants = {
    hidden: { x: shouldReduceMotion ? 0 : "100%", opacity: 1 },
    visible: { x: 0, opacity: 1 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="fixed top-[var(--spacing-md)] right-[var(--spacing-md)] z-[var(--z-pill-nav)] flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--outline-variant)] bg-[var(--surface-overlay)] backdrop-blur-[12px]"
      >
        <Menu size={20} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-[var(--z-mobile-menu-overlay)] bg-[var(--on-background)]/40"
            />

            {/* Slide-out panel */}
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.3, 0, 0, 1],
              }}
              className="fixed top-0 right-0 z-[var(--z-mobile-menu-panel)] flex h-full w-[min(320px,85vw)] flex-col border-l border-[var(--outline-variant)] bg-[var(--surface-overlay)] p-[var(--spacing-lg)] backdrop-blur-[16px]"
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <span className="type-mono-label text-[var(--on-surface-muted)]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--accent-muted)]"
                >
                  <X size={20} aria-hidden />
                </button>
              </div>

              <div
                className="my-[var(--spacing-md)] h-px bg-[var(--outline-variant)]"
                aria-hidden="true"
              />

              {/* Nav items */}
              <nav
                aria-label="Primary"
                className="flex flex-col gap-[var(--spacing-xs)]"
              >
                {NAV_ITEMS.map(({ href, label, Icon }) => {
                  const isActive =
                    href === "/" ? pathname === "/" : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex h-12 items-center gap-[var(--spacing-md)] rounded-[var(--radius-md)] px-[var(--spacing-md)] text-base font-medium transition-colors duration-[var(--duration-fast)]",
                        isActive
                          ? "bg-[var(--accent)] text-[var(--accent-on)]"
                          : "text-[var(--on-surface)] hover:bg-[var(--accent-muted)]",
                      )}
                    >
                      <Icon size={20} aria-hidden />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex-1" />

              <div
                className="mb-[var(--spacing-md)] h-px bg-[var(--outline-variant)]"
                aria-hidden="true"
              />

              {/* Theme toggle at bottom */}
              <div className="flex items-center gap-[var(--spacing-md)]">
                <span className="type-body-sm text-[var(--on-surface-muted)]">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
