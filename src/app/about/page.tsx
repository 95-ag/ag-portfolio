import Image from "next/image";
import { GitHubIcon } from "@/components/icons/brands/github";
import { LinkedInIcon } from "@/components/icons/brands/linkedin";
import { MailIcon } from "@/components/icons/material/mail";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Sticky } from "@/components/layout/sticky";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { SocialLink } from "@/components/ui/social-link";
import { Tag } from "@/components/ui/tag";
import { getAbout } from "@/lib/content/about";

export const metadata = {
  title: "About",
  description:
    "AI/ML engineer building practical systems for real-world constraints.",
};

function TwoColumnRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] lg:flex-row lg:gap-[var(--spacing-3xl)]">
      <div className="w-full shrink-0 lg:w-[200px]">
        <Sticky top="var(--spacing-3xl)">
          <p className="heading-component">{label}</p>
        </Sticky>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  const { frontmatter: about } = getAbout();

  return (
    <Section>
      <Container>
        <Stack gap="3xl">
          {/* Identity header */}
          <header className="flex flex-col gap-[var(--spacing-lg)]">
            <Heading level={1} type="display-accent">
              {about.name}
            </Heading>
            <div className="flex flex-wrap items-center gap-[var(--spacing-sm)]">
              {about.socials.github && (
                <SocialLink
                  href={about.socials.github}
                  icon={<GitHubIcon size={16} />}
                  external
                >
                  GitHub
                </SocialLink>
              )}
              {about.socials.linkedin && (
                <SocialLink
                  href={about.socials.linkedin}
                  icon={<LinkedInIcon size={16} />}
                  external
                >
                  LinkedIn
                </SocialLink>
              )}
              <SocialLink
                href={`mailto:${about.contactEmail}`}
                icon={<MailIcon size={16} />}
              >
                Email
              </SocialLink>
            </div>
          </header>

          {/* Portrait + editorial intro */}
          <div className="flex flex-col gap-[var(--spacing-2xl)] lg:flex-row lg:items-start lg:gap-[var(--spacing-2xl)]">
            <div className="w-full shrink-0 lg:w-[240px]">
              <div className="relative aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-[var(--radius-md)] grayscale">
                <Image
                  src={about.headshot}
                  alt={about.headshotAlt}
                  fill
                  className="object-cover"
                  unoptimized={about.headshot.endsWith(".svg")}
                  sizes="240px"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--spacing-md)]">
              <p className="heading-component">{about.positioning}</p>
              {about.detailedPositioning
                .split("\n\n")
                .filter(Boolean)
                .map((para) => (
                  <p key={para} className="body-secondary">
                    {para.trim()}
                  </p>
                ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex flex-col gap-[var(--spacing-lg)] lg:flex-row lg:gap-[var(--spacing-3xl)]">
            <div className="w-full shrink-0 lg:w-[200px]">
              <Sticky top="var(--spacing-3xl)">
                <p className="heading-component">Capabilities</p>
              </Sticky>
            </div>
            <div className="min-w-0 flex-1">
              <Stack gap="xl">
                {about.capabilities.map((cap) => (
                  <div
                    key={cap.area}
                    className="flex flex-col gap-[var(--spacing-xs)]"
                  >
                    <p className="body-primary">{cap.area}</p>
                    {cap.description && (
                      <p className="body-secondary">{cap.description}</p>
                    )}
                    <div className="mt-[var(--spacing-xs)] flex flex-wrap gap-[var(--spacing-xs)]">
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
            <Heading level={2} type="heading-component">
              Approach
            </Heading>
            <div className="grid grid-cols-1 gap-[var(--spacing-2xl)] md:grid-cols-2 lg:grid-cols-3">
              {about.approach.map((item, i) => (
                <div key={item.title} className="flex gap-[var(--spacing-md)]">
                  <span className="mono-code w-6 shrink-0">
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

          {/* Contact */}
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            <Heading level={2} type="heading-component">
              Get in touch
            </Heading>
            <p className="body-secondary max-w-[480px]">
              Open to full-time roles and scoped freelance projects. Email is
              the fastest way to reach me.
            </p>
            <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
              <Button
                variant="primary"
                href={`mailto:${about.contactEmail}`}
                icon={<MailIcon size={16} />}
              >
                Email me
              </Button>
              <span className="body-caption">{about.contactEmail}</span>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
