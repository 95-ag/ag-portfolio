"""
diagram.py — neutral input→model→output sample diagram for the dev design-system gallery.
Body uses the shared diagram system (assets-source/svg/_theme.py). Run from repo root:
  .venv/bin/python3 assets-source/svg/design-system-samples/diagram.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

BODY = """  <rect class="n" x="20" y="20" width="120" height="44" rx="4"/>
  <text class="lbl" x="80" y="47" text-anchor="middle">input</text>

  <line class="conn" x1="140" y1="42" x2="184" y2="42" marker-end="url(#arr)"/>

  <rect class="na" x="184" y="20" width="120" height="44" rx="4"/>
  <text class="lbl" x="244" y="47" text-anchor="middle">model</text>

  <line class="conn" x1="304" y1="42" x2="348" y2="42" marker-end="url(#arr)"/>

  <rect class="n" x="348" y="20" width="120" height="44" rx="4"/>
  <text class="lbl" x="408" y="47" text-anchor="middle">output</text>"""

_theme.build(
    out_rel="public/design-system/samples/diagram.svg",
    title="Sample diagram",
    aria_label="Neutral sample diagram: input flows to a model, which produces an output.",
    content_bbox=(20, 20, 468, 64),
    body=BODY,
)
