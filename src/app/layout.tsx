import type { Metadata } from "next";
import { inter, manrope, mono } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import "./globals.css";

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
      className={`${manrope.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Nav />
          <main className="pt-[var(--spacing-3xl)]">{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
