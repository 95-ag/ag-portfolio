import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// Dev-only gallery helpers. These render component previews; they do NOT ship to
// production (the /design-system route is pruned from the release snapshot).

const FRAME_CLASS =
  "rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface)] p-[var(--spacing-lg)] text-[var(--on-surface)]";

function Frame({
  theme,
  label,
  children,
}: {
  theme: "light" | "dark";
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-sm)]">
      <span className="insight-label">{label}</span>
      {/* Forced theme: globals.css defines dark tokens under the bare [data-theme="dark"]
          selector, so this wrapper re-scopes every token via the cascade — both themes
          render side by side without touching the page's global theme. */}
      <div data-theme={theme} className={FRAME_CLASS}>
        {children}
      </div>
    </div>
  );
}

/**
 * Renders its children twice — once in a forced-light frame, once in forced-dark —
 * side by side. The comparison view for token-driven components.
 */
export function ThemePair({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-md)] md:flex-row",
        className,
      )}
    >
      <Frame theme="light" label="Light">
        {children}
      </Frame>
      <Frame theme="dark" label="Dark">
        {children}
      </Frame>
    </div>
  );
}

/**
 * A single framed preview that follows the page's global theme. For components that
 * can't sensibly render twice side by side (full-viewport background, fixed chrome,
 * scroll-dependent widgets). An optional note explains the constraint.
 */
export function DemoFrame({
  children,
  className,
  note,
}: {
  children?: ReactNode;
  className?: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-sm)]">
      <div className={cn(FRAME_CLASS, className)}>{children}</div>
      {note && (
        <p className="body-caption max-w-[70ch] text-[var(--on-surface-muted)]">
          {note}
        </p>
      )}
    </div>
  );
}
