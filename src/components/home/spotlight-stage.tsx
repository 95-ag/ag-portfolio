"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useScreenLayout,
  useTapZones,
} from "@/components/home/spotlight-screen";
import { ChevronLeftIcon } from "@/components/icons/material/chevron-left";
import { ChevronRightIcon } from "@/components/icons/material/chevron-right";
import { PauseIcon } from "@/components/icons/material/pause";
import { PlayArrowIcon } from "@/components/icons/material/play-arrow";
import { useCoverLoop } from "@/components/project/cover-loop";
import "@/components/home/spotlight.css";

export interface SpotlightSlide {
  slug: string;
  colour: number;
  tab: string;
  // The cover's filled or marker mode per theme: the stacked screen's controls wear it over the cover's ground.
  cover: { light: "filled" | "marker"; dark: "filled" | "marker" };
  node: ReactNode;
}

// Declared exceptions to the duration scale (DESIGN.md → Duration & Easing): the cube's turn and curve, the rotation interval,
// and the wait before the incoming cover starts to play.
const TURN_MS = 700;
const TURN_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const ADVANCE_MS = 7000;
const COVER_START_MS = 350;
const SWIPE_MIN_PX = 40;
const SWIPE_RATIO = 0.12;
const WHEEL_LOCK_MS = 800;
const STACK_QUERY = "(max-width: 860px)";

type Direction = 1 | -1;
interface Turn {
  from: number;
  to: number;
  dir: Direction;
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const list = matchMedia(query);
    const sync = () => setMatches(list.matches);
    sync();
    list.addEventListener("change", sync);
    return () => list.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

// One slide, a face of the cube: it loops its cover (one play, a pause, again) while `looping`.
function SlideFrame({
  colour,
  shown,
  current,
  looping,
  style,
  children,
}: {
  colour: number;
  shown: boolean;
  current: boolean;
  looping: boolean;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useCoverLoop(ref, looping);
  return (
    <div
      ref={ref}
      className="spot-slide"
      data-colour={colour}
      data-on={shown}
      data-current={current}
      data-cover-active="false"
      style={style}
    >
      {children}
    </div>
  );
}

// The rotation, the cube, the controls, the tabs. The slides arrive rendered by the server so no project body reaches the client.
export function SpotlightStage({ slides }: { slides: SpotlightSlide[] }) {
  const count = slides.length;
  const [settled, setSettled] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [paused, setPaused] = useState(false);
  // The cover that plays: it follows `settled`, which moves after the turn, and starts COVER_START_MS later.
  const [loopIndex, setLoopIndex] = useState<number | null>(0);
  const [depth, setDepth] = useState(0);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const stacked = useMedia(STACK_QUERY);
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const turning = useRef(false);
  turning.current = turn !== null;

  const shown = turn ? turn.to : settled;
  const auto = !paused && !reduced && count > 1;

  const go = useCallback(
    (to: number, dir?: Direction) => {
      if (count < 2 || turning.current || to === settled) return;
      if (reduced) {
        setSettled(to);
        return;
      }
      setTurn({ from: settled, to, dir: dir ?? (to > settled ? 1 : -1) });
    },
    [count, reduced, settled],
  );
  const step = useCallback(
    (dir: Direction) => go((settled + dir + count) % count, dir),
    [go, settled, count],
  );

  // The cube's depth is half the stage's width; the perspective is four times it, never under 900px.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setDepth(el.offsetWidth / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The turn: a quarter, toward the new face. The animation holds its end state until React removes the turn, and is
  // cancelled in the commit that does, so the outgoing face never shows again for a frame.
  useLayoutEffect(() => {
    const cube = cubeRef.current;
    if (!turn || !cube) return;
    const base = `translateZ(${-depth}px)`;
    const animation = cube.animate(
      [
        { transform: `${base} rotateY(0deg)` },
        { transform: `${base} rotateY(${-turn.dir * 90}deg)` },
      ],
      { duration: TURN_MS, easing: TURN_EASING, fill: "forwards" },
    );
    animation.onfinish = () => {
      setSettled(turn.to);
      setTurn(null);
    };
    return () => animation.cancel();
  }, [turn, depth]);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLoopIndex(null);
    const timer = window.setTimeout(
      () => setLoopIndex(settled),
      COVER_START_MS,
    );
    return () => window.clearTimeout(timer);
  }, [settled]);

  useEffect(() => {
    if (!auto || turn) return;
    const timer = window.setTimeout(() => step(1), ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [auto, turn, step]);

  // Moving: horizontal trackpad scroll, one slide per gesture with a lock; touch swipe; arrow keys (below).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (
        Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
        Math.abs(event.deltaX) < 24
      )
        return;
      event.preventDefault();
      if (locked) return;
      locked = true;
      window.setTimeout(() => {
        locked = false;
      }, WHEEL_LOCK_MS);
      step(event.deltaX > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step]);

  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (event: React.PointerEvent) => {
    swipe.current =
      event.pointerType === "mouse"
        ? null
        : { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const width = stageRef.current?.offsetWidth ?? 0;
    if (
      Math.abs(dx) >= Math.max(SWIPE_MIN_PX, width * SWIPE_RATIO) &&
      Math.abs(dx) > Math.abs(dy)
    ) {
      step(dx < 0 ? 1 : -1);
    }
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  };

  useScreenLayout(rootRef, stacked);
  useTapZones(stageRef, stacked, step);

  const mode = slides[shown]?.cover;
  // The controls and dashes wear the current cover's mode over its ground on the stacked screen only.
  const chromeProps = stacked
    ? {
        "data-colour": slides[shown]?.colour,
        "data-cover-light": mode?.light,
        "data-cover-dark": mode?.dark,
      }
    : {};

  return (
    <div
      ref={rootRef}
      className="spot"
      data-auto={auto}
      style={{ "--spot-count": count } as CSSProperties}
    >
      <div className="spot-chrome" {...chromeProps}>
        <div className="spot-controls">
          <button
            type="button"
            data-spot-prev
            className="spot-ctl spot-ctl-step"
            aria-label="Previous project"
            onClick={() => step(-1)}
          >
            <ChevronLeftIcon size={24} />
          </button>
          <button
            type="button"
            data-spot-toggle
            className="spot-ctl"
            aria-label={paused ? "Play" : "Pause"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <PlayArrowIcon size={20} /> : <PauseIcon size={20} />}
          </button>
          <button
            type="button"
            data-spot-next
            className="spot-ctl spot-ctl-step"
            aria-label="Next project"
            onClick={() => step(1)}
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>
        <div className="spot-tabs" role="tablist" aria-label="Projects">
          {slides.map((slide, i) => (
            <button
              key={`${slide.slug}-${shown}`}
              type="button"
              role="tab"
              className="spot-tab interactive-label"
              data-colour={slide.colour}
              aria-selected={i === shown}
              aria-label={slide.tab}
              onClick={() => go(i)}
            >
              <span className="spot-bar">
                <i />
              </span>
              <span className="spot-tab-name">{slide.tab}</span>
            </button>
          ))}
        </div>
      </div>
      {/* The stage is the tabs' panel and a focus stop: arrow keys move it. */}
      <div
        ref={stageRef}
        className="spot-stage"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: the stage is the tabs' panel, and arrow keys move it while it has focus
        tabIndex={0}
        role="tabpanel"
        aria-label="Selected work"
        style={{ perspective: `${Math.max(depth * 4, 900)}px` }}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div ref={cubeRef} className="spot-cube" data-turning={turn !== null}>
          {slides.map((slide, i) => {
            const isFrom = turn?.from === i;
            const isTo = turn?.to === i;
            const face =
              turn && (isFrom || isTo)
                ? {
                    transform: `rotateY(${isTo ? turn.dir * 90 : 0}deg) translateZ(${depth}px)`,
                  }
                : undefined;
            return (
              <SlideFrame
                key={slide.slug}
                colour={slide.colour}
                shown={i === settled || isTo}
                current={i === shown}
                looping={i === loopIndex}
                style={face}
              >
                {slide.node}
              </SlideFrame>
            );
          })}
        </div>
      </div>
    </div>
  );
}
