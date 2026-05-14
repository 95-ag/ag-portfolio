import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/ui/heading";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <Stack gap="xl">
          <Stack gap="sm">
            <p className="mono-anchor">404</p>
            <Heading level={1} type="display-primary">
              Page not found
            </Heading>
            <p className="body-secondary max-w-[480px]">
              This page does not exist. It may have been moved or removed.
            </p>
          </Stack>
          <div className="flex flex-wrap gap-[var(--spacing-md)]">
            <Link
              href="/"
              className="interactive-label inline-flex h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-[var(--spacing-lg)] text-[var(--accent-on)] transition-opacity duration-[var(--duration-fast)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              Go home
            </Link>
            <Link
              href="/work"
              className="interactive-label inline-flex h-11 items-center rounded-[var(--radius-md)] border border-[var(--outline)] bg-transparent px-[var(--spacing-lg)] text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              View my work
            </Link>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
