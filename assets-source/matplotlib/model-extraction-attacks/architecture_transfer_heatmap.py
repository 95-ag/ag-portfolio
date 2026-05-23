"""
architecture_transfer_heatmap.py
Table 1a — Extraction accuracy (%) for attacker-victim architecture pairs.
Source: DL_Project.pdf, Table 1a.
Output: public/projects/model-extraction-attacks/architecture-transfer-heatmap.svg
"""

import sys
import numpy as np
import matplotlib
matplotlib.use("svg")
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from pathlib import Path

style_path = Path(__file__).parent.parent / "_portfolio.mplstyle"
plt.style.use(str(style_path))

# Table 1a data — source: PDF Table 1 (a)
# Rows = attackers, Cols = victims
attackers = ["ResNet-34", "ResNet-50"]
victims = ["ResNet-34", "ResNet-50", "VGG19-BN"]

data = np.array([
    [80.27, 79.80, 81.34],  # ResNet-34 attacker
    [79.38, 79.42, 77.00],  # ResNet-50 attacker
])

# Wider figure so y-axis labels have room at small display sizes
fig, ax = plt.subplots(figsize=(7.0, 3.2))
fig.patch.set_facecolor("#f8f8f7")
ax.set_facecolor("#f8f8f7")

# Custom green colormap: light cream → accent green
cmap = mcolors.LinearSegmentedColormap.from_list(
    "portfolio_green",
    ["#e6f4ec", "#006e37"],
    N=256,
)

vmin, vmax = 75.0, 83.0
im = ax.imshow(data, cmap=cmap, vmin=vmin, vmax=vmax, aspect="auto")

# Cell labels
for r in range(data.shape[0]):
    for c in range(data.shape[1]):
        val = data[r, c]
        # use white text on darker cells
        brightness = (val - vmin) / (vmax - vmin)
        text_color = "#ffffff" if brightness > 0.5 else "#2c2c2a"
        ax.text(
            c, r, f"{val:.2f}%",
            ha="center", va="center",
            fontsize=12, fontweight="500",
            color=text_color,
        )

ax.set_xticks(range(len(victims)))
ax.set_xticklabels(victims, fontsize=10.5)
ax.set_yticks(range(len(attackers)))
ax.set_yticklabels(attackers, fontsize=10.5)

ax.set_xlabel("Victim model", fontsize=10.5, labelpad=8, color="#6c7a71")
ax.set_ylabel("Attacker model", fontsize=10.5, labelpad=8, color="#6c7a71")

# Remove grid (irrelevant for heatmap)
ax.grid(False)
for spine in ax.spines.values():
    spine.set_visible(False)

ax.tick_params(length=0)
ax.tick_params(axis="x", colors="#6c7a71")
ax.tick_params(axis="y", colors="#6c7a71")

# Colorbar
cbar = fig.colorbar(im, ax=ax, fraction=0.04, pad=0.03)
cbar.ax.tick_params(labelsize=9, colors="#6c7a71", length=0)
cbar.outline.set_visible(False)
cbar.set_label("Accuracy (%)", fontsize=9, color="#6c7a71", labelpad=6)

fig.tight_layout(pad=1.2)
# Ensure left margin is wide enough for y-axis labels on small displays
fig.subplots_adjust(left=0.20)

out_path = Path(__file__).parent.parent.parent.parent / "public/projects/model-extraction-attacks/architecture-transfer-heatmap.svg"
out_path.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(out_path, format="svg", bbox_inches="tight", transparent=False)
print(f"Saved: {out_path}")
