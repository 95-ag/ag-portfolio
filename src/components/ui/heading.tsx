import { cn } from "@/lib/utils/cn";

type SemanticType =
  | "display-primary"
  | "heading-display"
  | "heading-section"
  | "heading-component"
  | "heading-narrative";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  type: SemanticType;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, type, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(type, className)}>{children}</Tag>;
}
