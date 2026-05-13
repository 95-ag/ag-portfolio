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
  })
  .optional();

const LogoSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
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
    heroImage: z.string().startsWith("/"),
    heroAlt: z.string().min(1),
    heroPoster: z.string().startsWith("/").optional(),
    heroVideoLoop: z.boolean().optional().default(true),
    tags: z.array(z.string()).min(1).max(8),
    stack: StackSchema,
    overview: OverviewSchema,
    links: LinksSchema,
    featured: z.boolean().optional().default(false),
    logos: z.array(LogoSchema).optional(),
    ogImage: z.string().startsWith("/").optional(),
    metaDescription: z.string().max(160).optional(),
    relatedProjects: z.array(z.string()).optional(),
  })
  .refine((data) => !isVideo(data.heroImage) || !!data.heroPoster, {
    message: "heroPoster is required when heroImage is a video",
    path: ["heroPoster"],
  });

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
