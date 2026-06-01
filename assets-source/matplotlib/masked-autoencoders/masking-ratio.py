"""
masking-ratio.py
Masking-ratio ablation — Top-1 linear-probe accuracy vs. masking ratio.
Source: MDX Table 2 / report Table 2 (Group 20 report).
  0%  (no masking / baseline): 32.7
  50%: 64.28
  75%: 66.85  <- sweet spot
  90%: 66.29

Y-axis starts at 0 (not truncated): the baseline-vs-masking jump is the larger
signal; the gentle 50->75->90 inverted-U is read from the value labels and the
highlighted 75% bar. Truncating the axis would exaggerate the peak dishonestly.

Output: public/projects/masked-autoencoders/masking-ratio.svg
Run from repo root: .venv/bin/python3 assets-source/matplotlib/masked-autoencoders/masking-ratio.py
"""

import sys
import matplotlib
matplotlib.use("svg")
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from _portfolio import use_portfolio_style, BACKGROUND, ACCENT, ACCENT_MID, TEXT, MUTED, EDGE, GRID

use_portfolio_style()

# Source: report Table 2 — masking-ratio ablation (Top-1 linear-probe accuracy)
labels = ["0%\n(baseline)", "50%", "75%", "90%"]
values = [32.7, 64.28, 66.85, 66.29]

fig, ax = plt.subplots(figsize=(5.5, 3.6))
fig.patch.set_facecolor(BACKGROUND)
ax.set_facecolor(BACKGROUND)

x = np.arange(len(labels))
bar_width = 0.6

# Baseline is the no-masking control (muted); the three masking ratios use the
# accent family with the 75% sweet spot as the darkest/peak bar.
bar_colors = [MUTED, ACCENT_MID, ACCENT, ACCENT_MID]

bars = ax.bar(x, values, width=bar_width, color=bar_colors, zorder=3, linewidth=0)

for bar, val in zip(bars, values):
    ax.text(
        bar.get_x() + bar.get_width() / 2,
        bar.get_height() + 0.8,
        f"{val:.2f}%" if val != 32.7 else "32.7%",
        ha="center", va="bottom",
        fontsize=10.5, fontweight="500",
        color=TEXT,
    )

ax.set_ylim(0, 78)
ax.set_xticks(x)
ax.set_xticklabels(labels, fontsize=10.5)
ax.set_xlabel("Masking ratio", fontsize=10.5, labelpad=8, color=MUTED)
ax.set_ylabel("Top-1 accuracy (%)", fontsize=10.5, labelpad=8, color=MUTED)

ax.tick_params(axis="x", colors=MUTED, length=0)
ax.tick_params(axis="y", colors=MUTED)

ax.spines["left"].set_color(EDGE)
ax.spines["left"].set_linewidth(0.75)
ax.spines["bottom"].set_color(EDGE)
ax.spines["bottom"].set_linewidth(0.75)

ax.yaxis.grid(True, color=GRID, linewidth=0.5, zorder=0)
ax.set_axisbelow(True)

fig.tight_layout(pad=1.2)

out_path = Path(__file__).parent.parent.parent.parent / "public/projects/masked-autoencoders/masking-ratio.svg"
out_path.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(out_path, format="svg", bbox_inches="tight", transparent=False)
print(f"Saved: {out_path}")
