import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface ProjectOverviewProps {
  overview: ProjectFrontmatter["overview"];
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-[var(--spacing-xs)]">
      {items.map((item) => (
        <li key={item} className="flex gap-[var(--spacing-sm)]">
          <span
            aria-hidden="true"
            className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--outline-variant)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectOverview({ overview }: ProjectOverviewProps) {
  const skillsLabel = overview.transferableSkills
    ? "Transferable Skills"
    : "Learnings";
  const skillsList = overview.transferableSkills ?? overview.learnings ?? [];

  return (
    <section aria-label="Project overview">
      <h3>Problem</h3>
      <p>{overview.problem}</p>

      <h3>What I built</h3>
      <p>{overview.built}</p>

      {overview.results && overview.results.length > 0 && (
        <>
          <h3>Results</h3>
          <BulletList items={overview.results} />
        </>
      )}

      {skillsList.length > 0 && (
        <>
          <h3>{skillsLabel}</h3>
          <BulletList items={skillsList} />
        </>
      )}
    </section>
  );
}
