"""
_portfolio.py
Shared palette constants and style loader for portfolio matplotlib scripts.

Light-theme charts. The neutrals are the design system's, read from its token file (assets-source/_tokens.py);
the accent is the page colour of the project the chart illustrates, so each script names its palette slot.

Usage:
    from pathlib import Path
    import sys
    sys.path.insert(0, str(Path(__file__).parent.parent))
    from _portfolio import use_portfolio_style, slot_colours, TEXT, MUTED, EDGE, GRID, BACKGROUND
    ACCENT, ACCENT_MID, ACCENT_MUTED = slot_colours(4)
"""

import sys
from pathlib import Path

import matplotlib.pyplot as plt

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _tokens import NEUTRALS, out_root, slot_ink, slot_tile  # noqa: E402,F401

# --- Neutrals (light) ---
BACKGROUND = NEUTRALS["surface"][0]
TEXT = NEUTRALS["ink"][0]
MUTED = NEUTRALS["ink-muted"][0]
EDGE = NEUTRALS["hairline-strong"][0]
GRID = NEUTRALS["hairline"][0]


def _mix(foreground: str, background: str, amount: float) -> str:
    """`foreground` at `amount` over `background`, as a hex colour."""
    f = [int(foreground[i : i + 2], 16) for i in (1, 3, 5)]
    b = [int(background[i : i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(fc * amount + bc * (1 - amount)):02x}" for fc, bc in zip(f, b))


def slot_colours(slot: int) -> tuple[str, str, str]:
    """(accent, mid, muted) for a project's palette slot: its page colour, that colour half-strength on the
    background, and its tile colour."""
    accent = slot_ink(slot)[0]
    return accent, _mix(accent, BACKGROUND, 0.5), slot_tile(slot)[0]


def use_portfolio_style() -> None:
    """Load the shared portfolio mplstyle from the sibling file, then apply the token colours."""
    style_path = Path(__file__).parent / "_portfolio.mplstyle"
    plt.style.use(str(style_path))
    plt.rcParams.update(
        {
            "figure.facecolor": BACKGROUND,
            "axes.facecolor": BACKGROUND,
            "axes.edgecolor": EDGE,
            "axes.labelcolor": TEXT,
            "axes.titlecolor": TEXT,
            "grid.color": GRID,
            "lines.color": TEXT,
            "text.color": TEXT,
            "xtick.color": MUTED,
            "ytick.color": MUTED,
        }
    )
