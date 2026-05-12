import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ProjectCard } from "@/components/project/project-card";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getAbout } from "@/lib/content/about";
import { getFeaturedProjects } from "@/lib/content/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const { frontmatter: about } = getAbout();

  return (
    <>
      {/* Hero */}
      <Section as="header">
        <Container>
          <Stack gap="lg">
            <Heading level={1} type="display-lg">
              AG — AI/ML Engineer
            </Heading>
            <p className="type-body-lg max-w-[600px] text-[var(--on-surface-muted)]">
              Building practical ML systems — from perception pipelines and
              reinforcement learning to scalable backend infrastructure.
            </p>
            <div className="flex flex-wrap gap-[var(--spacing-md)]">
              <Link
                href="/work"
                className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-[var(--spacing-lg)] text-sm font-medium text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                View my work
              </Link>
              <a
                href={`mailto:${about.contactEmail}`}
                className="inline-flex h-11 items-center rounded-[var(--radius-md)] border border-[var(--outline)] bg-transparent px-[var(--spacing-lg)] text-sm font-medium text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Get in touch
              </a>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider />

      {/* Featured projects */}
      {featured.length > 0 && (
        <Section>
          <Container>
            <Stack gap="xl">
              <div className="flex flex-col gap-[var(--spacing-xs)]">
                <p className="type-mono-label text-[var(--on-surface-muted)]">
                  Selected work
                </p>
                <Heading level={2} type="headline-lg">
                  Featured projects
                </Heading>
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
              <div>
                <Link
                  href="/work"
                  className="type-body-sm text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  View all projects →
                </Link>
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      <Divider />

      {/* CTA */}
      <Section>
        <Container>
          <Stack gap="xl">
            <Heading level={2} type="headline-lg">
              Work together
            </Heading>
            <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2">
              {/* Recruiter path */}
              <Card>
                <Stack gap="lg">
                  <div>
                    <p className="type-mono-label mb-[var(--spacing-xs)] text-[var(--on-surface-muted)]">
                      For recruiters
                    </p>
                    <p className="type-headline-sm text-[var(--on-surface)]">
                      Full-time roles
                    </p>
                  </div>
                  <p className="type-body-sm text-[var(--on-surface-muted)]">
                    AI/ML engineer with end-to-end experience across model
                    development, computer vision, and backend systems. Open to
                    full-time roles.
                  </p>
                  <div className="flex flex-wrap gap-[var(--spacing-sm)]">
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-flex h-11 items-center rounded-[var(--radius-md)] border border-[var(--outline)] bg-transparent px-[var(--spacing-lg)] text-sm font-medium text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    >
                      Resume (PDF)
                    </a>
                    <a
                      href={`mailto:${about.contactEmail}`}
                      className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-[var(--spacing-lg)] text-sm font-medium text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    >
                      Email me
                    </a>
                  </div>
                </Stack>
              </Card>

              {/* Freelance path */}
              <Card>
                <Stack gap="lg">
                  <div>
                    <p className="type-mono-label mb-[var(--spacing-xs)] text-[var(--on-surface-muted)]">
                      For clients
                    </p>
                    <p className="type-headline-sm text-[var(--on-surface)]">
                      Freelance projects
                    </p>
                  </div>
                  <p className="type-body-sm text-[var(--on-surface-muted)]">
                    Available for scoped ML engineering and backend
                    infrastructure projects. I work best on problems with clear
                    constraints and real production requirements.
                  </p>
                  <a
                    href={`mailto:${about.contactEmail}`}
                    className="inline-flex h-11 w-fit items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-[var(--spacing-lg)] text-sm font-medium text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    Email me
                  </a>
                </Stack>
              </Card>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
