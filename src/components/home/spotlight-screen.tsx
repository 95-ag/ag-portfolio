"use client";

import { type RefObject, useEffect, useLayoutEffect } from "react";

// What the stacked screen (860px and below) needs measured and read from the touch, kept out of the stage so the cube and the
// rotation stay readable (DESIGN.md → Home Page → Spotlight → Stacked).

// Distance of `el` from the top of `ancestor`, summed from layout offsets so a turning face's transform does not move it.
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let y = 0;
  for (
    let node: HTMLElement | null = el;
    node && node !== ancestor;
    node = node.offsetParent as HTMLElement | null
  ) {
    y += node.offsetTop;
  }
  return y;
}

// Every slide gets its text block at the same height — the tallest over all slides — so the cover, centred above it, sits
// in the same place on every slide; and each slide's ground colour stays solid to the cover's bottom edge and is gone by
// the top of its title. Re-measured on resize and once the fonts have settled the text.
export function useScreenLayout(
  stage: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    const root = stage.current;
    if (!root || !enabled) return;
    const measure = () => {
      const faces = [...root.querySelectorAll<HTMLElement>(".spot-slide")];
      // The text block's natural height: its visible children and the gaps between them.
      const natural = (face: HTMLElement) => {
        const text = face.querySelector<HTMLElement>(".spot-text");
        if (!text) return 0;
        const kids = [...text.children].filter(
          (child): child is HTMLElement =>
            child instanceof HTMLElement && child.offsetParent !== null,
        );
        const gap = Number.parseFloat(getComputedStyle(text).rowGap) || 0;
        return (
          kids.reduce((sum, child) => sum + child.offsetHeight, 0) +
          gap * Math.max(0, kids.length - 1)
        );
      };
      const tallest = Math.max(0, ...faces.map(natural));
      root.style.setProperty("--sf-text", `${tallest}px`);
      for (const face of faces) {
        const body = face.querySelector<HTMLElement>(".spot-body");
        const cover = face.querySelector<HTMLElement>(".spot-cover .cover");
        const title = face.querySelector<HTMLElement>(".spot-title");
        if (!body || !cover || !title) continue;
        const solid = offsetWithin(cover, body) + cover.offsetHeight;
        const end = Math.max(solid + 1, offsetWithin(title, body));
        face.style.setProperty("--sf-solid", `${solid}px`);
        face.style.setProperty("--sf-end", `${end}px`);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--sf-text");
      for (const face of root.querySelectorAll<HTMLElement>(".spot-slide")) {
        face.style.removeProperty("--sf-solid");
        face.style.removeProperty("--sf-end");
      }
    };
  }, [stage, enabled]);
}

// A tap (under 10px of movement) on the left half of the screen goes previous, on the right half next. A tap on a link or a
// button, or at or below the "View project" button's top edge, is not a zone tap.
const TAP_SLOP = 10;

export function useTapZones(
  stage: RefObject<HTMLElement | null>,
  enabled: boolean,
  step: (direction: 1 | -1) => void,
) {
  useEffect(() => {
    const el = stage.current;
    if (!el || !enabled) return;
    let start: { x: number; y: number } | null = null;
    const down = (event: PointerEvent) => {
      start =
        event.pointerType === "mouse"
          ? null
          : { x: event.clientX, y: event.clientY };
    };
    const up = (event: PointerEvent) => {
      if (!start) return;
      const moved = Math.hypot(
        event.clientX - start.x,
        event.clientY - start.y,
      );
      start = null;
      if (moved >= TAP_SLOP) return;
      if ((event.target as Element).closest("a, button")) return;
      const button = el.querySelector<HTMLElement>(
        ".spot-slide[data-current='true'] .spot-project-button",
      );
      if (button && event.clientY >= button.getBoundingClientRect().top) return;
      const { left, width } = el.getBoundingClientRect();
      step(event.clientX < left + width / 2 ? -1 : 1);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    };
  }, [stage, enabled, step]);
}
