"use client";

import Image from "next/image";
import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeftIcon } from "@/components/icons/material/chevron-left";
import { ChevronRightIcon } from "@/components/icons/material/chevron-right";

const FRAME_ASPECT = "590/1278";
// The frame grows with the window height between its floor and cap; below the `carousel` variant's 677px the
// clamp sits at its 220px floor, which is the row layout's width.
const FRAME_WIDTH = "clamp(220px, calc((100vh - 200px) * 590 / 1278), 280px)";

const ARROW =
  "inline-flex size-12 items-center justify-center text-[var(--ink-muted)] motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)] hover:text-[var(--ink)] disabled:opacity-30 disabled:hover:text-[var(--ink-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

interface ScreenCarouselProps {
  label: string;
  children: ReactNode;
}

// Layout is CSS alone (the `carousel` variant), so nothing waits on script and every carousel on a page agrees.
// Script reads which layout CSS chose, to switch carousel semantics on, and keeps the row at its tallest slide.
export function ScreenCarousel({ label, children }: ScreenCarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState<number>();
  const [paged, setPaged] = useState(false);
  const count = Children.count(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = [...el.children] as HTMLElement[];
    const sync = () => {
      const style = getComputedStyle(el);
      setPaged(style.display === "flex" && style.flexDirection === "row");
      setHeight(Math.max(...slides.map((slide) => slide.offsetHeight)));
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    for (const slide of slides) observer.observe(slide);
    return () => observer.disconnect();
  }, []);

  const go = (next: number) => {
    const el = track.current;
    if (!el) return;
    const target = Math.max(0, Math.min(count - 1, next));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: target * el.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onScroll = () => {
    const el = track.current;
    if (el?.clientWidth) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <section
      aria-roledescription={paged ? "carousel" : undefined}
      aria-label={paged ? label : undefined}
      style={
        {
          "--frame-w": FRAME_WIDTH,
          "--track-h": height ? `${height}px` : "auto",
        } as CSSProperties
      }
      className="my-[var(--spacing-2xl)]"
    >
      <div className="relative">
        <div
          ref={track}
          onScroll={onScroll}
          tabIndex={paged ? 0 : undefined}
          className="flex flex-col gap-[var(--spacing-2xl)] lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-[var(--spacing-xl)] carousel:flex carousel:h-[var(--track-h)] carousel:snap-x carousel:snap-mandatory carousel:flex-row carousel:items-start carousel:gap-0 carousel:overflow-x-auto carousel:overflow-y-hidden carousel:[scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {Children.map(children, (child, i) =>
            paged ? (
              // biome-ignore lint/a11y/useSemanticElements: APG carousel slide pattern — a group, not a fieldset
              <div
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                className="w-full shrink-0 snap-start px-[var(--spacing-3xl)]"
              >
                {child}
              </div>
            ) : (
              <div className="w-full">{child}</div>
            ),
          )}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center carousel:flex [&>*]:pointer-events-auto">
          <button
            type="button"
            className={ARROW}
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous screen"
          >
            <ChevronLeftIcon size={72} className="pointer-events-none" />
          </button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center carousel:flex [&>*]:pointer-events-auto">
          <button
            type="button"
            className={ARROW}
            onClick={() => go(index + 1)}
            disabled={index === count - 1}
            aria-label="Next screen"
          >
            <ChevronRightIcon size={72} className="pointer-events-none" />
          </button>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-[var(--spacing-sm)] hidden justify-center gap-[var(--spacing-sm)] carousel:flex"
      >
        {Array.from({ length: count }, (_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length position row
            key={i}
            className={`size-2 rounded-[var(--radius-pill)] ${i === index ? "bg-[var(--accent)]" : "bg-[var(--hairline)]"}`}
          />
        ))}
      </div>
    </section>
  );
}

interface ScreenSlideProps {
  image?: string;
  video?: string;
  poster?: string;
  alt: string;
  caption?: string;
  children?: ReactNode;
}

export function ScreenSlide({
  image,
  video,
  poster,
  alt,
  caption,
  children,
}: ScreenSlideProps) {
  if (!image === !video) {
    throw new Error(`ScreenSlide "${alt}": set exactly one of image or video.`);
  }
  if (video && !poster) {
    throw new Error(`ScreenSlide "${alt}": a video needs a poster.`);
  }
  const hasProse = Children.count(children) > 0;

  return (
    <div
      className={
        hasProse
          ? "flex flex-col items-center gap-[var(--spacing-md)] carousel:grid carousel:grid-cols-[var(--frame-w)_1fr] carousel:items-start carousel:gap-[var(--spacing-xl)]"
          : "flex flex-col items-center"
      }
    >
      <figure className="flex flex-col items-center carousel:block">
        <span
          style={{ aspectRatio: FRAME_ASPECT }}
          className="relative block h-[50svh] max-w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--surface-elevated)] lg:h-auto lg:w-[var(--frame-w)]"
        >
          {video ? (
            <video
              src={video}
              poster={poster}
              aria-label={alt}
              controls
              muted
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-contain object-top"
            />
          ) : (
            <Image
              src={image as string}
              alt={alt}
              fill
              sizes="280px"
              className="object-contain object-top"
            />
          )}
        </span>
        {caption && (
          <figcaption className="body-caption mt-[var(--spacing-sm)] text-center lg:max-w-[var(--frame-w)]">
            {caption}
          </figcaption>
        )}
      </figure>
      {hasProse && (
        <div className="w-full [&>*:last-child]:mb-0">{children}</div>
      )}
    </div>
  );
}
