import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Tag } from "@/components/ui/tag";
import { getAllPosts, getPostBySlug } from "@/lib/content/posts";
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
      ...(fm.ogImage ? { images: [fm.ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      ...(fm.ogImage ? { images: [fm.ogImage] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;

  return (
    <article>
      <Section>
        <Container>
          <div className="mx-auto max-w-[960px]">
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
    </article>
  );
}
