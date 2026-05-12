import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-raised)] p-[var(--spacing-lg)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
