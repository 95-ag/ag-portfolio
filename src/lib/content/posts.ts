import fs from "node:fs";
import path from "node:path";
import { getAllProjects } from "@/lib/content/projects";
import {
  type PostFrontmatter,
  PostFrontmatterSchema,
} from "@/lib/schemas/post";
import { parseFrontmatter } from "./frontmatter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
// Drafts are gitignored, so they never reach the public repo or a release snapshot. They
// are read in development only, so a local production build matches what ships.
const DRAFTS_DIR = path.join(BLOG_DIR, "_drafts");

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  isDraft: boolean;
}

function parsePost(dir: string, filename: string, isDraft: boolean): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
  const { data, content } = parseFrontmatter(raw);

  const result = PostFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  [${i.path.join(".")}] ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${filename}:\n${issues}`);
  }

  return { slug, frontmatter: result.data, body: content, isDraft };
}

// A clean clone has no content/blog/ until the first post is published — git cannot
// track an empty directory — so a missing directory means no posts, not an error.
function readPosts(dir: string, isDraft: boolean): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePost(dir, f, isDraft));
}

export function getAllPosts(): Post[] {
  const published = readPosts(BLOG_DIR, false);
  const drafts =
    process.env.NODE_ENV === "development" ? readPosts(DRAFTS_DIR, true) : [];

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
    for (const slug of related ?? []) {
      if (!projectSlugs.has(slug) && !postSlugs.has(slug)) {
        throw new Error(
          `related in "${post.slug}" references unknown slug: "${slug}"`,
        );
      }
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

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
