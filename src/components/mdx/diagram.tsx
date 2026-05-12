import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type FigureWidth = "default" | "wide" | "full";

const containerClass: Record<FigureWidth, string> = {
  default: "max-w-[720px]",
  wide: "max-w-[960px]",
  full: "w-full",
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
        "my-[var(--spacing-2xl)]",
        containerClass[width],
        className,
      )}
    >
      <div className="rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)] p-[var(--spacing-lg)]">
        <div
          style={{ aspectRatio: aspect }}
          className="relative w-full overflow-hidden"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="type-body-sm mt-[var(--spacing-sm)] text-[var(--on-surface-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
