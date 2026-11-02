import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { HeroMedia } from "@/components/project/hero-media";
import { HeroMetaOverlay } from "@/components/project/hero-meta-overlay";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { SectionProgressNav } from "@/components/project/section-progress-nav";
import { TechStack } from "@/components/project/tech-stack";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Related } from "@/components/ui/related";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";
import { getRelatedForProject } from "@/lib/content/related";
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
  serializeJsonLd,
} from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/site";

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
      publishedTime: new Date(fm.publishedAt).toISOString(),
      authors: ["Aishwarya Ganesan"],
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
  const creativeWorkSchema = buildCreativeWorkSchema(slug, fm);
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
          __html: serializeJsonLd(creativeWorkSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <SectionProgressNav />

      <Section>
        <Container>
          <div className="mx-auto max-w-[960px]">
            <div className="mb-[var(--spacing-md)]">
              <Breadcrumbs trail={trail} />
            </div>

            <article>
              {/* Header: tags, title, subtitle, links */}
              <ProjectHeader frontmatter={fm} />

              {/* Hero */}
              <div className="mt-[var(--spacing-2xl)] relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-deep)]">
                <HeroMedia
                  src={fm.heroImage}
                  alt={fm.heroAlt}
                  poster={fm.heroPoster}
                  loop={fm.heroVideoLoop}
                  slug={slug}
                />
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
                              light: "vitesse-light",
                              dark: "vitesse-dark",
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
              <div className="mt-[var(--spacing-3xl)]">
                <Related items={related} />
              </div>
            )}

            {/* Back link */}
            <div className="mt-[var(--spacing-3xl)] border-t border-[var(--hairline)] pt-[var(--spacing-lg)]">
              <Link
                href="/work"
                className="interactive-label text-[var(--ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                ← Back to Work
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
