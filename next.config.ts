import type { NextConfig } from "next";

// SSG-safe Content-Security-Policy. A strict (hash/nonce) script-src is not possible
// while keeping static generation: Next's App Router emits dynamic inline RSC bootstrap
// scripts (self.__next_f) that cannot be hashed, and the nonce alternative forces dynamic
// rendering. 'unsafe-inline' for script/style is the accepted tradeoff; the high-value
// directives below stay strict, and the only injection sink (JSON-LD) is escaped at source.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  // Next RSC bootstrap + theme pre-paint script + next-themes + ld+json (all inline).
  "script-src 'self' 'unsafe-inline'",
  // Inline style attributes from framer-motion and the WebGL background.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
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

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
