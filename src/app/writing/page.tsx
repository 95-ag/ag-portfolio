import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/ui/display/heading";
import { PostRow } from "@/components/writing/post-row";
import { getAllPosts } from "@/lib/content/posts";
import { AUTHOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing on AI and software engineering — build learnings beyond the case studies.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    type: "website",
    url: "/writing",
    siteName: AUTHOR_NAME,
    locale: "en_US",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container>
        <Stack gap="xl" className="mx-auto max-w-[960px]">
          <header>
            <Heading level={1} type="display-primary">
              Writing
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
