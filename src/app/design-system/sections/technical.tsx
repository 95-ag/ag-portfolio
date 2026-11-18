import { GallerySection } from "../scaffold-kit/catalog";
import {
  DeviceRuler,
  type LayerItem,
  LayerStack,
  type RulerStop,
  SpanTable,
  type SpanZone,
} from "../visualizer-kit";

// Layout switches: md = 768px (pill nav ↔ hamburger; grid 4→8), xl = 1280px (grid 8→12).
const ZONES: SpanZone[] = [
  {
    name: "Desktop (xl)",
    width: "1280px +",
    changes: [
      "1200px max content column",
      "12-column grid",
      "Section-progress rail",
      "Type at full scale",
    ],
  },
  {
    name: "Tablet (md)",
    width: "768–1279px",
    changes: [
      "8-column grid",
      "Horizontal pill nav",
      "Display / heading type steps down",
    ],
  },
  {
    name: "Mobile (base)",
    width: "≤ 767px",
    changes: [
      "Single reading column; 4-column grid",
      "Hamburger drawer nav",
      "Full-bleed ascii field at the desktop density",
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
  { token: "--z-pill-nav", value: "50", role: "Floating pill nav" },
  { token: "--z-mobile-menu-overlay", value: "55", role: "Mobile menu scrim" },
  { token: "--z-mobile-menu-panel", value: "60", role: "Mobile menu panel" },
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
                  Buttons stand 56px tall; LinkPill stands 44px tall, its
                  visible height the touch target itself.
                </li>
                <li>
                  Icon-only controls (theme, scroll-to-top, menu) sit in a ≥44px
                  hit area.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <p className="body-emphasis">Collapsing strategy</p>
              <ul>
                <li>
                  Primary nav: horizontal pill (md+) → mobile hamburger drawer
                  (below md).
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
        intro="An ordered layering scale, from base content up through the sticky rail, scroll-to-top, anchored popovers, the floating pill nav, the mobile menu overlay and panel, and the figure lightbox."
      >
        <LayerStack items={Z_INDEX_LAYERS} />
      </GallerySection>
    </>
  );
}
