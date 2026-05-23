import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface DiagramPanelProps {
  src: string;
  alt: string;
  aspect?: string;
}

export function DiagramPanel({ src, alt, aspect = "4/3" }: DiagramPanelProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)]">
      <div style={{ aspectRatio: aspect }} className="relative w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 380px"
        />
      </div>
    </div>
  );
}

interface DiagramRowProps {
  caption?: string;
  className?: string;
  children: React.ReactNode;
}

export function DiagramRow({ caption, className, children }: DiagramRowProps) {
  return (
    <figure className={cn("my-[var(--spacing-2xl)] mx-auto w-full", className)}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
      {caption && (
        <figcaption className="body-caption mt-[var(--spacing-sm)] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
