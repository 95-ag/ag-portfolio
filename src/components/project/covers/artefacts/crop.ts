import type { CSSProperties } from "react";

// A sub-rectangle of a source image as CSS background geometry: `[x, y, w, h]` in the image's own pixels.
export function crop(
  src: string,
  [imgW, imgH]: [number, number],
  [x, y, w, h]: [number, number, number, number],
): CSSProperties {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${(imgW / w) * 100}% ${(imgH / h) * 100}%`,
    backgroundPosition: `${(x / (imgW - w)) * 100}% ${(y / (imgH - h)) * 100}%`,
  };
}
