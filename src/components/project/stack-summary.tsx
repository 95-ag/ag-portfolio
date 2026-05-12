import { Tag } from "@/components/ui/tag";
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
        <div key={category}>
          <p className="type-mono-label mb-[var(--spacing-xs)] text-[var(--on-surface-muted)]">
            {CATEGORY_LABELS[category]}
          </p>
          <div className="flex flex-wrap gap-[var(--spacing-xs)]">
            {items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
