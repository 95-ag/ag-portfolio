import Image from "next/image";
import { LightboxTrigger } from "@/components/ui/display/lightbox";
import { cn } from "@/lib/utils/cn";

type FigureWidth = "default" | "narrow" | "wide";

const containerClass: Record<FigureWidth, string> = {
  default: "w-full",
  narrow: "mx-auto w-full max-w-[560px]",
  wide: "w-full max-w-[960px]",
};

interface DiagramProps {
  src: string;
  alt: string;
  caption?: string;
  width?: FigureWidth;
  aspect?: string;
  className?: string;
}

export function Diagram({
  src,
  alt,
  caption,
  width = "default",
  aspect = "16/9",
  className,
}: DiagramProps) {
  return (
    <figure
      className={cn(
        "my-[var(--spacing-2xl)] mx-auto",
        containerClass[width],
        className,
      )}
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
