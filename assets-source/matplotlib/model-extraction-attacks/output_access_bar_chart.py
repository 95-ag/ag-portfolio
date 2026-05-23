"""
output_access_bar_chart.py
Table 1b — Extraction accuracy (%) vs. output access level.
Source: DL_Project.pdf, Table 1b.
Output: public/projects/model-extraction-attacks/output-access-bar-chart.svg
"""

import matplotlib
matplotlib.use("svg")
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

style_path = Path(__file__).parent.parent / "_portfolio.mplstyle"
plt.style.use(str(style_path))

# Table 1b data — source: PDF Table 1 (b)
labels = ["Labels only", "Top-3 softmax", "All softmax"]
values = [79.8, 82.88, 82.15]

fig, ax = plt.subplots(figsize=(5.5, 3.6))
fig.patch.set_facecolor("#f8f8f7")
ax.set_facecolor("#f8f8f7")

x = np.arange(len(labels))
bar_width = 0.52

# Accent bar color; slightly muted fill for the non-peak bars
bar_colors = ["#4fa87e", "#006e37", "#4fa87e"]  # peak is darkest

bars = ax.bar(x, values, width=bar_width, color=bar_colors, zorder=3, linewidth=0)

# Value labels above each bar
for bar, val in zip(bars, values):
    ax.text(
        bar.get_x() + bar.get_width() / 2,
        bar.get_height() + 0.15,
        f"{val:.2f}%",
        ha="center", va="bottom",
        fontsize=10.5, fontweight="500",
        color="#2c2c2a",
    )

# Axis limits — tight around data range so differences are visible
ax.set_ylim(76, 85)
ax.set_xticks(x)
ax.set_xticklabels(labels, fontsize=10.5)
ax.set_ylabel("Extraction accuracy (%)", fontsize=10.5, labelpad=8, color="#6c7a71")

ax.tick_params(axis="x", colors="#6c7a71", length=0)
ax.tick_params(axis="y", colors="#6c7a71")

ax.spines["left"].set_color("#d4d8d5")
ax.spines["left"].set_linewidth(0.75)
ax.spines["bottom"].set_color("#d4d8d5")
ax.spines["bottom"].set_linewidth(0.75)

# Horizontal grid only, behind bars
ax.yaxis.grid(True, color="#e8eae8", linewidth=0.5, zorder=0)
ax.set_axisbelow(True)

fig.tight_layout(pad=1.2)

out_path = Path(__file__).parent.parent.parent.parent / "public/projects/model-extraction-attacks/output-access-bar-chart.svg"
out_path.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(out_path, format="svg", bbox_inches="tight", transparent=False)
print(f"Saved: {out_path}")
