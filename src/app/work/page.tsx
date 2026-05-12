import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/ui/heading";
import { ProjectCard } from "@/components/project/project-card";
import { getProjectsForWork } from "@/lib/content/projects";

export const metadata = {
  title: "Work",
  description:
    "AI/ML and software engineering projects — case studies, research, and freelance work.",
};

export default function WorkPage() {
  const projects = getProjectsForWork();

  return (
    <Section>
      <Container>
        <Stack gap="xl">
          <div className="flex flex-col gap-[var(--spacing-xs)]">
            <p className="type-mono-label text-[var(--on-surface-muted)]">
              Portfolio
            </p>
            <Heading level={1} type="display-md">
              Work
            </Heading>
            <p className="type-body-lg mt-[var(--spacing-sm)] max-w-[560px] text-[var(--on-surface-muted)]">
              AI/ML systems, computer vision, distributed infrastructure, and
              research projects.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="compact"
              />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
