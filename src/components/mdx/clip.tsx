import {
  type FigureWidth,
  figureWidthClass,
} from "@/components/mdx/figure-width";

interface ClipProps {
  src: string;
  poster: string;
  alt: string;
  caption?: string;
  width?: FigureWidth;
  /** Aspect ratio for the video container, e.g. "16/9" or "590/1278" */
  aspect?: string;
}

// Click-to-play with no autoplay or loop, so reduced motion needs no separate path.
export function Clip({
  src,
  poster,
  alt,
  caption,
  width = "default",
  aspect = "16/9",
}: ClipProps) {
  return (
    <figure
      className={`my-[var(--spacing-2xl)] mx-auto ${figureWidthClass[width]}`}
    >
      <span
        style={{ aspectRatio: aspect }}
        className="relative block w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)]"
      >
        <video
          src={src}
          poster={poster}
          aria-label={alt}
          controls
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </span>
      {caption && (
        <figcaption className="body-caption mt-[var(--spacing-sm)] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
