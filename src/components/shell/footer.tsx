import Link from "next/link";
import { GitHubIcon } from "@/components/icons/brands/github";
import { LinkedInIcon } from "@/components/icons/brands/linkedin";
import { MailIcon } from "@/components/icons/material/mail";
import { RssFeedIcon } from "@/components/icons/material/rss-feed";
import { Container } from "@/components/layout/container";
import { AUTHOR_NAME } from "@/lib/site";

const ICON_LINK =
  "flex h-11 w-11 items-center justify-center text-[var(--ink)] motion-safe:transition-[color,transform] motion-safe:duration-[var(--duration-fast)] hover:scale-110 hover:text-[var(--accent)] motion-reduce:hover:scale-100";
const TEXT_LINK =
  "flex h-11 items-center motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)] hover:text-[var(--ink)]";
// support-meta's one local responsive override (DESIGN.md → Typography): 11/18 on phones, 15/24 from md.
const FOOTER_TEXT =
  "support-meta [font-size:11px] [line-height:18px] md:[font-size:15px] md:[line-height:24px]";

// On the 1440 box: © and the name at its left edge, the icons centred, Credits · Stylebook · Source ending at its right edge —
// level with the page name and the nav. Phones stack icons, links, then ©.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-[var(--spacing-4xl)] [@media(max-height:760px)]:mt-[var(--spacing-xl)] pt-[var(--spacing-lg)] pb-[var(--spacing-xl)] md:py-[var(--spacing-lg)]">
      <Container width="cap">
        <div className="flex flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-[var(--spacing-md)]">
          <p
            className={`${FOOTER_TEXT} order-3 min-w-0 max-md:mt-[var(--spacing-sm)] md:order-none md:justify-self-start`}
          >
            <span>© {year} </span>
            <span className="text-[var(--ink)]">{AUTHOR_NAME}</span>
          </p>

          <div className="order-1 flex items-center gap-[var(--spacing-xs)] md:order-none">
            <a
              href="https://github.com/95-ag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={ICON_LINK}
            >
              <GitHubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/aishganesan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={ICON_LINK}
            >
              <LinkedInIcon size={20} />
            </a>
            <a
              href="mailto:aishwarya.workbench@gmail.com"
              aria-label="Send email"
              className={ICON_LINK}
            >
              <MailIcon size={20} />
            </a>
            <a href="/rss.xml" aria-label="RSS feed" className={ICON_LINK}>
              <RssFeedIcon size={20} />
            </a>
          </div>

          <nav
            aria-label="Site"
            className={`${FOOTER_TEXT} order-2 flex items-center gap-[var(--spacing-sm)] uppercase md:order-none md:justify-self-end`}
          >
            <Link href="/credits" className={TEXT_LINK}>
              Credits
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/design-system" className={TEXT_LINK}>
              Stylebook
            </Link>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/95-ag/ag-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className={TEXT_LINK}
            >
              Source
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
