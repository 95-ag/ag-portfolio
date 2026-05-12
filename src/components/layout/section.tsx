import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Section({
  children,
  className,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
