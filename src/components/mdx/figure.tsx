import Image from "next/image";
import { cn } from "@/lib/utils/cn";

// Width enum per CONTENT-SCHEMA.md §5
// "default" = constrained to reading column (~720px)
// "wide" = up to ~960px
// "full" = full content width
type FigureWidth = "default" | "wide" | "full";

const containerClass: Record<FigureWidth, string> = {
  default: "w-full",
  wide: "w-full max-w-[960px]",
  full: "w-full",
};

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: FigureWidth;
  /** Aspect ratio for the image container, e.g. "16/9" or "4/3" */
  aspect?: string;
  className?: string;
}

export function Figure({
  src,
  alt,
  caption,
  width = "default",
  aspect = "16/9",
  className,
}: FigureProps) {
  return (
    <figure
      className={cn(
        "my-[var(--spacing-2xl)] mx-auto",
        containerClass[width],
        className,
      )}
    >
      <div
        style={{ aspectRatio: aspect }}
        className="relative w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--outline-variant)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 760px"
        />
      </div>
      {caption && (
        <figcaption className="type-body-sm mt-[var(--spacing-sm)] text-[var(--on-surface-muted)] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
