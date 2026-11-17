"use client";

import Image from "next/image";
import { RefreshIcon } from "@/components/icons/material/refresh";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/controls/button";
import { Heading } from "@/components/ui/display/heading";

export default function RouteError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex flex-1 items-center py-[var(--spacing-2xl)]">
      <Container>
        <div className="flex flex-col gap-[var(--spacing-2xl)]">
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            <p className="mono-anchor">Error</p>
            <Heading level={1} type="display-primary">
              Something went wrong on this page.
            </Heading>
            <p className="body-lead">
              An unexpected error stopped it from loading. Try again, or head
              back home.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
            <Button
              variant="ink"
              onClick={() => unstable_retry()}
              icon={<RefreshIcon size={18} />}
            >
              Try again
            </Button>
            <Button
              variant="ink"
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
