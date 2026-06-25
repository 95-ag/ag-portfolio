import { ViewDownloadButton } from "@/components/about/view-download-button";
import { coverComponents } from "@/components/project/covers";
import { HeroMedia } from "@/components/project/hero-media";
import { HeroMetaOverlay } from "@/components/project/hero-meta-overlay";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { TechStack } from "@/components/project/tech-stack";
import type { Project } from "@/lib/content/projects";
import { Card, GallerySection, Specimen } from "../scaffold-kit/catalog";
import { InertDemo } from "../scaffold-kit/click-guards";

// Placeholder data so the domain components read as schema demos. The cover reuses a real slug, since
// HeroMedia dispatches by slug and images may be reused.
const demoProject: Project = {
  slug: "model-extraction-attacks",
  body: "",
  frontmatter: {
    title: "Project Title",
    subtitle: "A one-line subtitle describing the project",
    summary:
      "A short project summary shown on the card: two or three lines describing the work and the outcome it produced.",
    projectType: "personal",
    publishedAt: "2026-01-01",
    order: 0,
    heroAlt: "Project cover",
    heroVideoLoop: true,
    featured: false,
    tags: ["tag-one", "tag-two", "tag-three"],
    stack: {
      languages: ["Language"],
      frameworks: ["Framework"],
      libraries: ["Library A", "Library B"],
      tools: ["Tool"],
    },
    overview: {
      problem: "The problem this project solves, stated in a sentence or two.",
      built: "What was built: the system, model, or tool, described briefly.",
      results: ["A measurable result", "Another concrete outcome"],
      learnings: ["A transferable learning", "Another takeaway"],
    },
    links: { github: "https://github.com", demo: "https://example.com" },
  },
};

// Sample overlay data so HeroMetaOverlay renders (the demo project has no logos/contributors).
const demoLogos = [
  { src: "/design-system/samples/figure.svg", alt: "Sample logo A" },
  { src: "/design-system/samples/panel-a.svg", alt: "Sample logo B" },
];
const demoContributors = [
  { name: "Sample One", avatar: "/design-system/samples/diagram.svg" },
  { name: "Sample Two", avatar: "/design-system/samples/panel-b.svg" },
];

// Page-bound [inline] sections are listed, not previewed. prose-content owns the list styling.
function InlineList({ items }: { items: string[] }) {
  return (
    <div className="prose-content">
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function DomainSections() {
  return (
    <>
      <GallerySection
        id="home"
        title="Domain · Home Page"
        mapsTo="Domain Components → Home Page"
        source="src/app/page.tsx · [inline]"
        intro="Home-page compositions built inline; listed, not previewed. See them on the home page."
      >
        <InlineList items={["Hero", "Featured Projects Grid"]} />
      </GallerySection>

      <GallerySection
        id="work"
        title="Domain · Work Index"
        mapsTo="Domain Components → Work Index"
        source="src/app/work/page.tsx · [inline]"
        intro="Work-index composition built inline; listed, not previewed. See it on the work index."
      >
        <InlineList items={["Work Index (listing grid)"]} />
      </GallerySection>

      <GallerySection
        id="project"
        title="Domain · Project Detail"
        mapsTo="Domain Components → Project Detail"
        intro="Page/route/schema-bound compositions, shown with placeholder content (images reuse a real cover)."
      >
        <Specimen
          id="project-card"
          name="ProjectCard"
          source="@/components/project/project-card"
          description="Card link to a project page: hero cover, title, summary, up to three tags."
        >
          {/* Natural card width, left-aligned (not centred, not full-bleed). */}
          <div className="max-w-[420px]">
            <ProjectCard project={demoProject} />
          </div>
        </Specimen>

        <Specimen
          id="project-header"
          name="ProjectHeader"
          source="@/components/project/project-header"
        >
          <ProjectHeader frontmatter={demoProject.frontmatter} />
        </Specimen>

        <Specimen
          id="project-hero-media"
          name="HeroMedia"
          source="@/components/project/hero-media"
          description="The 16:9 hero (DESIGN.md → Hero Cover). Dispatches to a live cover, video, or image by slug; a registered cover takes precedence over the image."
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-deep)]">
            <HeroMedia slug={demoProject.slug} alt="Project cover" />
          </div>
        </Specimen>

        <Specimen
          id="project-hero-overlay"
          name="HeroMetaOverlay"
          source="@/components/project/hero-meta-overlay"
          description="A separate, non-interactive overlay on the detail-page hero: logos bottom-left, contributor avatars bottom-right. Shown over a plain, theme-adapted surface-deep hero so the overlay is the focus."
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-deep)]">
            <HeroMetaOverlay
              logos={demoLogos}
              contributors={demoContributors}
            />
          </div>
        </Specimen>

        <Specimen
          id="project-covers"
          name="Cover components"
          source="@/components/project/covers"
          description="One bespoke illustrated SVG cover per project, registered by slug. The registered covers are shown here as samples; each new project adds its own."
        >
          <div className="grid grid-cols-1 gap-[var(--spacing-lg)] md:grid-cols-3">
            {Object.entries(coverComponents).map(([slug, Cover]) => (
              <Card key={slug} label={slug} className="aspect-video p-0">
                <div className="relative h-full w-full overflow-hidden">
                  <Cover />
                </div>
              </Card>
            ))}
          </div>
        </Specimen>

        <Specimen
          id="project-overview"
          name="ProjectOverview"
          source="@/components/project/project-overview"
        >
          <div className="prose-content">
            <ProjectOverview overview={demoProject.frontmatter.overview} />
          </div>
        </Specimen>

        <Specimen
          id="project-tech-stack"
          name="TechStack"
          source="@/components/project/tech-stack"
          description="Definition list of the project's stack. Heading-less; the page owns the 'Tech Stack' heading (like Overview)."
        >
          <div className="prose-content">
            <TechStack stack={demoProject.frontmatter.stack} />
          </div>
        </Specimen>

        <Specimen
          id="project-section-progress"
          name="SectionProgressNav"
          source="@/components/project/section-progress-nav"
          description="Fixed left-rail TOC that scrapes an article's <h2>s via IntersectionObserver. Live on this page; the rail at the left edge (xl+) tracks these sections."
        >
          <p className="body-caption">
            ← Live as the left-rail TOC on this page (xl+), tracking the
            sections above.
          </p>
        </Specimen>

        <Specimen
          id="project-inline"
          name="Inline sections"
          source="src/app/work/[slug]/page.tsx · [inline]"
          description="Page-bound compositions, not standalone components; listed, not previewed. See them on a project page."
        >
          <InlineList
            items={[
              "Project Detail layout",
              "Prose (MDX deep-dive) layout",
              "Editorial two-column layout",
            ]}
          />
        </Specimen>
      </GallerySection>

      <GallerySection
        id="about"
        title="Domain · About Layouts"
        mapsTo="Domain Components → About Layouts"
        intro="Page/route/schema-bound compositions for the About page."
      >
        <Specimen
          id="about-view-download"
          name="ViewDownloadButton"
          source="@/components/about/view-download-button"
          description="The resume action on About: one click opens the PDF in a new tab and downloads it (view or save). A small client island; shown inert here."
        >
          <InertDemo className="flex">
            <ViewDownloadButton href="/AishwaryaGanesan_Resume.pdf">
              Resume
            </ViewDownloadButton>
          </InertDemo>
        </Specimen>

        <Specimen
          id="about-inline"
          name="Inline sections"
          source="src/app/about/page.tsx · [inline]"
          description="Page-bound compositions, not standalone components; listed, not previewed. See them on the About page."
        >
          <InlineList
            items={[
              "Two-panel Intro",
              "Capabilities",
              "Approach",
              "Work with Me",
            ]}
          />
        </Specimen>
      </GallerySection>

      <GallerySection
        id="not-found"
        title="Domain · 404 Not Found"
        mapsTo="Domain Components → 404 Not Found"
        source="src/app/not-found.tsx · [inline]"
        intro="The not-found page, built inline; listed, not previewed."
      >
        <InlineList items={["404 Not Found"]} />
      </GallerySection>
    </>
  );
}
