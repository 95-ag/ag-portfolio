"""
_portfolio.py
Shared palette constants and style loader for portfolio matplotlib scripts.

Matches portfolio design tokens (light mode).
Note: TEXT (#2c2c2a) tracks CSS --ink (#2d2d2d).

Usage:
    from pathlib import Path
    import sys
    sys.path.insert(0, str(Path(__file__).parent))
    from _portfolio import use_portfolio_style, ACCENT, TEXT, MUTED, EDGE, GRID, ACCENT_MID, ACCENT_MUTED, BACKGROUND
"""

from pathlib import Path
import matplotlib.pyplot as plt

# --- Palette ---
BACKGROUND = "#f8f8f7"
ACCENT = "#006e37"
ACCENT_MUTED = "#e6f4ec"
ACCENT_MID = "#4fa87e"
TEXT = "#2c2c2a"
MUTED = "#6c7a71"
EDGE = "#d4d8d5"
GRID = "#e8eae8"


def use_portfolio_style() -> None:
    """Load the shared portfolio mplstyle from the sibling file."""
    style_path = Path(__file__).parent / "_portfolio.mplstyle"
    plt.style.use(str(style_path))
