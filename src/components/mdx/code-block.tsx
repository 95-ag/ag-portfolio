import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "mono-code my-[var(--spacing-2xl)] overflow-x-auto rounded-[var(--radius-md)] border border-[var(--outline-variant)] px-[var(--spacing-xl)] py-[var(--spacing-md)]",
        className,
      )}
    >
      {children}
    </pre>
  );
}
