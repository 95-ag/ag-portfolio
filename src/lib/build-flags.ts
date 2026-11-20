// True on the dev server and on Vercel preview builds: the preview-only UI (the floating theme toggle) shows there and
// nowhere in production. The value is set per build phase in next.config.ts, never from NODE_ENV, which `next build`
// keeps when it is already set (DESIGN.md → Components → Shell → Theme Toggle).
export const SHOW_PREVIEW_UI = process.env.NEXT_PUBLIC_PREVIEW_UI === "1";
