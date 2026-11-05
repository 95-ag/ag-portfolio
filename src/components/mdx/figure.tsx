import Image from "next/image";
import {
  type FigureWidth,
  figureWidthClass,
} from "@/components/mdx/figure-width";
import { LightboxTrigger } from "@/components/ui/display/lightbox";
import { cn } from "@/lib/utils/cn";

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
        figureWidthClass[width],
        className,
      )}
    >
      <LightboxTrigger src={src} alt={alt} caption={caption}>
        <span
          style={{ aspectRatio: aspect }}
          className="relative block w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 760px"
          />
        </span>
      </LightboxTrigger>
      {caption && (
        <figcaption className="body-caption mt-[var(--spacing-sm)] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
