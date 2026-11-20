"use client";

import { type ReactNode, type RefObject, useEffect, useRef } from "react";

// Declared exception to the duration scale (DESIGN.md → Motion Principles → Cover motion): the pause between plays.
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

// Plays the cover inside `ref` while it is in view and `enabled` — one play, a pause, again — and neither hover nor
// focus changes that. It marks the element `data-cover-active`, which cover.css plays. Under reduced motion it never
// marks it, so the cover stays on its static base.
export function useCoverLoop(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
  armed = false,
) {
  // Armed: the cover waits on its first frame (animations created and held at 0) so it does not show finished before it
  // draws; the loop's first play releases them. The marker keeps the loop's setup and teardown from resetting it meanwhile.
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (armed && !enabled) {
      el.dataset.coverActive = "true";
      el.dataset.coverArmed = "true";
      for (const animation of el.getAnimations({ subtree: true })) {
        animation.pause();
      }
    } else if (!enabled && el.dataset.coverArmed === "true") {
      delete el.dataset.coverArmed;
      el.dataset.coverActive = "false";
    }
  }, [ref, armed, enabled]);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let run = 0;
    let looping = false;
    let inView = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const play = async () => {
      const mine = ++run;
      while (run === mine) {
        el.dataset.coverActive = "true";
        if (el.dataset.coverArmed === "true") {
          delete el.dataset.coverArmed;
          for (const animation of el.getAnimations({ subtree: true })) {
            animation.play();
          }
        }
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        await sleep(playLength(el));
        if (run !== mine) break;
        el.dataset.coverActive = "false";
        await sleep(PAUSE_MS);
      }
    };
    // A callback also fires as a cover slides inside its tile and crosses the threshold; only entering or leaving the
    // view (or the slide becoming active or not) starts or stops the loop, so that never restarts a play.
    const sync = () => {
      if (!(enabled && inView) && el.dataset.coverArmed === "true") {
        delete el.dataset.coverArmed;
        el.dataset.coverActive = "false";
      }
      if (enabled && inView && !looping) {
        looping = true;
        play();
      } else if (!(enabled && inView) && looping) {
        looping = false;
        run++;
        el.dataset.coverActive = "false";
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      run++;
      observer.disconnect();
      if (el.dataset.coverArmed !== "true") el.dataset.coverActive = "false";
    };
  }, [ref, enabled]);
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

interface CoverLoopProps {
  className?: string;
  children: ReactNode;
}

// A wrapper that loops the cover inside it while in view (the post tile's art, the post rail's cover, the project hero).
export function CoverLoop({ className, children }: CoverLoopProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useHeadClearance(ref);
  useCoverLoop(ref);

  return (
    <span ref={ref} className={className} data-cover-active="false">
      {children}
    </span>
  );
}
