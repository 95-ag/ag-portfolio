import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// Dev-only gallery helpers. The page body is wrapped in `.prose-content`, so the
// h2/h3 here inherit the exact project-detail-page heading styles (and SectionProgressNav
// scrapes these h2s for the left-rail TOC). Body text uses <div>/<span> (which
// prose-content does not restyle) to keep specimen captions controlled. Section/specimen
// ids stay stable so a blog post can deep-link any component.

export function GallerySection({
  id,
  title,
  intro,
  mapsTo,
  children,
}: {
  id: string;
  title: string;
  /** One-line intro blurb for the section. */
  intro: string;
  /** Which DESIGN.md section this maps to, e.g. "Foundations → Colors". */
  mapsTo: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className="scroll-mt-[var(--spacing-4xl)]"
    >
      {/* Scoped prose-content so the h2 reuses the exact project-page heading style
          (mono rule) without prose restyling the component demos below. The h2 has no
          id — SectionProgressNav assigns a slugified one and links to it. The DESIGN.md
          pointer sits immediately after the heading (uniform across every section). */}
      <div className="prose-content">
        <h2>{title}</h2>
      </div>
      <div className="mb-[var(--spacing-2xl)] flex flex-col gap-[var(--spacing-xs)]">
        <span className="font-mono text-[13px] text-[var(--on-surface-muted)]">
          → DESIGN.md → {mapsTo}
        </span>
        <div className="body-secondary text-[var(--on-background)]">
          {intro}
        </div>
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
  source?: string;
  spec?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-[var(--spacing-4xl)]">
      <h3 className="heading-component">{name}</h3>
      <div className="mb-[var(--spacing-md)] flex flex-col gap-[2px]">
        {source && (
          <span className="font-mono text-[13px] text-[var(--on-surface-muted)]">
            {source}
          </span>
        )}
        {description && (
          <span className="body-caption text-[var(--on-background)]">
            {description}
          </span>
        )}
      </div>
      {children}
      {spec && (
        <div className="mt-[var(--spacing-sm)] font-mono text-[12px] text-[var(--on-surface-muted)]">
          {spec}
        </div>
      )}
    </div>
  );
}

/** Bordered cell matching the ProjectCard treatment (sharp corners, hairline border). */
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
          "flex min-h-[64px] items-center justify-center border border-[var(--outline-variant)] bg-[var(--surface-sunken)] p-[var(--spacing-lg)]",
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
