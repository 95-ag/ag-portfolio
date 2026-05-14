import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { HeroMedia } from "@/components/project/hero-media";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { SectionProgressNav } from "@/components/project/section-progress-nav";
import { TechStack } from "@/components/project/tech-stack";
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
      <SectionProgressNav />

      <Section>
        <Container>
          <div className="mx-auto max-w-[960px]">
            {/* Header: tags, title, subtitle, links */}
            <ProjectHeader frontmatter={fm} />

            {/* Hero */}
            <div className="mt-[var(--spacing-2xl)] relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-sunken)]">
              <HeroMedia
                src={fm.heroImage}
                alt={fm.heroAlt}
                poster={fm.heroPoster}
                loop={fm.heroVideoLoop}
              />
            </div>

            {/* Overview + Tech Stack + deep-dive prose share .prose-content */}
            <div className="prose-content mt-[var(--spacing-3xl)]">
              <h2>Overview</h2>
              <ProjectOverview overview={fm.overview} />

              <TechStack stack={fm.stack} />

              <MDXRemote
                source={project.body}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {/* Back link */}
            <div className="mt-[var(--spacing-3xl)] border-t border-[var(--outline-variant)] pt-[var(--spacing-lg)]">
              <Link
                href="/work"
                className="interactive-label text-[var(--on-surface)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                ← Back to Work
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
