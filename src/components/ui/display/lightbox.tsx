"use client";

import Image from "next/image";
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons/material/close";
import { useFocusTrap } from "@/lib/utils/focus-trap";

interface LightboxTriggerProps {
  src: string;
  alt: string;
  caption?: string;
  /** The media box the reader clicks to open the full-size view. */
  children: ReactNode;
}

export function LightboxTrigger({
  src,
  alt,
  caption,
  children,
}: LightboxTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="block w-full cursor-zoom-in rounded-[var(--radius-md)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <span className="sr-only">View full size: </span>
        {children}
      </button>
      {open &&
        createPortal(
          <LightboxDialog
            src={src}
            alt={alt}
            caption={caption}
            onClose={() => setOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}

interface LightboxDialogProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

function LightboxDialog({ src, alt, caption, onClose }: LightboxDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useFocusTrap(dialogRef, true);

  // Reading layout flushes the closed styles, so the opacity transition has a
  // starting frame without waiting on requestAnimationFrame.
  useLayoutEffect(() => {
    dialogRef.current?.getBoundingClientRect();
    setVisible(true);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Esc and the close button are the keyboard paths; the backdrop click is a pointer shortcut for the same action
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-[var(--z-lightbox)] flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] px-[var(--spacing-md)] pt-[var(--spacing-3xl)] pb-[var(--spacing-md)] motion-safe:transition-opacity motion-safe:duration-[var(--duration-base)] ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-[var(--spacing-md)] right-[var(--spacing-md)] flex h-11 w-11 cursor-pointer select-none items-center justify-center rounded-[var(--radius-pill)] text-[var(--ink-muted)] hover:bg-[var(--surface-deep)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] motion-safe:transition-[color,background-color] motion-safe:duration-[var(--duration-fast)]"
      >
        <CloseIcon size={20} />
      </button>
      <figure className="flex max-h-full min-h-0 max-w-full flex-col items-center gap-[var(--spacing-sm)]">
        <Image
          src={src}
          alt={alt}
          unoptimized
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto min-h-0 w-auto max-w-full object-contain"
        />
        {caption && (
          <figcaption className="body-caption text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
