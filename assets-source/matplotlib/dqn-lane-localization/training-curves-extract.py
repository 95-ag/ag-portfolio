"""
Training curves extraction from thesis PDF page 77 / Fig 5.9.
Step 1 (system python3 with fitz): render page to tmp/page77-3x.png
  python3 -c "import fitz; doc=fitz.open('tmp/reports/DA233X_AishwaryaGanesan_MasterThesisReport.pdf'); pix=doc[76].get_pixmap(matrix=fitz.Matrix(3,3)); pix.save('tmp/page77-3x.png')"
Step 2 (this file, venv PIL): crop each subplot from the rendered page.

Source: tmp/page77-3x.png (1786x2526, 3x render of PDF page 77)

Crop bounds are axes-aligned, not figure-aligned. The matplotlib figure title sits above
each plot's axes box and is excluded — it is redundant with the MDX captions and introduces
a ~60px blank gap between the title and the axes that reads as empty space at panel size.

Page-coordinate y ranges (3x pixels, measured from axes spine, PADDING=24 applied):
  Plot 0 (inbuilt extractor):   x=359–1513, y=414–924   (axes spine at page y≈438)
  Plot 1 (ResNet-50):           x=359–1513, y=1045–1556  (axes spine at page y≈1069)
  Plot 2 (Bézier curve):        x=359–1513, y=1686–2161  (axes spine at page y≈1710)

Run from repo root: .venv/bin/python3 assets-source/matplotlib/dqn-lane-localization/training-curves-extract.py
"""
from PIL import Image

PADDING = 24

# Axes-aligned crop rects: (x1, y1, x2, y2) in 3x page pixels.
# y1 = (axes border page y) - PADDING; y2 = (last content row page y) + PADDING.
# Axes border is the first non-white row after the matplotlib title+blank-gap band.
CROP_RECTS = [
    (359, 390, 1513, 952),   # plot 0: inbuilt extractor  (axes @ y=414, labels end y=928)
    (359, 1029, 1513, 1586), # plot 1: ResNet-50          (axes @ y=1053, labels end y=1562)
    (359, 1666, 1513, 2161), # plot 2: Bézier curve       (axes @ y=1690, labels end y=2137)
]
NAMES = [
    "training-curve-0.png",
    "training-curve-1.png",
    "training-curve-2.png",
]

page_img = Image.open("tmp/page77-3x.png").convert("RGB")
pw, ph = page_img.size
print(f"Page image: {pw}x{ph}")

for i, ((x1, y1, x2, y2), name) in enumerate(zip(CROP_RECTS, NAMES)):
    crop = page_img.crop((x1, y1, x2, y2))
    out = f"public/projects/dqn-lane-localization/{name}"
    crop.save(out, "PNG", optimize=True)
    print(f"Plot {i}: {out} ({crop.width}x{crop.height})")
