import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
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

  return (
    <article>
      <h1>{project.frontmatter.title}</h1>
      <MDXRemote
        source={project.body}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </article>
  );
}
