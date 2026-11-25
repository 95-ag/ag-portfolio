"use client";

import { type ReactNode, useEffect, useRef } from "react";

// The quote takes the space between the title and the type line, so it shows as many whole lines as fit and ends in an
// ellipsis (writing.css clamps by `--quote-lines`). A tile's size, its title's length and the type scale all change what
// fits, so the line count is read from the space the quote actually has.
export function FitQuote({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight);
      if (!lineHeight) return;
      const lines = Math.max(
        1,
        Math.floor((el.clientHeight + 0.5) / lineHeight),
      );
      el.style.setProperty("--quote-lines", String(lines));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
