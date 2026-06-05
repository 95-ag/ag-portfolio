"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Long-read (project detail) pages get the softer reading surface; everything else uses the
// immersive showcase surface. Sets `data-read="long"` on <html> so globals.css can switch the
// background depth. The pre-paint inline script in the root layout sets this on first load
// (no flash); this keeps it correct across client-side navigation.
const LONG_READ_PATTERN = /^\/work\/.+/;

export function SurfaceContext() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.read = LONG_READ_PATTERN.test(pathname)
      ? "long"
      : "";
  }, [pathname]);

  return null;
}
