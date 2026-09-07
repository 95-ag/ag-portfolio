"""
architecture.py — the layered spec-as-contract that produces the site.
Five layers the agent reads before it acts, producing the website.
Body uses the shared diagram system (assets-source/svg/_theme.py). Run from repo root:
  .venv/bin/python3 assets-source/svg/self-building-portfolio/architecture.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

# Five stacked layer bands (x=60, w=300, h=44, pitch 54), then the produced site.
BODY = """  <!-- ── Layer 1: Documentation ── y=20 -->
  <rect class="n" x="60" y="20" width="300" height="44" rx="4"/>
  <text class="lbl" x="210" y="37" text-anchor="middle">Documentation</text>
  <text class="sub" x="210" y="51" text-anchor="middle">product intent · content schema · design tokens</text>

  <!-- ── Layer 2: Rules ── y=74 -->
  <rect class="n" x="60" y="74" width="300" height="44" rx="4"/>
  <text class="lbl" x="210" y="91" text-anchor="middle">Rules</text>
  <text class="sub" x="210" y="105" text-anchor="middle">engineering · git · accessibility · verification</text>

  <!-- ── Layer 3: Skills ── y=128 -->
  <rect class="n" x="60" y="128" width="300" height="44" rx="4"/>
  <text class="lbl" x="210" y="145" text-anchor="middle">Skills</text>
  <text class="sub" x="210" y="159" text-anchor="middle">content · assets · cover · review</text>

  <!-- ── Layer 4: Pipelines ── y=182 -->
  <rect class="n" x="60" y="182" width="300" height="44" rx="4"/>
  <text class="lbl" x="210" y="199" text-anchor="middle">Pipelines</text>
  <text class="sub" x="210" y="213" text-anchor="middle">skills composed in a fixed order</text>

  <!-- ── Layer 5: Gates ── y=236 -->
  <rect class="n" x="60" y="236" width="300" height="44" rx="4"/>
  <text class="lbl" x="210" y="253" text-anchor="middle">Gates</text>
  <text class="sub" x="210" y="267" text-anchor="middle">plan · build validation · checks · sign-off</text>

  <!-- produces -->
  <line class="conn" x1="210" y1="280" x2="210" y2="304" marker-end="url(#arr)"/>

  <!-- ── Output: Website [accent] ── y=304 -->
  <rect class="na" x="60" y="304" width="300" height="46" rx="4"/>
  <text class="lbl" x="210" y="322" text-anchor="middle">Website</text>
  <text class="sub" x="210" y="336" text-anchor="middle">static Next.js · MDX · validated at build</text>"""

_theme.build(
    out_rel="public/projects/self-building-portfolio/architecture.svg",
    title="Spec-as-contract architecture",
    aria_label=(
        "The system as layers the agent reads before acting: documentation (product "
        "intent, content schema, design tokens), rules, skills, pipelines, and gates. "
        "Together these layers produce the website — a static Next.js site validated at build."
    ),
    content_bbox=(60, 20, 360, 350),
    body=BODY,
)
