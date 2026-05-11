import type { MDXComponents } from "mdx/types";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: "default" | "wide" | "full";
}

function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure>
      {/* biome-ignore lint/performance/noImgElement: Phase 1 stub — next/image wired in Phase 2 */}
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Diagram({ src, alt, caption }: FigureProps) {
  return (
    <figure>
      {/* biome-ignore lint/performance/noImgElement: Phase 1 stub — next/image wired in Phase 2 */}
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

interface CalloutProps {
  type?: "insight" | "tradeoff" | "warning";
  title?: string;
  children: React.ReactNode;
}

function Callout({ title, children }: CalloutProps) {
  return (
    <aside role="note">
      {title && <strong>{title}</strong>}
      {children}
    </aside>
  );
}

interface StackProps {
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

function Stack({ children }: StackProps) {
  return <div className="flex flex-col">{children}</div>;
}

export const mdxComponents: MDXComponents = {
  Figure,
  Diagram,
  Callout,
  Stack,
};
