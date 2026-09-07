import { z } from "zod";

const StackSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  libraries: z.array(z.string()),
  tools: z.array(z.string()),
});

const OverviewSchema = z.object({
  problem: z.string().min(1),
  built: z.string().min(1),
  results: z.array(z.string()).optional(),
  transferableSkills: z.array(z.string()).min(1).optional(),
  learnings: z.array(z.string()).min(1).optional(),
});

const LinksSchema = z
  .object({
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    paper: z.string().optional(),
    report: z.string().optional(),
    presentation: z.string().optional(),
  })
  .optional();

const LogoSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
});

const ContributorSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().startsWith("/"),
  url: z.string().url().optional(),
});

const VIDEO_EXTENSIONS = [".mp4", ".webm"];
const isVideo = (path: string) =>
  VIDEO_EXTENSIONS.some((ext) => path.toLowerCase().endsWith(ext));

export const ProjectFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    summary: z.string().min(1).max(200),
    projectType: z.enum(["academic", "freelance", "personal"]),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    order: z.number(),
    // Hero is satisfied by EITHER a registered live cover component (preferred) OR a
    // static heroImage (image or video). Optional: heroless builds pass in dev/preview
    // (empty hero until the cover stage); the production build (VERCEL_ENV=production)
    // fails if a project has neither a live cover nor a heroImage — see getAllProjects.
    heroImage: z.string().startsWith("/").optional(),
    heroAlt: z.string().min(1),
    heroPoster: z.string().startsWith("/").optional(),
    heroVideoLoop: z.boolean().optional().default(true),
    tags: z.array(z.string()).min(1).max(8),
    stack: StackSchema,
    overview: OverviewSchema,
    links: LinksSchema,
    featured: z.boolean().optional().default(false),
    logos: z.array(LogoSchema).optional(),
    contributors: z.array(ContributorSchema).optional(),
    ogImage: z.string().startsWith("/").optional(),
    metaDescription: z.string().max(160).optional(),
    relatedProjects: z.array(z.string()).optional(),
  })
  .refine(
    (data) => !data.heroImage || !isVideo(data.heroImage) || !!data.heroPoster,
    {
      message: "heroPoster is required when heroImage is a video",
      path: ["heroPoster"],
    },
  );

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
