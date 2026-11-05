import fs from "node:fs";
import path from "node:path";

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const PUBLIC_DIR = path.join(process.cwd(), "public");

// The slug is the filename, and it reaches URLs and the RSS feed unescaped.
export function assertKebabSlug(slug: string, filename: string): void {
  if (!KEBAB_CASE.test(slug)) {
    throw new Error(`${filename}: the filename must be lowercase kebab-case.`);
  }
}

export function assertPublicFiles(
  filename: string,
  paths: Record<string, string | undefined>,
): void {
  for (const [field, webPath] of Object.entries(paths)) {
    if (webPath && !fs.existsSync(path.join(PUBLIC_DIR, webPath))) {
      throw new Error(
        `Invalid frontmatter in ${filename}:\n  [${field}] no file at public${webPath}`,
      );
    }
  }
}

// Presentation in content goes through named props (DESIGN.md → Components → Document). Code samples
// may legitimately show `className=`, so fenced blocks and inline code are skipped.
export function assertNoClassName(body: string, filename: string): void {
  let inFence = false;
  const lines: number[] = [];
  body.split("\n").forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (!inFence && /\bclassName=/.test(line.replace(/`[^`]*`/g, ""))) {
      lines.push(i + 1);
    }
  });
  if (lines.length > 0) {
    throw new Error(
      `${filename}: className is not allowed in MDX content (body lines ${lines.join(", ")}); use the component's named props.`,
    );
  }
}
