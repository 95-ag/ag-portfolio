"""
extraction-pipeline.py — model-extraction attack pipeline diagram.
Body uses the shared diagram system (assets-source/svg/_theme.py). Run from repo root:
  .venv/bin/python3 assets-source/svg/model-extraction-attacks/extraction-pipeline.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

BODY = """  <!-- ── ROW 1 ── y=20, h=44, cy=42 ────────────────────────────── -->

  <!-- N1: Query Set -->
  <rect class="n" x="150" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="220" y="37" text-anchor="middle">Query Set</text>
  <text class="sub" x="220" y="51" text-anchor="middle">images · OOD data</text>

  <!-- A1 -->
  <line class="conn" x1="290" y1="42" x2="334" y2="42" marker-end="url(#arr)"/>

  <!-- N2: Victim API [accent] -->
  <rect class="na" x="334" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="404" y="37" text-anchor="middle">Victim API</text>
  <text class="sub" x="404" y="51" text-anchor="middle">black-box access</text>

  <!-- A2 -->
  <line class="conn" x1="474" y1="42" x2="518" y2="42" marker-end="url(#arr)"/>

  <!-- N3: Soft Labels -->
  <rect class="n" x="518" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="588" y="37" text-anchor="middle">Soft Labels</text>
  <text class="sub" x="588" y="51" text-anchor="middle">top-k probabilities</text>

  <!-- Connector: N3 bottom-center → elbow → N4 top-center -->
  <!-- N3 bottom-center: (588, 64). N4 top-center: (220, 128) -->
  <path class="conn" d="M 588 64 L 588 104 L 220 104 L 220 128" marker-end="url(#arr)"/>

  <!-- ── ROW 2 ── y=128, h=44, cy=150 ──────────────────────────── -->

  <!-- N4: Surrogate Training -->
  <rect class="n" x="150" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="220" y="145" text-anchor="middle">Surrogate Training</text>
  <text class="sub" x="220" y="159" text-anchor="middle">query-response pairs</text>

  <!-- A3 -->
  <line class="conn" x1="290" y1="150" x2="334" y2="150" marker-end="url(#arr)"/>

  <!-- N5: Extracted Model [accent] -->
  <rect class="na" x="334" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="404" y="145" text-anchor="middle">Extracted Model</text>
  <text class="sub" x="404" y="159" text-anchor="middle">replicated behavior</text>

  <!-- A4 -->
  <line class="conn" x1="474" y1="150" x2="518" y2="150" marker-end="url(#arr)"/>

  <!-- N6: Downstream Attacks -->
  <rect class="n" x="518" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="588" y="145" text-anchor="middle">Downstream Attacks</text>
  <text class="sub" x="588" y="159" text-anchor="middle">adversarial · inference</text>"""

_theme.build(
    out_rel="public/projects/model-extraction-attacks/extraction-pipeline.svg",
    title="Model extraction pipeline",
    aria_label=(
        "Model extraction pipeline: query set and OOD data are sent to a black-box "
        "victim API which returns soft labels; these train a surrogate model producing "
        "an extracted model used for adversarial and membership inference attacks."
    ),
    content_bbox=(150, 20, 658, 172),
    body=BODY,
)
