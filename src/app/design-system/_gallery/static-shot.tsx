import Image, { type StaticImageData } from "next/image";

// Dev-only specimen for components that can't render live in the gallery (fixed
// chrome, full-viewport WebGL, scroll-driven). Shows committed light + dark
// screenshots side by side via next/image (static imports → intrinsic sizing).
// Assets live under public/design-system/ and are pruned from the production
// snapshot; regenerate with scripts/capture-design-system.mjs.

export function StaticShot({
  light,
  dark,
  alt,
  note,
}: {
  light: StaticImageData;
  dark: StaticImageData;
  alt: string;
  note?: string;
}) {
  const frames = [
    { theme: "light", src: light },
    { theme: "dark", src: dark },
  ] as const;
  return (
    <div className="flex flex-col gap-[var(--spacing-sm)]">
      <div className="grid grid-cols-1 gap-[var(--spacing-md)] md:grid-cols-2">
        {frames.map(({ theme, src }) => (
          <figure
            key={theme}
            className="flex min-w-0 flex-col gap-[var(--spacing-xs)]"
          >
            <span className="insight-label">{theme}</span>
            <Image
              src={src}
              alt={`${alt} — ${theme} theme`}
              sizes="(min-width: 768px) 45vw, 90vw"
              className="mx-auto h-auto max-w-full rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)]"
            />
          </figure>
        ))}
      </div>
      <p className="body-caption">Static capture{note ? ` — ${note}` : ""}</p>
    </div>
  );
}
