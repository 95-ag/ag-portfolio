import fs from "node:fs";
import path from "node:path";
import { getAllProjects } from "@/lib/content/projects";
import {
  type PostFrontmatter,
  PostFrontmatterSchema,
} from "@/lib/schemas/post";
import { parseFrontmatter } from "./frontmatter";
import {
  assertKebabSlug,
  assertNoClassName,
  assertPublicFiles,
} from "./validate";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");
// Drafts are gitignored, so they never reach the public repo or a release snapshot. They
// are read in development only, so a local production build matches what ships.
const DRAFTS_DIR = path.join(WRITING_DIR, "_drafts");

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
}

function parsePost(dir: string, filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
  const { data, content } = parseFrontmatter(raw, filename);

  const result = PostFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  [${i.path.join(".")}] ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${filename}:\n${issues}`);
  }
  assertKebabSlug(slug, filename);
  assertNoClassName(content, filename);
  assertPublicFiles(filename, { ogImage: result.data.ogImage });

  return { slug, frontmatter: result.data, body: content };
}

// A clean clone has no content/writing/ until the first post is published — git cannot
// track an empty directory — so a missing directory means no posts, not an error.
function readPosts(dir: string): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePost(dir, f));
}

export function getAllPosts(): Post[] {
  const published = readPosts(WRITING_DIR);
  const drafts =
    process.env.NODE_ENV === "development" ? readPosts(DRAFTS_DIR) : [];

  const publishedSlugs = new Set(published.map((p) => p.slug));
  for (const draft of drafts) {
    if (publishedSlugs.has(draft.slug)) {
      throw new Error(
        `Draft "${draft.slug}" has the same slug as a published post.`,
      );
    }
  }

  const posts = [...published, ...drafts];
  const projectSlugs = new Set(getAllProjects().map((p) => p.slug));
  const draftSlugs = new Set(drafts.map((p) => p.slug));
  const postSlugs = new Set(posts.map((p) => p.slug));

  for (const post of posts) {
    if (projectSlugs.has(post.slug)) {
      throw new Error(`Post slug "${post.slug}" collides with a project slug.`);
    }
    const { relatedProject, related } = post.frontmatter;
    if (relatedProject && !projectSlugs.has(relatedProject)) {
      throw new Error(
        `relatedProject in "${post.slug}" references unknown project slug: "${relatedProject}"`,
      );
    }
    // A published post may only point at published posts: drafts vanish from the production
    // build, so a link to one would pass in development and fail at release.
    const linkable = draftSlugs.has(post.slug) ? postSlugs : publishedSlugs;
    for (const slug of related ?? []) {
      if (projectSlugs.has(slug) || linkable.has(slug)) continue;
      throw new Error(
        draftSlugs.has(slug)
          ? `related in "${post.slug}" references "${slug}", which is still a draft — publish it first.`
          : `related in "${post.slug}" references unknown slug: "${slug}"`,
      );
    }
  }

  // Newest first; ties break by slug so the build order is deterministic.
  return posts.sort((a, b) => {
    if (a.frontmatter.publishedAt !== b.frontmatter.publishedAt) {
      return b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt);
    }
    return a.slug.localeCompare(b.slug);
  });
}

// A post's palette slot is its place in publish order, oldest first, wrapping after twelve. Ties
// break by slug, as the listing does.
export function postColourSlots(
  posts: Pick<Post, "slug" | "frontmatter">[],
): Map<string, number> {
  const oldestFirst = [...posts].sort(
    (a, b) =>
      a.frontmatter.publishedAt.localeCompare(b.frontmatter.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
  return new Map(oldestFirst.map((p, i) => [p.slug, (i % 12) + 1]));
}

export function postColour(slug: string): number {
  const slot = postColourSlots(getAllPosts()).get(slug);
  if (slot === undefined) throw new Error(`No post with slug "${slug}".`);
  return slot;
}

export function isDraft(slug: string): boolean {
  return fs.existsSync(path.join(DRAFTS_DIR, `${slug}.mdx`));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
