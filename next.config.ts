import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// SSG-safe Content-Security-Policy. A strict (hash/nonce) script-src is not possible
// while keeping static generation: Next's App Router emits dynamic inline RSC bootstrap
// scripts (self.__next_f) that cannot be hashed, and the nonce alternative forces dynamic
// rendering. 'unsafe-inline' for script/style is the accepted tradeoff; the high-value
// directives below stay strict, and the only injection sink (JSON-LD) is escaped at source.
// 'unsafe-eval' is needed only in dev — React/Turbopack use eval() for debugging
// (callstacks, fast refresh). Production never uses it, so the prod CSP stays strict.
const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  // Next RSC bootstrap + theme pre-paint script + next-themes + ld+json (all inline).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Inline style attributes from framer-motion.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

// The preview-only UI shows on the dev server and Vercel previews. The phase or the deploy variable decides — never
// NODE_ENV, which a production build keeps when it is already set.
export default function config(phase: string): NextConfig {
  const previewUi =
    phase === PHASE_DEVELOPMENT_SERVER || process.env.VERCEL_ENV === "preview";
  return {
    env: { NEXT_PUBLIC_PREVIEW_UI: previewUi ? "1" : "" },
    async headers() {
      return [{ source: "/:path*", headers: securityHeaders }];
    },
  };
}
