import Link from "next/link";
import { getAllProjects } from "@/lib/content/projects";

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <section>
      <h1>Work</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`}>
              {project.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
