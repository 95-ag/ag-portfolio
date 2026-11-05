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
  // Pressing the panel moves focus off the mark, which must not read as a blur
  // dismissal or the reveal text could never be selected.
  const pressedPanel = useRef(false);

  const keyboardFocused = () => !!triggerRef.current?.matches(":focus-visible");

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const mark = trigger.getBoundingClientRect();
    const box = panel.getBoundingClientRect();
    // The token is declared in px; read it as the inset the panel keeps from the viewport.
    const inset = Number.parseFloat(
      getComputedStyle(panel).getPropertyValue("--spacing-md"),
    );
    const edge = align === "start" ? mark.left : mark.right - box.width;
    const maxLeft = document.documentElement.clientWidth - inset - box.width;
    const left = Math.min(Math.max(edge, inset), Math.max(maxLeft, inset));
    const aboveTop = mark.top - box.height;

    // Floating chrome above the panel's own layer is found by looking at what
    // is stacked over the panel's would-be rect, so the nav is never hardcoded.
    const layer = Number(getComputedStyle(panel).zIndex);
    const runsUnderChrome = (top: number) => {
      const xs = [left + 1, left + box.width / 2, left + box.width - 1];
      const ys = [top + 1, top + box.height / 2];
      return xs.some((x) =>
        ys.some((y) =>
          document.elementsFromPoint(x, y).some((el) => {
            if (panel.contains(el)) return false;
            for (
              let node: Element | null = el;
              node && node !== document.body;
              node = node.parentElement
            ) {
              const style = getComputedStyle(node);
              if (style.position === "fixed")
                return Number(style.zIndex) > layer;
            }
            return false;
          }),
        ),
      );
    };
    // Lazy, because place() runs on every scroll while open and each chrome
    // check hit-tests six points; below-first usually settles it in one.
    const fitsBelow = () =>
      mark.bottom + box.height <=
        document.documentElement.clientHeight - inset &&
      !runsUnderChrome(mark.bottom);
    const fitsAbove = () => aboveTop >= inset && !runsUnderChrome(aboveTop);
    const below = fitsBelow() || !fitsAbove();

    // The xs gap sits on the side facing the mark, so the pointer can cross it.
    panel.dataset.side = below ? "below" : "above";
    panel.style.left = `${left}px`;
    panel.style.top = `${below ? mark.bottom : aboveTop}px`;
  }, [align]);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      pressedPanel.current = false;
      setOpen(false);
    };
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
        !keyboardFocused() &&
        !panelRef.current?.contains(event.relatedTarget as Node | null)
      ) {
        setOpen(false);
      }
    },
    onPointerDown: (event: React.PointerEvent) => {
      lastPointerType.current = event.pointerType;
      touchStartedClosed.current = !open;
    },
    // A touch that turns into a scroll never clicks, so a later keyboard
    // click would otherwise read as the first tap and be swallowed.
    onPointerCancel: () => {
      lastPointerType.current = "";
    },
    onFocus: () => {
      pressedPanel.current = false;
      setOpen(true);
    },
    onBlur: () => {
      if (pressedPanel.current) {
        pressedPanel.current = false;
        return;
      }
      setOpen(false);
    },
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
            className="fixed top-0 left-0 z-[var(--z-popover)] w-max max-w-[calc(100vw-2*var(--spacing-md))] pb-[var(--spacing-xs)] data-[side=below]:pt-[var(--spacing-xs)] data-[side=below]:pb-0"
            onPointerDown={() => {
              pressedPanel.current = true;
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType !== "touch" &&
                !keyboardFocused() &&
                !triggerRef.current?.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setOpen(false);
              }
            }}
          >
            <div className="body-caption rounded-[var(--radius-sm)] border border-[var(--hairline)] bg-[var(--surface-elevated)] px-[var(--spacing-md)] py-[var(--spacing-xs)]">
              {description}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
