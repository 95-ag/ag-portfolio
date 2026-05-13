import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ProjectCard } from "@/components/project/project-card";
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
              <div className="aspect-[3/4] w-full rounded-[var(--radius-sm)] bg-[var(--surface-sunken)]" />
            </div>

            {/* Statement block */}
            <div className="flex flex-col gap-[var(--spacing-lg)] lg:pb-[var(--spacing-lg)]">
              <p className="type-mono-label text-[var(--on-surface-muted)]">
                Aishwarya Ganesan · AI/ML Engineer
              </p>
              <Heading level={1} type="display-lg">
                Building practical ML systems for real-world constraints.
              </Heading>
              <p className="type-body-lg max-w-[480px] text-[var(--on-surface-muted)]">
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
                <Heading level={2} type="headline-md">
                  Featured projects
                </Heading>
                <Link
                  href="/work"
                  className="type-body-sm shrink-0 text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
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
              <Heading level={2} type="headline-lg">
                Collaboration &amp; Hiring
              </Heading>
              <p className="type-body-lg mx-auto max-w-[560px] text-[var(--on-surface-muted)]">
                Available for full-time roles and scoped freelance projects. I
                specialise in bridging research and production — from model
                development to scalable backend systems.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-md)]">
              <a
                href="/AishwaryaGanesan_Resume.pdf"
                download
                className="inline-flex h-11 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] border border-[var(--outline)] bg-transparent px-[var(--spacing-lg)] text-sm font-medium text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Download size={16} aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="mailto:aishwaryaganesan95@gmail.com"
                className="inline-flex h-11 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] bg-[var(--accent)] px-[var(--spacing-lg)] text-sm font-medium text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Mail size={16} aria-hidden="true" />
                Get in Touch
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
