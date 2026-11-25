"""
_tokens.py — the design system's neutrals and project colours, read from its own token file.

Every generator takes its colours from here, so a diagram or chart can never carry a value the site does not.
The source is src/styles/theme.css: each name declares its light value first and its dark value second.
Colours that theme.css defines as another variable (`var(--…)`) are skipped; each name must leave exactly two.

ASSET_OUT_ROOT redirects every generator's output (default: the repo root), so a regeneration can be diffed against
the committed copies before anything is copied over.
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
THEME_CSS = REPO_ROOT / "src/styles/theme.css"
HEX = re.compile(r"#[0-9a-fA-F]{6}")
SLOTS = range(1, 13)


def out_root() -> Path:
    return Path(os.environ.get("ASSET_OUT_ROOT", REPO_ROOT))


def _pair(css: str, name: str) -> tuple[str, str]:
    values = re.findall(rf"^\s*{re.escape(name)}:\s*([^;]+);", css, re.M)
    hexes = [v.strip() for v in values if HEX.fullmatch(v.strip())]
    assert len(hexes) == 2, f"{name}: expected a light and a dark hex in theme.css, read {values}"
    return hexes[0], hexes[1]


_css = THEME_CSS.read_text(encoding="utf-8")

NEUTRALS = {
    key: _pair(_css, f"--{key}")
    for key in ("surface", "surface-tag", "ink", "ink-muted", "hairline", "hairline-strong", "accent")
}
_INK = {n: _pair(_css, f"--project-{n}-ink") for n in SLOTS}
assert len(_INK) == 12


def slot_ink(slot: int) -> tuple[str, str]:
    """A project's page colour (light, dark) — Foundations → Colors → Project Colours."""
    return _INK[slot]

