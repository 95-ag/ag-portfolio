// Brand marks fill their whole 24-unit grid while Material Symbols carry built-in padding, so at the
// same nominal size a brand mark reads heavier. Padding the viewBox draws the mark at this share of its
// box, centred, without changing the box itself (DESIGN.md → Foundations → Iconography).
const BRAND_OPTICAL_SCALE = 0.85;

const GRID = 24;
const side = GRID / BRAND_OPTICAL_SCALE;
const origin = -(side - GRID) / 2;

export const BRAND_VIEW_BOX = `${origin} ${origin} ${side} ${side}`;
