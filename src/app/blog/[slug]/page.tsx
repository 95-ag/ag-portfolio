import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Related } from "@/components/ui/display/related";
import { Tag } from "@/components/ui/display/tag";
import { Breadcrumbs, type Crumb } from "@/components/ui/links/breadcrumbs";
import { getAllPosts, getPostBySlug } from "@/lib/content/posts";
import { getRelatedForPost } from "@/lib/content/related";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  serializeJsonLd,
} from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils/format-date";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  // A page's openGraph replaces the root's wholesale, file-based default image included, so
  // the site default has to be named here for a post without its own ogImage.
  const image = fm.ogImage ?? "/opengraph-image";
  return {
    title: fm.title,
    description: fm.metaDescription ?? fm.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article" as const,
      url: `/blog/${slug}`,
      publishedTime: new Date(fm.publishedAt).toISOString(),
      authors: ["Aishwarya Ganesan"],
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      images: [image],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const trail: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: fm.title, href: `/blog/${slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(
    trail.map(({ name, href }) => ({
      name,
      url: href === "/" ? SITE_URL : `${SITE_URL}${href}`,
    })),
  );
  const blogPostingSchema = buildBlogPostingSchema(slug, fm);
  const related = getRelatedForPost(slug);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serializeJsonLd escapes <, > and & so the payload cannot close the script tag
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serializeJsonLd escapes <, > and & so the payload cannot close the script tag
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-[960px]">
            <div className="mb-[var(--spacing-md)]">
              <Breadcrumbs trail={trail} />
            </div>

            <article>
              <header className="flex flex-col gap-[var(--spacing-lg)]">
                <h1 className="display-title">{fm.title}</h1>
                {fm.subtitle && <p className="body-secondary">{fm.subtitle}</p>}
                <p className="support-meta">
                  <time dateTime={fm.publishedAt}>
                    {formatDate(fm.publishedAt)}
                  </time>
                  {fm.updatedAt && (
                    <>
                      {" · Updated "}
                      <time dateTime={fm.updatedAt}>
                        {formatDate(fm.updatedAt)}
                      </time>
                    </>
                  )}
                </p>
                <div className="flex flex-wrap gap-[var(--spacing-xs)]">
                  {fm.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </header>

              <div className="prose-content mt-[var(--spacing-3xl)]">
                <MDXRemote
                  source={post.body}
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

            <div className="mt-[var(--spacing-3xl)] border-t border-[var(--hairline)] pt-[var(--spacing-lg)]">
              <Link
                href="/blog"
                className="interactive-label text-[var(--ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
