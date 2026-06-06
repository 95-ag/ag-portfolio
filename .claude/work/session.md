# Session State — Portfolio

> **Fresh sessions: read this file FIRST**, then `tasks.md`, then the relevant `.claude/docs`.
> This file holds phase STATE (status, decisions). `tasks.md` is the actionable checklist.
> Build-flow + gates → `.claude/docs/IMPLEMENTATION-PHASES.md`. Process rules → `.claude/CLAUDE.md`.

---

## Phase

**Branch `phase-8-audits`.**

- **Phase 8 — Audits: COMPLETE (signed off 2026-06-06).** Plan: `/home/ag-95/.claude/plans/drifting-greeting-elephant.md`.
  Two halves: Part A = capture + 6 parallel skill audits → unified findings (NO implementation);
  Part B = fix + ship (scoped after Part A review). **Scope: 6 skill audits only** (token-consistency
  grep, keyboard/focus/alt/ARIA a11y, responsive review, Lighthouse deferred to Part B/final verify).
  Agent models: Opus ×5 vision/design + Sonnet ×1 ai-seo.
  - **A0–A4 DONE (technical) — awaiting user finalization. NOT signed off.**
  - **A1** — 36-shot capture DONE (`tmp/audit/shots/`, all 36 OK, theme-flip confirmed) + 10
    HTML/utility dumps (`tmp/audit/data/html/`). Computed-style scrape dropped (globals.css has exact
    per-token metrics). Capture flow: rAF-frozen meteor + lazy-scroll + full-page via playwright-cli.
  - **A2** — token bundle = `globals.css` + `DESIGN.md`; contrast matrix recomputed (`tmp/audit/contrast-matrix.mjs`).
  - **A3** — 6 agents returned (Opus ×5 + Sonnet ×1). **A4** — synthesis → `tmp/audit/FINDINGS.md`
    (unified table + conflicts C1–C4 + per-issue fixes) + `tmp/audit/SKILL-NOTES.md`.
  - **Result: NO Critical; all text/bg pairs pass WCAG AA both themes+contexts. High 6 · Med 7 · Low 12.**
    Themes: prose heading rhythm (proj pages), hero emphasis, light-mode tag-chip theming, per-page SEO
    metadata (incl. proj-mae broken share card — VERIFY mae cover is React-SVG vs static asset).
  - **Deferred to Part B (not run in A):** token-consistency grep, live keyboard/focus/ARIA/alt a11y,
    responsive breakpoint review, Lighthouse.
  - **Part A finalized with user (2026-06-06). Part B decisions LOCKED — writing Part B plan.**
    - **FIX:** h1 (prose heading-margin reorder + DESIGN.md prose reconcile) · h2 (two-tier headline:
      `display-primary`→**64px** for home/about/work H1s +404; new **56px** tier for project titles;
      home hero = 64px H1 + **620px** column + portrait **`saturate(0.85) opacity(0.9)`**; About deck
      stays `heading-display` 36) · h3 (About portrait `clamp(180,20vw,280)` + tagline `text-wrap:balance`)
      · h4 (deepen light `--surface-tag` — also affects DQL cover band) · h5 (rework DQL cover top band
      for light) · h6 (screenshot the 3 React-SVG covers **dark** → set as `heroImage`/OG for all 3,
      drop old `hero.svg`/`hero-cover.webp`) · m1 (cap prose text measure ~70ch, media full-width) ·
      m2 (Person schema 31 on About too) · m3 (add `metaDescription` ≤155 ×3, drafts approved) · m4
      (expand home+about descriptions, drafts approved) · m5 (project-card single gap tier + pin tags
      bottom) · l6 (scroll-to-top pinned to viewport corner) · l8 (shorten 2 section headings ×3 MDX:
      "Algorithm & Training Design"→"Training Design", "Constraints & Limitations"→"Limitations";
      align `project-content-extraction` skill) · l11 (darken light `--outline`→~#8b9197 for 3:1) ·
      l12b/c/d (work `<header>`, `<time datetime>` on dates, llms.txt `## Key Pages`) · l4 (touch
      targets ≥44×44: theme-toggle + footer icons).
    - **NO-FIX (locked):** m6 (outline-variant decorative), m7+l1 (project h2 mono-anchor intended),
      l2 (two list rhythms intentional), l3 (768 orphan ok), l5 (dt 1px optical), l7 (tag wrap), l9
      (capability heading already dominates), l10 (AI = decorative bg glyph), l12a (JSON-LD-in-body = RSC).
    - **Deferred to Part B batch gate:** token-consistency grep, full keyboard/focus/ARIA/alt a11y,
      responsive review (375/768/1280 all routes), Lighthouse.
    - Scratch eval routes (`src/app/scratch/*`) + old hero files (`hero-cover.webp`, `hero.svg`) removed by
      user. Preview server (Claude_Preview MCP) on :3000 via `.claude/launch.json` "Next.js dev". Scratch
      images/scripts in `tmp/audit/{explain,scratch,partb}/`.

  - **Part B IMPLEMENTED — gate GREEN, commits 1–7 landed. Awaiting skill updates + PR + final sign-off.**
    - **Shipped (7 commits `6bfe6e4`→`1159395`):** two-tier display scale (display-primary 64 / new
      display-title 56) + light `--surface-tag` #dadce0 + `--outline` #8b9197 + prose h4 rhythm; home hero
      (content `flex-1`/no-gap, portrait fixed 460 + `saturate(0.85) opacity-90`); About (portrait
      `clamp(180,20vw,280)` + deck `text-balance`, Person schema→31, description); work `<header>`;
      llms.txt Key Pages; 3 project MDX (section renames "Training Design"/"Limitations", metaDescription,
      cover heroImage); **3 React-SVG covers rendered to dark `cover.png` → OG for all 3 (mae fixed)**;
      DESIGN.md aligned.
    - **Reverted per user (dropped):** m1 prose measure, m5 card tag-pin, l6 scroll-to-top, l4 touch
      targets (sidebar/footer proportion). h5 = keep DQL band (no merge). l12c (`<time>`) N/A — no
      visible dates. m6/l9/l5 = no-fix (locked Part A).
    - **Gate:** tsc clean · biome clean (85) · `next build` green (13 routes) · WCAG new tokens pass
      (`tmp/audit/_contrast.mjs`) · OG curl all 3 ✓ · mobile 375 ✓ · desktop signed off 2026-06-06.
      Lighthouse deferred to Phase 10/deploy.
    - **Skill updates DONE.** 12a: `project-content-extraction` spine names shortened (narrative-structure,
      extraction-procedure, evals) — committed `adba24f`. 12b: 6 GLOBAL audit skills (`~/.claude/skills`,
      mirrored Win↔WSL) folded `SKILL-NOTES.md` in as principles (disposition table); independent fresh-eyes
      review caught 2 overfit blockers (color-contrast "reading/showcase mode", ai-seo "Next.js App Router")
      + 1 nit (typography "mono uppercase") — all neutralized; 9 files synced WSL→Windows (diff-clean).
    - **Phase 8 SIGNED OFF (2026-06-06).** PR handed to user (title/body/next-branch); work files committed
      (this chore). Branch `phase-8-audits` = 8 source commits `6bfe6e4`→`adba24f` + work-files chore.
      **Next: Phase 9 — Refactor / Clean / Align.**

- **Phase 7 — SEO + AI readability: COMPLETE (signed off 2026-06-06).**
  - **Lessons review — DONE (signed off 2026-06-05).** Promoted general web/Next/WSL/tooling lessons
    into `rules/frontend.md` (image cache, `next/image` `display:none` fetch, Shiki `defaultColor:false`,
    Local Iteration & Caching, `useExhaustiveDependencies`), `rules/build-verification.md` (Batch Gate
    + Dev Server & Browser Verification, format-only-hook directive), `rules/design-system.md` (Color
    work), and global `windows-claude.md` (Long-running-servers rewrite: inline MSYS guard + `pkill`
    bracket trick) + global `CLAUDE.md` ×2 (§0 queue-verbs, no-bypass guardrail, notes-in-work).
    Trimmed `lessons.md` to pipeline-only with a format header. MEMORY 5→3: deleted lint-strategy +
    notes-in-work (promoted), trimmed stale rewrite-campaign block, marked about-page font-weights done.
    Strengthened the global-config guardrail (own explicit gate; never bundled into a plan/blanket
    approval; no unilateral scope-widening). Permission-rule angle: `file-protect.mjs` GLOBAL_ASK
    already exists but is project-scoped + "ask" is auto-accepted in auto mode — global promotion
    evaluated, **left as-is per user**.
  - **C1–C5 implementation DONE — biome + tsc clean, `next build` green (13 pages). Render checks
    partially done. Awaiting user go-ahead to complete render checks → then propose C1–C5 commits.**
    Plan: `/home/ag-95/.claude/plans/serene-gliding-sunset.md`
    - C1: `src/app/opengraph-image.tsx` — `ImageResponse` card, 1200×630, dark bg + accent green
    - C2: metadata + OG/Twitter + `alternates.canonical` on all 5 pages; `metadataBase` + title template in root layout
    - C3: `src/app/sitemap.ts` + `src/app/robots.ts` (explicit AI crawler allows: GPTBot, ClaudeBot, Google-Extended, PerplexityBot)
    - C4: `src/app/llms.txt/route.ts` — dynamic route, `force-static`; order: positioning → capabilities → projects → contact (no raw email)
    - C5: `src/lib/seo/jsonld.ts` + WebSite schema (layout), Person schema (home + about), CreativeWork + BreadcrumbList (project pages)
    - `biome.json` — `noDangerouslySetInnerHtml: off` via **overrides** scoped to 4 files only (not global); rule stays active everywhere else
  - **`next build` output (13 pages):** /, /_not-found, /about, /llms.txt, /opengraph-image,
    /robots.txt, /sitemap.xml, /work, /work/model-extraction-attacks, /work/dqn-lane-localization,
    /work/masked-autoencoders. All static (○/●).
  - **Render checks so far (inferred from HTML/curl):**
    - `/sitemap.xml` ✓ — correct URLs + priorities + changefreq
    - `/robots.txt` ✓ — wildcard + GPTBot/ClaudeBot/Google-Extended/PerplexityBot explicit allows + sitemap directive
    - `/llms.txt` ✓ — correct structure: positioning → bio → capabilities → projects (3) → contact (no email)
    - Browser checks (OG tags, canonical, JSON-LD) — **not yet done**; `verify-seo.sh` written to
      `tmp/verify-seo.sh`; run via `wsl -d ubuntu bash /home/ag-95/projects/ag-portfolio/tmp/verify-seo.sh`
  - **playwright-cli status:** IS installed at `node_modules/.bin/playwright-cli` (v0.1.13).
    Must be invoked via WSL: `wsl -d ubuntu bash -lc 'cd /home/ag-95/projects/ag-portfolio && npx playwright-cli ...'`
    NOT from git-bash directly — git-bash can't reach WSL node_modules.
  - **C7 — `implement-ai-seo` skill update: DONE (signed off 2026-06-06).** Both SKILL.md and
    REFERENCE.md updated. Fresh-eyes review passed (4 corrections applied): removed invalid
    `<link rel="sitemap">`, qualified `src/` path caveat in llms.txt §7, removed CreativeWork
    parenthetical overspecification, consolidated duplicate `sameAs` note.
  - **Phase 7 — SEO + AI readability: COMPLETE (signed off 2026-06-06).** 4 commits
    `2f86b96`→`215e423`: OG image, metadata + OG/Twitter + canonical + JSON-LD (all pages),
    sitemap + robots, llms.txt. Skill updated + synced WSL↔Windows. C6 work files commit pending.

---

**Branch `phase-6.5-ui-polish` (done, manual PR → main).**

- **Phase 6.5 batch 1 — Reading experience + Navigation: DONE (signed off 2026-06-01).**
  Plan `/home/ag-95/.claude/plans/splendid-yawning-gray.md`. All 5 bullets shipped via the gated
  per-bullet loop: inline code (accent chip), tables (ink + accent underline), home nav (LogoMark
  ring + `aria-current`), code blocks (build-time Shiki / vitesse / `defaultColor:false`), ASCII
  background (page-aware gutters + mobile rules + meteor 768px gate). Batch gate passed: `biome`
  clean, `tsc` ok, `next build` ok (9 pages), code-reviewer no blockers, both-theme renders
  confirmed. 14 commits `beba3a7`→`7f35b4e`.
  - Shiki: `@shikijs/rehype`, dual vitesse themes, `defaultColor:false` → CSS-var swap on
    `[data-theme="dark"]` (no `!important`, passes biome). `@shikijs/rehype` install flagged
    2 moderate npm-audit advisories (transitive) — left for Phase 9 / explicit fix.
- **Phase 6.5 batch 2 — Colors: DONE (signed off 2026-06-04).** Analysis-first
  (`audit-color-contrast` + OKLCH/WCAG matrix `tmp/color-analyze.mjs`). Shipped: neutral
  ChatGPT-style palette; **context-aware surface depth** via `data-read` on `<html>` (showcase
  white/deep-black vs reading soft `#f8f8f9`/`#1a1a1a`; pre-paint inline script + `SurfaceContext`);
  light depth = sunken brightest/raised gentle/bg ground; deepened dark accent `#2aa566` (less
  minty); softer ink (`#2d2d2d` / `#e2e2e2`) + dark `antialiased`; `body-lead`→ink; **inverted
  light-mode meteor** (dark-ink streaks via `uDark` shader branch, multiply; dark = neon glow,
  unchanged). Kept green H4 headings (exception). Build green, DESIGN.md aligned. Commits
  `72c490c` (code), `c1f02aa` (docs), C5 chore (work files).
- **Phase 6.5 batch 3 — Pre-hero polish: DONE (signed off 2026-06-05).** Render-to-compare via
  throwaway scratch routes before each permanent change. Shipped: shared `LinkPill` (soft-filled
  pill — `surface-raised`, no border, pill radius; hover `accent-muted`+`accent`; `external` drives
  both new-tab attrs and the trailing open-in-new icon, mailto excluded) replacing `social-link.tsx`,
  used by About socials + project-header links (round link-chip vs square tag/button is now a system
  rule); About positioning deck `heading-display` 500→600; About + Work H1s `display-accent`→
  `display-primary` (ink), `display-accent` token removed entirely (CSS base + responsive overrides +
  `heading.tsx` union + DESIGN table). biome/tsc clean, clean `next build` (9 pages), both-theme
  renders confirmed (computed-style + screenshots). Commits `18da5c0` (feat), `65e4349` (refactor),
  `1fe609e` (docs); work-folder commit held by user.
  - Stale-Turbopack-CSS-cache trap recurred (CSS-only edits don't always invalidate `.next`). The
    documented `rm -rf .next` fix is firewall-blocked → used `touch src/app/globals.css` to force an
    HMR recompile instead; verify weight/color via `getComputedStyle`, not screenshots.
- **Phase 6.5 batch 4 — Brand/hero + Background: DONE (signed off 2026-06-05).** Plan
  `/home/ag-95/.claude/plans/hero-blend-portraits.md`. Theme-aware hero portraits (`hero-dark.png` /
  `hero-light.png`) that dissolve their baked bg via `mix-blend-mode` (dark `screen`, light
  `multiply`) over the WebGL meteor layer; per-theme `contrast()` (1.07 / 1.03) snaps the near-pure
  `#080808`/`#fcfcfc` field to true `#000`/`#fff` so no residual rectangle; natural aspect (no crop,
  contained full figure); CSS `[data-theme]` `display:none` swap (zero JS, flash-free; mobile column
  hidden → neither portrait fetches; desktop fetches both); old `hero.png` removed. biome/tsc clean,
  `next build` green (9 pages), both-theme renders confirmed (computed-style + screenshots). Commits
  `7c8e46d` (feat), `0e53053` (docs). **Background revisit → DECIDED keep as-is** — scratch eval
  showed the meteor field is centered/height-scaled (misses ultrawide gutters even unmasked) and
  left/right-asymmetric (shader rotation + fixed particle cloud); no code change, scratch discarded.
- **Phase 6.5 — UI Polish: COMPLETE (signed off 2026-06-05).** All batches shipped (reading/nav,
  colors, links/headings, blend hero, background-kept). Branch `phase-6.5-ui-polish` = 23 commits
  `beba3a7`→`0e53053` + a work-folder chore. Handed to user as a manual PR → main. **Next: Phase 7
  (SEO + AI readability); FIRST task = lessons review (read/organize/prune `lessons.md` + global &
  project rules, fold general ones into the workflow).**

- **Phase 6 — Project Content: effectively complete.** Three real projects authored + reviewed:
  `model-extraction-attacks` (reference exemplar), `dqn-lane-localization` (negative result),
  `masked-autoencoders` (signed off 2026-06-01). All three `featured: true`. No placeholder
  projects remain. Phase-6 gate (≥2 real projects) met.
- **Phase 6.5 — UI Polish: next.** New phase added to the build flow (reading experience,
  navigation, colors, brand/hero). Iterative; several items are investigations to resolve with the
  user, and color/surface items route through `design-update` / `design-rewrite` (DESIGN.md edits).
  Full backlog → `tasks.md` + `IMPLEMENTATION-PHASES.md`.
- Then: **7** SEO + AI readability → **8** Audits → **9** Refactor/clean/align → **10** Deploy.

**Two projects are deferred until after the first deploy** (per user, 2026-06-01): a freelance
project and a self-referential "this web portfolio" case study — content not ready, and the
portfolio case study is stronger written against a live URL.

---

## Pipeline skills (available, not the active tracker)

The 4 portfolio pipeline skills (`project-content-extraction` → `project-assets-generation` →
`project-cover-generation` → `project-review`) are frozen and audited. They drive the deferred
post-deploy projects when those resume; they no longer drive this file. `project-cover-generation`
now documents the notebook arrow gesture (head at the note) + base-composition nudges; all three
existing covers were flipped to match.

---

## Standing deviations from PRODUCT.md

- **Hero CTAs (§7.1):** CTAs integrated into the hero directly; bottom CTA section removed.
  Intentional — reconcile PRODUCT.md in Phase 9 cleanup.

---

## Blockers

None. Phase 8 complete (signed off 2026-06-06). Next: Phase 9 — Refactor / Clean / Align.
