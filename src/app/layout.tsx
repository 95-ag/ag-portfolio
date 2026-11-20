import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { caveat, inter, manrope, mono } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { BackgroundLayer } from "@/components/background/background-layer";
import { Footer } from "@/components/shell/footer";
import { Nav } from "@/components/shell/nav";
import { PageName } from "@/components/shell/page-name";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { SHOW_PREVIEW_UI } from "@/lib/build-flags";
import { buildWebSiteSchema, serializeJsonLd } from "@/lib/seo/jsonld";
import {
  AUTHOR_NAME,
  FEED_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: AUTHOR_NAME,
    template: "%s | AG",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: AUTHOR_NAME }],
  openGraph: {
    type: "website",
    siteName: AUTHOR_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "WeRCp6dhaQfCLwMHLE_V2xL6GIjS5SiH5Mm64UEJfMQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = buildWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${mono.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* Not metadata.alternates.types: every page declares its own alternates.canonical, and a
            page's alternates replaces the layout's wholesale, so the feed link would vanish. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={FEED_TITLE}
          href="/rss.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
        />
        {/* Production follows the system preference: a theme saved by the retired selector is cleared before the theme provider
            reads it, so no visitor stays pinned to Light or Dark with no switch left to undo it. */}
        {!SHOW_PREVIEW_UI && (
          <script
            dangerouslySetInnerHTML={{
              __html: 'try{localStorage.removeItem("theme")}catch(e){}',
            }}
          />
        )}
        <Providers>
          <a
            href="#main"
            className="body-caption sr-only z-[var(--z-skip-link)] bg-[var(--surface)] text-[var(--ink)] focus:not-sr-only focus:fixed focus:top-[var(--spacing-md)] focus:left-[var(--spacing-md)] focus:border focus:border-[var(--hairline-strong)] focus:px-[var(--spacing-md)] focus:py-[var(--spacing-sm)]"
          >
            Skip to content
          </a>
          <BackgroundLayer />
          <PageName />
          <Nav />
          <main
            id="main"
            tabIndex={-1}
            className="relative flex flex-1 flex-col pt-[var(--spacing-3xl)] focus:outline-none"
          >
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          {SHOW_PREVIEW_UI && <ThemeToggle mode="site" />}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
