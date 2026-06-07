import Image from "next/image";
import { ArrowForwardIcon } from "@/components/icons/material/arrow-forward";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-[var(--spacing-2xl)]">
      <Container>
        <div className="flex flex-col gap-[var(--spacing-2xl)]">
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            <p className="mono-anchor">404</p>
            <Heading level={1} type="display-primary">
              This page doesn&rsquo;t exist — but my work does.
            </Heading>
            <p className="body-lead">
              You might have followed a broken link or mistyped the URL. Either
              way, there&rsquo;s nothing here.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
            <Button
              variant="primary"
              href="/work"
              icon={<ArrowForwardIcon size={18} />}
            >
              See Projects
            </Button>
            <Button
              variant="secondary"
              href="/"
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
