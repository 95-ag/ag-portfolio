import Image from "next/image";
import Link from "next/link";
import { ArrowDownwardIcon } from "@/components/icons/material/arrow-downward";
import { MailIcon } from "@/components/icons/material/mail";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { getFeaturedProjects } from "@/lib/content/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
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

            {/* Portrait - flex-1 takes remaining space, overflows right */}
            <div
              className="hidden lg:block flex-1 relative"
              style={{ height: "600px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  maskImage: `linear-gradient(to right, transparent 0%, black 15%, black 100%)`,
                  WebkitMaskImage: `linear-gradient(to right, transparent 0%, black 15%, black 100%)`,
                }}
              >
                <Image
                  src="/hero.png"
                  alt="Aishwarya Ganesan"
                  fill
                  sizes="(max-width: 1024px) 0px, (max-width: 1280px) calc(100vw - 480px), calc(100vw - 560px)"
                  className="object-cover object-left-top"
                  priority
                />
              </div>
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
