import { GallerySection } from "../scaffold-kit/catalog";
import {
  DeviceRuler,
  type LayerItem,
  LayerStack,
  type RulerStop,
  SpanTable,
  type SpanZone,
} from "../visualizer-kit";

// Layout switches: 860px (the nav row ↔ the button and card; the spotlight's full screen), md = 768px (grid 4→8), xl = 1280px (grid 8→12).
const ZONES: SpanZone[] = [
  {
    name: "Desktop (xl)",
    width: "1280px +",
    changes: [
      "1440px cap on Home, About, Work and Writing; 64px page margin",
      "12-column grid",
      "Section-progress rail",
      "Nav row, collapsing into the menu button after 80px of scroll",
      "Type at full scale",
    ],
  },
  {
    name: "Tablet (md)",
    width: "768–1279px",
    changes: [
      "8-column grid",
      "24px page margin; the nav row from 861px, the button and card below",
      "Display / heading type steps down",
    ],
  },
  {
    name: "Mobile (base)",
    width: "≤ 767px",
    changes: [
      "Single reading column; 4-column grid",
      "20px page margin; the round menu button and card nav",
      "The Home spotlight is one snapped full screen (860px and below)",
      "Full-bleed ascii field, its accent tier stepped down in light",
      "Type at smallest step",
    ],
  },
];

// Tailwind v4 canonical breakpoints. Aspect ratios approximate real viewports; `used` flags the
// breakpoints this project actually activates (deeper sunken box vs raised).
const ZONE_BARS: RulerStop[] = [
  { px: "0", device: "Mobile", token: "base", used: true, boxW: 64, boxH: 128 },
  {
    px: "640",
    device: "Large mobile",
    token: "sm",
    used: false,
    boxW: 76,
    boxH: 138,
  },
  {
    px: "768",
    device: "Tablet",
    token: "md",
    used: true,
    boxW: 104,
    boxH: 162,
  },
  {
    px: "1024",
    device: "Laptop",
    token: "lg",
    used: false,
    boxW: 168,
    boxH: 140,
  },
  {
    px: "1280",
    device: "Desktop",
    token: "xl",
    used: true,
    boxW: 210,
    boxH: 150,
  },
  {
    px: "1536",
    device: "Ultra wide",
    token: "2xl",
    used: false,
    boxW: 264,
    boxH: 152,
  },
];

const Z_INDEX_LAYERS: LayerItem[] = [
  { token: "--z-base", value: "0", role: "Base page content" },
  { token: "--z-sticky-content", value: "20", role: "Section-progress rail" },
  { token: "--z-scroll-to-top", value: "40", role: "Scroll-to-top button" },
  {
    token: "--z-popover",
    value: "45",
    role: "Provenance-mark reveals, below the nav",
  },
  { token: "--z-nav", value: "50", role: "The nav: row, button and card" },
  { token: "--z-lightbox", value: "70", role: "Figure inspection overlay" },
];

export function TechnicalSections() {
  return (
    <>
      <GallerySection
        id="responsive"
        title="Interaction · Responsive Behavior"
        mapsTo="Interaction Rules → Responsive Behavior"
        source="DESIGN.md → Responsive Behavior"
        intro="How the layout adapts across breakpoints: the zones, a proportional viewport ruler, touch targets, and the collapse strategy."
      >
        <div className="prose-content flex flex-col gap-[var(--spacing-xl)]">
          <SpanTable zones={ZONES} />

          <DeviceRuler stops={ZONE_BARS} />

          <div className="flex flex-col gap-[var(--spacing-xl)]">
            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <p className="body-emphasis">Touch targets</p>
              <ul>
                <li>
                  Minimum 44×44px for every interactive element on touch
                  devices.
                </li>
                <li>
                  A secondary text action beside a primary control that does the
                  same job, such as copy email beside Let&apos;s talk, takes the
                  WCAG 2.2 AA minimum of 24×24px instead, never overlapping a
                  neighbouring target.
                </li>
                <li>
                  Buttons stand 44px (outline) or 48px (filled) tall; LinkPill
                  stands 44px tall, its visible height the touch target itself.
                </li>
                <li>
                  Icon-only circles (theme toggle, scroll-to-top, menu, Play /
                  Pause) are 44px, 48px from 1280px.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <p className="body-emphasis">Collapsing strategy</p>
              <ul>
                <li>
                  Primary nav: a row (from 861px, collapsing into the button on
                  scroll) → the round button and its card (860px and below).
                </li>
                <li>
                  Grids: multi-column (4 / 8 / 12) → single column on mobile.
                </li>
                <li>
                  Type: display/heading scales step down at ≤1279px and again at
                  ≤768px.
                </li>
                <li>
                  Background: the static ascii field is masked to the gutters on
                  desktop and goes full-bleed on mobile.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </GallerySection>

      <GallerySection
        id="z-index"
        title="Technical · Z-Index Scale"
        mapsTo="Technical Conventions → Z-Index Scale"
        source="--z-*"
        intro="An ordered layering scale, from base content up through the sticky rail, scroll-to-top, anchored popovers, the nav (row, button and card) and the figure lightbox."
      >
        <LayerStack items={Z_INDEX_LAYERS} />
      </GallerySection>
    </>
  );
}
