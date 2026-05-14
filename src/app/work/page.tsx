import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ProjectCard } from "@/components/project/project-card";
import { Heading } from "@/components/ui/heading";
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
          <Heading level={1} type="display-accent">
            Work
          </Heading>
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
