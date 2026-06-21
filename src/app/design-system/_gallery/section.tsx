import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// Dev-only gallery helpers. Section/specimen carry stable ids so a blog post can
// deep-link any component (e.g. /design-system#ui-button). Numbered-section +
// rationale + card patterns mirror getdesign.md, rendered in our own tokens.

export function GallerySection({
  id,
  number,
  title,
  rationale,
  children,
}: {
  id: string;
  /** Two-digit section number, e.g. "01". */
  number: string;
  title: string;
  rationale?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="flex scroll-mt-[var(--spacing-4xl)] flex-col gap-[var(--spacing-xl)]"
    >
      <div className="flex flex-col gap-[var(--spacing-sm)]">
        <span className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--on-surface-muted)]">
          [{number}] {title}
        </span>
        <h2 id={`${id}-heading`} className="heading-section">
          {title}
        </h2>
        {rationale && (
          <p className="body-secondary max-w-[70ch]">{rationale}</p>
        )}
      </div>
      <div className="flex flex-col gap-[var(--spacing-2xl)]">{children}</div>
    </section>
  );
}

export function Specimen({
  id,
  name,
  source,
  spec,
  description,
  children,
}: {
  id: string;
  name: string;
  /** Import path or export name, shown in mono. */
  source?: string;
  /** One-line spec, e.g. "variants: primary · secondary". */
  spec?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-[var(--spacing-4xl)] flex-col gap-[var(--spacing-md)]"
    >
      <div className="flex flex-col gap-[2px]">
        <h3 className="heading-component">{name}</h3>
        {source && (
          <span className="font-mono text-[13px] text-[var(--on-surface-muted)]">
            {source}
          </span>
        )}
        {description && (
          <p className="body-caption max-w-[70ch]">{description}</p>
        )}
      </div>
      {children}
      {spec && (
        <p className="font-mono text-[12px] text-[var(--on-surface-muted)]">
          {spec}
        </p>
      )}
    </div>
  );
}

/** Bordered cell — the live component sits inside, optional mono token label below. */
export function Card({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <div
        className={cn(
          "flex min-h-[64px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)] p-[var(--spacing-lg)]",
          className,
        )}
      >
        {children}
      </div>
      {label && (
        <span className="font-mono text-[12px] text-[var(--on-surface-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}
