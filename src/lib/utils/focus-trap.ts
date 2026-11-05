"use client";

import { useEffect } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// `returnTo` names the element that opened the overlay: Safari does not focus a button on click, so
// reading document.activeElement at mount would return focus to <body>.
export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  returnTo?: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    // Closing restores focus in the cleanup of the run that opened it.
    if (!ref.current || !active) return;

    const returnFocus =
      returnTo?.current ?? (document.activeElement as HTMLElement);

    const container = ref.current;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    // Listened for on the document: a click on a non-focusable part of the overlay leaves focus on
    // the container or <body>, where a container listener never hears Tab and focus walks out.
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const current = document.activeElement;
      if (current === container || !container.contains(current)) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      } else if (e.shiftKey && current === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocus?.focus();
    };
  }, [active, ref, returnTo]);
}
