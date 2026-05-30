"""
Model architecture diagram extraction from thesis PDF page 58 / Fig 4.1.
Source: tmp/page58-3x.png (1786x2526, 3x render of PDF page 58)
PDF figure rect at 3x pixels: (303, 901, 1398, 1623) = 1095x722

Crops Fig 4.1 with clean uniform whitespace padding on all sides.
Run from repo root:
  Step 1: python3 -c "import fitz; doc=fitz.open('tmp/reports/DA233X_AishwaryaGanesan_MasterThesisReport.pdf'); pix=doc[57].get_pixmap(matrix=fitz.Matrix(3,3)); pix.save('tmp/page58-3x.png')"
  Step 2: .venv/bin/python3 assets-source/matplotlib/dqn-lane-localization/model-arch-crop.py
"""
from PIL import Image

PADDING = 28
X1, Y1, X2, Y2 = 303, 901, 1398, 1623  # 3x pixel coordinates of Fig 4.1

page_img = Image.open("tmp/page58-3x.png").convert("RGB")
w, h = page_img.size

crop = page_img.crop((
    max(0, X1 - PADDING),
    max(0, Y1 - PADDING),
    min(w, X2 + PADDING),
    min(h, Y2 + PADDING),
))

out = "public/projects/dqn-lane-localization/model-architecture.png"
crop.save(out, "PNG", optimize=True)
print(f"Saved {out} ({crop.width}x{crop.height})")
