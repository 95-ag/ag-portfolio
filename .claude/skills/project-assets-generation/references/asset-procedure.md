# Asset Procedure

Step-by-step operating guide for categorizing, generating, framing, and placing
portfolio assets. Authoritative reference for the project-assets-generation skill.

---

## Asset Categorization

Before generating any asset, categorize every visual the MDX references:

| Type | When to use | Output format |
|---|---|---|
| Mermaid flow | Sequential pipelines, stage diagrams, selection processes, dependency/state diagrams | SVG |
| matplotlib | Any result that has source numbers (metrics, comparisons, curves, heatmaps) | SVG preferred, PNG acceptable |
| Legacy crop | Figure exists in PDF but no raw data available for regeneration | High-DPI PNG crop |
| Composition | Annotated layouts, side-by-side image comparisons, raster panels | PNG |

**Do not generate an asset without a source file.** The only exception is legacy PDF crops —
document the crop procedure explicitly (tool, coordinates, padding applied) in a comment or
notes file alongside the production asset.

**Shared tooling — invoke, never duplicate:**
- Mermaid theme: `assets-source/mermaid/_theme.json`
- matplotlib style: `assets-source/matplotlib/_portfolio.mplstyle`
- matplotlib palette helper: `assets-source/matplotlib/_portfolio.py`

These files are shared across all projects. Never copy their content into a project script.
Never modify them during a project asset pass.

---

## Figure Composition and Framing

Apply these principles before generating or cropping any figure.

### Audit before generating

Measure the content bounds of every existing asset before deciding to regenerate.
Use PIL or equivalent to detect non-white pixel extents. Know exactly what whitespace
is present and whether it is symmetric, intentional, or a matplotlib margin artifact.

Do not re-export or regenerate without this baseline. It is easy to make framing worse
under the assumption you are making it better. Audit first; only then decide whether
to regenerate.

### Treat multi-subplot figures as single figures

If a matplotlib figure was designed with multiple subplots (e.g., CIFAR-10 / CIFAR-100
side by side, (a)/(b) comparison panels), display it as one composed figure — not split
into separate panels.

Splitting forces you to fight asymmetric y-axis margins, unequal content heights, and
differing internal padding. The original composition already encodes subplot semantics
and labels. Respect it.

Split-panel display is appropriate only for figures that were independently composed and
need side-by-side presentation for a specific comparison reason. It is not a default
layout tool for anything wide.

### Width hierarchy — full width is the exception

Establish a width hierarchy before placing any figure. Default is constrained/centered.
Full-width is reserved for the most complex, information-dense assets where the detail
requires the horizontal span.

Apply `max-w-[Npx]` based on figure density:
- Simple bar charts, small heatmaps, narrow ROC curves → `max-w-[420–520px]`
- Medium complexity diagrams → `max-w-[560–700px]`
- Complex multi-node pipeline diagrams with dense labeling → full prose width

The rule: denser figures can be wider. Simple figures should not span full width.

### Technical inset vs editorial visual

Small raster crops (example images, training screenshots) are technical insets — not
editorial visuals. Do not stretch them into hero-like panels. Keep them compact and
proportionate; the informational density does not warrant large presentation.

Matplotlib charts on white backgrounds read as embedded research figures. This is
acceptable. The white background is part of the figure's content. It does not need to
be eliminated — only the excess outer margins need cropping.

### Crop normalization

When cropping figures for publication:
- Always start from content bounds (measured, not estimated)
- Apply consistent padding on all sides: typically 15–28px depending on figure type
- For multi-subplot figures: use unified y-bounds across both halves so both subplots
  share the same top/bottom crop
- Symmetric padding is the goal; when the source prevents symmetry (e.g., y-axis labels
  on one side only), prefer a single-figure crop over splitting
- Verify the final crop at 100% zoom before committing — aspect ratios in the MDX
  `aspect` prop must match actual pixel dimensions

### Diagram system consistency

Hand-crafted SVG diagrams for the same project must share: node dimensions, CSS class
vocabulary, dark-mode media query structure, marker definitions, and arrowhead style.

Do not mix hand-crafted SVG with Mermaid output in the same visual system — they produce
incompatible node sizing, font rendering, and edge treatment.

When Mermaid output is unavoidable alongside hand-crafted SVGs, compare node dimensions
and font sizes explicitly and adjust the export configuration until they match.

### Figure numbering

Only number figures if the prose cites them by number ("see Figure 1"). Decorative
numbering — numbers in captions that are never referenced from the body text — adds
visual noise without navigation value. Use descriptive captions instead.

### Component abstractions

Fix composition and framing first. Add layout abstractions (e.g., DiagramRow/DiagramPanel)
only after the underlying figure is correctly framed as a standalone. If the figure
requires a wrapper to look acceptable, the crop is wrong. Wrappers cannot correct
asymmetric margins, mismatched heights, or wrong scale choices.
