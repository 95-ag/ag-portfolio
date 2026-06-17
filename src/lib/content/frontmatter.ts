import { parse } from "yaml";

export interface ParsedFrontmatter {
  data: Record<string, unknown>;
  content: string;
}

// Matches a leading `---` fenced YAML block (optional BOM), mirroring gray-matter's { data, content }
// contract. Frontmatter is owner-authored and uses standard YAML only, so a single anchored match is
// sufficient — no need for gray-matter's excerpt/custom-delimiter/engine machinery.
const FRONTMATTER_RE = /^﻿?---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/;

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    return { data: {}, content: raw };
  }
  const data = (parse(match[1]) ?? {}) as Record<string, unknown>;
  return { data, content: raw.slice(match[0].length) };
}
