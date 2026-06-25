"""
panel-a.py — neutral "before" panel sample for the dev design-system gallery (DiagramRow).
Body uses the shared diagram system (assets-source/svg/_theme.py). Run from repo root:
  .venv/bin/python3 assets-source/svg/design-system-samples/panel-a.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

BODY = """  <rect class="n" x="20" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="90" y="47" text-anchor="middle">Layer 1</text>

  <line class="conn" x1="90" y1="64" x2="90" y2="98" marker-end="url(#arr)"/>

  <rect class="n" x="20" y="98" width="140" height="44" rx="4"/>
  <text class="lbl" x="90" y="125" text-anchor="middle">Layer 2</text>"""

_theme.build(
    out_rel="public/design-system/samples/panel-a.svg",
    title="Sample panel A",
    aria_label="Neutral sample panel A: two stacked layers.",
    content_bbox=(20, 20, 160, 142),
    body=BODY,
)
