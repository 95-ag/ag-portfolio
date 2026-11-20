import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/controls/button";
import { Heading } from "@/components/ui/display/heading";

interface ErrorScreenProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  // The screen's one primary action: a filled Button.
  primary: React.ReactNode;
}

// The 404 and the route-level error share one single-screen layout (DESIGN.md → Domain Components → 404 Not Found). On a short
// window the spacing tightens so the screen, with the footer, still fits without scrolling.
export function ErrorScreen({
  eyebrow,
  title,
  lead,
  primary,
}: ErrorScreenProps) {
  return (
    // data-scroll-top="off": a short, fixed page carries no scroll-to-top (DESIGN.md → Shell → Scroll-to-top Button).
    <div
      data-scroll-top="off"
      className="flex flex-1 items-center py-[var(--spacing-2xl)] [@media(max-height:760px)]:py-[var(--spacing-md)]"
    >
      <Container>
        <div className="flex flex-col gap-[var(--spacing-2xl)] [@media(max-height:760px)]:gap-[var(--spacing-lg)]">
          <div className="flex flex-col gap-[var(--spacing-lg)] [@media(max-height:760px)]:gap-[var(--spacing-md)]">
            <p className="mono-anchor">{eyebrow}</p>
            <Heading level={1} type="display-primary">
              {title}
            </Heading>
            <p className="body-lead">{lead}</p>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--spacing-md)] stack:justify-center">
            {primary}
            <Button
              href="/"
              iconPosition="trailing"
              icon={
                <Image
                  src="/cat_head_icon.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="rounded-full"
                  unoptimized
                />
              }
            >
              Go Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
