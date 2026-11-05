import type { AboutFrontmatter } from "@/lib/schemas/about";
import type { PostFrontmatter } from "@/lib/schemas/post";
import { isVideo, type ProjectFrontmatter } from "@/lib/schemas/project";
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

// Serialize a JSON-LD object for embedding in a <script> tag. JSON.stringify does
// not escape `<`, so a value containing `</script>` would break out of the tag.
// Escaping the HTML-significant characters closes that injection sink. (The script
// is type="application/ld+json", not executed as JS, so JS line separators are moot.)
export function serializeJsonLd(schema: object): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: AUTHOR_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    creator: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
  };
}

export function buildPersonSchema(
  about: AboutFrontmatter,
  extraTags: string[] = [],
) {
  const capabilityTags = about.capabilities.flatMap((c) => c.tags);
  const seen = new Set(capabilityTags.map((t) => t.toLowerCase()));
  const uniqueExtraTags = extraTags.filter((t) => {
    const lower = t.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
  const merged = [...capabilityTags, ...uniqueExtraTags];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    url: SITE_URL,
    jobTitle: "ML AI Engineer",
    description: about.positioning,
    image: `${SITE_URL}${about.headshot}`,
    sameAs: [about.socials.github, about.socials.linkedin].filter(Boolean),
    knowsAbout: merged,
  };
}

// Matches the page's OG image (ogImage, else heroImage), but a video hero is not an image.
function projectImage(fm: ProjectFrontmatter): string | undefined {
  if (fm.ogImage) return fm.ogImage;
  return fm.heroImage && !isVideo(fm.heroImage) ? fm.heroImage : undefined;
}

export function buildSoftwareSourceCodeSchema(
  slug: string,
  fm: ProjectFrontmatter,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: fm.title,
    description: fm.metaDescription ?? fm.summary,
    url: `${SITE_URL}/work/${slug}`,
    datePublished: new Date(fm.publishedAt).toISOString(),
    // publishedAt is the project's own date, not the page's, so it is no stand-in for a modified date.
    ...(fm.updatedAt
      ? { dateModified: new Date(fm.updatedAt).toISOString() }
      : {}),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    keywords: fm.tags.join(", "),
    ...(projectImage(fm) ? { image: `${SITE_URL}${projectImage(fm)}` } : {}),
    ...(fm.links?.github ? { codeRepository: fm.links.github } : {}),
  };
}

export function buildBlogPostingSchema(slug: string, fm: PostFrontmatter) {
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.metaDescription ?? fm.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    datePublished: new Date(fm.publishedAt).toISOString(),
    dateModified: new Date(fm.updatedAt ?? fm.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    keywords: fm.tags.join(", "),
    image: `${SITE_URL}${fm.ogImage ?? "/opengraph-image"}`,
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
