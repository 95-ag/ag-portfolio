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

from pathlib import Path

# Uniform viewBox padding (SVG user units) around the measured content bounds.
FRAME_PAD = 16

# Canonical defs — node/edge classes, light + dark, and the arrowhead marker.
# These values are the diagram system; do not fork them per project.
DEFS = """  <defs>
    <style>
      .n  { fill: #f3f4f5; stroke: #bbcabf; stroke-width: 1; }
      .na { fill: #f3f4f5; stroke: #006e37; stroke-width: 1.5; }
      .nt { fill: #f3f4f5; stroke: #bbcabf; stroke-width: 1; }
      .lbl { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; font-weight: 500; fill: #2d2d2d; }
      .sub { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: #6c7a71; }
      .conn { fill: none; stroke: #6c7a71; stroke-width: 1.5; }
      .af  { fill: #6c7a71; }
      @media (prefers-color-scheme: dark) {
        .n  { fill: #1c1b1b; stroke: #3c4a42; }
        .na { fill: #1c1b1b; stroke: #2aa566; }
        .nt { fill: #1c1b1b; stroke: #3c4a42; }
        .lbl { fill: #e2e2e2; }
        .sub { fill: #bbcabf; }
        .conn { stroke: #86948a; }
        .af  { fill: #86948a; }
      }
    </style>
    <marker id="arr" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
      <path class="af" d="M0,0 L7,3 L0,6 Z"/>
    </marker>
  </defs>"""

# Repo root = assets-source/svg/_theme.py -> parents[2]
REPO_ROOT = Path(__file__).resolve().parents[2]


def build(*, out_rel, title, aria_label, content_bbox, body, pad=FRAME_PAD):
    """Write a production SVG with shared defs and a tight, padded viewBox.

    content_bbox: (min_x, min_y, max_x, max_y) of the drawn content (node extents).
    out_rel:      production path relative to the repo root.
    Returns the aspect string (w/h) so the MDX <Diagram aspect=...> can match.
    """
    min_x, min_y, max_x, max_y = content_bbox
    vx, vy = min_x - pad, min_y - pad
    vw, vh = (max_x - min_x) + 2 * pad, (max_y - min_y) + 2 * pad

    svg = (
        f'<svg viewBox="{vx} {vy} {vw} {vh}" xmlns="http://www.w3.org/2000/svg" '
        f'role="img" aria-label="{aria_label}">\n'
        f"  <title>{title}</title>\n"
        f"{DEFS}\n\n"
        f"{body.rstrip()}\n"
        f"</svg>\n"
    )

    out = REPO_ROOT / out_rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(svg, encoding="utf-8")
    aspect = f"{vw}/{vh}"
    print(f"Saved {out_rel}  viewBox='{vx} {vy} {vw} {vh}'  aspect={aspect}")
    return aspect
