"""
_theme.py — shared theme + builder for hand-authored portfolio SVG diagrams.

Single source of truth for the diagram visual system: node/edge styles, the
light/dark colour treatment, and the arrowhead marker. Also owns *framing* — the
viewBox is computed tight around each diagram's content bounds plus a uniform
FRAME_PAD, so a diagram scales down to small screens without wasting container
width on dead margin (an SVG rendered as <img> scales its whole viewBox uniformly,
so excess margin shrinks the content on mobile).

Each diagram is a sibling <slug>/<name>.py that supplies its content bounding box,
title, aria-label, and body markup, then calls build() to write the production SVG.
Never copy DEFS into a diagram file — import and call build().

Run a diagram from repo root, e.g.:
  .venv/bin/python3 assets-source/svg/masked-autoencoders/mae-architecture.py
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _tokens import NEUTRALS, out_root, slot_ink  # noqa: E402

# Uniform viewBox padding (SVG user units) around the measured content bounds.
FRAME_PAD = 16

# Canonical defs — node/edge classes, light + dark, and the arrowhead marker. Neutrals come from the design system's
# token file; the one accent is the colour of the project the diagram illustrates (Foundations → Imagery → Diagrams).
# These values are the diagram system; do not fork them per project.
DEFS_TEMPLATE = """  <defs>
    <style>
      .n  { fill: @tag_l@; stroke: @line_l@; stroke-width: 1; }
      .na { fill: @tag_l@; stroke: @ink_l@; stroke-width: 1.5; }
      .nt { fill: @tag_l@; stroke: @line_l@; stroke-width: 1; }
      .zone { fill: @ink_l@; fill-opacity: 0.07; }
      .lbl { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; font-weight: 500; fill: @text_l@; }
      .sub { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: @muted_l@; }
      .conn { fill: none; stroke: @muted_l@; stroke-width: 1.5; }
      .af  { fill: @muted_l@; }
      @media (prefers-color-scheme: dark) {
        .n  { fill: @tag_d@; stroke: @line_d@; }
        .na { fill: @tag_d@; stroke: @ink_d@; }
        .nt { fill: @tag_d@; stroke: @line_d@; }
        .zone { fill: @ink_d@; }
        .lbl { fill: @text_d@; }
        .sub { fill: @muted_d@; }
        .conn { stroke: @muted_d@; }
        .af  { fill: @muted_d@; }
      }
    </style>
    <marker id="arr" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
      <path class="af" d="M0,0 L7,3 L0,6 Z"/>
    </marker>
  </defs>"""


def defs(slot):
    """The shared defs with the neutrals and the given project slot's page colour filled in."""
    ink_l, ink_d = slot_ink(slot)
    values = {
        "tag": NEUTRALS["surface-tag"],
        "line": NEUTRALS["hairline-strong"],
        "text": NEUTRALS["ink"],
        "muted": NEUTRALS["ink-muted"],
        "ink": (ink_l, ink_d),
    }
    out = DEFS_TEMPLATE
    for key, (light, dark) in values.items():
        out = out.replace(f"@{key}_l@", light).replace(f"@{key}_d@", dark)
    assert not re.search(r"@[a-z]+_[ld]@", out), "an unfilled placeholder is left in the defs"
    return out


def build(*, out_rel, title, aria_label, content_bbox, body, slot, pad=FRAME_PAD):
    """Write a production SVG with shared defs and a tight, padded viewBox.

    content_bbox: (min_x, min_y, max_x, max_y) of the drawn content (node extents).
    out_rel:      production path relative to the repo root (or ASSET_OUT_ROOT).
    slot:         the palette slot (1–12) of the project the diagram illustrates; its colour is the accent.
    Returns the aspect string (w/h) so the MDX <Diagram aspect=...> can match.
    """
    min_x, min_y, max_x, max_y = content_bbox
    vx, vy = min_x - pad, min_y - pad
    vw, vh = (max_x - min_x) + 2 * pad, (max_y - min_y) + 2 * pad

    svg = (
        f'<svg viewBox="{vx} {vy} {vw} {vh}" xmlns="http://www.w3.org/2000/svg" '
        f'role="img" aria-label="{aria_label}">\n'
        f"  <title>{title}</title>\n"
        f"{defs(slot)}\n\n"
        f"{body.rstrip()}\n"
        f"</svg>\n"
    )

    out = out_root() / out_rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(svg, encoding="utf-8")
    aspect = f"{vw}/{vh}"
    print(f"Saved {out_rel}  viewBox='{vx} {vy} {vw} {vh}'  aspect={aspect}")
    return aspect
