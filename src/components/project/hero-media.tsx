import Image from "next/image";

interface HeroMediaProps {
  src: string;
  alt: string;
  poster?: string;
  loop?: boolean;
  className?: string;
}

function isVideo(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

function isSvg(src: string) {
  return /\.svg$/i.test(src);
}

export function HeroMedia({
  src,
  alt,
  poster,
  loop = true,
  className,
}: HeroMediaProps) {
  if (isVideo(src)) {
    return (
      <div className={className}>
        {/* Reduced-motion: show poster only — motion rules §"Video heroes" */}
        <noscript>
          <img
            src={poster ?? src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </noscript>
        <video
          autoPlay
          muted
          playsInline
          loop={loop}
          poster={poster}
          aria-label={alt}
          className="h-full w-full object-cover motion-reduce:hidden"
        >
          <source src={src} />
        </video>
        {poster && (
          <img
            src={poster}
            alt={alt}
            className="hidden h-full w-full object-cover motion-reduce:block"
          />
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized={isSvg(src)}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 720px"
    />
  );
}
