import type { Metadata } from "next";
import { CreditsPlayer } from "@/components/credits/credits-player";
import { Container } from "@/components/layout/container";
import { CREDITS } from "@/lib/content/credits";
import "@/components/credits/credits.css";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Who and what made this site: the tools, the type, the inspiration.",
  alternates: { canonical: "/credits" },
  openGraph: { type: "website", url: "/credits" },
};

// The site's end credits (DESIGN.md → Domain Components → Credits): an opening line, sections of role / name rows, a dedication,
// and a control that scrolls it like film credits while the reader's own input always takes over.
export default function CreditsPage() {
  const { opening, sections, dedication } = CREDITS;

  return (
    <Container>
      <h1 className="sr-only">Credits</h1>
      <div className="credits-open" data-credits-open>
        <p className="body-secondary text-center">{opening}</p>
      </div>
      <div className="credits-sections">
        {sections.map((section) => (
          <section key={section.heading} className="credits-section">
            <h2 className="mono-anchor credits-heading">{section.heading}</h2>
            <div className="credits-rows">
              {section.rows.map((row) =>
                row.role ? (
                  <p key={`${row.role}-${row.name}`} className="credits-row">
                    <span className="credits-role">{row.role}</span>
                    <span className="credits-name">{row.name}</span>
                  </p>
                ) : (
                  <p
                    key={row.name}
                    className="credits-row credits-row-solo"
                    data-names-only
                  >
                    {row.name}
                  </p>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
      <div className="credits-close">
        <p className="body-secondary text-center text-[var(--ink)]">
          {dedication}
        </p>
      </div>
      <CreditsPlayer />
    </Container>
  );
}
