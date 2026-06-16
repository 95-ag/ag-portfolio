"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface CopyLinkProps {
  value: string;
  className?: string;
}

export function CopyLink({ value, className }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "body-caption cursor-pointer text-left text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--on-surface)]",
        copied ? "no-underline" : "underline underline-offset-2",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
        className,
      )}
    >
      {copied ? "email copied!" : "or copy email"}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
