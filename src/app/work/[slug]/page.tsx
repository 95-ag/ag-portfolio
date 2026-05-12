import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { Divider } from "@/components/layout/divider";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { HeroMedia } from "@/components/project/hero-media";
import { ProjectOverview } from "@/components/project/project-overview";
import { ProjectSidebar } from "@/components/project/project-sidebar";
import { ReadingProgress } from "@/components/project/reading-progress";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description:
      project.frontmatter.metaDescription ?? project.frontmatter.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const fm = project.frontmatter;

  return (
    <article>
      <ReadingProgress />

      <Section>
        <Container>
          <SidebarLayout sidebar={<ProjectSidebar frontmatter={fm} />}>
            {/* Hero */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-sunken)]">
              <HeroMedia
                src={fm.heroImage}
                alt={fm.heroAlt}
                poster={fm.heroPoster}
                loop={fm.heroVideoLoop}
              />
            </div>

            {/* Sentinel — reading progress bar reveals once this scrolls out of view */}
            <div data-reading-sentinel aria-hidden="true" />

            {/* Overview */}
            <div className="mt-[var(--spacing-2xl)]">
              <p className="type-mono-label mb-[var(--spacing-lg)] text-[var(--on-surface-muted)]">
                Overview
              </p>
              <ProjectOverview overview={fm.overview} />
            </div>

            <Divider className="my-[var(--spacing-2xl)]" />

            {/* Deep dive */}
            <div className="prose-content">
              <MDXRemote
                source={project.body}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            <Divider className="my-[var(--spacing-2xl)]" />

            {/* Backlink */}
            <Link
              href="/work"
              className="type-body-sm text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              ← Back to Work
            </Link>
          </SidebarLayout>
        </Container>
      </Section>
    </article>
  );
}
