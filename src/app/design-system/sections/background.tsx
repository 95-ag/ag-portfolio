import backgroundAsciiDesktopDark from "../../../../public/design-system/background-ascii-desktop-dark.png";
import backgroundAsciiDesktopLight from "../../../../public/design-system/background-ascii-desktop-light.png";
import backgroundAsciiPhoneDark from "../../../../public/design-system/background-ascii-phone-dark.png";
import backgroundAsciiPhoneLight from "../../../../public/design-system/background-ascii-phone-light.png";
import backgroundAsciiTabletDark from "../../../../public/design-system/background-ascii-tablet-dark.png";
import backgroundAsciiTabletLight from "../../../../public/design-system/background-ascii-tablet-light.png";
import { GallerySection, Specimen } from "../scaffold-kit/catalog";
import { ThemeShot } from "../scaffold-kit/theme-media";

// Captured from the live field by assets-source/design-system/capture-ascii.mjs at device-pixel ratio 3 (phone) and
// 2 (tablet, desktop); `width` is each capture's size in CSS pixels.
const TIERS = [
  {
    name: "Phone · 390px",
    light: backgroundAsciiPhoneLight,
    dark: backgroundAsciiPhoneDark,
    width: 390,
  },
  {
    name: "Tablet · 768px",
    light: backgroundAsciiTabletLight,
    dark: backgroundAsciiTabletDark,
    width: 340,
  },
  {
    name: "Desktop · 1440px",
    light: backgroundAsciiDesktopLight,
    dark: backgroundAsciiDesktopDark,
    width: 340,
  },
];

export function BackgroundSection() {
  return (
    <GallerySection
      id="background"
      title="Background"
      intro="The ambient background: a static ASCII glyph field, full-viewport and subordinate to the content. It is shown as static captures."
      mapsTo="Background"
    >
      <Specimen
        id="ascii-field"
        name="AsciiField"
        source="@/components/background/ascii-field"
        description="Seeded glyph field: three tonal tiers (accent, ink, mute), static, no animation. Full-bleed on every page except project and post pages, where it keeps to the outer gutters. Also live behind this page; shown here as static captures of the live field at each screen tier."
        points={[
          "Each capture is the real field at its true size and opacity, so it is faint by design, and fainter in the dark theme.",
          "Below 768px in the light theme the accent tier steps down from 0.72 to 0.60.",
        ]}
      >
        <div className="flex flex-wrap items-start gap-[var(--spacing-xl)]">
          {TIERS.map((tier) => (
            <figure key={tier.name} className="m-0 max-w-full">
              <ThemeShot
                light={tier.light}
                dark={tier.dark}
                alt={`AsciiField glyph background, ${tier.name}`}
                width={tier.width}
              />
              <figcaption className="body-caption mt-[var(--spacing-sm)] text-[var(--ink-muted)]">
                {tier.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Specimen>

      <Specimen
        id="background-orchestration"
        name="BackgroundLayer"
        source="@/components/background/background-layer"
        description="The orchestration around the field; listed, not previewed."
      >
        <div className="prose-content">
          <ul>
            <li>
              BackgroundLayer: mounts the field behind page content. Every page
              except the reading pages gets it full-bleed at every size, at 0.85
              opacity. On project and post pages it is omitted on a phone and
              sits in the outer gutters only on larger tiers, with the reading
              column clear.
            </li>
          </ul>
        </div>
      </Specimen>
    </GallerySection>
  );
}
