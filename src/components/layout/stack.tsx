import { cn } from "@/lib/utils/cn";

type GapToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const gapClass: Record<GapToken, string> = {
  xs: "gap-[var(--spacing-xs)]",
  sm: "gap-[var(--spacing-sm)]",
  md: "gap-[var(--spacing-md)]",
  lg: "gap-[var(--spacing-lg)]",
  xl: "gap-[var(--spacing-xl)]",
  "2xl": "gap-[var(--spacing-2xl)]",
  "3xl": "gap-[var(--spacing-3xl)]",
};

interface StackProps {
  children: React.ReactNode;
  className?: string;
  gap?: GapToken;
  as?: React.ElementType;
}

export function Stack({
  children,
  className,
  gap = "md",
  as: Tag = "div",
}: StackProps) {
  return (
    <Tag className={cn("flex flex-col", gapClass[gap], className)}>
      {children}
    </Tag>
  );
}
