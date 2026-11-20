import type { Metadata } from "next";
import Link from "next/link";
import { Spotlight } from "@/components/home/spotlight";
import { EastIcon } from "@/components/icons/material/east";
import { Container } from "@/components/layout/container";
import { EmailButton } from "@/components/ui/controls/email-button";
import { Heading } from "@/components/ui/display/heading";
import { PostTiles } from "@/components/writing/post-tile";
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

// Two rows of the smallest tile grid: four across, so eight (the grid hides the rest at narrower widths).
const LATEST_WRITING_COUNT = 8;

export default function HomePage() {
  const featured = getFeaturedProjects();
  const latestPosts = getAllPosts().slice(0, LATEST_WRITING_COUNT);
  const { frontmatter: about } = getAbout();
  const projectTags = featured.flatMap((p) => p.frontmatter.tags);
  const personSchema = buildPersonSchema(about, projectTags);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
      />
      <Container width="cap">
        {/* data-scroll-top="off": a short, fixed page carries no scroll-to-top (DESIGN.md → Shell → Scroll-to-top Button). */}
        <div
          data-home-body
          data-scroll-top="off"
          className="flex flex-col gap-[var(--spacing-4xl)] pt-[var(--spacing-xl)] pb-[var(--spacing-4xl)] min-[861px]:pt-[var(--spacing-4xl)] md:gap-[calc(var(--spacing-4xl)+var(--spacing-3xl))]"
        >
          {/* Hero: the statement on the left, the lead and the email action on the right. */}
          <header className="grid grid-cols-[1.3fr_1fr] items-center gap-[var(--spacing-2xl)] min-[1440px]:grid-cols-[1.4fr_1fr] stack:grid-cols-1 stack:gap-[var(--spacing-lg)]">
            <Heading level={1} type="display-primary">
              I build for production, not proof of concept.
            </Heading>
            <div className="flex flex-col items-start gap-[var(--spacing-md)]">
              <p className="body-lead text-[var(--ink-lead)]">
                AI prototypes are easy. Building systems that survive real
                users, real scale, and real operational pressure — that&rsquo;s
                the harder part. That&rsquo;s what I do.
              </p>
              <EmailButton address={about.contactEmail} />
            </div>
          </header>

          {featured.length > 0 && <Spotlight projects={featured} />}

          {latestPosts.length > 0 && (
            <section aria-labelledby="latest-writing">
              <h2
                id="latest-writing"
                className="mono-anchor mb-[var(--spacing-lg)] select-none"
              >
                Latest writing
              </h2>
              <PostTiles posts={latestPosts} size="sm" />
              <div className="mt-[var(--spacing-lg)] flex justify-end">
                <Link
                  href="/writing"
                  className="body-caption flex min-h-[44px] items-center gap-[var(--spacing-xs)] text-[var(--ink)] motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  See all writing
                  <EastIcon size={16} />
                </Link>
              </div>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}
