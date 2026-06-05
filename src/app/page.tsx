import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownwardIcon } from "@/components/icons/material/arrow-downward";
import { MailIcon } from "@/components/icons/material/mail";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { getAbout } from "@/lib/content/about";
import { getFeaturedProjects } from "@/lib/content/projects";
import { buildPersonSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: { absolute: "AG — AI/ML Engineer" },
  description:
    "Portfolio of Aishwarya Ganesan, an AI/ML engineer specializing in AI systems, machine learning, and computer vision.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function HomePage() {
  const featured = getFeaturedProjects();
  const { frontmatter: about } = getAbout();
  const personSchema = buildPersonSchema(about);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Hero */}
      <Section
        as="header"
        className="pb-[var(--spacing-2xl)] lg:pb-[var(--spacing-lg)] overflow-hidden"
      >
        <Container>
          <div className="flex flex-col gap-[var(--spacing-2xl)] lg:flex-row lg:items-center">
            {/* Content column - fixed width so headline stays 2 lines */}
            <div className="flex shrink-0 flex-col gap-[var(--spacing-xl)] lg:w-[480px] xl:w-[560px]">
              <div className="flex flex-col gap-[var(--spacing-lg)]">
                <p className="mono-anchor">Aishwarya Ganesan — AI Engineer</p>
                <Heading level={1} type="display-primary">
                  I build for production, not proof of concept.
                </Heading>
                <p className="body-lead">
                  AI prototypes are easy. Building systems that survive real
                  users, real scale, and real operational pressure —
                  that&rsquo;s the harder part. That&rsquo;s what I do.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
                <Button
                  variant="primary"
                  href="#featured"
                  icon={<ArrowDownwardIcon size={18} />}
                >
                  See Projects
                </Button>
                <Button
                  variant="secondary"
                  href="mailto:aishwaryaganesan95@gmail.com"
                  icon={<MailIcon size={18} />}
                >
                  Get in Touch
                </Button>
              </div>
            </div>

            {/* Portrait — two theme-specific portraits at natural aspect (no crop).
                globals.css shows only the active one via the `data-theme` swap.
                mix-blend-mode drops each baked background so the fixed WebGL meteor
                layer shows through the dissolved edges: dark #080808 → screen,
                light #fcfcfc → multiply. The per-theme contrast() snaps the near-pure
                field to true #000 / #fff (screen/multiply only fully drop PURE
                black/white) so no residual rectangle shows when meteors are absent.
                The wrapper and every ancestor up to <body> MUST stay transparent and
                stacking-context-free (no z-index/transform/opacity/mask on ANCESTORS)
                or the blend composites against an opaque box instead of the meteors —
                the contrast filter is on the <img> itself, which is fine. See
                DESIGN.md Home → Hero. */}
            <div className="hidden flex-1 lg:block">
              <Image
                src="/hero-dark.png"
                alt="Aishwarya Ganesan"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 0px, (max-width: 1280px) calc(100vw - 480px), calc(100vw - 560px)"
                className="hero-dark h-auto w-full mix-blend-screen [filter:contrast(1.07)]"
              />
              <Image
                src="/hero-light.png"
                alt="Aishwarya Ganesan"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 0px, (max-width: 1280px) calc(100vw - 480px), calc(100vw - 560px)"
                className="hero-light h-auto w-full mix-blend-multiply [filter:contrast(1.03)]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <Section id="featured" className="pt-0">
          <Container>
            <div className="flex flex-col gap-[var(--spacing-xl)]">
              <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2 lg:grid-cols-3">
                {featured.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="featured"
                  />
                ))}
              </div>
              <div className="flex justify-end">
                <Link
                  href="/work"
                  className="body-caption transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  View all projects →
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
