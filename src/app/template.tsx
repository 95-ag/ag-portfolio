"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

// A template remounts on every navigation, which restarts the enter animation. The first render of a visit is the
// server-rendered page, so it never animates (and hydration matches); only later mounts opt in.
let visitStarted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [enters] = useState(() => visitStarted && pathname !== "/");

  useEffect(() => {
    visitStarted = true;
  }, []);

  return (
    <div className={cn("flex flex-1 flex-col", enters && "page-enter")}>
      {children}
    </div>
  );
}
