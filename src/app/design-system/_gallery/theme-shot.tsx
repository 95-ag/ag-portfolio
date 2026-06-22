import Image, { type StaticImageData } from "next/image";

// Background layers shown as committed light/dark screenshots — they can't render live without the
// WebGL meteor hanging on software WebGL (see lessons.md). `.ds-shot-*` reveals only the active theme.
export function ThemeShot({
  light,
  dark,
  alt,
}: {
  light: StaticImageData;
  dark: StaticImageData;
  alt: string;
}) {
  // Render at native capture size — `w-fit` hugs the border to the visible shot, never upscaling.
  return (
    <div className="w-fit max-w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)]">
      <Image
        src={light}
        alt={`${alt} (light theme)`}
        className="ds-shot-light h-auto max-w-full"
      />
      <Image
        src={dark}
        alt={`${alt} (dark theme)`}
        className="ds-shot-dark h-auto max-w-full"
      />
    </div>
  );
}
