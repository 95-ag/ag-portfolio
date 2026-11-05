import type { Metadata } from "next";
import { PostRow } from "@/components/blog/post-row";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/ui/display/heading";
import { getAllPosts } from "@/lib/content/posts";
import { AUTHOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on AI and software engineering — build learnings beyond the case studies.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: AUTHOR_NAME,
    locale: "en_US",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container>
        <Stack gap="xl" className="mx-auto max-w-[960px]">
          <header>
            <Heading level={1} type="display-primary">
              Blog
            </Heading>
          </header>
          {posts.length > 0 && (
            <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostRow post={post} />
                </li>
              ))}
            </ul>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
