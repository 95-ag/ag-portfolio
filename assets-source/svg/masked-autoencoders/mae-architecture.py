"""
mae-architecture.py — MAE asymmetric encoder/decoder pipeline diagram.
Body uses the shared diagram system (assets-source/svg/_theme.py). Two-row
boustrophedon flow; the ViT-B encoder is the single accent node (the artifact
the project evaluates). Run from repo root:
  .venv/bin/python3 assets-source/svg/masked-autoencoders/mae-architecture.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

BODY = """  <!-- ── ROW 1 ── y=20, h=44, cy=42 ────────────────────────────── -->

  <!-- N1: Input patches -->
  <rect class="n" x="150" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="220" y="37" text-anchor="middle">Input patches</text>
  <text class="sub" x="220" y="51" text-anchor="middle">16×16, full image</text>

  <!-- A1 -->
  <line class="conn" x1="290" y1="42" x2="334" y2="42" marker-end="url(#arr)"/>

  <!-- N2: Mask 75% -->
  <rect class="n" x="334" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="404" y="37" text-anchor="middle">Mask 75%</text>
  <text class="sub" x="404" y="51" text-anchor="middle">masked patches dropped</text>

  <!-- A2 -->
  <line class="conn" x1="474" y1="42" x2="518" y2="42" marker-end="url(#arr)"/>

  <!-- N3: ViT-B encoder [accent] -->
  <rect class="na" x="518" y="20" width="140" height="44" rx="4"/>
  <text class="lbl" x="588" y="37" text-anchor="middle">ViT-B encoder</text>
  <text class="sub" x="588" y="51" text-anchor="middle">visible 25% only</text>

  <!-- Connector: N3 bottom-center → elbow → N4 top-center -->
  <path class="conn" d="M 588 64 L 588 104 L 220 104 L 220 128" marker-end="url(#arr)"/>

  <!-- ── ROW 2 ── y=128, h=44, cy=150 ──────────────────────────── -->

  <!-- N4: + mask tokens -->
  <rect class="n" x="150" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="220" y="145" text-anchor="middle">+ mask tokens</text>
  <text class="sub" x="220" y="159" text-anchor="middle">restore full sequence</text>

  <!-- A3 -->
  <line class="conn" x1="290" y1="150" x2="334" y2="150" marker-end="url(#arr)"/>

  <!-- N5: Lightweight decoder -->
  <rect class="n" x="334" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="404" y="145" text-anchor="middle">Decoder</text>
  <text class="sub" x="404" y="159" text-anchor="middle">lightweight · discarded</text>

  <!-- A4 -->
  <line class="conn" x1="474" y1="150" x2="518" y2="150" marker-end="url(#arr)"/>

  <!-- N6: Reconstruct -->
  <rect class="n" x="518" y="128" width="140" height="44" rx="4"/>
  <text class="lbl" x="588" y="145" text-anchor="middle">Reconstruct</text>
  <text class="sub" x="588" y="159" text-anchor="middle">MSE on masked patches</text>"""

_theme.build(
    out_rel="public/projects/masked-autoencoders/mae-architecture.svg",
    title="MAE architecture",
    aria_label=(
        "Masked autoencoder pipeline: an input image is split into 16 by 16 patches; "
        "75 percent of patches are masked and dropped; the visible 25 percent pass "
        "through a ViT-B encoder; mask tokens are restored into the full sequence; a "
        "lightweight decoder reconstructs the image; and the loss is computed on the "
        "masked patches only."
    ),
    content_bbox=(150, 20, 658, 172),
    body=BODY,
)
