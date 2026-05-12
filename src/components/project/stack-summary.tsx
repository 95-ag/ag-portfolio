import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface StackSummaryProps {
  stack: ProjectFrontmatter["stack"];
}

const CATEGORY_LABELS: Record<keyof ProjectFrontmatter["stack"], string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  libraries: "Libraries",
  tools: "Tools",
};

export function StackSummary({ stack }: StackSummaryProps) {
  const entries = (
    Object.entries(stack) as [keyof ProjectFrontmatter["stack"], string[]][]
  ).filter(([, items]) => items.length > 0);

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-[var(--spacing-md)]">
      {entries.map(([category, items]) => (
        <div key={category} className="flex flex-col gap-[var(--spacing-xs)]">
          <p className="type-body-xs text-[var(--on-surface-muted)] opacity-50 uppercase tracking-widest">
            {CATEGORY_LABELS[category]}
          </p>
          <p className="type-body-sm text-[var(--on-surface-muted)] leading-relaxed">
            {items.join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}
