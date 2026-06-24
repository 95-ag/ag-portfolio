import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// Dev-only gallery scaffolding. The section h2 sits in a scoped .prose-content div to reuse the
// project-page heading style (SectionProgressNav scrapes the h2s); captions use <div>/<span> so
// prose-content doesn't restyle them. Ids stay stable so a blog post can deep-link a component.

export function GallerySection({
  id,
  title,
  intro,
  mapsTo,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  /** Which DESIGN.md section this maps to, e.g. "Foundations → Colors". */
  mapsTo: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className="flex scroll-mt-[var(--spacing-4xl)] flex-col gap-[var(--spacing-2xl)]"
    >
      {/* The h2's prose margin-bottom is zeroed ([&_h2]:mb-0) so the section's flex gap governs the
          rhythm instead. SectionProgressNav assigns the h2 id. */}
      <div className="flex flex-col gap-[var(--spacing-md)]">
        <div className="prose-content [&_h2]:mb-0">
          <h2>{title}</h2>
        </div>
        <span className="mono-anchor">→ DESIGN.md → {mapsTo}</span>
        <div className="body-primary text-[var(--on-background)]">{intro}</div>
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
    <div
      id={id}
      className="flex scroll-mt-[var(--spacing-4xl)] flex-col gap-[var(--spacing-md)]"
    >
      <h3 className="heading-component">{name}</h3>
      {source && <span className="mono-code">{source}</span>}
      {description && (
        <span className="body-caption text-[var(--on-background)]">
          {description}
        </span>
      )}
      {children}
      {spec && <div className="mono-anchor">{spec}</div>}
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
      {label && <span className="mono-code">{label}</span>}
    </div>
  );
}
