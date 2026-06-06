import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ProjectCard } from "@/components/project/project-card";
import { Heading } from "@/components/ui/heading";
import { getProjectsForWork } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI and software engineering projects — case studies, research, and freelance work.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "/work",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function WorkPage() {
  const projects = getProjectsForWork();

  return (
    <Section>
      <Container>
        <Stack gap="xl">
          <header>
            <Heading level={1} type="display-primary">
              Work
            </Heading>
          </header>
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
