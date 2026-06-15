import type { AboutFrontmatter } from "@/lib/schemas/about";
import type { ProjectFrontmatter } from "@/lib/schemas/project";
import { SITE_URL } from "@/lib/site";

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
    name: "Aishwarya Ganesan",
    url: SITE_URL,
    description:
      "AI engineer building AI systems like real software — applied ML, retrieval, and computer vision.",
    creator: {
      "@type": "Person",
      name: "Aishwarya Ganesan",
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

export function buildCreativeWorkSchema(slug: string, fm: ProjectFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: fm.title,
    description: fm.metaDescription ?? fm.summary,
    url: `${SITE_URL}/work/${slug}`,
    datePublished: new Date(fm.publishedAt).toISOString(),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Aishwarya Ganesan",
      url: SITE_URL,
    },
    keywords: fm.tags.join(", "),
    ...(fm.heroImage ? { image: `${SITE_URL}${fm.heroImage}` } : {}),
    ...(fm.links?.github ? { codeRepository: fm.links.github } : {}),
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
