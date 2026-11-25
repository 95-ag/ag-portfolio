import type { Metadata } from "next";
import "./gallery.css";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionProgressNav } from "@/components/project/section-progress-nav";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { Heading } from "@/components/ui/display/heading";
import { SHOW_PREVIEW_UI } from "@/lib/build-flags";
import { DemoViewOnly } from "./scaffold-kit/click-guards";
import { BackgroundSection } from "./sections/background";
import { ComponentsSections } from "./sections/components";
import { DomainSections } from "./sections/domain";
import { FoundationsSections } from "./sections/foundations";
import { TechnicalSections } from "./sections/technical";

// Each <h2> maps to one DESIGN.md sub-section; the SectionProgressNav rail scrapes those h2s.
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <Section>
      <Container>
        {/* Previews already carry the site-wide toggle in the layout; production shows this page-only one. */}
        {!SHOW_PREVIEW_UI && <ThemeToggle mode="page" />}
        <SectionProgressNav />
        <header className="mb-[var(--spacing-3xl)] flex flex-col gap-[var(--spacing-lg)]">
          <Heading level={1} type="display-title">
            Design System
          </Heading>
          <p className="body-lead">
            Components and tokens rendered live, mirroring the DESIGN.md
            structure. Inline page sections are listed, not previewed;
            background layers are static captures. Switch themes with the toggle
            at the bottom-left.
          </p>
          <div className="body-caption">
            The component reference this site is built against. Components
            render on the page background; fixed and route-aware chrome render
            live in bounded frames.
          </div>
        </header>

        <DemoViewOnly className="flex flex-col gap-[var(--spacing-4xl)]">
          <FoundationsSections />
          <BackgroundSection />
          <ComponentsSections />
          <DomainSections />
          <TechnicalSections />
        </DemoViewOnly>
      </Container>
    </Section>
  );
}
