# Tasks — Phase 6

> Plan: `/home/ag-95/.claude/plans/masked-autoencoders-pipeline.md`  (WSL global plans dir)
> Pipeline state, sources, resume steps → `session.md`. Frontmatter is decided in Stage 1,
> not pre-locked. Tick each subtask when done. Stage gate = approval in chat before advancing.
>
> **To resume after context reset:** say "continue the pipeline" — session.md + tasks.md
> are auto-loaded; Claude finds the first unchecked subtask and continues from there.

## Active project: `masked-autoencoders`  (pipeline-run plan approved 2026-05-31)

### Kickoff (before Stage 1)
- [ ] Locate source files (report PDF, repo + branch/commit, any slides) — locate, don't read
- [ ] Confirm slug (`masked-autoencoders` unless changed)

### Stage 1 — `project-content-extraction`
- [ ] Read SKILL.md + references first
- [ ] Decide all frontmatter with user (title, subtitle, framing, logos, links, projectType, publishedAt, featured, order, tags, stack)
- [ ] Write body (H2 spine per skill) + density-reduction + reader-review pass
- [ ] `npm run build` passes; page renders at `/work/masked-autoencoders`
- [ ] **Gate: user approves MDX**

### Stage 2 — `project-assets-generation`
- [ ] Read SKILL.md + references first
- [ ] Visual audit + asset plan; **user approves plan**
- [ ] Generate assets from tracked sources; verify MDX `<Diagram>`/`<Figure>` references
- [ ] `npm run build` passes
- [ ] **Gate: user approves assets**

### Stage 3 — `project-cover-generation`
- [ ] Read SKILL.md + references first
- [ ] **Sub-gate 3a: directions approved**
- [ ] **Sub-gate 3b: base cover approved**
- [ ] **Sub-gate 3c: annotations approved**
- [ ] Register live cover; `npm run build` passes
- [ ] **Gate: user approves final cover**

### Stage 4 — `project-review`
- [ ] Read SKILL.md + references first
- [ ] Capture playwright screenshots (desktop + mobile, light + dark) — reuse dqn tooling
- [ ] Recruiter + technical reviewer passes (parallel cold subagents); findings noted
- [ ] Surface conflicts + prioritized fix list; apply approved fixes
- [ ] `npm run build` passes after fixes
- [ ] **Gate: user approves** → project complete

---

## Queued
- [ ] Phase 6 final: add freelance project; finalize featured set (≤3 site-wide)

## Complete
- `dqn-lane-localization` — full pipeline (negative-result project); approved 2026-05-31
- `model-extraction-attacks` — full pipeline (reference exemplar)
- All 4 pipeline skills — audited, frozen
- `project-review` visual-inspection upgrade
