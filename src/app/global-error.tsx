"use client";

import { useEffect } from "react";
import { caveat, inter, manrope, mono } from "@/app/fonts";
import { RefreshIcon } from "@/components/icons/material/refresh";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/controls/button";
import { Heading } from "@/components/ui/display/heading";
import "./globals.css";

// This boundary replaces the root layout, so next-themes never mounts and nothing sets data-theme.
// Resolve the stored choice the way ThemeProvider would, or a dark-theme reader gets a light page.
function resolveTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    document.documentElement.dataset.theme = resolveTheme();
  }, []);

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${mono.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <main className="flex flex-1 items-center py-[var(--spacing-2xl)]">
          <Container>
            <div className="flex flex-col gap-[var(--spacing-2xl)]">
              <div className="flex flex-col gap-[var(--spacing-lg)]">
                <p className="mono-anchor">Error</p>
                <Heading level={1} type="display-primary">
                  Something went wrong on this page.
                </Heading>
              </div>
              <div>
                <Button
                  variant="primary"
                  onClick={() => unstable_retry()}
                  icon={<RefreshIcon size={18} />}
                >
                  Try again
                </Button>
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
