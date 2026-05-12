import Image from "next/image";

interface HeroMediaProps {
  src: string;
  alt: string;
  poster?: string;
  loop?: boolean;
}

function isVideo(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

function isSvg(src: string) {
  return /\.svg$/i.test(src);
}

export function HeroMedia({ src, alt, poster, loop = true }: HeroMediaProps) {
  if (isVideo(src)) {
    return (
      <>
        {/* motion-reduce: video hidden, poster shown via next/image */}
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
          <Image
            src={poster}
            alt={alt}
            fill
            className="hidden object-cover motion-reduce:block"
            unoptimized={isSvg(poster)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 720px"
          />
        )}
      </>
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
