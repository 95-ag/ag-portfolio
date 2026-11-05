import Image from "next/image";
import {
  type FigureWidth,
  figureWidthClass,
} from "@/components/mdx/figure-width";
import { LightboxTrigger } from "@/components/ui/display/lightbox";

interface DiagramProps {
  src: string;
  alt: string;
  caption?: string;
  width?: FigureWidth;
  aspect?: string;
}

export function Diagram({
  src,
  alt,
  caption,
  width = "default",
  aspect = "16/9",
}: DiagramProps) {
  return (
    <figure
      className={`my-[var(--spacing-2xl)] mx-auto ${figureWidthClass[width]}`}
    >
      <LightboxTrigger src={src} alt={alt} caption={caption}>
        <span className="block overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--surface-deep)]">
          <span
            style={{ aspectRatio: aspect }}
            className="relative block w-full"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 760px"
            />
          </span>
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
