import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/ui/display/heading";
import { WritingTiles } from "@/components/writing/writing-tile";
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
        <Stack gap="xl">
          <header>
            <Heading level={1} type="display-primary">
              Writing
            </Heading>
          </header>
          {posts.length > 0 && <WritingTiles posts={posts} size="art" />}
        </Stack>
      </Container>
    </Section>
  );
}
