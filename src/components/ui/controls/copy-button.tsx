"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/icons/material/check";
import { ContentCopyIcon } from "@/components/icons/material/content-copy";
import { cn } from "@/lib/utils/cn";

const COPIED_MS = 1500;

interface CopyButtonProps {
  value: string;
  // What is being copied, lowercase: "email" reads "Copy email", then "Email copied".
  label: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
    });
  };

  const Icon = copied ? CheckIcon : ContentCopyIcon;
  const copiedLabel = `${label.charAt(0).toUpperCase()}${label.slice(1)} copied`;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : `Copy ${label}`}
      className={cn(
        "inline-flex h-11 w-11 cursor-pointer items-center justify-center",
        "motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)]",
        copied
          ? "text-[var(--accent)]"
          : "text-[var(--ink-muted)] hover:text-[var(--accent)]",
      )}
    >
      <Icon size={18} />
    </button>
  );
}
