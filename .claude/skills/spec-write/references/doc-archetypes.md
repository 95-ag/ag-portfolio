# Doc Archetypes

The non-design spec docs this skill owns, each with its required structure, writing mode, ownership
boundary, and whether a project must have it. Use this to decide *what shape* a doc takes; use
`writing-contract.md` to decide *how it reads*.

DESIGN.md is deliberately absent — it is owned by `design-update` / `design-rewrite`, never by this skill.

---

## The Set

| Archetype | Canonical file | Required? | Mode | Owns |
|---|---|---|---|---|
| Product | `PRODUCT.md` (or `PROJECT.md`) | mandatory | Tier-1 | what to build and why |
| Implementation plan | `IMPLEMENTATION-PLAN.md` | mandatory | procedural | how it gets built, in order |
| Content / schema | `CONTENT-SCHEMA.md` | optional | Tier-2 | content and frontmatter structure |
| Other prose docs | varies | optional | inherit nearest tier | one project-specific concern each |

- **Mandatory** docs exist in every project: a product doc and an implementation-plan doc. Their
  canonical names may vary (`PRODUCT.md` vs `PROJECT.md`; `IMPLEMENTATION-PLAN.md` vs a project's
  `IMPLEMENTATION-PHASES.md` / build-flow) — match whatever the project already uses; don't rename an
  existing file as a side effect of an edit.
- **Optional** docs appear only when the project needs them. A content-heavy site warrants
  CONTENT-SCHEMA.md; a pure app may not. Other prose docs (a glossary, an API contract, a migration
  guide) follow the same house style, taking the tier closest to their purpose.

---

## Ownership Boundaries

Each doc owns one lane. Content outside its lane is cross-referenced by named path, never restated.

- **Product doc** — *what* and *why*. The product's purpose, audience, pages/surfaces, behavior, and
  the reasoning behind non-obvious choices. **Not** how it looks (→ DESIGN.md), not the build order
  (→ implementation-plan doc), not field-level content structure (→ CONTENT-SCHEMA.md).
- **Implementation-plan doc** — the build *order*: phases or ordered steps, each with goals and a
  verification gate. **Not** product rationale, not visual specs.
- **Content/schema doc** — the *structure* of content: frontmatter fields, required/optional status,
  validation rules, body conventions. **Not** why a field exists in product terms (→ product doc),
  not how content renders visually (→ DESIGN.md).

A fact that two docs both seem to want belongs to exactly one. Decide the owner, cross-reference from
the other. Two copies that drift apart is the failure this boundary prevents.

---

## Required Structure per Archetype

These are starting skeletons for authoring mode, not rigid mandates — a project may add or drop
sections. They exist so a fresh doc starts in the right shape rather than as a prose dump.

### Product doc (Tier-1)

- **Header / ownership note** — one line stating what this doc owns and which docs win on visuals
  (DESIGN.md) and content (CONTENT-SCHEMA.md) when they disagree.
- **Overview / positioning** — what the product is, who it's for, the core intent. Editorial prose
  allowed; this is where the *why* lives.
- **Page / surface specifications** — one subsection per page or surface, describing behavior and the
  reasoning behind non-obvious decisions. Design specifics cross-reference DESIGN.md.
- **Cross-cutting product rules** — constraints that span surfaces (e.g. minimum supported width,
  accessibility intent, what the product deliberately does *not* do).

Voice: present-tense declarative, design-agnostic, reasoning kept for non-obvious decisions.

### Implementation-plan doc (procedural)

- **Implementation rules** — what to read first, what not to do (invent requirements, over-engineer),
  what to prioritize. Sets the frame before the phases.
- **Phases / ordered steps** — each with **Goals** (what this phase achieves) and a **verification
  gate** (how you know it's done before advancing). Ordered; dependencies explicit.
- **Gates summary** (optional) — a quick table of the always-required checks.

Voice: procedural. Goals read Tier-1-clear; steps and gates read Tier-2-terse. Forward-looking tense
is fine here — this doc *is* the plan.

### Content/schema doc (Tier-2)

- **Header / ownership note** — what this doc owns; that it wins over the product doc on content fields.
- **Frontmatter schema** — per content type: a field table (name, type, required/optional, notes) plus
  the validation rules (build-fail vs build-warn conditions).
- **Body conventions** — what's allowed in the content body: components, heading rules, prohibitions.
- **Directory / file conventions** — where content lives, naming, slug derivation.

Voice: terse, specific, affirmative prohibitions ("never add a `slug` field"). No reasoning padding.

---

## Cross-Reference Resolution

- Every cross-doc reference is a named path: `TARGET.md → Section → Subsection`.
- A path must resolve to a real heading in the target doc. When you author or edit, verify each path
  you write still points at an existing heading — headings move, paths must be updated with them.
- When a doc you're editing references a heading you're renaming, update the back-references in the
  same pass, and list each one in the diff summary.
