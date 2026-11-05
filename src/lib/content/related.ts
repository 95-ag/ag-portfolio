import type { RelatedItem } from "@/components/ui/display/related";
import { getAllPosts, isDraft } from "./posts";
import { getAllProjects } from "./projects";

function selfListed(slug: string): Error {
  return new Error(`related in "${slug}" lists "${slug}" itself.`);
}

// The display cap lives in the Related component; this only removes repeats.
function dedupe(items: RelatedItem[]): RelatedItem[] {
  const seen = new Set<string>();
  const unique = items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
  return unique;
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
    if (target === slug) throw selfListed(slug);
    const item = resolveSlug(target);
    if (!item) {
      throw new Error(
        `related in "${slug}" references unknown slug: "${target}"`,
      );
    }
    // A project is always published, so a related entry naming a draft would pass in
    // development and fail at release.
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

  return dedupe([...reverse, ...declared]);
}

export function getRelatedForPost(slug: string): RelatedItem[] {
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return [];

  const { relatedProject, related } = post.frontmatter;
  if (related?.includes(slug)) throw selfListed(slug);
  const targets = [
    ...(relatedProject ? [relatedProject] : []),
    ...(related ?? []),
  ];
  const items = targets.map((target) => {
    const item = resolveSlug(target);
    if (!item) {
      throw new Error(
        `related in "${slug}" references unknown slug: "${target}"`,
      );
    }
    return item;
  });
  return dedupe(items);
}
