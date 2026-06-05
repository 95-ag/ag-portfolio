import type { AboutFrontmatter } from "@/lib/schemas/about";
import type { ProjectFrontmatter } from "@/lib/schemas/project";

const SITE_URL = "https://ag-portfolio.vercel.app";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AG — AI/ML Engineer",
    url: SITE_URL,
    description:
      "Portfolio of Aishwarya Ganesan, an AI/ML engineer building practical machine learning systems.",
    creator: {
      "@type": "Person",
      name: "Aishwarya Ganesan",
    },
  };
}

export function buildPersonSchema(about: AboutFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    url: SITE_URL,
    jobTitle: "AI/ML Engineer",
    description: about.positioning,
    image: `${SITE_URL}${about.headshot}`,
    sameAs: [about.socials.github, about.socials.linkedin].filter(Boolean),
    knowsAbout: about.capabilities.flatMap((c) => c.tags),
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
