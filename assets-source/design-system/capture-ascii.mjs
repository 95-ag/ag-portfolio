// Generator for the design-system gallery's ASCII field specimens (Background → AsciiField).
// Output: background-ascii-{phone,tablet,desktop}-{light,dark}.png — never hand-edit them.
//
//   next build && next start -p 3100            # a production build: it follows the system theme
//   node assets-source/design-system/capture-ascii.mjs [--base http://localhost:3100] [--out tmp/ascii-captures]
//
// Each capture is the real field on a full-bleed page (/about), everything else hidden, cropped at native scale so
// the 13px glyphs stay readable (a downscaled laptop viewport shrinks them to ~5px). The phone profile is a real
// iPhone one: below 768px the light-theme accent tier steps down (DESIGN.md → Background Layer).
// Regenerate into the default scratch folder, diff against public/design-system/, then copy over.
import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const BASE = arg("base", "http://localhost:3100");
const OUT = arg("out", "tmp/ascii-captures");

const TIERS = [
  {
    name: "phone",
    device: devices["iPhone 13"],
    crop: { width: 390, height: 664 },
  },
  {
    name: "tablet",
    device: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2 },
    crop: { width: 340, height: 340 },
  },
  {
    name: "desktop",
    device: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
    crop: { width: 340, height: 340 },
  },
];

// Hide every page element except the fixed, aria-hidden layer that holds the field.
const ISOLATE = `body > *:not([aria-hidden="true"]) { display: none !important; }`;

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chromium" });

for (const tier of TIERS) {
  for (const scheme of ["light", "dark"]) {
    const context = await browser.newContext({
      ...tier.device,
      colorScheme: scheme,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE}/about`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: ISOLATE });
    await page.waitForTimeout(600);

    const facts = await page.evaluate((crop) => {
      const resolve = (value) => {
        const probe = document.createElement("span");
        probe.style.color = value;
        document.body.appendChild(probe);
        const resolved = getComputedStyle(probe).color;
        probe.remove();
        return resolved;
      };
      const tierOf = (cls) => {
        const glyph = document.querySelector(`.${cls}`);
        const style = glyph && getComputedStyle(glyph);
        return glyph && { color: style.color, opacity: style.opacity };
      };
      const layer = document.querySelector('body > [aria-hidden="true"]');
      // The capture proves the accent tier, so the crop must contain at least one accent glyph. The field is
      // seeded, so placing the crop around the first accent glyph in the viewport is deterministic.
      const clamp = (value, max) => Math.max(0, Math.min(value, max));
      const accentBoxes = [
        ...document.querySelectorAll(".ascii-bg-glyph-accent"),
      ]
        .map((glyph) => glyph.getBoundingClientRect())
        .filter(
          (box) =>
            box.right > 0 &&
            box.left < innerWidth &&
            box.bottom > 0 &&
            box.top < innerHeight,
        )
        .sort((a, b) => a.top - b.top || a.left - b.left);
      const first = accentBoxes[0];
      const origin = first
        ? {
            x: clamp(first.left - 80, innerWidth - crop.width),
            y: clamp(first.top - 80, innerHeight - crop.height),
          }
        : { x: 0, y: 0 };
      const accentInCrop = accentBoxes.filter(
        (box) =>
          box.right > origin.x &&
          box.bottom > origin.y &&
          box.left < origin.x + crop.width &&
          box.top < origin.y + crop.height,
      ).length;
      return {
        origin,
        accentInCrop,
        glyphs: layer?.firstElementChild?.children.length ?? 0,
        layerOpacity: layer
          ? getComputedStyle(layer.firstElementChild).opacity
          : null,
        accentToken: resolve("var(--accent)"),
        accent: tierOf("ascii-bg-glyph-accent"),
        ink: tierOf("ascii-bg-glyph-ink"),
        mute: tierOf("ascii-bg-glyph-mute"),
      };
    }, tier.crop);

    if (facts.glyphs === 0)
      throw new Error(`${tier.name}/${scheme}: no glyphs on the page`);
    if (facts.accentInCrop === 0)
      throw new Error(
        `${tier.name}/${scheme}: no accent glyph inside the crop`,
      );
    if (facts.accent?.color !== facts.accentToken) {
      throw new Error(
        `${tier.name}/${scheme}: accent glyphs are ${facts.accent?.color}, the token is ${facts.accentToken}`,
      );
    }

    const file = path.join(OUT, `background-ascii-${tier.name}-${scheme}.png`);
    await page.screenshot({
      path: file,
      clip: { x: facts.origin.x, y: facts.origin.y, ...tier.crop },
    });
    console.log(
      `${tier.name} ${scheme}: ${facts.glyphs} glyphs (${facts.accentInCrop} accent in the crop), layer ${facts.layerOpacity}, accent ${facts.accent.color} @ ${facts.accent.opacity}, ink @ ${facts.ink.opacity}, mute @ ${facts.mute.opacity} → ${file}`,
    );
    await context.close();
  }
}
await browser.close();
