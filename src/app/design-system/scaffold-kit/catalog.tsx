import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function GallerySection({
  id,
  title,
  intro,
  mapsTo,
  source,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  /** Which DESIGN.md section this maps to, e.g. "Foundations → Colors". */
  mapsTo: string;
  /** Optional source path/selector, shown when the section is a single specimen with no inner Specimen. */
  source?: string;
  children: ReactNode;
}) {
  return (
    // Namespaced id (ds-*) so it never collides with the text-derived h2 id SectionProgressNav assigns.
    // No aria-label: the visible h2 carries the section's accessible structure (avoids a redundant region landmark).
    <section
      id={`ds-${id}`}
      className="flex scroll-mt-[var(--spacing-4xl)] flex-col gap-[var(--spacing-2xl)]"
    >
      <div className="flex flex-col gap-[var(--spacing-md)]">
        {/* [&_h2]:mb-0 hands rhythm to the section's flex gap; the rail assigns the h2 id. */}
        <div className="prose-content [&_h2]:mb-0">
          <h2>{title}</h2>
        </div>
        <span className="mono-anchor">→ DESIGN.md → {mapsTo}</span>
        {source && <span className="mono-code">{source}</span>}
        <div className="body-primary">{intro}</div>
      </div>
      <div className="flex flex-col gap-[var(--spacing-2xl)]">{children}</div>
    </section>
  );
}

/** A named sub-group inside a section: an h3 eyebrow above its specimens, which render at h4.
 *  Mirrors a DESIGN.md `####` sub-group. */
export function SpecimenGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      <h3 className="mono-anchor">{title}</h3>
      <div className="flex flex-col gap-[var(--spacing-2xl)]">{children}</div>
    </div>
  );
}

export function Specimen({
  id,
  name,
  source,
  spec,
  description,
  headingLevel = 3,
  children,
}: {
  id: string;
  name: string;
  source?: string;
  spec?: string;
  description?: string;
  /** 3 at section level, 4 when nested in a SpecimenGroup. */
  headingLevel?: 3 | 4;
  children: ReactNode;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <div
      id={id}
      className="flex scroll-mt-[var(--spacing-4xl)] flex-col gap-[var(--spacing-md)]"
    >
      <Heading className="heading-component">{name}</Heading>
      {source && <span className="mono-code">{source}</span>}
      {description && <span className="body-primary">{description}</span>}
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
          "flex min-h-[var(--spacing-3xl)] items-center justify-center border border-[var(--hairline)] bg-[var(--surface-deep)] p-[var(--spacing-lg)]",
          className,
        )}
      >
        {children}
      </div>
      {label && <span className="mono-code">{label}</span>}
    </div>
  );
}
