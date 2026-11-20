import { Spotlight } from "@/components/home/spotlight";
import { Cover } from "@/components/project/cover";
import { HeroMedia } from "@/components/project/hero-media";
import { HeroMetaOverlay } from "@/components/project/hero-meta-overlay";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { SectionProgressNav } from "@/components/project/section-progress-nav";
import { TechStack } from "@/components/project/tech-stack";
import { PostRail } from "@/components/writing/post-rail";
import { PostTile, PostTiles } from "@/components/writing/post-tile";
import { TypeLabel } from "@/components/writing/type-label";
import type { Post } from "@/lib/content/posts";
import {
  type CoverSubject,
  coverSubject,
  getFeaturedProjects,
  type Project,
} from "@/lib/content/projects";
import { Card, GallerySection, Specimen } from "../scaffold-kit/catalog";
import { ChromeFrame } from "../scaffold-kit/chrome-frame";
import { InertDemo } from "../scaffold-kit/click-guards";

// Placeholder data so the domain components read as schema demos. The cover reuses a real slug, since
// HeroMedia dispatches by slug and images may be reused.
const demoProject: Project = {
  slug: "self-building-portfolio",
  body: "",
  frontmatter: {
    title: "Project Title",
    subtitle: "A one-line subtitle describing the project",
    summary:
      "A short project summary shown on the card: two or three lines describing the work and the outcome it produced.",
    projectType: "personal",
    publishedAt: "2026-01-01",
    order: 0,
    colour: 2,
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

// Sample posts. The art tile and the rail name a real project (its cover is real); a post with none, or a note,
// takes the dog-ear. The art tile's colour slot is passed in, since a sample has no place in publish order.
const demoPosts: Record<"quote" | "note" | "art" | "long", Post> = {
  quote: {
    slug: "sample-quote",
    body: "",
    frontmatter: {
      title: "A post with no related project",
      summary:
        "A short pull quote that stands in for a post's summary, long enough to wrap onto a second line.",
      publishedAt: "2026-02-01",
      type: "teardown",
      tags: ["tag-one", "tag-two"],
    },
  },
  note: {
    slug: "sample-note",
    body: "",
    frontmatter: {
      title: "A note about something small",
      summary: "Notes take the dog-ear even when they name a project.",
      publishedAt: "2026-01-20",
      type: "note",
      tags: ["tag-one"],
      relatedProject: "masked-autoencoders",
    },
  },
  art: {
    slug: "sample-art",
    body: "A post body of a few words, long enough to read as one minute.",
    frontmatter: {
      title: "A post with a cover of its own",
      summary:
        "Its tile on the index carries its own cover; hover a tile to slide it down.",
      publishedAt: "2026-01-15",
      updatedAt: "2026-01-20",
      type: "essay",
      addons: [
        { kind: "template", price: "free" },
        { kind: "guide", price: "paid" },
      ],
      tags: ["tag-one", "tag-two", "tag-three"],
      relatedProject: "masked-autoencoders",
      cover: { kind: "live", light: "filled", dark: "marker" },
    },
  },
  long: {
    slug: "sample-long",
    body: "",
    frontmatter: {
      title:
        "A longer post title that wraps onto a second line at narrow widths",
      summary:
        "A longer summary that runs to a few lines, to show where the type line sits when the quote is long.",
      publishedAt: "2026-01-10",
      type: "deep-dive",
      tags: ["tag-one"],
    },
  },
};

// Dedicated logo/avatar samples (not the diagram/figure ones) — fixed colours, since logos sit on a
// white badge and avatars are cover-cropped into a small circle.
const demoLogos = [
  {
    src: "/design-system/samples/logo-a.svg",
    alt: "Sample logo A",
    name: "Sample Institute",
    location: "Stockholm, Sweden",
  },
  {
    src: "/design-system/samples/logo-b.svg",
    alt: "Sample logo B",
    name: "Sample Company",
    url: "https://example.com",
  },
];
const demoContributors = [
  {
    name: "Sample One",
    avatar: "/design-system/samples/avatar-a.svg",
    role: "Sample role",
  },
  {
    name: "Sample Two",
    avatar: "/design-system/samples/avatar-b.svg",
    role: "Sample role",
    url: "https://example.com",
  },
];

// One project (this portfolio) shows every cover variety, so the gallery does not need a sample from each.
const COVER_KINDS = ["live", "artefact"] as const;
const COVER_MODES = [
  ["filled", "filled", "filled"],
  ["marker", "marker", "marker"],
  ["filled in light, marker in dark", "filled", "marker"],
] as const;
const COVER_VARIANTS = [
  ["tile", "w-full max-w-[240px]"],
  ["rail", "w-full max-w-[280px]"],
  ["hero", "w-full"],
] as const;

function coverDemo(
  kind: "live" | "artefact",
  light: "filled" | "marker",
  dark: "filled" | "marker",
): Project {
  return {
    ...demoProject,
    frontmatter: { ...demoProject.frontmatter, cover: { kind, light, dark } },
  };
}

// A project's cover stands in for a post's own while no post has one; the specimens say so.
const artStandIn: CoverSubject = {
  ...coverSubject(coverDemo("live", "filled", "marker")),
  colour: 1,
};

// prose-content owns the list styling for these listed [inline] sections.
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
        intro="Home's hero is built inline (listed, not previewed); the spotlight and the post tiles are standalone components shown below."
      >
        <InlineList items={["Hero", "Latest Writing"]} />

        <Specimen
          id="home-spotlight"
          name="Spotlight"
          source="@/components/home/spotlight"
          description="The featured projects one at a time: a cover beside frameless text, a 7s rotation with Play / Pause, one tab per project, and a link to the rest. The whole slide shrinks to 0.97 on hover. At 860px and below the slide stacks and the tabs become dashes."
        >
          <InertDemo>
            <Spotlight projects={getFeaturedProjects()} />
          </InertDemo>
        </Specimen>

        <Specimen
          id="home-post-tiles"
          name="Post tiles (small)"
          source="@/components/writing/post-tile"
          description="Latest Writing on Home: small quote tiles — five across from 1568px, four from 1100px, three above 860px, two (square) from 640px, one below as a 3:2 tile — two rows at most, so 10, 8, 6, 4 or 4 tiles."
        >
          <InertDemo>
            <PostTiles
              size="sm"
              posts={[
                demoPosts.quote,
                demoPosts.art,
                demoPosts.note,
                demoPosts.long,
              ]}
            />
          </InertDemo>
        </Specimen>
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
          description="Frameless entry to a project: its cover above its text, with no border or fill. Hover shifts the title to the project's ink, zooms the cover's content 1.03 inside its frame, scales the text block 1.03 from its left edge and plays the cover."
        >
          <div className="max-w-[420px]">
            <ProjectCard project={demoProject} />
          </div>
        </Specimen>

        <Specimen
          id="project-header"
          name="ProjectHeader"
          source="@/components/project/project-header"
          description="The project-detail page header: title, subtitle, tags, and links."
        >
          {/* Inert: its real h1 would be the gallery's second, out of heading order. */}
          <div inert>
            <ProjectHeader frontmatter={demoProject.frontmatter} />
          </div>
        </Specimen>

        <Specimen
          id="project-hero-media"
          name="HeroMedia"
          source="@/components/project/hero-media"
          description="The image or video inside an image or video cover (DESIGN.md → Hero Cover): a muted looping video with its poster, or a next/image. Live and artefact covers are drawn by Cover."
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-deep)]">
            <HeroMedia
              src="/design-system/samples/figure.svg"
              alt="Neutral sample hero image"
            />
          </div>
        </Specimen>

        <Specimen
          id="project-hero-overlay"
          name="HeroMetaOverlay"
          source="@/components/project/hero-meta-overlay"
          description="The provenance marks on the detail-page hero: logos bottom-left, contributor avatars bottom-right, over the hero from md and in a row under it below md, each a Popover trigger revealing a name with a location or role. Hover or focus a mark to see its reveal; the second logo and second contributor carry a url (link clicks are disabled on this page). Shown over a plain, theme-adapted surface-deep hero so the overlay is the focus."
        >
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-deep)]" />
            <HeroMetaOverlay
              logos={demoLogos}
              contributors={demoContributors}
            />
          </div>
        </Specimen>

        <Specimen
          id="project-covers"
          name="Cover"
          source="@/components/project/cover"
          description="A project's cover in the frame its surface asks for, in the filled or marker mode it declares for each theme: a filled cover's ground is the project's colour, a marker cover sits on surface-elevated with the colour as its marks. One project shows every variety: the live cover and the artefact, filled, marker, and filled in light with marker in dark (flip the theme to see it change)."
        >
          <div className="grid grid-cols-1 gap-[var(--spacing-lg)] md:grid-cols-3">
            {COVER_KINDS.flatMap((kind) =>
              COVER_MODES.map(([label, light, dark]) => (
                <Card key={`${kind}-${label}`} label={`${kind} · ${label}`}>
                  {/* A cover sizes itself from its container, so it needs a definite width. */}
                  <div className="w-full">
                    <Cover
                      variant="card"
                      subject={coverSubject(coverDemo(kind, light, dark))}
                    />
                  </div>
                </Card>
              )),
            )}
          </div>
          <div className="mt-[var(--spacing-lg)] grid grid-cols-1 items-start gap-[var(--spacing-lg)] md:grid-cols-[1fr_1fr_1.4fr]">
            {COVER_VARIANTS.map(([variant, className]) => (
              <Card key={variant} label={`variant · ${variant}`}>
                <div className={className}>
                  <Cover
                    variant={variant}
                    subject={coverSubject(
                      coverDemo("live", "filled", "filled"),
                    )}
                    caption={false}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Specimen>

        <Specimen
          id="project-overview"
          name="ProjectOverview"
          source="@/components/project/project-overview"
          description="The structured overview block (problem, built, results, learnings) on a project page."
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
          description="Fixed left-rail table of contents of the article's section headings; highlights the active section as you scroll. Shown at 2xl+ where the gutter clears it. Previewed live below with a long sample list so it caps and scrolls — hover the rail to reveal the scroll indicator. The production rail also runs on this page at 2xl+."
        >
          <ChromeFrame height={260} inert>
            <SectionProgressNav
              demoSections={[
                { id: "ds-rail-overview", label: "Overview" },
                { id: "ds-rail-background", label: "Background" },
                { id: "ds-rail-approach", label: "Approach" },
                { id: "ds-rail-architecture", label: "Architecture" },
                { id: "ds-rail-data", label: "Data Pipeline" },
                { id: "ds-rail-implementation", label: "Implementation" },
                { id: "ds-rail-training", label: "Training" },
                { id: "ds-rail-evaluation", label: "Evaluation" },
                { id: "ds-rail-results", label: "Results" },
                { id: "ds-rail-limitations", label: "Limitations" },
                { id: "ds-rail-lessons", label: "Lessons" },
                { id: "ds-rail-references", label: "References" },
              ]}
            />
          </ChromeFrame>
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
        id="writing-index"
        title="Domain · Writing Index"
        mapsTo="Domain Components → Writing Index"
        intro="The post archive: a display H1 over a wall of square tiles, built inline in src/app/writing/page.tsx. The tile and its type label are standalone and shown with placeholder content."
      >
        <Specimen
          id="post-tile"
          name="PostTile"
          source="@/components/writing/post-tile"
          description="One post as a tile, on the post group's tint in light and one dark ground in dark. A quote tile (no art) anchors its type line to the bottom; an art tile carries the post's own cover (a project's stands in here) in the post's colour and, on hover or focus, slides it down until the title and type are revealed; on a touch screen it fills the tile with only the title over it. Posts with no cover of their own, and notes, take the dog-ear. Hover steps the ground toward the group's ink in light. Every index tile is square."
        >
          <InertDemo>
            <div className="grid grid-cols-1 gap-[var(--spacing-md)] md:grid-cols-3">
              <PostTile post={demoPosts.quote} size="art" />
              <PostTile
                post={demoPosts.art}
                size="art"
                colour={1}
                coverStandIn={artStandIn}
              />
              <PostTile post={demoPosts.note} size="art" colour={3} />
              <PostTile
                post={demoPosts.art}
                size="art"
                colour={7}
                coverStandIn={{ ...artStandIn, colour: 7 }}
                touch
              />
            </div>
          </InertDemo>
        </Specimen>

        <Specimen
          id="writing-type-label"
          name="TypeLabel"
          source="@/components/writing/type-label"
          description="The post's type, its add-ons as markers, then the year, in Title Case. One line when it fits; when it would wrap the add-ons take a line above. Its colours come from the context: the group's ink on a tile, the page colour on a post page."
        >
          <div className="flex flex-col gap-[var(--spacing-md)]">
            <div data-post-group="howto" className="max-w-[420px]">
              <TypeLabel type="guide" addons={undefined} year="2026" large />
            </div>
            <div data-post-group="short" className="max-w-[420px]">
              <TypeLabel
                type="note"
                addons={[{ kind: "guide", price: "free" }]}
                year="2026"
                large
              />
            </div>
            <div data-post-group="long" className="max-w-[260px]">
              <TypeLabel
                type="essay"
                addons={[
                  { kind: "template", price: "free" },
                  { kind: "guide", price: "paid" },
                ]}
                year="2026"
                large
              />
            </div>
          </div>
        </Specimen>

        <Specimen
          id="writing-index-inline"
          name="Inline sections"
          source="src/app/writing/page.tsx · [inline]"
          description="Page-bound composition, not a standalone component; listed, not previewed. See it on /writing."
        >
          <InlineList
            items={["Writing Index (display H1 over square tiles)"]}
          />
        </Specimen>
      </GallerySection>

      <GallerySection
        id="post"
        title="Domain · Post"
        mapsTo="Domain Components → Post"
        source="src/app/writing/[slug]/page.tsx · [inline]"
        intro="The post page layout is built inline in src/app/writing/[slug]/page.tsx (listed, not previewed); its rail is a standalone component."
      >
        <InlineList items={["Post Layout"]} />

        <Specimen
          id="post-rail"
          name="PostRail"
          source="@/components/writing/post-rail"
          description="A post's facts beside its column: Updated, Published, Read, Tags and, when the post names a project, that project's own cover in its declared mode over its title, playing in view. A wrapping row below 1200px; sticky and right-aligned from 1200px."
        >
          {/* Not wrapped in data-page-colour: that attribute lifts the ASCII mark colour for the whole page, gallery included. */}
          <div className="max-w-[720px]">
            <InertDemo>
              <PostRail post={demoPosts.art} />
            </InertDemo>
          </div>
        </Specimen>
      </GallerySection>

      <GallerySection
        id="about"
        title="Domain · About Layouts"
        mapsTo="Domain Components → About Layouts"
        intro="Page/route/schema-bound compositions for the About page."
      >
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

      <GallerySection
        id="error-boundaries"
        title="Domain · Error Boundaries"
        mapsTo="Domain Components → Error Boundaries"
        source="src/app/error.tsx · src/app/global-error.tsx · [inline]"
        intro="The route and root error boundaries, built inline in src/app/error.tsx and src/app/global-error.tsx; listed, not previewed."
      >
        <InlineList items={["Route error boundary", "Root error boundary"]} />
      </GallerySection>
    </>
  );
}
