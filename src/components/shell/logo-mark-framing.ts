// Camera framings for the route-aware cat logomark (DESIGN.md → Components → Shell → Floating Pill Nav).
// A framing maps an image fraction p to a screen fraction s·p + t, with transform-origin at the top-left.
// The head and face framings were fitted by pixel-matching the full-body images against the original head
// crops and against each other's faces — re-fit them if either image changes.

export type Pose = "sit" | "stretch";
export type Framing = { s: number; tx: number; ty: number };
type Point = { x: number; y: number };

export const BODY: Framing = { s: 1, tx: 0, ty: 0 };

export const HEAD_OF: Record<Pose, Framing> = {
  sit: { s: 1.7, tx: -0.28, ty: -0.03 },
  stretch: { s: 1.92, tx: -0.14, ty: -0.76 },
};

export const FACE_OF: Record<Pose, Framing> = {
  sit: { s: 4, tx: -1.26, ty: -0.88 },
  stretch: { s: 5.58, tx: -1.385, ty: -3.205 },
};

// The face centre of each pose in image fractions — the point a face framing puts at screen centre.
const faceCentre = (face: Framing): Point => ({
  x: (0.5 - face.tx) / face.s,
  y: (0.5 - face.ty) / face.s,
});

export const ANCHOR_OF: Record<Pose, Point> = {
  sit: faceCentre(FACE_OF.sit),
  stretch: faceCentre(FACE_OF.stretch),
};

// Interpolates scale on a log scale and the anchor's screen position in a straight line, so the face
// never leaves the frame mid-zoom. Tweening scale and translation independently drifts off the subject.
export function between(
  a: Framing,
  b: Framing,
  anchor: Point,
  t: number,
): Framing {
  const s = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * t);
  const fromX = a.s * anchor.x + a.tx;
  const fromY = a.s * anchor.y + a.ty;
  const screenX = fromX + (b.s * anchor.x + b.tx - fromX) * t;
  const screenY = fromY + (b.s * anchor.y + b.ty - fromY) * t;
  return { s, tx: screenX - s * anchor.x, ty: screenY - s * anchor.y };
}

export function framingTransform(framing: Framing): string {
  return `translate(${framing.tx * 100}%, ${framing.ty * 100}%) scale(${framing.s})`;
}
