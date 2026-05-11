import type { Metadata } from "next";
import { inter, manrope, mono } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
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
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
