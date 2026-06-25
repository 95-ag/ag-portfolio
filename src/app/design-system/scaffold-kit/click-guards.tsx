"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const SUPPRESSED_MESSAGE =
  "Interactions are disabled in the design-system preview.";

// Tooltip at the pointer when a guard cancels a click. Portaled to <body> so a ChromeFrame's
// transform containing-block can't trap it.
function useSuppressionTip() {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((x: number, y: number) => {
    setTip({ x, y });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setTip(null), 1600);
  }, []);

  useEffect(() => () => clearTimeout(timer.current ?? undefined), []);
  return { tip, show };
}

function SuppressionTip({ tip }: { tip: { x: number; y: number } | null }) {
  if (!tip || typeof document === "undefined") return null;
  return createPortal(
    <div
      role="status"
      className="body-caption pointer-events-none fixed z-[var(--z-mobile-menu-panel)] max-w-[240px] rounded-[var(--radius-sm)] border border-[var(--hairline)] bg-[var(--surface-elevated)] px-[var(--spacing-sm)] py-[var(--spacing-xs)]"
      style={{ left: tip.x + 12, top: tip.y + 12 }}
    >
      {SUPPRESSED_MESSAGE}
    </div>,
    document.body,
  );
}

// The gallery's <article> (SectionProgressNav scrapes its h2s). Cancels anchor clicks only, so demos
// can't navigate away while buttons and copy still fire.
export function DemoViewOnly({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { tip, show } = useSuppressionTip();
  return (
    <article
      className={className}
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest("a[href]")) {
          // stopPropagation so an anchor nested in an InertDemo doesn't also fire that guard's tip.
          event.preventDefault();
          event.stopPropagation();
          show(event.clientX, event.clientY);
        }
      }}
    >
      {children}
      <SuppressionTip tip={tip} />
    </article>
  );
}

// Neutralizes button-based chrome (theme toggle, scroll-to-top) while hover/focus stay live.
// DemoViewOnly only cancels anchors, so buttons need their own guard.
export function InertDemo({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { tip, show } = useSuppressionTip();
  return (
    <div
      className={className}
      onClickCapture={(event) => {
        event.stopPropagation();
        event.preventDefault();
        show(event.clientX, event.clientY);
      }}
    >
      {children}
      <SuppressionTip tip={tip} />
    </div>
  );
}
