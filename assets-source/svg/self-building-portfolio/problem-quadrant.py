"""
problem-quadrant.py — the three ways to produce a project write-up, positioned on the
two axes that matter: grounded in the real source, and scales across projects. Only
"this system" lands in the grounded-and-scales quadrant. Uses the shared diagram system.
  .venv/bin/python3 assets-source/svg/self-building-portfolio/problem-quadrant.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

# Crosshair at (230,150). X → scales, Y ↑ grounded. Good zone = top-right, tinted.
BODY = """  <!-- good zone: grounded + scales (top-right), faint accent tint -->
  <rect x="230" y="40" width="150" height="110" fill="#006e37" fill-opacity="0.07"/>

  <!-- axes -->
  <line class="conn" x1="78" y1="150" x2="386" y2="150" marker-end="url(#arr)"/>
  <line class="conn" x1="230" y1="262" x2="230" y2="32" marker-end="url(#arr)"/>

  <!-- axis titles -->
  <text class="sub" transform="rotate(-90 54 150)" x="54" y="150" text-anchor="middle">Grounded in the real source →</text>
  <text class="sub" x="232" y="286" text-anchor="middle">Scales across projects →</text>

  <!-- Write by hand: grounded, doesn't scale (top-left) -->
  <circle class="n" cx="150" cy="92" r="6"/>
  <text class="lbl" x="150" y="74" text-anchor="middle">Write by hand</text>

  <!-- Hand a repo to a model: scales, not grounded (bottom-right) -->
  <circle class="n" cx="305" cy="205" r="6"/>
  <text class="lbl" x="305" y="226" text-anchor="middle">Hand a repo to a model</text>

  <!-- This system: grounded AND scales (top-right, accent) -->
  <circle class="na" cx="305" cy="92" r="7"/>
  <text class="lbl" x="305" y="74" text-anchor="middle">This system</text>
  <text class="sub" x="305" y="130" text-anchor="middle">grounded + scales</text>"""

_theme.build(
    out_rel="public/projects/self-building-portfolio/problem-quadrant.svg",
    title="Grounded vs. scales — where each approach lands",
    aria_label=(
        "A quadrant map on two axes: grounded in the real source (vertical) and scales "
        "across projects (horizontal). Writing each page by hand is grounded but does not "
        "scale; handing a repo to a model scales but is not grounded; only this system sits "
        "in the top-right quadrant, both grounded and scaling."
    ),
    content_bbox=(40, 32, 396, 292),
    body=BODY,
)
