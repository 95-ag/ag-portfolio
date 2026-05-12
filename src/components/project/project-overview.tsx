import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface ProjectOverviewProps {
  overview: ProjectFrontmatter["overview"];
}

function OverviewRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-sm)] md:flex-row md:gap-[var(--spacing-xl)]">
      <p className="type-mono-label w-full shrink-0 text-[var(--on-surface-muted)] md:w-[140px]">
        {label}
      </p>
      <div className="type-body-md min-w-0 flex-1 text-[var(--on-surface)]">
        {children}
      </div>
    </div>
  );
}

export function ProjectOverview({ overview }: ProjectOverviewProps) {
  const skillsLabel = overview.transferableSkills
    ? "Transferable Skills"
    : "Learnings";
  const skillsList = overview.transferableSkills ?? overview.learnings ?? [];

  return (
    <section
      aria-label="Project overview"
      className="flex flex-col gap-[var(--spacing-xl)]"
    >
      <OverviewRow label="Problem">
        <p>{overview.problem}</p>
      </OverviewRow>

      <OverviewRow label="What I built">
        <p>{overview.built}</p>
      </OverviewRow>

      {overview.results && overview.results.length > 0 && (
        <OverviewRow label="Results">
          <ul className="flex flex-col gap-[var(--spacing-xs)]">
            {overview.results.map((result) => (
              <li key={result} className="flex gap-[var(--spacing-sm)]">
                <span
                  aria-hidden="true"
                  className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--outline-variant)]"
                />
                {result}
              </li>
            ))}
          </ul>
        </OverviewRow>
      )}

      {skillsList.length > 0 && (
        <OverviewRow label={skillsLabel}>
          <ul className="flex flex-col gap-[var(--spacing-xs)]">
            {skillsList.map((skill) => (
              <li key={skill} className="flex gap-[var(--spacing-sm)]">
                <span
                  aria-hidden="true"
                  className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--outline-variant)]"
                />
                {skill}
              </li>
            ))}
          </ul>
        </OverviewRow>
      )}
    </section>
  );
}
