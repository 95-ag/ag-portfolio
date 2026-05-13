import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface TechStackProps {
  stack: ProjectFrontmatter["stack"];
}

const CATEGORY_LABELS: Record<keyof ProjectFrontmatter["stack"], string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  libraries: "Libraries",
  tools: "Tools",
};

export function TechStack({ stack }: TechStackProps) {
  const entries = (
    Object.entries(stack) as [keyof ProjectFrontmatter["stack"], string[]][]
  ).filter(([, items]) => items.length > 0);

  if (entries.length === 0) return null;

  return (
    <section aria-label="Tech stack">
      <h2>Tech Stack</h2>
      {entries.map(([category, items]) => (
        <div key={category}>
          <h3>{CATEGORY_LABELS[category]}</h3>
          <p>{items.join(" · ")}</p>
        </div>
      ))}
    </section>
  );
}
