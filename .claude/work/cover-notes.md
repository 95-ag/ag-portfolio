# Cover Notes — `dqn-lane-localization`

Working notes for Stage 3 (`project-cover-generation`). Scratch artifact — not a deliverable.

## Convention: propose compositions with an ASCII skeleton

When suggesting any cover composition, include a rough **ASCII skeleton** so the spatial
layout (vanishing point, lanes, focal element, reading direction) is reviewable before any
code is written. Prose alone hides placement problems; the skeleton surfaces them cheaply.

## Direction (approved 2026-05-30)

**Direction A — the localization game**, reworked per user steer (2026-05-30) toward a
fuller **lane depiction + ground-truth lane + dots-moving effect**, grounded in the actual
project figures rather than an abstract single-point game.

## Source figures (grounding the composition)

- `full-road-reconstruction.png` — perspective highway; GREEN ground-truth lines + RED
  predicted lines fan from a vanishing point, run close but **never merge**. The persistent
  gap is the negative result. → drives the predicted-vs-truth parallel-lanes idea.
- `movement-history.png` — diagonal lane on road texture; YELLOW dots = agent visited
  positions (motion history), GREEN rings = goal-threshold regions. → drives the
  stepping-ghost-dots + threshold-ring motif.
- `tusimple-sample.png` — lanes are DOT-SEQUENCES at fixed y-intervals fanning from a
  top-center vanishing point. → drives the dot-sequence lane rendering + perspective fan.

## Current base composition — "crooked prediction on a three-lane road"

User steer (2026-05-30): make it read like an actual road — three curved lanes +
horizon (like the old hero.svg placeholder + TuSimple). Truth circles (TuSimple dot
sequence) on ONE lane; crooked predicted dots in ACCENT alone, with motion trail.

```
   ─────────── horizon ───────────         legend
        \    |    |    /                    \ /  road edges (curved, neutral)
         \   | ·  |  /                       |   dashed lane dividers (neutral)
          \  | o· | /                        ·   ground-truth circle (neutral on-surface)
          \  |·o  | /     center lane:       o   crooked predicted dot (ACCENT)
           \ | o· |/        truth dots ·     .   motion ghost (accent, fading)
           \ |.o  |/        predicted  o
            \| o·|/          zig-zags around truth, never sits on it
       (lane1)(lane2)(lane3)   = DQL prediction stays crooked
```

Geometry (mirrors old hero.svg): VP (600,210), horizon y=210, bottomY 640, shared
control-y 430, rightward BEND 55 on every lane → curved road. Boundaries by bottom-x:
edges 120 & 1020, dividers 420 & 720 (dashed). Dot lane = center lane centerline
(bottom-x 570). Truth/predicted dots sampled on the real Bézier via `tAtY` solver so
they sit exactly on the lane. Predicted = truth.x + zig-zag offset per row.

Accent = predicted crooked dots + their ghosts ONLY (one focal structure). Truth
circles neutral on-surface. Road lines neutral outline-variant.

## Scene-band analysis (what makes road/sky/ground/lanes read)

TuSimple (a): region separation is by TONAL VALUE, not hue — sky lightest band, road
a LIGHTER TRAPEZOID narrowing to the VP (the key perspective cue), roadside ground
mid-dark, lanes bright thin marks converging to VP. The narrowing road trapezoid does
more for "road in perspective" than the lane lines.
hero.svg: only TWO bands (sky #f8f9fa / everything-below #e8eaea) + horizon line
#bbcabf + converging dashed Béziers + VP dot. Drops the road trapezoid → reads as a
"diagram of a road" rather than a road.

Chosen (user: "bands + road trapezoid") — three neutral surface tokens, both themes:
- Sky band      = --surface-raised  (#f2f2f1 / #211f1e)
- Roadside grd  = --surface-tag     (#e2e3e4 / #2a2a2a)
- Road trapez.  = --surface-sunken  (#ffffff brightest like photo / #0e0e0e)
- Horizon+lanes = --outline-variant (#bbcabf / #3c4a42)
All three bands stay mutually distinct in light AND dark. Road triangle/trapezoid
narrows to VP via the same Q-curve as the edges (HORIZON_HALF=18 cap, not a pinched apex).

## Tusimple fan — MEASURED (panel c, via tmp/measure_*.py, venv python)

panel c = x[424:636], pw=212, lane band y~19..95 of 172. Per-color centerline:
- green (left lane):  top(0.45,0.13) → bot(0.13,0.35)   [peels bottom-left]
- red   (R-descend):  top(0.60,0.13) → mid(0.78,0.34) → bot(0.87,0.55)
- blue  (R-upper):    top(0.58,0.12) → mid(0.84,0.39) → bot(0.89,0.39)
VP (convergence of tops): x-frac ~0.55, y-frac ~0.11 (high, slightly right of center).
Lanes NEAR-STRAIGHT with gentle rightward bow (red convex right by ~0.05). Bottom
x-fracs across the 4 lanes ~0.13/0.40/0.62/0.88.

### Applied to component (tusimple-matched geometry)
VP (640,135) [x-frac .53, y-frac .11]; horizon y=135; bottom y=645.
CTRL_Y = midpoint → y LINEAR in t → exact dot sampling. BEND=20 (gentle bow, was 55).
Boundaries bottom-x: edges 150 & 1050, dividers 450 & 750 → fracs .125/.375/.625/.875.
Center dot lane bottom-x 600. HORIZON_HALF=12 (lanes nearly converge at VP).

## Base composition — FINAL (approved 2026-05-31)

"Crooked prediction on a curving road." Borderless tonal road scene, C-curve, offset
camera. Hollow uniform ground-truth circles trace the curved left lane end-to-end at a
fixed y-interval (TuSimple-style); smaller green predicted dots + a thin green polyline
run a straighter chord that drifts widest at the bottom; 3 graded-grey ghost echoes sit
RIGHT of each predicted dot (implied leftward move toward the lane). Accent = predicted
dots + green line only. Exact constants live in the committed component.

---

# SKILL-UPDATE CANDIDATES (align into project-cover-generation later; do not edit frozen skill yet)

Generalizable beyond this project — distilled from ~15 base iterations.

1. **Real-world / domain scene from tonal bands + shape.** To make a cover read as a
   physical scene (road, horizon, etc.) using only neutral surface tokens: separate
   regions by tonal VALUE not hue, and let a NARROWING SHAPE carry perspective — not
   outline strokes. Concretely sky=`--surface-raised`, mid-ground=`--surface-tag`,
   foreground=`--surface-sunken`; all three stay mutually distinct in light AND dark. A
   wedge narrowing to the VP does more for "perspective" than lane lines. Borders can be
   dropped once fill contrast carries the edge.

2. **Literal source geometry can fight the composition rules.** Reproducing a measured
   source layout verbatim (TuSimple's symmetric top-center fan) tripped the symmetry
   anti-pattern (centered pyramid). Fix: keep the source's curve/proportions but OFFSET
   THE CAMERA — push the VP into a side third, anchor structure to a corner — to restore
   asymmetric balance. Fidelity to shape, not framing.

3. **Measure source figures to ground geometry.** Use the project venv python + PIL to
   extract real pixel coords/angles from a source figure (mask by color, per-row
   centerlines, report as fractions) rather than eyeballing. Script pattern lived in
   read-only `tmp/measure_*.py` (not committed).

4. **Visual-verification fallback when `preview_screenshot` hangs.** Claude Preview MCP
   `preview_screenshot` timed out repeatedly here (eval/console/logs still worked).
   Working fallback: a small Playwright-CLI node script that navigates to the page, sets
   `data-theme` light/dark, locates `svg[viewBox="0 0 1200 675"]`, `.screenshot()`s that
   element per theme into `tmp/`, then Read the PNGs. Capture the cover by selector, not
   the whole viewport.

5. **Theme-recessive multi-step shades via `color-mix`.** For graded neutrals that must
   recede INTO the page in BOTH themes (lighter-in-light, darker-in-dark), don't hardcode
   three separate tokens (they won't all flip). Start from one theme-flipping token
   (`--outline-variant`) and step toward `--surface`:
   `color-mix(in srgb, var(--outline-variant) 65%, var(--surface))`. Same technique
   `globals.css` uses for `--outline-hair`; keeps the all-CSS-custom-properties rule.

6. **Encode motion with discrete SHADE steps, not opacity fade.** A movement trail reads
   more crisply as 2–3 discrete graded-grey echoes than an opacity ramp; place echoes on
   the side the marker moved FROM so direction is unambiguous.

7. **Uniform marker size + fixed interval reads as a "data sequence."** For points sampled
   along a curve, uniform radius + fixed y-spacing (no perspective scaling) reads as a
   consistent annotated sequence (TuSimple-like); perspective scaling read as scattered
   noise. Generate rows procedurally end-to-end; make any per-marker offset/jitter
   deterministic (`Math.sin(i*k)`) since `Math.random` is unavailable/forbidden at build.

## Gate 3 — annotation learnings (this session)

8. **Place the annotation in the composition's largest open NEGATIVE space, not over
   structure.** Here that was the roadside ground left of the curving road. Verify the
   text + arrow-start sit on the background region and the arrow TIP lands on/just-outside
   the target — programmatically, via `road.isPointInFill(svgPoint)` in `preview_eval`
   (true=on road, negate for ground). Catches "arrow dies in empty space" bugs the eye
   misses. Recompute target coords from live DOM (`getBBox`, circle `cx/cy`) — do not
   eyeball arrow endpoints against procedurally-placed markers.

9. **Accent-on-accent caution.** When the focal structure is already `--accent` (the green
   predicted lane), a green Caveat annotation can compete with it. Mitigate: keep to ONE
   short mark, separate it into open space, and point AT the relationship (the gap / just
   outside the truth lane) rather than restating the green element. Direction-3 (single
   annotation) suited this better than two marks.

10. **Center-align multi-line Caveat labels** with `textAnchor="middle"` at a shared x, and
    start the leader arrow from that same center-x at the text's bottom — reads as one tidy
    callout. Anchor on the WIDER line's center so both lines balance.

11. **Annotation wording = the finding in plain words + the number**, e.g. "localized acc
    0.892 worse than baseline 0.900" beat the terse "acc 0.892 < 0.900". For a negative
    result the plain-language verdict carries more than a bare inequality at thumbnail scale.

12. **Arrow construction recap (already in skill, reconfirmed):** Bézier path ends ~8px
    before the tip; arrowhead = two independent `<line>`s from the tip point; Caveat font +
    `--accent` only. Iterate endpoints by re-screenshotting per theme via Playwright-CLI.
