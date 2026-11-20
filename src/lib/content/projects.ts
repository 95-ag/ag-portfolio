import fs from "node:fs";
import path from "node:path";
import {
  artefactComponents,
  coverComponents,
} from "@/components/project/covers";
import {
  type ProjectFrontmatter,
  ProjectFrontmatterSchema,
} from "@/lib/schemas/project";
import { parseFrontmatter } from "./frontmatter";
import {
  assertKebabSlug,
  assertNoClassName,
  assertProjectSet,
  assertPublicFiles,
} from "./validate";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
}

// What a cover needs to draw: a project, or a post carrying its own cover (DESIGN.md → Domain Components → Hero Cover).
export interface CoverSubject {
  slug: string;
  colour: number;
  cover?: ProjectFrontmatter["cover"];
  heroImage?: string;
  heroAlt?: string;
  heroPoster?: string;
  heroVideoLoop?: boolean;
}

export function coverSubject({ slug, frontmatter: fm }: Project): CoverSubject {
  return {
    slug,
    colour: fm.colour,
    cover: fm.cover,
    heroImage: fm.heroImage,
    heroAlt: fm.heroAlt,
    heroPoster: fm.heroPoster,
    heroVideoLoop: fm.heroVideoLoop,
  };
}

function getProjectFiles(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseProject(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, "");
  const filepath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = parseFrontmatter(raw, filename);

  const result = ProjectFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  [${i.path.join(".")}] ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${filename}:\n${issues}`);
  }
  assertKebabSlug(slug, filename);
  assertNoClassName(content, filename);
  const fm = result.data;
  assertPublicFiles(filename, {
    heroImage: fm.heroImage,
    heroPoster: fm.heroPoster,
    ogImage: fm.ogImage,
    ...Object.fromEntries(
      (fm.logos ?? []).map((logo, i) => [`logos.${i}.src`, logo.src]),
    ),
    ...Object.fromEntries(
      (fm.contributors ?? []).map((c, i) => [
        `contributors.${i}.avatar`,
        c.avatar,
      ]),
    ),
  });

  return { slug, frontmatter: fm, body: content };
}

export function getAllProjects(): Project[] {
  const files = getProjectFiles();
  const projects = files.map(parseProject);

  assertProjectSet(projects);

  // Production release gate: a published project must declare a cover whose source exists
  // (a registered live cover, or a heroImage for the image and video kinds), and a static
  // hero must carry alt text. Dev/preview builds stay permissive (the hero may be empty
  // until the cover stage); only the live production build (VERCEL_ENV=production) fails.
  // heroAlt is required only where a heroImage is the visible hero: live-cover projects also
  // set heroImage as their OG raster, but the cover is aria-hidden and decorative, so alt
  // text for it would render nothing. Every check reports together so one blocker never
  // hides another.
  if (process.env.VERCEL_ENV === "production") {
    const coverless = projects.filter((p) => !p.frontmatter.cover);
    const sourceless = projects.filter((p) => {
      const kind = p.frontmatter.cover?.kind;
      if (kind === "live") return !coverComponents[p.slug];
      if (kind === "artefact") return !artefactComponents[p.slug];
      if (kind === "image" || kind === "video") return !p.frontmatter.heroImage;
      return false;
    });
    const unlabelled = projects.filter(
      (p) =>
        p.frontmatter.heroImage &&
        !coverComponents[p.slug] &&
        !p.frontmatter.heroAlt,
    );

    const problems: string[] = [];
    if (coverless.length > 0) {
      problems.push(
        `no cover declared: ${coverless
          .map((p) => p.slug)
          .join(", ")}. Add a cover (kind, light, dark) to the frontmatter.`,
      );
    }
    if (sourceless.length > 0) {
      problems.push(
        `a cover with no source (a live cover or artefact is not registered, or an image or video cover has no heroImage): ${sourceless
          .map((p) => p.slug)
          .join(", ")}.`,
      );
    }
    if (unlabelled.length > 0) {
      problems.push(
        `a static heroImage with no heroAlt: ${unlabelled
          .map((p) => p.slug)
          .join(", ")}. Add heroAlt describing the hero image.`,
      );
    }
    if (problems.length > 0) {
      throw new Error(
        `Production release blocked — project(s) have ${problems.join("\n  Project(s) have ")}`,
      );
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

export function getProjectsForWork(): Project[] {
  // Work index is ordered newest-first by publish date; `order` breaks ties.
  return getAllProjects().sort((a, b) => {
    const dateDiff =
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.frontmatter.order - b.frontmatter.order;
  });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.frontmatter.featured)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
