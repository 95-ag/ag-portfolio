import { getAbout } from "@/lib/content/about";
import { getAllProjects } from "@/lib/content/projects";

export const dynamic = "force-static";

const SITE_URL = "https://ag-portfolio.vercel.app";

export function GET() {
  const { frontmatter: about } = getAbout();
  const projects = getAllProjects();

  const aboutSection = about.detailedPositioning
    .split("\n\n")
    .filter((p) => p.trim().length > 0)
    .map((p) => p.trim())
    .join("\n\n");

  const capabilitiesSection = about.capabilities
    .map((c) => `- ${c.area}: ${c.tags.join(", ")}`)
    .join("\n");

  const projectsSection = projects
    .map(
      (p) =>
        `### ${p.frontmatter.title}\n\n- [Case Study](${SITE_URL}/work/${p.slug}): ${p.frontmatter.summary}`,
    )
    .join("\n\n");

  const body = [
    `# ${about.name}`,
    "",
    `> ${about.positioning}`,
    "",
    "## Key Pages",
    "",
    `- [About](${SITE_URL}/about): Background, capabilities, and approach`,
    `- [Work](${SITE_URL}/work): All project case studies`,
    "",
    "## About",
    "",
    aboutSection,
    "",
    "## Capabilities",
    "",
    capabilitiesSection,
    "",
    "## Projects",
    "",
    `- [Work Index](${SITE_URL}/work): All case studies and projects`,
    "",
    projectsSection,
    "",
    "## Contact",
    "",
    `- [LinkedIn](${about.socials.linkedin ?? "https://www.linkedin.com/in/aishganesan/"})`,
    `- [GitHub](${about.socials.github ?? "https://github.com/95-ag"})`,
    `- [Portfolio](${SITE_URL})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
