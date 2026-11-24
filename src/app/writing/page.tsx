import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/ui/display/heading";
import { PostTiles } from "@/components/writing/post-tile";
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
  // No post, no index: the page stays out of the build until the first one is published.
  if (posts.length === 0) notFound();

  return (
    <Section className="pb-[var(--spacing-md)] md:pb-[var(--spacing-md)]">
      <Container width="cap">
        <Stack gap="xl">
          <header>
            <Heading level={1} type="display-primary">
              Writing
            </Heading>
          </header>
          <PostTiles posts={posts} size="art" />
        </Stack>
      </Container>
    </Section>
  );
}
