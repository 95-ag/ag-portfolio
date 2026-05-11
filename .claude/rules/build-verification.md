# Build Verification Rules

Phase gates and verification checklists are defined in `.claude/docs/build-flow.md`.
Read that document before marking any phase complete.

## Always Required (Every Task)

- `biome check` passes with zero errors
- TypeScript compiles with zero errors (strict mode)
- `next build` succeeds
- No broken imports
- No hydration errors in browser console

Do not advance to the next phase until all verification requirements for the current phase pass.
