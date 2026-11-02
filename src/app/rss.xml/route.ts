import { getAllPosts } from "@/lib/content/posts";
import { FEED_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getAllPosts().map((post) => {
    const { frontmatter: fm } = post;
    const url = `${SITE_URL}/blog/${post.slug}`;
    return [
      "    <item>",
      `      <title>${escapeXml(fm.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(fm.publishedAt).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(fm.metaDescription ?? fm.summary)}</description>`,
      "    </item>",
    ].join("\n");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
