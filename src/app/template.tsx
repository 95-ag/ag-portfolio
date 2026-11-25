"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

// Set once the first page of a visit has mounted: Home plays the enter only when a visitor returns to it, never on a
// load or reload.
let visitStarted = false;

// A root template does not remount between /work and /work/[slug] (same top-level segment), so the wrapper is keyed by
// pathname to restart the animation on every route change.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <PageEnter key={pathname} isHome={pathname === "/"}>
      {children}
    </PageEnter>
  );
}

function PageEnter({
  isHome,
  children,
}: {
  isHome: boolean;
  children: React.ReactNode;
}) {
  const [enters] = useState(() => !isHome || visitStarted);

  useEffect(() => {
    visitStarted = true;
  }, []);

  return (
    <div className={cn("flex flex-1 flex-col", enters && "page-enter")}>
      {children}
    </div>
  );
}
