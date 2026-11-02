import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { caveat, inter, manrope, mono } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { BackgroundLayer } from "@/components/background/background-layer";
import { Footer } from "@/components/shell/footer";
import { Nav } from "@/components/shell/nav";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { SurfaceContext } from "@/components/shell/surface-context";
import { getAllPosts } from "@/lib/content/posts";
import { buildWebSiteSchema, serializeJsonLd } from "@/lib/seo/jsonld";
import { FEED_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

// Set the reading-surface flag before first paint (no flash on direct loads of project and post
// pages); SurfaceContext keeps it in sync across client navigation.
const SURFACE_INIT = `try{document.documentElement.dataset.read=/^\\/(work|blog)\\/.+/.test(location.pathname)?'long':''}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aishwarya Ganesan",
    template: "%s | AG",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Aishwarya Ganesan" }],
  openGraph: {
    type: "website",
    siteName: "Aishwarya Ganesan",
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
  const meteorSuppressedPaths = getAllPosts()
    .filter((post) => post.frontmatter.motion)
    .map((post) => `/blog/${post.slug}`);

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
        <script dangerouslySetInnerHTML={{ __html: SURFACE_INIT }} />
        <Providers>
          <SurfaceContext />
          <BackgroundLayer meteorSuppressedPaths={meteorSuppressedPaths} />
          <Nav />
          <main className="relative flex flex-1 flex-col pt-[var(--spacing-3xl)]">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
