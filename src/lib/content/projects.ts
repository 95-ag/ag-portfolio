import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  type ProjectFrontmatter,
  ProjectFrontmatterSchema,
} from "@/lib/schemas/project";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
}

function getProjectFiles(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
}

function parseProject(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, "");
  const filepath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  const result = ProjectFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  [${i.path.join(".")}] ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${filename}:\n${issues}`);
  }

  return { slug, frontmatter: result.data, body: content };
}

export function getAllProjects(): Project[] {
  const files = getProjectFiles();
  const projects = files.map(parseProject);

  // Cross-file validation
  const featured = projects.filter((p) => p.frontmatter.featured);
  if (featured.length > 3) {
    throw new Error(
      `Too many featured projects (${featured.length}). Maximum is 3.`,
    );
  }

  const allSlugs = new Set(projects.map((p) => p.slug));
  for (const project of projects) {
    for (const related of project.frontmatter.relatedProjects ?? []) {
      if (!allSlugs.has(related)) {
        throw new Error(
          `relatedProjects in "${project.slug}" references unknown slug: "${related}"`,
        );
      }
    }
  }

  return projects.sort((a, b) => {
    if (a.frontmatter.order !== b.frontmatter.order) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    return (
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
    );
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  const files = getProjectFiles();
  const filename = files.find((f) => f.replace(/\.mdx$/, "") === slug);
  if (!filename) return undefined;
  return parseProject(filename);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.frontmatter.featured)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
