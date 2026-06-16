import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export function Section({
  children,
  className,
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "pt-[var(--spacing-xl)] pb-[var(--spacing-xl)] md:pt-[var(--spacing-3xl)] md:pb-[var(--spacing-2xl)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
