"""
output_access_bar_chart.py
Table 1b — Extraction accuracy (%) vs. output access level.
Source: DL_Project.pdf, Table 1b.
Output: public/projects/model-extraction-attacks/output-access-bar-chart.svg
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

# Table 1b data — source: PDF Table 1 (b)
labels = ["Labels only", "Top-3 softmax", "All softmax"]
values = [79.8, 82.88, 82.15]

fig, ax = plt.subplots(figsize=(5.5, 3.6))
fig.patch.set_facecolor(BACKGROUND)
ax.set_facecolor(BACKGROUND)

x = np.arange(len(labels))
bar_width = 0.52

# Accent bar color; slightly muted fill for the non-peak bars
bar_colors = [ACCENT_MID, ACCENT, ACCENT_MID]  # peak is darkest

bars = ax.bar(x, values, width=bar_width, color=bar_colors, zorder=3, linewidth=0)

# Value labels above each bar
for bar, val in zip(bars, values):
    ax.text(
        bar.get_x() + bar.get_width() / 2,
        bar.get_height() + 0.15,
        f"{val:.2f}%",
        ha="center", va="bottom",
        fontsize=10.5, fontweight="500",
        color=TEXT,
    )

# Axis limits — tight around data range so differences are visible
ax.set_ylim(76, 85)
ax.set_xticks(x)
ax.set_xticklabels(labels, fontsize=10.5)
ax.set_ylabel("Extraction accuracy (%)", fontsize=10.5, labelpad=8, color=MUTED)

ax.tick_params(axis="x", colors=MUTED, length=0)
ax.tick_params(axis="y", colors=MUTED)

ax.spines["left"].set_color(EDGE)
ax.spines["left"].set_linewidth(0.75)
ax.spines["bottom"].set_color(EDGE)
ax.spines["bottom"].set_linewidth(0.75)

# Horizontal grid only, behind bars
ax.yaxis.grid(True, color=GRID, linewidth=0.5, zorder=0)
ax.set_axisbelow(True)

fig.tight_layout(pad=1.2)

out_path = Path(__file__).parent.parent.parent.parent / "public/projects/model-extraction-attacks/output-access-bar-chart.svg"
out_path.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(out_path, format="svg", bbox_inches="tight", transparent=False)
print(f"Saved: {out_path}")
