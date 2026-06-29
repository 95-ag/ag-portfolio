import backgroundAsciiDark from "../../../../public/design-system/background-ascii-dark.png";
import backgroundAsciiLight from "../../../../public/design-system/background-ascii-light.png";
import meteorDarkPoster from "../../../../public/design-system/meteor-dark-poster.jpg";
import meteorLightPoster from "../../../../public/design-system/meteor-light-poster.jpg";
import { GallerySection, Specimen } from "../scaffold-kit/catalog";
import { ThemeShot, ThemeVideo } from "../scaffold-kit/theme-media";
import { SwatchGrid, type SwatchGroup } from "../visualizer-kit";

// Particle colors are subsystem tokens stored as RGB triples; swatch via rgb(var(...)) since the raw
// value isn't a color on its own.
const METEOR_TOKENS: SwatchGroup[] = [
  {
    label: "Particle colors",
    tokens: [
      {
        token: "--meteor-accent-rgb",
        name: "Meteor Accent",
        usage: "Primary particle, tracks accent",
        swatchValue: "rgb(var(--meteor-accent-rgb))",
      },
      {
        token: "--meteor-secondary-rgb",
        name: "Meteor Secondary",
        usage: "Secondary particle, paired with the accent",
        swatchValue: "rgb(var(--meteor-secondary-rgb))",
      },
    ],
  },
];

export function BackgroundSection() {
  return (
    <GallerySection
      id="background"
      title="Background"
      intro="The ambient background: an ASCII glyph field plus a Three.js meteor shader, both full-viewport. The meteor is shown as a short looping clip, the ASCII field as a static capture."
      mapsTo="Background"
    >
      <Specimen
        id="ascii-field"
        name="AsciiField"
        source="@/components/background/ascii-field"
        description="Seeded glyph field in the page gutters: three tonal tiers (accent, ink, mute). Also live behind this page; shown here as a static capture."
      >
        <ThemeShot
          light={backgroundAsciiLight}
          dark={backgroundAsciiDark}
          alt="AsciiField glyph background"
        />
      </Specimen>

      <Specimen
        id="meteor-shower"
        name="MeteorShower"
        source="@/components/background/meteor-shower"
        description="Three.js shader: additive neon streaks in dark, inverted ink streaks in light; shown as a short looping clip (a dense segment of the effect)."
      >
        <ThemeVideo
          lightVideo="/design-system/meteor-light.mp4"
          darkVideo="/design-system/meteor-dark.mp4"
          lightPoster={meteorLightPoster}
          darkPoster={meteorDarkPoster}
          alt="MeteorShower background"
        />
      </Specimen>

      <Specimen
        id="background-particle-tokens"
        name="Particle color tokens"
        source="src/styles/theme.css → --meteor-*-rgb"
        description="Two subsystem design tokens read live by the shader, so the particle palette responds to theme changes automatically."
      >
        <SwatchGrid groups={METEOR_TOKENS} />
      </Specimen>

      <Specimen
        id="background-orchestration"
        name="BackgroundLayer · SurfaceContext"
        source="@/components/background/background-layer"
        description="The orchestration around the two layers; listed, not previewed."
      >
        <div className="prose-content">
          <ul>
            <li>
              BackgroundLayer: mounts the subsystem behind page content. Meteor
              excluded under reduced-motion, below the 768px breakpoint, on
              low-CPU / small touch devices, and on project-detail routes; the
              ASCII field is masked to the gutters on desktop, sparser
              full-bleed on mobile, and omitted on project-detail pages.
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
