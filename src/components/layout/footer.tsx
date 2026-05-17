import { GitHubIcon } from "@/components/icons/brands/github";
import { LinkedInIcon } from "@/components/icons/brands/linkedin";
import { MailIcon } from "@/components/icons/material/mail";
import { Container } from "@/components/layout/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-[var(--spacing-4xl)] py-[var(--spacing-lg)]">
      <Container>
        <div className="flex items-center justify-between gap-[var(--spacing-md)]">
          {/* Left: copyright + name + repo link */}
          <p className="support-meta min-w-0 [font-size:11px] [line-height:18px] md:[font-size:15px] md:[line-height:24px]">
            <span className="opacity-50">© {year} / </span>
            <span className="text-[var(--on-surface)]">Aishwarya Ganesan</span>
            <span className="opacity-50"> / </span>
            <a
              href="https://github.com/95-ag/ag-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-[var(--duration-fast)] hover:text-[var(--on-surface)]"
            >
              Designed &amp; developed by me.
            </a>
          </p>

          {/* Right: social icons */}
          <div className="flex shrink-0 items-center gap-[var(--spacing-md)]">
            <a
              href="https://github.com/95-ag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:scale-110 hover:text-[var(--accent)]"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/aishganesan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:scale-110 hover:text-[var(--accent)]"
            >
              <LinkedInIcon size={20} />
            </a>
            <a
              href="mailto:aishwaryaganesan95@gmail.com"
              aria-label="Send email"
              className="text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:scale-110 hover:text-[var(--accent)]"
            >
              <MailIcon size={20} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
