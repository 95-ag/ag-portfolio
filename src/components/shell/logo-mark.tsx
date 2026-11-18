"use client";

import {
  type AnimationPlaybackControls,
  animate,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import {
  ANCHOR_OF,
  BODY,
  between,
  FACE_OF,
  type Framing,
  framingTransform,
  HEAD_OF,
  type Pose,
} from "@/components/shell/logo-mark-framing";
import { cn } from "@/lib/utils/cn";

// Timing and easing are a declared exception: DESIGN.md → Interaction Rules → Hover (Special).
const LEG_SECONDS = 0.3;
const HOVER_SECONDS = 0.25;
type CubicBezier = [number, number, number, number];

const EASE_STANDARD: CubicBezier = [0.2, 0, 0, 1];
// Accelerate into the face and decelerate out of it, so the cut lands at peak speed.
const EASE_INTO_FACE: CubicBezier = [0.4, 0, 1, 1];
const EASE_OUT_OF_FACE: CubicBezier = [0, 0, 0.2, 1];

const SOURCE_OF: Record<Pose, string> = {
  sit: "/cat_icon.svg",
  stretch: "/cat_stretch_icon.svg",
};

const isNear = (a: Framing, b: Framing) =>
  Math.abs(a.s - b.s) < 0.001 &&
  Math.abs(a.tx - b.tx) < 0.001 &&
  Math.abs(a.ty - b.ty) < 0.001;

export function LogoMark({
  animated = true,
  pathname,
}: {
  animated?: boolean;
  pathname?: string;
}) {
  const currentPathname = usePathname();
  const pose: Pose = (pathname ?? currentPathname) === "/" ? "sit" : "stretch";
  const reducedMotion = useReducedMotion();

  // The first render's pose sets the inline styles once; later frames are written directly so a
  // re-render never snaps the camera mid-sequence.
  const initialPose = useRef(pose);
  const cameraRef = useRef<HTMLSpanElement>(null);
  const imageRefs = useRef<Record<Pose, HTMLImageElement | null>>({
    sit: null,
    stretch: null,
  });
  const framing = useRef<Framing>(HEAD_OF[pose]);
  const visiblePose = useRef<Pose>(pose);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const sequence = useRef(0);
  const sequenceRunning = useRef(false);

  const applyFraming = useCallback((next: Framing) => {
    framing.current = next;
    if (cameraRef.current)
      cameraRef.current.style.transform = framingTransform(next);
  }, []);

  const showPose = useCallback((next: Pose) => {
    visiblePose.current = next;
    for (const candidate of ["sit", "stretch"] as const) {
      const image = imageRefs.current[candidate];
      if (image) image.style.opacity = candidate === next ? "1" : "0";
    }
  }, []);

  const moveTo = useCallback(
    (target: Framing, anchorPose: Pose, seconds: number, ease: CubicBezier) => {
      controls.current?.stop();
      const from = framing.current;
      const playback = animate(0, 1, {
        duration: seconds,
        ease,
        onUpdate: (progress) =>
          applyFraming(between(from, target, ANCHOR_OF[anchorPose], progress)),
      });
      controls.current = playback;
      return playback;
    },
    [applyFraming],
  );

  useEffect(() => {
    if (pose === visiblePose.current && !sequenceRunning.current) return;
    const id = ++sequence.current;
    const stale = () => sequence.current !== id;

    if (!animated || reducedMotion) {
      controls.current?.stop();
      sequenceRunning.current = false;
      showPose(pose);
      applyFraming(HEAD_OF[pose]);
      return;
    }

    sequenceRunning.current = true;
    void (async () => {
      const from = visiblePose.current;
      if (from !== pose) {
        if (!isNear(framing.current, BODY))
          await moveTo(BODY, from, LEG_SECONDS, EASE_STANDARD);
        if (stale()) return;
        await moveTo(FACE_OF[from], from, LEG_SECONDS, EASE_INTO_FACE);
        if (stale()) return;
        applyFraming(FACE_OF[pose]);
        showPose(pose);
        await moveTo(BODY, pose, LEG_SECONDS, EASE_OUT_OF_FACE);
        if (stale()) return;
      }
      await moveTo(HEAD_OF[pose], pose, LEG_SECONDS, EASE_STANDARD);
      if (!stale()) sequenceRunning.current = false;
    })();
  }, [pose, animated, reducedMotion, applyFraming, showPose, moveTo]);

  useEffect(() => () => controls.current?.stop(), []);

  const hover = (entering: boolean) => {
    if (!animated || reducedMotion || sequenceRunning.current) return;
    const current = visiblePose.current;
    void moveTo(
      entering ? BODY : HEAD_OF[current],
      current,
      HOVER_SECONDS,
      EASE_STANDARD,
    );
  };

  return (
    <span
      data-logomark={animated ? "animated" : "static"}
      onPointerEnter={(event) => event.pointerType === "mouse" && hover(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && hover(false)}
      className={cn(
        "relative block h-8 w-8 shrink-0 overflow-hidden rounded-full motion-safe:transition-[background-color] motion-safe:duration-[var(--duration-fast)] hover:bg-[var(--accent-tint)] hover:outline-1 hover:outline-[var(--accent)]",
        // The link draws the focus ring; dropping the Home ring while it shows keeps them from merging.
        pose === "sit" &&
          "outline-2 outline-[var(--accent)] group-focus-visible:outline-none",
      )}
    >
      <span
        ref={cameraRef}
        className="absolute inset-0"
        style={{
          transformOrigin: "0 0",
          transform: framingTransform(HEAD_OF[initialPose.current]),
        }}
      >
        {(["sit", "stretch"] as const).map((candidate) => (
          // The visible pose loads eagerly: the page enter starts the content at opacity 0, which makes this
          // logo the Largest Contentful Paint candidate, and Next warns when that is lazy. The hidden pose
          // stays lazy, and on phones the pill nav is display:none so neither is fetched.
          <Image
            key={candidate}
            ref={(image) => {
              imageRefs.current[candidate] = image;
            }}
            src={SOURCE_OF[candidate]}
            alt=""
            width={32}
            height={32}
            unoptimized
            loading={candidate === initialPose.current ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: candidate === initialPose.current ? 1 : 0 }}
          />
        ))}
      </span>
    </span>
  );
}
