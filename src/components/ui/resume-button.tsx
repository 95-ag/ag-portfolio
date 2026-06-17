"use client";

import { DownloadIcon } from "@/components/icons/material/download";
import { Button } from "@/components/ui/button";

// One action that both opens the résumé in a new tab (read-only view) and
// triggers a download — per the chosen "one button does both" behavior.
export function ResumeButton({ href }: { href: string }) {
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
      Resume
    </Button>
  );
}
