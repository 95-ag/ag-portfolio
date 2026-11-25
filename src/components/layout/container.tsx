import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  // `cap`: the 1440px content box plus the page margin each side — Home, About, Work and Writing.
  width?: "default" | "cap";
}

const WIDTH_CLASSES = {
  default: "max-w-[1200px]",
  cap: "max-w-[calc(var(--layout-content-cap)_+_2_*_var(--page-margin))]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--page-margin)]",
        WIDTH_CLASSES[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
