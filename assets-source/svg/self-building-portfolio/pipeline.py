"""
pipeline.py — the four skills assembling a project page. The page fills with prose
(Content), figures land in it (Assets), the hero is added (Cover), and it is signed
off (Review). The skills' actions are the focus; the human gate is a small marker
between stages. Uses the shared diagram system. Run from repo root:
  .venv/bin/python3 assets-source/svg/self-building-portfolio/pipeline.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import _theme  # noqa: E402

PAGE_W, PAGE_H, PAGE_Y = 90, 118, 26
PITCH = 125
XS = [20, 145, 270, 395]  # page left edges


def tline(x, y, w):
    # faint text line (connector gray, thinned) — adapts to dark via the shared class
    return f'<line class="conn" stroke-width="1" x1="{x}" y1="{y}" x2="{x + w}" y2="{y}"/>'


def page(px, hero, figure, check):
    p = [f'<rect class="nt" x="{px}" y="{PAGE_Y}" width="{PAGE_W}" height="{PAGE_H}" rx="5"/>']
    lx = px + 9
    if hero:
        p.append(f'<rect class="na" x="{lx}" y="{PAGE_Y + 10}" width="72" height="20" rx="3"/>')
        y = PAGE_Y + 40
    else:
        y = PAGE_Y + 16
    for w in (64, 56, 68):  # upper text lines
        p.append(tline(lx, y, w))
        y += 9
    if figure:
        p.append(f'<rect class="n" x="{lx}" y="{y + 4}" width="72" height="26" rx="3"/>')
        y += 38
    else:
        for w in (60, 66, 52):
            p.append(tline(lx, y, w))
            y += 9
        y += 2
    for w in (62, 48):  # lower text lines
        p.append(tline(lx, y, w))
        y += 9
    if check:
        cx, cy = px + PAGE_W - 6, PAGE_Y + 4
        p.append(f'<circle class="na" cx="{cx}" cy="{cy}" r="11"/>')
        p.append(
            f'<path class="na" fill="none" stroke-width="2" '
            f'd="M {cx - 5} {cy} L {cx - 1.5} {cy + 4} L {cx + 5} {cy - 4}"/>'
        )
    return "\n  ".join(p)


LABELS = [
    ("Content", "writes the deep-dive"),
    ("Assets", "adds figures + tables"),
    ("Cover", "adds the hero"),
    ("Review", "two cold passes"),
]
STAGES = [
    dict(hero=False, figure=False, check=False),
    dict(hero=False, figure=True, check=False),
    dict(hero=True, figure=True, check=False),
    dict(hero=True, figure=True, check=True),
]

parts = []
for px, stage in zip(XS, STAGES):
    parts.append(page(px, **stage))
# labels under each page
for px, (lbl, sub) in zip(XS, LABELS):
    cx = px + PAGE_W // 2
    parts.append(f'<text class="lbl" x="{cx}" y="162" text-anchor="middle">{lbl}</text>')
    parts.append(f'<text class="sub" x="{cx}" y="176" text-anchor="middle">{sub}</text>')
# arrows + small "gate" markers between pages
mid_y = PAGE_Y + 59
for i in range(3):
    x1 = XS[i] + PAGE_W
    x2 = XS[i + 1]
    parts.append(f'<line class="conn" x1="{x1}" y1="{mid_y}" x2="{x2}" y2="{mid_y}" marker-end="url(#arr)"/>')
    parts.append(f'<text class="sub" x="{(x1 + x2) // 2}" y="{mid_y - 8}" text-anchor="middle">gate</text>')

BODY = "  " + "\n  ".join(parts)

_theme.build(
    out_rel="public/projects/self-building-portfolio/pipeline.svg",
    title="Four skills assembling a project page",
    aria_label=(
        "Four skills build a project page in sequence. Content fills the page with prose; "
        "Assets lands figures and tables in it; Cover adds the hero at the top; Review signs "
        "it off with two cold passes. A small human gate sits between each stage."
    ),
    content_bbox=(14, 14, 494, 180),
    body=BODY,
)
