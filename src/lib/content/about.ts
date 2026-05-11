import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  type AboutFrontmatter,
  AboutFrontmatterSchema,
} from "@/lib/schemas/about";

const ABOUT_FILE = path.join(process.cwd(), "content", "about", "about.mdx");

export interface About {
  frontmatter: AboutFrontmatter;
}

export function getAbout(): About {
  const raw = fs.readFileSync(ABOUT_FILE, "utf-8");
  const { data } = matter(raw);

  const result = AboutFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  [${i.path.join(".")}] ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in about.mdx:\n${issues}`);
  }

  return { frontmatter: result.data };
}
