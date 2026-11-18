import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { EastIcon } from "@/components/icons/material/east";
import { WestIcon } from "@/components/icons/material/west";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Heading } from "@/components/ui/display/heading";
import { Related } from "@/components/ui/display/related";
import { Breadcrumbs, type Crumb } from "@/components/ui/links/breadcrumbs";
import { PostRail } from "@/components/writing/post-rail";
import { TypeLabel } from "@/components/writing/type-label";
import { getAllPosts, getPostBySlug, postColour } from "@/lib/content/posts";
import { getRelatedForPost } from "@/lib/content/related";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  serializeJsonLd,
} from "@/lib/seo/jsonld";
import { AUTHOR_NAME, SITE_URL } from "@/lib/site";

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
      canonical: `/writing/${slug}`,
    },
    openGraph: {
      type: "article" as const,
      url: `/writing/${slug}`,
      siteName: AUTHOR_NAME,
      locale: "en_US",
      publishedTime: new Date(fm.publishedAt).toISOString(),
      modifiedTime: new Date(fm.updatedAt ?? fm.publishedAt).toISOString(),
      authors: [AUTHOR_NAME],
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
    { name: "Writing", href: "/writing" },
    { name: fm.title, href: `/writing/${slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(
    trail.map(({ name, href }) => ({
      name,
      url: href === "/" ? SITE_URL : `${SITE_URL}${href}`,
    })),
  );
  const blogPostingSchema = buildBlogPostingSchema(slug, fm);
  const related = getRelatedForPost(slug);
  // The post published before this one, newest-first like the index; the oldest post has none.
  const posts = getAllPosts();
  const nextPost = posts[posts.findIndex((p) => p.slug === slug) + 1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <Section>
        <Container>
          {/* The page wears its post's colour slot; the rail sits beside the column from 1200px (three columns,
              the post centred) and above the header below it. */}
          <div
            data-page="post"
            data-page-colour={postColour(slug)}
            className="mx-auto grid max-w-[680px] grid-cols-1 rail-side:max-w-none rail-side:grid-cols-[1fr_680px_1fr] rail-side:gap-x-[var(--spacing-2xl)]"
          >
            <div className="mb-[var(--spacing-md)] rail-side:col-start-2">
              <Breadcrumbs trail={trail} />
            </div>

            <div className="mb-[var(--spacing-xl)] rail-side:col-start-1 rail-side:row-span-3 rail-side:row-start-2 rail-side:mb-0">
              <PostRail post={post} />
            </div>

            <article className="rail-side:col-start-2">
              <header className="flex flex-col gap-[var(--spacing-lg)]">
                <Heading level={1} type="display-title">
                  {fm.title}
                </Heading>
                {fm.subtitle && <p className="body-secondary">{fm.subtitle}</p>}
                <TypeLabel type={fm.type} addons={fm.addons} />
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
              <div className="mt-[var(--spacing-5xl)] rail-side:col-start-2">
                <Related items={related} />
              </div>
            )}

            <div className="mt-[var(--spacing-5xl)] flex items-center justify-between gap-[var(--spacing-md)] border-t border-[var(--hairline)] pt-[var(--spacing-lg)] rail-side:col-start-2">
              <Link
                href="/writing"
                className="interactive-label flex min-h-[44px] items-center gap-[var(--spacing-xs)] text-[var(--ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <WestIcon size={16} />
                Back to Writing
              </Link>
              {nextPost && (
                <Link
                  href={`/writing/${nextPost.slug}`}
                  className="interactive-label flex min-h-[44px] items-center gap-[var(--spacing-xs)] text-[var(--ink)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Next post
                  <EastIcon size={16} />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
