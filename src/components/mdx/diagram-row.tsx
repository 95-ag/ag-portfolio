import Image from "next/image";
import React from "react";
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

type DiagramRowLayout = "2col" | "2+1";

interface DiagramRowProps {
  caption?: string;
  className?: string;
  children: React.ReactNode;
  layout?: DiagramRowLayout;
}

export function DiagramRow({
  caption,
  className,
  children,
  layout = "2col",
}: DiagramRowProps) {
  const childArray = React.Children.toArray(children);
  const isTwoPlusOne = layout === "2+1" && childArray.length === 3;

  return (
    <figure className={cn("my-[var(--spacing-2xl)] mx-auto w-full", className)}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:items-start">
        {isTwoPlusOne
          ? childArray.map((child, i) => {
              const key = (child as React.ReactElement).key ?? i;
              return i === 2 ? (
                <div
                  key={key}
                  className="col-span-1 flex justify-center md:col-span-2"
                >
                  <div className="w-full md:w-1/2">{child}</div>
                </div>
              ) : (
                child
              );
            })
          : children}
      </div>
      {caption && (
        <figcaption className="body-caption mt-[var(--spacing-sm)] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
