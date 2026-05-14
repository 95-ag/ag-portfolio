import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { getFeaturedProjects } from "@/lib/content/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero — two-panel: portrait placeholder left, statement right */}
      <Section as="header">
        <Container>
          <div className="flex flex-col gap-[var(--spacing-2xl)] lg:flex-row lg:items-end lg:gap-[var(--spacing-3xl)]">
            {/* Portrait region — placeholder until real photo lands */}
            <div className="hidden lg:block lg:w-[260px] lg:shrink-0">
              <div className="aspect-[3/4] w-full rounded-[var(--radius-md)] bg-[var(--surface-sunken)]" />
            </div>

            {/* Statement block */}
            <div className="flex flex-col gap-[var(--spacing-lg)] lg:pb-[var(--spacing-lg)]">
              <p className="mono-anchor">Aishwarya Ganesan · AI/ML Engineer</p>
              <Heading level={1} type="display-primary">
                Building practical ML systems for real-world constraints.
              </Heading>
              <p className="body-secondary max-w-[480px]">
                From perception pipelines and reinforcement learning to scalable
                backend infrastructure — end to end.
              </p>
              {/* hire-cta: future floating animated pill goes here */}
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <Section className="pt-0">
          <Container>
            <Stack gap="xl">
              <div className="flex items-baseline justify-between gap-[var(--spacing-md)]">
                <Heading level={2} type="heading-component">
                  Featured projects
                </Heading>
                <Link
                  href="/work"
                  className="body-caption shrink-0 transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2 lg:grid-cols-3">
                {featured.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="featured"
                  />
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* CTA — centered collaboration block */}
      <Section className="pt-0">
        <Container>
          <div className="flex flex-col items-center gap-[var(--spacing-xl)] text-center">
            <div className="flex flex-col gap-[var(--spacing-md)]">
              <Heading level={2} type="heading-component">
                Collaboration &amp; Hiring
              </Heading>
              <p className="body-secondary mx-auto max-w-[560px]">
                Available for full-time roles and scoped freelance projects. I
                specialise in bridging research and production — from model
                development to scalable backend systems.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-md)]">
              <Button
                variant="secondary"
                href="/AishwaryaGanesan_Resume.pdf"
                download
                icon={<Download size={16} aria-hidden="true" />}
              >
                Download Resume
              </Button>
              <Button
                variant="primary"
                href="mailto:aishwaryaganesan95@gmail.com"
                icon={<Mail size={16} aria-hidden="true" />}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
