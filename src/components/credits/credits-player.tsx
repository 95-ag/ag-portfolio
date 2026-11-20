"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PauseIcon } from "@/components/icons/material/pause";
import { PlayArrowIcon } from "@/components/icons/material/play-arrow";
import { useFooterLift } from "@/components/shell/use-footer-lift";

// Declared exception to the motion tokens (DESIGN.md → Domain Components → Credits): the speed of the auto-scroll.
const SPEED_PX_PER_SECOND = 30;
// A scroll the loop did not make: the page moved more than the rounding of its own last position.
const OWN_SCROLL_TOLERANCE = 2;
const INPUT_EVENTS = ["wheel", "touchstart", "keydown"] as const;

// Scrolls the credits like end credits. The reader's input always wins: a wheel, a touch, a key or a press anywhere pauses it, and
// so does any scroll the loop did not make (a scrollbar drag, find in page). Reaching the end stops it. Not rendered under
// reduced motion; there is no audio.
export function CreditsPlayer() {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const bottom = useFooterLift();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let position = window.scrollY;
    let last = performance.now();
    const pause = () => setPlaying(false);
    const tick = (now: number) => {
      if (Math.abs(window.scrollY - position) > OWN_SCROLL_TOLERANCE) {
        pause();
        return;
      }
      position += (SPEED_PX_PER_SECOND * (now - last)) / 1000;
      last = now;
      window.scrollTo(0, position);
      const end = document.documentElement.scrollHeight - window.innerHeight;
      if (position >= end) {
        pause();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const onPress = (event: PointerEvent) => {
      if (!button.current?.contains(event.target as Node)) pause();
    };
    for (const type of INPUT_EVENTS) window.addEventListener(type, pause);
    window.addEventListener("pointerdown", onPress);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      for (const type of INPUT_EVENTS) window.removeEventListener(type, pause);
      window.removeEventListener("pointerdown", onPress);
    };
  }, [playing]);

  if (!mounted || reduced) return null;

  return (
    <button
      ref={button}
      type="button"
      data-credits-player
      data-speed={SPEED_PX_PER_SECOND}
      aria-pressed={playing}
      aria-label={playing ? "Pause credits" : "Play credits"}
      onClick={() => setPlaying((value) => !value)}
      className="surface-glass fixed left-[var(--corner)] z-[var(--z-scroll-to-top)] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[var(--ink-muted)] motion-safe:transition-[color,border-color] motion-safe:duration-[var(--duration-fast)] hover:border-[var(--hairline-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] xl:h-12 xl:w-12"
      style={{ bottom: `${bottom}px` }}
    >
      {playing ? <PauseIcon size={20} /> : <PlayArrowIcon size={20} />}
    </button>
  );
}
