"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PauseIcon } from "@/components/icons/material/pause";
import { PlayArrowIcon } from "@/components/icons/material/play-arrow";
import { useFooterLift } from "@/components/shell/use-footer-lift";

// Declared exception to the motion tokens (DESIGN.md → Domain Components → Credits): the speed of the auto-scroll.
const SPEED_PX_PER_SECOND = 30;
// A scroll the loop did not make: the page moved more than the rounding of its own last position.
const OWN_SCROLL_TOLERANCE = 2;
const INPUT_EVENTS = ["wheel", "touchstart", "keydown"] as const;
const MAX_STEP_MS = 100;

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
    // The loop keeps to the frame clock: its first frame starts it, and a long gap (a tab that was hidden) moves it by one step.
    let last: number | null = null;
    const pause = () => setPlaying(false);
    const tick = (now: number) => {
      if (Math.abs(window.scrollY - position) > OWN_SCROLL_TOLERANCE) {
        pause();
        return;
      }
      const elapsed = last === null ? 0 : Math.min(MAX_STEP_MS, now - last);
      position += (SPEED_PX_PER_SECOND * elapsed) / 1000;
      last = now;
      window.scrollTo(0, position);
      const end = document.documentElement.scrollHeight - window.innerHeight;
      if (position >= end) {
        pause();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    // The control's own touch, key or press is its click, which toggles; only the reader's other input pauses.
    const onInput = (event: Event) => {
      if (!button.current?.contains(event.target as Node)) pause();
    };
    for (const type of INPUT_EVENTS) window.addEventListener(type, onInput);
    window.addEventListener("pointerdown", onInput);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      for (const type of INPUT_EVENTS)
        window.removeEventListener(type, onInput);
      window.removeEventListener("pointerdown", onInput);
    };
  }, [playing]);

  if (!mounted || reduced) return null;

  // Outside the page content: the page enter's transform would otherwise be the control's containing block while it runs.
  return createPortal(
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
    </button>,
    document.body,
  );
}
