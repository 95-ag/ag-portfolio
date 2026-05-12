import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Sticky } from "@/components/layout/sticky";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import { getAbout } from "@/lib/content/about";

export const metadata = {
  title: "About",
  description:
    "AI/ML engineer building practical systems for real-world constraints.",
};

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
          <p className="type-headline-sm text-[var(--on-surface-muted)]">
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
            <Stack gap="xs">
              <Heading level={1} type="display-md">
                {about.name}
              </Heading>
              <p className="type-headline-md text-[var(--on-surface-muted)]">
                {about.role}
              </p>
              <p className="type-body-lg text-[var(--on-surface-muted)]">
                {about.positioning}
              </p>
            </Stack>
            {/* Social icons */}
            <div className="flex items-center gap-[var(--spacing-md)]">
              {about.socials.github && (
                <a
                  href={about.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  <GitHubIcon />
                </a>
              )}
              {about.socials.linkedin && (
                <a
                  href={about.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
            {/* Contact quick link */}
            <div>
              <a
                href={`mailto:${about.contactEmail}`}
                className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-[var(--spacing-lg)] text-sm font-medium text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Email me
              </a>
            </div>
          </header>

          <Divider />

          {/* Two-panel intro: headshot + approach */}
          <div className="flex flex-col gap-[var(--spacing-2xl)] lg:flex-row lg:gap-[var(--spacing-3xl)]">
            {/* Headshot */}
            <div className="w-full shrink-0 lg:w-[280px]">
              <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[var(--radius-lg)] grayscale">
                <Image
                  src={about.headshot}
                  alt={about.headshotAlt}
                  fill
                  className="object-cover"
                  unoptimized={about.headshot.endsWith(".svg")}
                  sizes="280px"
                />
              </div>
            </div>
            {/* Approach */}
            <div className="min-w-0 flex-1">
              <p className="type-mono-label mb-[var(--spacing-lg)] text-[var(--on-surface-muted)]">
                Approach
              </p>
              <Stack gap="xl">
                {about.approach.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-[var(--spacing-xs)]"
                  >
                    <p className="type-headline-sm text-[var(--on-surface)]">
                      {item.title}
                    </p>
                    <p className="type-body-md text-[var(--on-surface-muted)]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </Stack>
            </div>
          </div>

          <Divider />

          {/* Capabilities */}
          <TwoColumnRow label="Capabilities">
            <Stack gap="2xl">
              {about.capabilities.map((cap) => (
                <div
                  key={cap.area}
                  className="flex flex-col gap-[var(--spacing-sm)]"
                >
                  <p className="type-headline-sm text-[var(--on-surface)]">
                    {cap.area}
                  </p>
                  <p className="type-body-md text-[var(--on-surface-muted)]">
                    {cap.description}
                  </p>
                  <div className="mt-[var(--spacing-xs)] flex flex-wrap gap-[var(--spacing-xs)]">
                    {cap.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </Stack>
          </TwoColumnRow>

          <Divider />

          {/* Experience */}
          <TwoColumnRow label="Experience">
            <Stack gap="2xl">
              {about.experience.map((exp) => (
                <div
                  key={`${exp.company}-${exp.role}`}
                  className="flex flex-col gap-[var(--spacing-sm)]"
                >
                  <div className="flex flex-col gap-[var(--spacing-xs)]">
                    <p className="type-headline-sm text-[var(--on-surface)]">
                      {exp.role}
                    </p>
                    <p className="type-mono-label text-[var(--on-surface-muted)]">
                      {exp.company} · {exp.timeframe}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-[var(--spacing-xs)]">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-[var(--spacing-sm)] type-body-md text-[var(--on-surface-muted)]"
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

          <Divider />

          {/* Education */}
          <TwoColumnRow label="Education">
            <Stack gap="lg">
              {about.education.map((edu) => (
                <div
                  key={edu.institution}
                  className="flex flex-col gap-[var(--spacing-xs)]"
                >
                  <p className="type-headline-sm text-[var(--on-surface)]">
                    {edu.institution}
                  </p>
                  <p className="type-body-md text-[var(--on-surface-muted)]">
                    {edu.degree}
                    {edu.specialization && ` — ${edu.specialization}`}
                  </p>
                  <p className="type-mono-label text-[var(--on-surface-muted)]">
                    {edu.timeframe}
                  </p>
                </div>
              ))}
            </Stack>
          </TwoColumnRow>

          <Divider />

          {/* Contact section */}
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            <Heading level={2} type="headline-lg">
              Get in touch
            </Heading>
            <p className="type-body-lg max-w-[480px] text-[var(--on-surface-muted)]">
              Open to full-time roles and scoped freelance projects. Email is
              the fastest way to reach me.
            </p>
            <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
              <a
                href={`mailto:${about.contactEmail}`}
                className="inline-flex h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-[var(--spacing-lg)] text-sm font-medium text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Email me
              </a>
              <a
                href={about.contactEmail}
                className="type-body-sm text-[var(--on-surface-muted)]"
              >
                {about.contactEmail}
              </a>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
