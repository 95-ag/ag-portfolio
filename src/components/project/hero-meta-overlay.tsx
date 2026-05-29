import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
}

interface Contributor {
  name: string;
  avatar: string;
  url?: string;
}

interface HeroMetaOverlayProps {
  logos?: Logo[];
  contributors?: Contributor[];
  interactive?: boolean;
}

export function HeroMetaOverlay({
  logos,
  contributors,
  interactive = false,
}: HeroMetaOverlayProps) {
  const hasLogos = logos && logos.length > 0;
  const hasContributors = contributors && contributors.length > 0;
  if (!hasLogos && !hasContributors) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-[var(--spacing-md)]">
      {/* Bottom-left: logos */}
      {hasLogos ? (
        <div className="pointer-events-auto flex items-center gap-[var(--spacing-sm)]">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--outline-variant)] bg-white"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain p-1"
                unoptimized={logo.src.endsWith(".svg")}
              />
            </div>
          ))}
        </div>
      ) : (
        <div />
      )}

      {/* Bottom-right: contributor avatars */}
      {hasContributors && (
        <div className="pointer-events-auto flex items-center">
          {contributors.map((c, i) => {
            const img = (
              <Image
                key={c.name}
                src={c.avatar}
                alt={c.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border border-[var(--outline-variant)] object-cover"
                style={{ marginLeft: i > 0 ? "-6px" : undefined }}
                unoptimized={c.avatar.endsWith(".svg")}
              />
            );
            return interactive && c.url ? (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                style={{ marginLeft: i > 0 ? "-6px" : undefined }}
              >
                {img}
              </a>
            ) : (
              img
            );
          })}
        </div>
      )}
    </div>
  );
}
