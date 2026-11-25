"use client";

import { RefreshIcon } from "@/components/icons/material/refresh";
import { Button } from "@/components/ui/controls/button";
import { ErrorScreen } from "@/components/ui/display/error-screen";

export default function RouteError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <ErrorScreen
      eyebrow="Error"
      title="Something went wrong on this page."
      lead="An unexpected error stopped it from loading. Try again, or head back home."
      primary={
        <Button
          variant="filled"
          onClick={() => unstable_retry()}
          icon={<RefreshIcon size={18} />}
        >
          Try again
        </Button>
      }
    />
  );
}
