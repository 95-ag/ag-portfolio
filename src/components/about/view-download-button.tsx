"use client";

import type { ReactNode } from "react";
import { DownloadIcon } from "@/components/icons/material/download";
import { Button } from "@/components/ui/button";

// "View or save": one click opens the file in a new tab AND downloads it. The dual action needs a
// client onClick (a declarative <a download> cancels the new-tab navigation), so it can't be inlined
// on the server About page — hence this small co-located client island.
export function ViewDownloadButton({
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
