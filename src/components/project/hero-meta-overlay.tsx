import Image from "next/image";
import { Popover, PopoverDescription } from "@/components/ui/display/popover";

interface Logo {
  src: string;
  alt: string;
  name: string;
  location?: string;
  url?: string;
}

interface Contributor {
  name: string;
  avatar: string;
  role?: string;
  url?: string;
}

interface HeroMetaOverlayProps {
  logos?: Logo[];
  contributors?: Contributor[];
}

export function HeroMetaOverlay({ logos, contributors }: HeroMetaOverlayProps) {
  const hasLogos = logos && logos.length > 0;
  const hasContributors = contributors && contributors.length > 0;
  if (!hasLogos && !hasContributors) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-[var(--spacing-sm)] md:p-[var(--spacing-md)]">
      {/* Bottom-left: logos */}
      {hasLogos ? (
        <div className="pointer-events-auto flex items-center gap-[var(--spacing-xs)] md:gap-[var(--spacing-sm)]">
          {logos.map((logo) => (
            <Popover
              key={logo.src}
              label={logo.alt}
              description={
                <PopoverDescription name={logo.name} detail={logo.location} />
              }
              align="start"
              href={logo.url}
            >
              <span className="relative block h-8 w-8 overflow-hidden rounded-full border border-[var(--hairline)] bg-white md:h-10 md:w-10">
                <Image
                  src={logo.src}
                  alt=""
                  fill
                  className="object-contain p-1"
                  unoptimized={logo.src.endsWith(".svg")}
                />
              </span>
            </Popover>
          ))}
        </div>
      ) : (
        <div />
      )}

      {/* Bottom-right: contributor avatars */}
      {hasContributors && (
        <div className="pointer-events-auto flex items-center -space-x-1.5">
          {contributors.map((contributor) => (
            <Popover
              key={contributor.name}
              label={contributor.name}
              description={
                <PopoverDescription
                  name={contributor.name}
                  detail={contributor.role}
                />
              }
              align="end"
              href={contributor.url}
            >
              <Image
                src={contributor.avatar}
                alt=""
                width={24}
                height={24}
                className="h-5 w-5 rounded-full border border-[var(--hairline)] object-cover md:h-6 md:w-6"
                unoptimized={contributor.avatar.endsWith(".svg")}
              />
            </Popover>
          ))}
        </div>
      )}
    </div>
  );
}
