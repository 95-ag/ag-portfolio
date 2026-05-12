import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "type-mono-data my-[var(--spacing-2xl)] overflow-x-auto rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-sunken)] px-[var(--spacing-xl)] py-[var(--spacing-md)]",
        className,
      )}
    >
      {children}
    </pre>
  );
}
