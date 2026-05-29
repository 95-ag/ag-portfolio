# Asset Standards

Format table, directory layout, naming, tooling commands, reproducibility rules,
and anti-patterns. Extracted from asset-guide.md.

---

## Format Table

| Asset type | Format | Notes |
|---|---|---|
| Mermaid flow/pipeline/state diagrams | SVG | Always — via mmdc export |
| matplotlib charts (source data available) | SVG preferred, PNG acceptable | Must be reproducible from script |
| Legacy PDF crops (no source data) | High-DPI PNG | Crop procedure documented |
| Raster images / photos | WebP | Compress before committing |
| Assets requiring transparency | PNG | WebP if transparency + compression needed |
| Complex custom architecture diagrams (tldraw) | SVG | Fallback only — use when Mermaid is insufficient |

---

## Directory Layout

```
/assets-source/
  mermaid/
    _theme.json              ← shared Mermaid theme — never edit during a project run
    <slug>/
      <name>.mmd             ← editable Mermaid source
  matplotlib/
    _portfolio.mplstyle      ← shared matplotlib style — never edit during a project run
    _portfolio.py            ← shared palette helper — import, never copy
    <slug>/
      <name>.py              ← chart script
      <name>.csv             ← dataset if applicable

/public/projects/<slug>/
  <name>.svg                 ← production diagram export
  <name>.png / <name>.webp   ← production raster export
  hero-cover.webp            ← cover (separate skill)
```

Production assets are final exports only. Editable sources stay in `assets-source/`.

---

## Naming Convention

Production filenames must be:
- Descriptive and stable: `extraction-pipeline.svg`, not `diagram.svg` or `fig1.svg`
- Kebab-case
- No version suffixes (`-v2`, `-final`, `-new`)

Match the `src=` path in the MDX component exactly — filenames drive the MDX reference.

---

## Mermaid Tooling

**Generation command (exact):**
```
mmdc -i assets-source/mermaid/<slug>/<name>.mmd -o public/projects/<slug>/<name>.svg -c assets-source/mermaid/_theme.json
```

**Rules:**
- Always pass `-c assets-source/mermaid/_theme.json` — never inline `%%{init}%%` blocks
- `.mmd` source files live in `assets-source/mermaid/<slug>/`
- Test output at dark and light theme tokens; the shared `_theme.json` is already calibrated

**Shared theme config** (`assets-source/mermaid/_theme.json`):
```json
{
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#e6f4ec",
    "primaryBorderColor": "#bbcabf",
    "primaryTextColor": "#2c2c2a",
    "lineColor": "#6c7a71",
    "fontFamily": "Inter, system-ui, sans-serif",
    "fontSize": "13px"
  }
}
```

---

## matplotlib Tooling

**Script template:**
```python
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import _portfolio  # noqa: F401 — applies shared color palette

import matplotlib.pyplot as plt

plt.style.use(os.path.join(os.path.dirname(__file__), '../_portfolio.mplstyle'))

# ... chart code ...

plt.tight_layout()
plt.savefig('public/projects/<slug>/<name>.svg', bbox_inches='tight')
```

**Rules:**
- Always `import _portfolio` for color palette consistency
- Always `plt.style.use(_portfolio.mplstyle)` for visual consistency
- Use `bbox_inches='tight'` to minimize excess whitespace
- SVG output preferred; PNG acceptable when SVG renders poorly (complex rasters, photos)
- The script must be runnable standalone: `python assets-source/matplotlib/<slug>/<name>.py`
- Include inline comments explaining any non-obvious color or layout choice

**Shared style** (`assets-source/matplotlib/_portfolio.mplstyle`) applies:
- `figure.facecolor: f8f8f7` (matches site background)
- Accent color `006e37` for primary line/bar series
- Inter/system sans font, hairline strokes, transparent spines on top/right
- Grid lines on y-axis only, lightweight

---

## Reproducibility Rules

- Mermaid diagrams: reproducible via `.mmd` + `_theme.json` + `mmdc` command
- matplotlib charts: reproducible via `.py` script + `_portfolio.mplstyle` + `_portfolio.py`
- Legacy PDF crops: document crop parameters (source figure, padding, tool used) — not automatically reproducible but the decision is documented
- Do not commit only the export — source is always retained

---

## Optimization Checklist

Before committing any asset:
- [ ] File size optimized (no 2MB PNGs for simple charts)
- [ ] No duplicate exports or variant files
- [ ] Labels readable at mobile width (≥375px)
- [ ] Descriptive stable filename
- [ ] Source file retained in `assets-source/`
- [ ] No embedded raster graphics inside SVGs where vector would work
- [ ] Aspect ratio in MDX `aspect` prop matches actual pixel dimensions

---

## Anti-Patterns

- Screenshots instead of vector exports
- Inconsistent visual styles across diagrams for the same project
- Oversized PNG charts that should be SVG
- Unreadable labels at small sizes
- `%%{init}%%` blocks inside `.mmd` files (use shared `_theme.json` instead)
- Manually edited production files (regenerate from source instead)
- Missing source files (export without corresponding `.mmd` or `.py`)
- Generic filenames (`chart.svg`, `diagram1.png`, `output.svg`)
- Copying `_portfolio.mplstyle` or `_theme.json` content into project-specific files
