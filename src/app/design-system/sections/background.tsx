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
        description="Seeded glyph field in the page gutters: three tonal tiers (accent, ink, mute), static, no animation. Also live behind this page; shown here as a static capture."
      >
        <ThemeShot
          light={backgroundAsciiLight}
          dark={backgroundAsciiDark}
          alt="AsciiField glyph background"
        />
      </Specimen>

      <Specimen
        id="background-orchestration"
        name="BackgroundLayer · SurfaceContext"
        source="@/components/background/background-layer"
        description="The orchestration around the field; listed, not previewed."
      >
        <div className="prose-content">
          <ul>
            <li>
              BackgroundLayer: mounts the field behind page content. On desktop
              and tablet it is masked to the gutters; on mobile it runs
              full-bleed at the desktop density and 0.85 opacity on non-reading
              pages, and is omitted on project-detail pages.
            </li>
            <li>
              SurfaceContext: communicates the active surface tone so the
              ambient layers stay subordinate to content.
            </li>
          </ul>
        </div>
      </Specimen>
    </GallerySection>
  );
}
