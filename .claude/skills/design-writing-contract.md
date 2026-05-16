# 1. Universal DESIGN.md Writing Contract

## Purpose

`DESIGN.md` defines how a product or system looks, behaves, and composes visually.
It acts as:

* a design-system reference
* an implementation-aligned visual specification
* a durable AI-readable design contract

The document MUST optimize for:

* scanability
* consistency
* implementation clarity
* semantic retrieval
* long-term maintainability

---

## Formatting Rules

### Headings

* Prefer shallow hierarchy.
* Avoid nesting deeper than:

  * `H2 → H3 → H4`
* Avoid unnecessary subsection fragmentation.

### Paragraphs

Paragraphs SHOULD:

* remain under 5 visual lines
* communicate one primary idea
* appear mainly in philosophy, composition, or imagery sections

Paragraphs MUST NOT:

* become prose walls
* duplicate nearby bullets or tables
* explain obvious implementation mechanics

### Bullets

Bullets are the primary format for technical sections.

Bullets MUST:

* remain concise and scannable
* avoid excessive nesting

Bullets MUST express one semantically grouped concept cluster.

A single bullet MAY combine:
- visual identity
- dimensions/tokens
- typography
- spacing
- surface treatment
- closely related interaction behavior

when those details form one coherent visual/system concept.

Related implementation details SHOULD be semantically grouped rather than split into excessively granular bullets.

Preferred:

- Height `{height-interactive-md}` (44px), radius `{radius.sm}` (4px).

Avoid:

- Height 44px.
- Radius 4px.

Maximum nesting depth:

* 2 levels


### Compression Targets

The document MUST optimize for vertical scan speed.

Targets:

* paragraphs ≤ 5 visual lines
* bullets ≤ 2 visual lines
* components ≤ 6 bullets before YAML/spec
* most sections SHOULD remain readable within one screen height

Avoid:

* prose walls
* excessive heading nesting
* giant uninterrupted YAML blocks
* deeply nested bullet trees
* repeated implementation details across prose and specs

These constraints exist to reduce verbosity drift and maintain fast scanning behavior during long-term iteration.

---

## Token Conventions

Semantic tokens SHOULD appear in prose when:

* they communicate reusable system meaning
* they represent identity-bearing primitives
* they map to shared design vocabulary

Preferred format:

```md
radius `{radius.sm}` (4px)
height `{height-interactive-md}` (44px)
background `{colors.accent}` (#006e37)
```

Resolved values SHOULD accompany tokens when visually meaningful.

Avoid:

```md
radius-sm
spacing-md
44px radius
```

without semantic linkage.

---

## YAML Rules

YAML SHOULD only appear when:

* hierarchy matters
* structured systems are being defined
* multiple variants exist
* prose becomes less readable than structured data

YAML MUST NOT:

* replace semantic explanation
* appear before identity/behavior description
* restate information already sufficiently communicated in prose unless structural hierarchy or implementation precision requires it

Preferred order:

1. identity statement
2. semantic bullets
3. YAML/spec block (optional)

---

## Prose Rules

The document SHOULD use:

* dense declarative writing
* semantically grouped writing
* stable terminology
* local reinforcement of important concepts

The document SHOULD avoid:

* marketing tone
* rhetorical filler
* excessive abstraction
* implementation dumps without context

Important system concepts MAY be intentionally repeated locally inside sections.

Technical prose SHOULD favor compressed semantic clusters over decomposed specification lists.

Closely related implementation details SHOULD be merged into compact semantic clusters rather than separated into mechanically isolated bullets.

Preferred:
- Background `{surface-tag}`, text `{colors.on-surface}`, type `tag-chip`, rounded `{radius.sm}` (4px).

Avoid:
- Background `{surface-tag}`
- Text `{colors.on-surface}`
- Radius `{radius.sm}` (4px)

### Redundancy Rules

Intentional repetition of identity-bearing concepts is permitted.

Important system concepts MAY be repeated locally inside sections rather than referenced abstractly from earlier sections.

This improves:

* independent section readability
* AI retrieval quality
* terminology consistency
* implementation clarity

Examples:

* tonal layering
* restrained motion
* architectural containers
* structural whitespace
* editorial reading flow
* no shadows

Avoid relying entirely on earlier philosophy sections for contextual understanding.

---

## Component Writing Contract

Every reusable component section MUST contain:

1. component name
2. 1-line identity statement
3. 3–5 semantic bullets

Component bullets SHOULD collectively communicate:
- visual identity
- dimensions/tokens
- usage context
- interaction behavior
- important constraints

These categories SHOULD be semantically grouped into dense, readable bullets rather than mechanically separated into one category per bullet.

Not every component requires every category, but reusable components SHOULD communicate enough information to understand role and behavior without reading implementation specs.

Components SHOULD include contextual examples.

Preferred:

```md
Used for Hire Me (home CTA), project navigation, and contact actions.
```

Preferred component format:

```md
### `button-primary`

Primary committed action using tonal contrast rather than elevation.

- Background `{colors.accent}`, text `{colors.accent-on}`.
- Height `{height-interactive-md}` (44px), radius `{radius.sm}` (4px).
- Used for Hire Me (home CTA), contact actions, and project navigation.
- Hover reduces opacity only; focus uses `{colors.focus-ring}`.
```

Components MUST NOT:

* begin with YAML
* exceed 6 bullets before implementation detail
* rely entirely on implementation specs for understanding

### Contextual Usage Rules

Reusable components SHOULD include contextual usage examples whenever practical.

Preferred:

```md id="2okg1j"
Used for Hire Me (home CTA), project navigation, and contact actions.
```

Avoid:

```md id="w6e6xm"
Used for primary actions.
```

Contextual examples improve:

* scanability
* grounding
* implementation confidence
* AI interpretation quality

---

## Validation Rules

A valid `DESIGN.md` SHOULD:

* expose identity before implementation
* remain scannable top-to-bottom
* avoid dense prose walls
* maintain stable terminology
* keep YAML secondary to prose
* use semantic-token + resolved-value formatting consistently
* avoid excessive heading nesting
* avoid repeating identical information across prose and YAML
* preserve consistent cadence across sections
* satisfy defined Compression Targets

A valid component SHOULD:

* be understandable within ~10 seconds of scanning
* communicate role before implementation
* expose constraints clearly
* avoid over-fragmentation

### Stable Terminology Rules

Projects SHOULD define stable repeated vocabulary for identity-bearing concepts.

Preferred terminology SHOULD remain consistent across the document.

Avoid:

* synonym drift
* multiple phrases for the same concept
* inconsistent naming between sections

Example stable terminology:

* tonal layering
* structural whitespace
* architectural containers
* restrained motion
* raised surfaces
* sunken surfaces

Consistent terminology improves:

* readability
* retrieval quality
* implementation consistency
* long-term maintainability

Sections SHOULD remain understandable when read independently outside full document context.

---

# Anti-Patterns

The following patterns SHOULD be avoided across all `DESIGN.md` systems.

## Structural Anti-Patterns

Avoid:

* excessive heading nesting
* deeply fragmented subsection trees
* orphaned subsections
* duplicated sections across categories
* inconsistent section ordering
* giant uninterrupted YAML blocks

---

## Prose Anti-Patterns

Avoid:

* prose walls
* marketing-style language
* rhetorical filler
* implementation-heavy paragraphs
* excessive abstraction without grounding
* repeating identical information across prose and YAML

---

## Component Anti-Patterns

Avoid:

* component sections beginning with YAML/specs
* components without identity statements
* components without usage context
* raw implementation dumps without semantic framing
* bullets fragmented into excessively granular implementation details

Avoid:

```md id="j5np06"
- Height 44px.
- Radius 4px.
- Padding 24px.
```

Prefer:

```md id="x2v1w3"
- Height `{height-interactive-md}` (44px), radius `{radius.sm}` (4px), with `{spacing.lg}` (24px) horizontal padding.
```

---

## Terminology Anti-Patterns

Avoid:

* synonym drift for core concepts
* inconsistent naming between sections
* introducing multiple phrases for the same system behavior

Preferred:

* stable repeated terminology
* local reinforcement of core concepts
* consistent semantic vocabulary

---

## Formatting Anti-Patterns

Avoid:

* bullets longer than 2 visual lines
* paragraphs longer than 5 visual lines
* more than 6 bullets before implementation details
* mixing editorial and technical prose styles within the same local section

---

## Token Anti-Patterns

Avoid:

* raw values without semantic linkage when reusable tokens exist
* token-only prose without resolved values where readability benefits
* implementation-token overload in editorial sections

Avoid:

```md id="vfb0qt"
padding-inline-md
```

Prefer:

```md id="8rdr6d"
padding `{spacing.md}` (16px)
```

---

## YAML Anti-Patterns

Avoid:

* YAML duplicating prose directly
* deeply nested YAML hierarchies
* YAML used before semantic explanation
* implementation specs without contextual understanding

YAML SHOULD support prose, not replace it.

This section is valuable because it teaches:

* what failure looks like
* what drift looks like
* what to reject during review

which dramatically improves agent consistency.

---

# Canonical Structure Model

## Core Sections

These SHOULD exist in most substantial design systems:

* Overview
* Foundations
* Components

## Recommended Sections

These SHOULD exist when relevant:

* Layout & Composition
* Accessibility
* Technical Conventions
* Do’s & Don’ts
* Motion
* Responsive Behavior

## Optional Specialized Sections

These MAY exist depending on product type:

* Editorial Composition
* Data Visualization
* Commerce Patterns
* Motion Systems
* Dashboard Patterns
* Long-form Reading Layout
* Project Detail Layouts
* About Layouts
* Diagram Systems
* Brand Expression

Optional sections SHOULD only exist when they meaningfully describe reusable system behavior, composition rules, or domain-specific interaction patterns.

---

## Section-Type Writing Modes

Content SHOULD adopt the writing mode of its parent section category.

Avoid mixing editorial, technical, and implementation-heavy prose styles within the same local section.

Different section categories SHOULD maintain distinct writing modes.

### Overview Sections

Mode:

* editorial and conceptual

Characteristics:

* prose-first
* minimal implementation detail
* minimal YAML
* dense declarative writing

---

### Foundation Sections

Mode:

* semantic-system documentation

Characteristics:

* table-first where appropriate
* token-oriented
* concise explanatory prose
* implementation vocabulary permitted

---

### Layout & Composition Sections

Mode:

* architectural and compositional

Characteristics:

* spatial behavior focused
* reading-flow oriented
* concise structural rules
* responsive behavior descriptions

---

### Component Sections

Mode:

* compact semantic spec

Characteristics:

* identity-first
* semantic bullets before implementation
* contextual examples encouraged
* YAML secondary to prose

Component prose SHOULD read like a compressed editorial systems manual rather than API reference documentation.

---

### Technical Convention Sections

Mode:

* dense technical reference

Characteristics:

* compact
* highly structured
* minimal prose
* implementation-oriented

---

### Iteration Sections

Mode:

* short practical notes

Characteristics:

* concise
* bullet-first
* non-defensive
* future-oriented without speculation

---

# 2. Product-Type Extensions

## Portfolio Extension

Portfolio systems SHOULD prioritize:

* editorial reading flow
* project storytelling
* restrained interaction
* architectural composition
* narrative hierarchy

Portfolio systems SHOULD include:

* long-form reading layout
* project detail structure
* editorial composition rules
* imagery treatment
* About layouts

Portfolio systems SHOULD avoid:

* SaaS-style dashboard density
* growth-marketing aesthetics
* decorative motion systems

Preferred terminology:

* editorial
* architectural
* tonal layering
* narrative hierarchy
* structural whitespace

---

## SaaS Extension

SaaS systems SHOULD prioritize:

* information clarity
* operational efficiency
* dense workflows
* state communication
* scalability

SaaS systems SHOULD include:

* forms
* data display
* navigation systems
* feedback states
* tables
* filtering/sorting patterns

SaaS systems SHOULD define:

* state systems
* empty/loading/error states
* permissions and hierarchy indicators

Preferred terminology:

* workflows
* operational surfaces
* data density
* feedback states
* system status

---

## Docs-Site Extension

Documentation systems SHOULD prioritize:

* reading ergonomics
* information hierarchy
* navigation clarity
* code readability
* progressive disclosure

Docs systems SHOULD include:

* prose composition rules
* code block standards
* navigation hierarchy
* sidebar behavior
* content-width rules

Docs systems SHOULD optimize for:

* skimming
* anchor navigation
* reference retrieval
* long-session readability

Preferred terminology:

* reading flow
* content hierarchy
* navigation depth
* reference surfaces
* progressive disclosure

---

# 3. Project-Specific Schema

## Purpose

Project-specific schema defines:

* exact required sections
* canonical ordering
* required terminology
* local structural conventions

This layer specializes the universal contract for a specific product.

---

## Schema Rules

Project schemas MAY:

* require specific sections
* define canonical ordering
* enforce terminology
* introduce specialized modules
* define local constraints

Project schemas MUST NOT:

* violate universal writing rules
* replace semantic-first structure
* remove component-writing requirements

---

## Portfolio Schema Example

### Required Top-Level Sections

```md
1. Overview
2. Foundations
3. Layout & Composition
4. Do's & Don'ts
5. Components
6. Accessibility
7. Technical Conventions
8. Iteration Notes
```

### Required Portfolio-Specific Sections

```md
- Long-form Reading Layout
- Editorial Composition
- Project Detail
- About Layouts
```

### Canonical Ordering

Sections SHOULD appear in this order:

1. identity/philosophy
2. foundational primitives
3. composition/layout
4. reusable components
5. technical constraints
6. iteration notes

---

## Local Terminology Rules

Projects SHOULD define stable vocabulary for repeated concepts.

Preferred terminology SHOULD remain consistent across the document.

Example portfolio vocabulary:

* architectural containers
* tonal layering
* editorial layout
* structural whitespace
* restrained motion
* raised surfaces
* sunken surfaces

Avoid introducing multiple terms for the same concept.

---

## Structural Validation Rules

A valid project-specific `DESIGN.md` MUST:

* preserve canonical ordering
* contain all required sections
* avoid orphaned subsections
* maintain consistent heading hierarchy
* keep related concepts grouped semantically

Agents MAY:

* add optional subsections when justified
* reorganize content within valid sections
* extend component groups

Agents MUST NOT:

* casually rename canonical sections
* duplicate sections across categories
* introduce unnecessary hierarchy depth
* move content into semantically unrelated sections




