import backgroundAsciiDark from "../../../../public/design-system/background-ascii-dark.png";
import backgroundAsciiLight from "../../../../public/design-system/background-ascii-light.png";
import { GallerySection, Specimen } from "../scaffold-kit/catalog";
import { ThemeShot } from "../scaffold-kit/theme-media";

export function BackgroundSection() {
  return (
    <GallerySection
      id="background"
      title="Background"
      intro="The ambient background: a static ASCII glyph field, full-viewport and subordinate to the content. It is shown as a static capture."
      mapsTo="Background"
    >
      <Specimen
        id="ascii-field"
        name="AsciiField"
        source="@/components/background/ascii-field"
        description="Seeded glyph field: three tonal tiers (accent, ink, mute), static, no animation. Full-bleed on every page except project and post pages, where it keeps to the outer gutters. Also live behind this page; shown here as a static capture."
      >
        <ThemeShot
          light={backgroundAsciiLight}
          dark={backgroundAsciiDark}
          alt="AsciiField glyph background"
        />
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
