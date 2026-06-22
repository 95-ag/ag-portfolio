import Image, { type StaticImageData } from "next/image";

// Dev-only theme-swap specimen: shows a committed light + dark screenshot pair, displaying only
// the one matching the current page theme (JS-free CSS swap on data-theme, mirroring the
// .hero-light / .hero-dark pattern in globals.css). Used for the full-viewport background layers,
// which can't render live in a bounded frame without the WebGL meteor hanging the page on software
// WebGL (see lessons.md). Assets live under public/design-system/ and are pruned from the
// production snapshot; regenerate with the capture tooling.
export function ThemeShot({
  light,
  dark,
  alt,
}: {
  light: StaticImageData;
  dark: StaticImageData;
  alt: string;
}) {
  // Render at the capture's native size (the frame hugs it); never upscale — only scale down to fit
  // a narrow viewport. `w-fit` sizes the border to the visible shot; the inactive theme's shot is
  // display:none and contributes no width.
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
