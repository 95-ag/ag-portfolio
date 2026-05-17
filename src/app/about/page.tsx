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
          <p className="heading-component text-[var(--on-surface-muted)]">
            {label}
          </p>
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
            <div className="flex flex-col gap-[var(--spacing-xs)]">
              <Heading level={1} type="display-accent">
                {about.name}
              </Heading>
              <p className="body-secondary">{about.role}</p>
            </div>
            {/* Labeled social chips */}
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
            {/* Headshot — softer radius, integrated into composition */}
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

            {/* Editorial content — sourced from about.mdx frontmatter */}
            <div className="flex flex-col gap-[var(--spacing-lg)]">
              <p className="body-secondary">{about.positioning}</p>
              <ul className="flex flex-col gap-[var(--spacing-sm)]">
                {about.detailedPositioning.map((point) => (
                  <li key={point} className="flex gap-[var(--spacing-sm)]">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] h-[4px] w-[4px] shrink-0 rounded-full bg-[var(--outline-variant)]"
                    />
                    <p className="body-secondary">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Approach */}
          <div className="flex flex-col gap-[var(--spacing-xl)]">
            <Heading level={2} type="heading-component">
              Approach
            </Heading>
            <div className="grid grid-cols-1 gap-[var(--spacing-xl)] md:grid-cols-2 lg:grid-cols-3">
              {about.approach.map((item, i) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-[var(--spacing-sm)]"
                >
                  <p className="mono-code opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="body-primary text-[var(--on-surface)]">
                    <strong>{item.title}.</strong> {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <TwoColumnRow label="Capabilities">
            <Stack gap="2xl">
              {about.capabilities.map((cap) => (
                <div
                  key={cap.area}
                  className="flex flex-col gap-[var(--spacing-sm)]"
                >
                  <p className="heading-component text-[var(--on-surface)]">
                    {cap.area}
                  </p>
                  <p className="body-secondary">{cap.description}</p>
                  <div className="mt-[var(--spacing-xs)] flex flex-wrap gap-[var(--spacing-xs)]">
                    {cap.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </Stack>
          </TwoColumnRow>

          {/* Experience */}
          <TwoColumnRow label="Experience">
            <Stack gap="2xl">
              {about.experience.map((exp) => (
                <div
                  key={`${exp.company}-${exp.role}`}
                  className="flex flex-col gap-[var(--spacing-sm)]"
                >
                  <div className="flex flex-col gap-[var(--spacing-xs)]">
                    <p className="heading-component text-[var(--on-surface)]">
                      {exp.role}
                    </p>
                    <p className="mono-anchor">
                      {exp.company} · {exp.timeframe}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-[var(--spacing-xs)]">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="body-secondary flex gap-[var(--spacing-sm)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--outline-variant)]"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Stack>
          </TwoColumnRow>

          {/* Education */}
          <TwoColumnRow label="Education">
            <Stack gap="lg">
              {about.education.map((edu) => (
                <div
                  key={edu.institution}
                  className="flex flex-col gap-[var(--spacing-xs)]"
                >
                  <p className="heading-component text-[var(--on-surface)]">
                    {edu.institution}
                  </p>
                  <p className="body-secondary">
                    {edu.degree}
                    {edu.specialization && ` — ${edu.specialization}`}
                  </p>
                  <p className="mono-anchor">{edu.timeframe}</p>
                </div>
              ))}
            </Stack>
          </TwoColumnRow>

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
              <span className="body-caption opacity-60">
                {about.contactEmail}
              </span>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
