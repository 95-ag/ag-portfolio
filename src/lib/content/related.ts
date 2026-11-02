import fs from "node:fs";
import path from "node:path";
import type { RelatedItem } from "@/components/ui/related";
import { getAllPosts } from "./posts";
import { getAllProjects } from "./projects";

const MAX_ITEMS = 3;

// Mirrors posts.ts's drafts directory: a project is always published, so a related entry
// naming a draft would pass in development and fail at release.
const DRAFTS_DIR = path.join(process.cwd(), "content", "blog", "_drafts");

function isDraft(slug: string): boolean {
  return fs.existsSync(path.join(DRAFTS_DIR, `${slug}.mdx`));
}

function dedupeAndCap(items: RelatedItem[]): RelatedItem[] {
  const seen = new Set<string>();
  const unique = items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
  return unique.slice(0, MAX_ITEMS);
}

function resolveSlug(slug: string): RelatedItem | undefined {
  const project = getAllProjects().find((p) => p.slug === slug);
  if (project) {
    return {
      kind: "project",
      title: project.frontmatter.title,
      summary: project.frontmatter.summary,
      href: `/work/${slug}`,
    };
  }
  const post = getAllPosts().find((p) => p.slug === slug);
  if (post) {
    return {
      kind: "post",
      title: post.frontmatter.title,
      summary: post.frontmatter.summary,
      href: `/blog/${slug}`,
    };
  }
  return undefined;
}

// A project's related[] is validated here rather than in projects.ts: posts.ts already
// imports projects.ts, so resolving post slugs there would be an import cycle.
export function getRelatedForProject(slug: string): RelatedItem[] {
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return [];

  const declared = (project.frontmatter.related ?? []).map((target) => {
    const item = resolveSlug(target);
    if (!item) {
      throw new Error(
        `related in "${slug}" references unknown slug: "${target}"`,
      );
    }
    if (item.kind === "post" && isDraft(target)) {
      throw new Error(
        `related in "${slug}" references "${target}", which is still a draft — publish it first.`,
      );
    }
    return item;
  });

  const reverse = getAllPosts()
    .filter((post) => post.frontmatter.relatedProject === slug)
    .map(
      (post): RelatedItem => ({
        kind: "post",
        title: post.frontmatter.title,
        summary: post.frontmatter.summary,
        href: `/blog/${post.slug}`,
      }),
    );

  return dedupeAndCap([...reverse, ...declared]);
}

export function getRelatedForPost(slug: string): RelatedItem[] {
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return [];

  const { relatedProject, related } = post.frontmatter;
  const targets = [
    ...(relatedProject ? [relatedProject] : []),
    ...(related ?? []),
  ];
  const items = targets.flatMap((target) => resolveSlug(target) ?? []);
  return dedupeAndCap(items);
}
