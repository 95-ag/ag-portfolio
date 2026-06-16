import type { Metadata } from "next";
import { caveat, inter, manrope, mono } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { BackgroundLayer } from "@/components/background/background-layer";
import { Footer } from "@/components/shell/footer";
import { Nav } from "@/components/shell/nav";
import { SurfaceContext } from "@/components/shell/surface-context";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { buildWebSiteSchema, serializeJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Set the reading-surface flag before first paint (no flash on direct loads of project pages);
// SurfaceContext keeps it in sync across client navigation.
const SURFACE_INIT = `try{document.documentElement.dataset.read=/^\\/work\\/.+/.test(location.pathname)?'long':''}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aishwarya Ganesan",
    template: "%s | AG",
  },
  description:
    "AI engineer building AI systems like real software — applied ML, retrieval, and computer vision.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
        />
        <script dangerouslySetInnerHTML={{ __html: SURFACE_INIT }} />
        <Providers>
          <SurfaceContext />
          <BackgroundLayer />
          <Nav />
          <main className="relative flex flex-1 flex-col pt-[var(--spacing-3xl)]">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
