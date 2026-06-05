import { cn } from "@/lib/utils/cn";

type CodeBlockProps = React.ComponentPropsWithoutRef<"pre">;

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    // Shiki (build-time) sets the background + per-token colors via inline style;
    // CodeBlock only supplies container chrome + mono metrics. `style`/`className`
    // from Shiki are spread through so its theme colors survive.
    <pre
      {...props}
      className={cn(
        "mono-code my-[var(--spacing-2xl)] overflow-x-auto border border-[var(--outline-variant)] px-[var(--spacing-xl)] py-[var(--spacing-md)]",
        className,
      )}
    >
      {children}
    </pre>
  );
}
