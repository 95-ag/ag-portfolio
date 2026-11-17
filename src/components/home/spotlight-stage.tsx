"use client";

import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import "@/components/home/spotlight.css";

export interface SpotlightSlide {
  slug: string;
  colour: number;
  tab: string;
  node: ReactNode;
}

// Declared exception to the duration scale (Home Page → Spotlight): the rotation interval.
const ADVANCE_MS = 7000;

function useRotation(count: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const auto = !paused && !reduced;
  useEffect(() => {
    if (!auto) return;
    const timer = window.setTimeout(
      () => setIndex((index + 1) % count),
      ADVANCE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [auto, count, index]);

  return { index, setIndex, paused, setPaused, auto };
}

// The rotation, tabs and Play / Pause. The slides arrive rendered by the server so no project body reaches the client.
export function SpotlightStage({ slides }: { slides: SpotlightSlide[] }) {
  const { index, setIndex, paused, setPaused, auto } = useRotation(
    slides.length,
  );
  const current = slides[index];

  return (
    <div
      className="spot"
      data-auto={auto}
      style={{ "--spot-count": slides.length } as CSSProperties}
    >
      <button
        type="button"
        className="spot-pause tab-label"
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play" : "Pause"}
      </button>
      <div className="spot-stage">
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            className="spot-slide"
            data-colour={slide.colour}
            data-on={i === index}
            data-cover-active={i === index}
          >
            {slide.node}
          </div>
        ))}
      </div>
      <div className="spot-tabs" role="tablist" aria-label="Projects">
        {slides.map((slide, i) => (
          <button
            key={`${slide.slug}-${index}`}
            type="button"
            role="tab"
            className="spot-tab tab-label"
            data-colour={slide.colour}
            aria-selected={i === index}
            aria-label={slide.tab}
            onClick={() => setIndex(i)}
          >
            <span className="spot-bar">
              <i />
            </span>
            <span className="spot-tab-name">{slide.tab}</span>
          </button>
        ))}
      </div>
      <p className="spot-now tab-label" aria-hidden="true">
        {current?.tab}
      </p>
    </div>
  );
}
