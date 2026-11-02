"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface PopoverProps {
  /** Accessible name of the trigger. */
  label: string;
  /** Panel content; also the trigger's accessible description. */
  description: ReactNode;
  /** Which edge of the mark the panel lines up with. */
  align: "start" | "end";
  /** Makes the mark a link: hover or focus reveals, click follows; on touch the second tap follows. */
  href?: string;
  /** The visible mark. */
  children: ReactNode;
}

export function PopoverDescription({
  name,
  detail,
}: {
  name: string;
  detail?: string;
}) {
  return (
    <>
      <span className="block text-[var(--ink)]">{name}</span>
      {detail && <span className="block">{detail}</span>}
    </>
  );
}

export function Popover({
  label,
  description,
  align,
  href,
  children,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const descriptionId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const setTrigger = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);
  const panelRef = useRef<HTMLDivElement>(null);
  // A tap focuses the mark before the click arrives, so "was it already revealed"
  // has to be read at pointerdown, which comes first.
  const touchStartedClosed = useRef(false);
  const lastPointerType = useRef("");

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const mark = trigger.getBoundingClientRect();
    const box = panel.getBoundingClientRect();
    const inset = Number.parseFloat(
      getComputedStyle(panel).getPropertyValue("--spacing-md"),
    );
    const edge = align === "start" ? mark.left : mark.right - box.width;
    const maxLeft = document.documentElement.clientWidth - inset - box.width;
    const left = Math.min(Math.max(edge, inset), Math.max(maxLeft, inset));
    panel.style.left = `${left}px`;
    panel.style.top = `${mark.top - box.height}px`;
  }, [align]);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  const triggerProps = {
    ref: setTrigger,
    "aria-label": label,
    "aria-describedby": descriptionId,
    className:
      "relative inline-flex select-none rounded-[var(--radius-pill)] after:absolute after:top-1/2 after:left-1/2 after:h-11 after:w-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "touch") setOpen(true);
    },
    onPointerLeave: (event: React.PointerEvent) => {
      if (
        event.pointerType !== "touch" &&
        !panelRef.current?.contains(event.relatedTarget as Node | null)
      ) {
        setOpen(false);
      }
    },
    onPointerDown: (event: React.PointerEvent) => {
      lastPointerType.current = event.pointerType;
      touchStartedClosed.current = !open;
    },
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    onClick: (event: React.MouseEvent) => {
      const firstTouchTap =
        lastPointerType.current === "touch" && touchStartedClosed.current;
      lastPointerType.current = "";
      if (href && firstTouchTap) event.preventDefault();
      setOpen(true);
    },
  };

  return (
    <>
      {href ? (
        <a
          {...triggerProps}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <button type="button" {...triggerProps}>
          {children}
        </button>
      )}
      <span id={descriptionId} className="sr-only">
        {description}
      </span>
      {open &&
        createPortal(
          <div
            ref={panelRef}
            aria-hidden="true"
            className="fixed top-0 left-0 z-[var(--z-popover)] w-max max-w-[calc(100vw-2*var(--spacing-md))] pb-[var(--spacing-xs)]"
            onPointerLeave={(event) => {
              if (
                event.pointerType !== "touch" &&
                !triggerRef.current?.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setOpen(false);
              }
            }}
          >
            <div className="body-caption rounded-[var(--radius-sm)] border border-[var(--hairline)] bg-[var(--surface-elevated)] px-[var(--spacing-md)] py-[var(--spacing-sm)]">
              {description}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
