"""
coreset-selection.py — coreset / query-budget selection pipeline diagram.
Body uses the shared diagram system (assets-source/svg/_theme.py). Run from repo root:
  .venv/bin/python3 assets-source/svg/model-extraction-attacks/coreset-selection.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

BODY = """  <!-- ── ROW 1 ── y=20, h=44, cy=42 ────────────────────────────── -->

  <!-- N1: Candidate Pool -->
  <rect class="n" x="150" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="220" y="37" text-anchor="middle">Candidate Pool</text>
  <text class="sub" x="220" y="51" text-anchor="middle">training data</text>

  <!-- A1 -->
  <line class="conn" x1="290" y1="42" x2="334" y2="42" marker-end="url(#arr)"/>

  <!-- N2: Proxy Scoring [accent] -->
  <rect class="na" x="334" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="404" y="37" text-anchor="middle">Proxy Scoring</text>
  <text class="sub" x="404" y="51" text-anchor="middle">local · no API calls</text>

  <!-- A2 -->
  <line class="conn" x1="474" y1="42" x2="518" y2="42" marker-end="url(#arr)"/>

  <!-- N3: Entropy Ranking -->
  <rect class="n" x="518" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="588" y="37" text-anchor="middle">Entropy Ranking</text>
  <text class="sub" x="588" y="51" text-anchor="middle">uncertainty scoring</text>

  <!-- Connector: N3 bottom-center → elbow → N4 top-center -->
  <path class="conn" d="M 588 64 L 588 104 L 220 104 L 220 128" marker-end="url(#arr)"/>

  <!-- ── ROW 2 ── y=128, h=44, cy=150 ──────────────────────────── -->

  <!-- N4: Top-K Selection -->
  <rect class="n" x="150" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="220" y="145" text-anchor="middle">Top-K Selection</text>
  <text class="sub" x="220" y="159" text-anchor="middle">high-entropy inputs</text>

  <!-- A3 -->
  <line class="conn" x1="290" y1="150" x2="334" y2="150" marker-end="url(#arr)"/>

  <!-- N5: Query Pool -->
  <rect class="n" x="334" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="404" y="145" text-anchor="middle">Query Pool</text>
  <text class="sub" x="404" y="159" text-anchor="middle">budget-concentrated</text>

  <!-- A4 -->
  <line class="conn" x1="474" y1="150" x2="518" y2="150" marker-end="url(#arr)"/>

  <!-- N6: Victim API [accent] -->
  <rect class="na" x="518" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="588" y="145" text-anchor="middle">Victim API</text>
  <text class="sub" x="588" y="159" text-anchor="middle">black-box queries</text>"""

_theme.build(
    out_rel="public/projects/model-extraction-attacks/coreset-selection.svg",
    title="Coreset selection pipeline",
    aria_label=(
        "Coreset selection pipeline: candidate pool is scored by a local ResNet-18 "
        "proxy; inputs are ranked by entropy and the top-K high-uncertainty inputs form "
        "the query pool sent to the victim API."
    ),
    content_bbox=(150, 20, 658, 172),
    body=BODY,
)
