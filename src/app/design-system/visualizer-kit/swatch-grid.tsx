import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type SwatchToken = {
  token: string;
  name: string;
  usage: string;
  /** CSS value for the swatch fill; defaults to `var(<token>)`. Set for non-color tokens
   *  (e.g. an RGB triple read via `rgb(var(<token>))`). */
  swatchValue?: string;
  /** Marks a token shown only under a scope (e.g. dark reading mode); gets `darkOnlyClassName`. */
  darkOnly?: boolean;
  /** Hidden in dark, where the token is not defined (gallery.css `.ds-light-only`). */
  lightOnly?: boolean;
};

export type SwatchGroup = {
  label: string;
  tokens: SwatchToken[];
  note?: ReactNode;
  /** Shown in dark only, standing in for the light-only tokens above it. */
  darkNote?: ReactNode;
  /** Wraps the grid to re-scope tokens (e.g. a reading-mode override class). */
  scopeClassName?: string;
  /** Applied to `darkOnly` tokens within a scoped group. */
  darkOnlyClassName?: string;
};

function ColorCard({
  token,
  name,
  usage,
  swatchValue,
  className,
}: SwatchToken & { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-[var(--hairline)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-20 w-full border-b border-[var(--hairline)]"
        style={{ background: swatchValue ?? `var(${token})` }}
      />
      <div className="flex flex-1 flex-col gap-[var(--spacing-xs)] bg-[var(--surface-elevated)] p-[var(--spacing-sm)]">
        <span className="body-emphasis">{name}</span>
        <span className="mono-code">{token}</span>
        <span className="body-caption">{usage}</span>
      </div>
    </div>
  );
}

export function SwatchGrid({ groups }: { groups: SwatchGroup[] }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {groups.map((group) => (
        <div
          key={group.label}
          className="flex flex-col gap-[var(--spacing-md)]"
        >
          <span className="mono-anchor">{group.label}</span>
          {group.note && <div className="body-caption">{group.note}</div>}
          <div
            className={cn(
              "grid grid-cols-2 gap-[var(--spacing-sm)] md:grid-cols-3 xl:grid-cols-4",
              group.scopeClassName,
            )}
          >
            {group.tokens.map((t) => (
              <ColorCard
                key={t.token}
                {...t}
                className={cn(
                  t.darkOnly && group.darkOnlyClassName,
                  t.lightOnly && "ds-light-only",
                )}
              />
            ))}
          </div>
          {group.darkNote && (
            <div className="ds-dark-only body-caption">{group.darkNote}</div>
          )}
        </div>
      ))}
    </div>
  );
}
