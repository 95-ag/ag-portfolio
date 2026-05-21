"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons/material/check";
import { ContentCopyIcon } from "@/components/icons/material/content-copy";
import { cn } from "@/lib/utils/cn";

interface CopyableCodeProps {
  value: string;
  ariaLabel: string;
  className?: string;
}

export function CopyableCode({
  value,
  ariaLabel,
  className,
}: CopyableCodeProps) {
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
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)] px-[var(--spacing-md)]",
        "font-mono text-[16px] font-normal leading-[24px] text-[var(--on-surface-muted)]",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:border-[var(--accent)] hover:text-[var(--accent)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
        className,
      )}
    >
      <span>{value}</span>
      {copied ? <CheckIcon size={14} /> : <ContentCopyIcon size={14} />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
