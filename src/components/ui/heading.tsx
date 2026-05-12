import { cn } from "@/lib/utils/cn";

type TypeScale =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "headline-lg"
  | "headline-md"
  | "headline-sm";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  type: TypeScale;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, type, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cn(`type-${type}`, "text-[var(--on-surface)]", className)}>
      {children}
    </Tag>
  );
}
