import type { Metadata } from "next";
import { caveat, inter, manrope, mono } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { BackgroundLayer } from "@/components/bg/background-layer";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { SurfaceContext } from "@/components/layout/surface-context";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import "./globals.css";

// Set the reading-surface flag before first paint (no flash on direct loads of project pages);
// SurfaceContext keeps it in sync across client navigation.
const SURFACE_INIT = `try{document.documentElement.dataset.read=/^\\/work\\/.+/.test(location.pathname)?'long':''}catch(e){}`;

export const metadata: Metadata = {
  title: "AG — AI/ML Engineer",
  description:
    "Portfolio of an AI/ML engineer building practical machine learning systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${mono.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint surface-context init */}
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
