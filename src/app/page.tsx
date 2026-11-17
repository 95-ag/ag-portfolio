import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownwardIcon } from "@/components/icons/material/arrow-downward";
import { MailIcon } from "@/components/icons/material/mail";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/controls/button";
import { Heading } from "@/components/ui/display/heading";
import { PostRow } from "@/components/writing/post-row";
import { getAbout } from "@/lib/content/about";
import { getAllPosts } from "@/lib/content/posts";
import { getFeaturedProjects } from "@/lib/content/projects";
import { buildPersonSchema, serializeJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Aishwarya Ganesan" },
  description:
    "Aishwarya Ganesan — AI engineer who builds ML systems for real users, scale, and operational pressure: retrieval, LLMs, and computer vision.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function HomePage() {
  const featured = getFeaturedProjects();
  const latestPosts = getAllPosts().slice(0, 3);
  const { frontmatter: about } = getAbout();
  const projectTags = featured.flatMap((p) => p.frontmatter.tags);
  const personSchema = buildPersonSchema(about, projectTags);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
      />
      {/* Hero */}
      <Section
        as="header"
        className="pb-[var(--spacing-4xl)] lg:pb-[var(--spacing-lg)] overflow-hidden"
      >
        <Container>
          <div className="flex flex-col gap-[var(--spacing-2xl)] lg:flex-row lg:items-center">
            {/* Content column - fixed width so headline stays 2 lines */}
            <div className="flex flex-col gap-[var(--spacing-xl)] lg:flex-1">
              <div className="flex flex-col gap-[var(--spacing-lg)]">
                <p className="mono-anchor select-text">
                  Aishwarya Ganesan — AI Engineer
                </p>
                <Heading level={1} type="display-primary">
                  I build for production, not proof of concept.
                </Heading>
                <p className="body-lead">
                  AI prototypes are easy. Building systems that survive real
                  users, real scale, and real operational pressure —
                  that&rsquo;s the harder part. That&rsquo;s what I do.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
                <Button
                  variant="primary"
                  href="#featured"
                  icon={<ArrowDownwardIcon size={18} />}
                >
                  See Projects
                </Button>
                <Button
                  variant="secondary"
                  href="mailto:aishwarya.workbench@gmail.com"
                  icon={<MailIcon size={18} />}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <Section id="featured" className="scroll-mt-[var(--spacing-3xl)] pt-0">
          <Container>
            <div className="flex flex-col gap-[var(--spacing-xl)]">
              <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2 lg:grid-cols-3">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
              <div className="flex justify-end">
                <Link
                  href="/work"
                  className="body-caption -my-[var(--spacing-md)] py-[var(--spacing-md)] motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  View all projects →
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <Section className="pt-0">
          <Container>
            <div className="flex flex-col gap-[var(--spacing-lg)]">
              <h2 className="mono-anchor">Latest writing</h2>
              <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <PostRow post={post} />
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <Link
                  href="/writing"
                  className="body-caption -my-[var(--spacing-md)] py-[var(--spacing-md)] motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  See all writing →
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
