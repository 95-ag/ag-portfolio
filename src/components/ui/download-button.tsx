"use client";

import type { ReactNode } from "react";
import { DownloadIcon } from "@/components/icons/material/download";
import { Button } from "@/components/ui/button";

// Generic download affordance: opens a file in a new tab AND triggers a download
// ("view or save"). Not bound to any one asset — pass the file href and a label.
export function DownloadButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer");
    const link = document.createElement("a");
    link.href = href;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      icon={<DownloadIcon size={18} />}
      className="justify-center"
    >
      {children}
    </Button>
  );
}
