import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface ProjectOverviewProps {
  overview: ProjectFrontmatter["overview"];
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
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
      <dl className="editorial-dl">
        <dt>Problem</dt>
        <dd>
          <p>{overview.problem}</p>
        </dd>

        <dt>What I built</dt>
        <dd>
          <p>{overview.built}</p>
        </dd>

        {overview.results && overview.results.length > 0 && (
          <>
            <dt>Results</dt>
            <dd>
              <BulletList items={overview.results} />
            </dd>
          </>
        )}

        {skillsList.length > 0 && (
          <>
            <dt>{skillsLabel}</dt>
            <dd>
              <BulletList items={skillsList} />
            </dd>
          </>
        )}
      </dl>
    </section>
  );
}
