# Phase 6 — Project Content

## Active: Workflow re-alignment
> Started: 2026-05-28

- [x] Audit failure modes (status question → execution, plan skip, PRIMER update without approval)
- [x] Define new `.claude/work/` structure and file contracts
- [x] Update global `~/.claude/CLAUDE.md` — workflow rules, path references
- [x] Update project `.claude/CLAUDE.md` — path references, add Process Rules section
- [x] Update `build-verification.md` — path reference
- [x] Rename `build-flow.md` → `IMPLEMENTATION-PHASES.md`; fix Phase 4, Phase 9, internal PRIMER ref
- [x] Create `.claude/work/` directory structure
- [x] Write `session.md` (migrated from PRIMER.md — state only)
- [x] Write `tasks.md` (this file)
- [x] Write `lessons.md` (migrated + new entries for today's failures)
- [x] Delete `PRIMER.md`
- [x] Verify: grep for stale references — zero found
- [x] Verify: `npm run build` passes — 10 static pages
- [x] User approval → session.md updated

---

## Active: model-extraction-attacks hero cover
> Plan: `~/.claude/plans/cuddly-kindling-hickey.md`

- [x] Delete old cover.py and hero-cover.webp
- [x] Cover design plan approved — component-based, v1 flow strip (QUERIES → VICTIM → PSEUDO LABELS → SURROGATE)
- [x] Cluster 1 committed: Caveat font load (`src/app/fonts.ts`, `src/app/layout.tsx`)
- [x] Cluster 2 committed: cover registry + hero-media slug prop
- [x] Cluster 3 committed: HeroMetaOverlay + project detail wire-in
- [x] Cluster 4 committed: KTH logo transparent bg fix
- [x] User approved cover visual (v1 composition)
- [x] Cluster 5: commit cover component (v1 + annotations)
- [ ] Cluster 6: commit `.claude/work/session.md` + `tasks.md`
**Phase B (after Cluster 5/6 committed)**
- [x] DESIGN.md update: Caveat font + Hero Cover component section
- [x] `cover-system-guide.md` — live-component pattern, metadata overlay, annotation rules, focal structure, anti-patterns
- [x] `project-extraction-workflow.md` — Step 6 cover creation workflow with direction proposals, base gate, annotation step

---

## Queued: lane-refinement-rl
> Awaiting assignment — read `project-extraction-workflow.md` first

- [ ] MDX content from source materials
- [ ] User approves MDX
- [ ] Assets
- [ ] User approves assets
- [ ] Hero cover
- [ ] User approves cover

---

## Queued: masked-autoencoders
> Same workflow as above

---

## Queued: Phase 6 wrap-up
- [ ] Remove 3 placeholder MDX files
- [ ] Add freelance project
- [ ] Finalize featured set: `lane-refinement-rl`, `model-extraction-attacks`, freelance project

---

## Completed This Phase
- [x] model-extraction-attacks — MDX content
- [x] model-extraction-attacks — assets
