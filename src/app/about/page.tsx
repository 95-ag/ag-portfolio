import type { Metadata } from "next";
import Image from "next/image";
import { DownloadIcon } from "@/components/icons/material/download";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { CopyButton } from "@/components/ui/controls/copy-button";
import { EmailButton } from "@/components/ui/controls/email-button";
import { Heading } from "@/components/ui/display/heading";
import { Tag } from "@/components/ui/display/tag";
import { LinkPill } from "@/components/ui/links/link-pill";
import { getAbout } from "@/lib/content/about";
import { getFeaturedProjects } from "@/lib/content/projects";
import { buildPersonSchema, serializeJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Aishwarya Ganesan — an AI engineer who builds ML systems like real software: retrieval, LLMs, model extraction, and computer vision.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function AboutPage() {
  const { frontmatter: about } = getAbout();
  const projectTags = getFeaturedProjects().flatMap((p) => p.frontmatter.tags);
  const personSchema = buildPersonSchema(about, projectTags);

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
      />
      {/* The page opens on the photo: the name lives in the page corner, so the H1 is heard but not shown. */}
      <h1 className="display-primary sr-only">{about.name}</h1>
      <Container width="cap">
        {/* data-scroll-top="off": a short, fixed page carries no scroll-to-top (DESIGN.md → Shell → Scroll-to-top Button). */}
        <div
          data-scroll-top="off"
          className="flex flex-col gap-[var(--spacing-4xl)] xl:gap-[var(--spacing-5xl)]"
        >
          {/* Portrait + editorial intro */}
          <div className="flex flex-col gap-[var(--spacing-xl)] md:flex-row md:items-center md:gap-[var(--spacing-2xl)]">
            <div className="w-full shrink-0 md:w-[clamp(180px,20vw,280px)]">
              <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] md:aspect-[3/4]">
                <Image
                  src={about.headshot}
                  alt={about.headshotAlt}
                  fill
                  className="object-cover object-[center_25%]"
                  priority
                  unoptimized={about.headshot.endsWith(".svg")}
                  sizes="(min-width: 768px) clamp(180px, 20vw, 280px), 100vw"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--spacing-md)]">
              <p className="heading-display mb-[var(--spacing-sm)] text-balance">
                {about.positioning}
              </p>
              {about.detailedPositioning
                .split("\n\n")
                .filter(Boolean)
                .map((para) => (
                  <p
                    key={para}
                    className="body-lead xl:text-justify xl:hyphens-auto"
                  >
                    {para.trim()}
                  </p>
                ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex flex-col gap-[var(--spacing-lg)] md:flex-row md:gap-[var(--spacing-3xl)]">
            <div className="w-full shrink-0 md:w-[200px]">
              <p className="heading-section">Capabilities</p>
            </div>
            <div className="min-w-0 flex-1">
              <Stack gap="xl">
                {about.capabilities.map((cap) => (
                  <div
                    key={cap.area}
                    className="flex flex-col gap-[var(--spacing-xs)]"
                  >
                    <p className="body-lead">{cap.area}</p>
                    {cap.description && (
                      <p className="body-secondary">{cap.description}</p>
                    )}
                    <div className="mt-[var(--spacing-xs)] flex flex-wrap gap-x-[var(--spacing-md)] text-[var(--accent)]">
                      {cap.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </Stack>
            </div>
          </div>

          {/* Approach */}
          <div className="flex flex-col gap-[var(--spacing-xl)]">
            <Heading level={2} type="heading-section">
              Approach
            </Heading>
            <div className="grid grid-cols-1 gap-[var(--spacing-xl)] md:grid-cols-2 md:gap-[var(--spacing-2xl)] xl:grid-cols-3">
              {about.approach.map((item, i) => (
                <div key={item.title} className="flex gap-[var(--spacing-md)]">
                  <span className="mono-anchor w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-[var(--spacing-xs)]">
                    <p className="body-primary">{item.title}</p>
                    <p className="body-secondary">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work with me */}
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            <Heading level={2} type="heading-section">
              Work with me
            </Heading>
            <p className="body-secondary">
              Available for freelance projects and full-time roles. If you want
              AI systems built like real engineering, let&apos;s talk.
            </p>
            <div className="flex flex-wrap items-center gap-x-[var(--spacing-md)] gap-y-[var(--spacing-sm)]">
              <div className="flex flex-wrap items-center">
                <EmailButton address={about.contactEmail} />
                <CopyButton value={about.contactEmail} label="email" />
              </div>
              <LinkPill
                href="/AishwaryaGanesan_Resume.pdf"
                icon={<DownloadIcon size={16} />}
                newTab
              >
                Resume
              </LinkPill>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
