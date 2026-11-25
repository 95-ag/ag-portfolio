import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { WestIcon } from "@/components/icons/material/west";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Cover } from "@/components/project/cover";
import { CoverLoop } from "@/components/project/cover-loop";
import { HeroMetaOverlay } from "@/components/project/hero-meta-overlay";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { SectionProgressNav } from "@/components/project/section-progress-nav";
import { TechStack } from "@/components/project/tech-stack";
import { Related } from "@/components/ui/display/related";
import type { Crumb } from "@/components/ui/links/breadcrumbs";
import {
  coverSubject,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/content/projects";
import { getRelatedForProject } from "@/lib/content/related";
import {
  buildBreadcrumbSchema,
  buildSoftwareSourceCodeSchema,
  serializeJsonLd,
} from "@/lib/seo/jsonld";
import { AUTHOR_NAME, SITE_URL } from "@/lib/site";

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
  const fm = project.frontmatter;
  const heroImg = fm.ogImage ?? fm.heroImage;
  return {
    title: fm.title,
    description: fm.metaDescription ?? fm.summary,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      type: "article" as const,
      url: `/work/${slug}`,
      siteName: AUTHOR_NAME,
      locale: "en_US",
      publishedTime: new Date(fm.publishedAt).toISOString(),
      ...(fm.updatedAt
        ? { modifiedTime: new Date(fm.updatedAt).toISOString() }
        : {}),
      authors: [AUTHOR_NAME],
      ...(heroImg ? { images: [heroImg] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      ...(heroImg ? { images: [heroImg] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const fm = project.frontmatter;
  const softwareSourceCodeSchema = buildSoftwareSourceCodeSchema(slug, fm);
  // No visible trail on a project page; the structured data below still carries it.
  const trail: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: fm.title, href: `/work/${slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(
    trail.map(({ name, href }) => ({
      name,
      url: href === "/" ? SITE_URL : `${SITE_URL}${href}`,
    })),
  );
  const related = getRelatedForProject(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(softwareSourceCodeSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      {/* The page wears its project's colour slot: links, tags, bullets and the focus ring take its colour. */}
      <div data-page-colour={fm.colour}>
        <SectionProgressNav />

        <Section>
          <Container>
            <div className="mx-auto max-w-[960px]">
              <article>
                {/* Header: title, subtitle, tags, links */}
                <ProjectHeader frontmatter={fm} />

                {/* Hero */}
                <div className="relative mt-[var(--spacing-2xl)]">
                  <CoverLoop className="block">
                    <Cover subject={coverSubject(project)} variant="hero" />
                  </CoverLoop>
                  <HeroMetaOverlay
                    logos={fm.logos}
                    contributors={fm.contributors}
                  />
                </div>

                <div className="prose-content mt-[var(--spacing-3xl)]">
                  <h2>Overview</h2>
                  <ProjectOverview overview={fm.overview} />

                  <h2>Tech Stack</h2>
                  <TechStack stack={fm.stack} />

                  <MDXRemote
                    source={project.body}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                          [
                            rehypeShiki,
                            {
                              themes: {
                                light: "light-plus",
                                dark: "dark-plus",
                              },
                              // No default color → Shiki emits only CSS vars (no inline
                              // token colors), so the dark-theme swap needs no !important.
                              defaultColor: false,
                            },
                          ],
                        ],
                      },
                    }}
                  />
                </div>
              </article>

              {related.length > 0 && (
                <div className="mt-[var(--spacing-4xl)]">
                  <Related items={related} />
                </div>
              )}

              {/* Back link */}
              <div className="mt-[var(--spacing-3xl)] border-t border-[var(--hairline)] pt-[var(--spacing-lg)]">
                <Link
                  href="/work"
                  className="interactive-label inline-flex items-center gap-[var(--spacing-xs)] text-[var(--ink)] motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <WestIcon size={16} />
                  Back to Work
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
