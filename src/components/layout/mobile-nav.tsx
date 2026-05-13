"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils/cn";
import { useFocusTrap } from "@/lib/utils/focus-trap";

const NAV_ITEMS = [
  { href: "/about", label: "About", Icon: User },
  { href: "/work", label: "Work", Icon: Briefcase },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, open);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, setOpen is stable
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="fixed top-[var(--spacing-md)] right-[var(--spacing-md)] z-[var(--z-pill-nav)] flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--outline-variant)] bg-[var(--surface-overlay)] backdrop-blur-[12px] text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--on-surface)]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
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
              className="fixed inset-0 z-[var(--z-mobile-menu-overlay)] bg-[var(--on-background)]/30"
            />

            {/* Panel */}
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
              className="fixed top-0 right-0 z-[var(--z-mobile-menu-panel)] flex h-full w-[min(280px,80vw)] flex-col bg-[var(--surface-overlay-panel)] p-[var(--spacing-lg)] backdrop-blur-[12px]"
            >
              {/* Header: logomark + close */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  aria-label="Home"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity duration-[var(--duration-fast)] hover:opacity-80"
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
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--surface-sunken)] hover:text-[var(--on-surface)]"
                >
                  <X size={18} aria-hidden />
                </button>
              </div>

              {/* Nav items */}
              <nav
                aria-label="Primary"
                className="mt-[var(--spacing-xl)] flex flex-col gap-[var(--spacing-xs)]"
              >
                {NAV_ITEMS.map(({ href, label, Icon }) => {
                  const isActive = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex h-10 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] px-[var(--spacing-md)] text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                        isActive
                          ? "bg-[var(--surface-sunken)] text-[var(--on-surface)]"
                          : "text-[var(--on-surface-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--on-surface)]",
                      )}
                    >
                      <Icon size={16} aria-hidden />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex-1" />

              {/* Theme toggle */}
              <ThemeToggle />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
