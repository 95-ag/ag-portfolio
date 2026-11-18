"use client";

import { type ReactNode, type RefObject, useEffect, useRef } from "react";

// Declared exception to the duration scale (Post Tile → Art tile): the pause between plays.
const PAUSE_MS = 5000;
const LONGEST_PLAY_MS = 14000;
const SHORTEST_PLAY_MS = 1500;

// One play of the cover inside `el`: the end of its latest animation, counting an endless one for a single round.
function playLength(el: HTMLElement) {
  const ends = el.getAnimations({ subtree: true }).map((animation) => {
    const timing = animation.effect?.getComputedTiming();
    return Number(timing?.delay ?? 0) + Number(timing?.duration ?? 0);
  });
  const longest = Math.max(0, ...ends);
  return Math.min(LONGEST_PLAY_MS, Math.max(SHORTEST_PLAY_MS, longest));
}

interface CoverLoopProps {
  className?: string;
  children: ReactNode;
}

// An art tile's cover slides down until the head (title and type label) is fully revealed: the head's bottom edge is
// published as `--art-bottom` for writing.css, and follows the head as it wraps or stacks.
function useHeadClearance(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    const head = el
      ?.closest(".ptile")
      ?.querySelector<HTMLElement>(".ptile-art-head");
    if (!el || !head) return;
    const measure = () =>
      el.style.setProperty(
        "--art-bottom",
        `${head.offsetTop + head.offsetHeight}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(head);
    return () => observer.disconnect();
  }, [ref]);
}

// Plays the cover inside it while it is in view — one play, a pause, again — and neither hover nor focus changes
// that (DESIGN.md → Post Tile → Art tile). It marks itself `data-cover-active`, which cover.css plays. Under
// reduced motion it never marks itself, so the cover stays on its static base.
export function CoverLoop({ className, children }: CoverLoopProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useHeadClearance(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let run = 0;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const play = async () => {
      const mine = ++run;
      while (run === mine) {
        el.dataset.coverActive = "true";
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        await sleep(playLength(el));
        if (run !== mine) break;
        el.dataset.coverActive = "false";
        await sleep(PAUSE_MS);
      }
    };
    // A callback also fires as the cover slides inside its tile and crosses the threshold; only entering or leaving
    // the view starts or stops the loop, so that never restarts a play.
    let looping = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !looping) {
          looping = true;
          play();
        } else if (!entry.isIntersecting && looping) {
          looping = false;
          run++;
          el.dataset.coverActive = "false";
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      run++;
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={ref} className={className} data-cover-active="false">
      {children}
    </span>
  );
}
