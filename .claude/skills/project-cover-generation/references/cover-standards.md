# Cover Standards

Rendering modes, CSS conventions, annotation construction rules, composition
principles, and anti-patterns. Extracted from cover-system-guide.md.

---

## Rendering Modes

### Live React SVG component (preferred for diagram-based covers)

Use when: the composition requires theme-adaptive colors, or Caveat annotations
will be added, or freezing to one theme would break readability.

**File location:** `src/components/project/covers/<slug>.tsx`

**Registration:** Add to `src/components/project/covers/index.ts`:
```ts
import ModelExtractionAttacksCover from './model-extraction-attacks'
// ...
export const coverComponents: Record<string, ComponentType> = {
  'model-extraction-attacks': ModelExtractionAttacksCover,
  '<slug>': <SlugCover>,
}
```

**SVG requirements:**
```tsx
<div aria-hidden="true" className="...">
  <svg
    viewBox="0 0 1200 675"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* composition */}
  </svg>
</div>
```

- `viewBox="0 0 1200 675"` — fixed, never change
- `aria-hidden="true"` on both the wrapper `<div>` and the `<svg>` — covers are decorative
- No `width`/`height` attributes on the `<svg>` — sizing is handled by the wrapper

### Static asset

Use when: the composition is theme-independent (photograph, raster crop) and no
annotations are needed.

**File location:** `/public/projects/<slug>/hero-cover.webp` (prefer WebP; PNG if
transparency is required).

Update `heroImage` in the MDX frontmatter:
```yaml
heroImage: "/projects/<slug>/hero-cover.webp"
```

Omit `heroImage` when using a live component — the cover registry handles rendering.

---

## Color Rules (live SVG components)

**All colors must be CSS custom properties.** No hardcoded hex, rgb(), or rgba() values.

| Use | Token |
|---|---|
| Structural elements (nodes, connectors, text) | `var(--on-surface)` |
| Borders, edges | `var(--outline-variant)` |
| Surface backgrounds | `var(--surface)`, `var(--surface-container)` |
| Single focal highlight element (one only) | `var(--accent)` |
| Annotation text and arrow strokes | `var(--accent)` |

**Accent discipline:** One structural element in the base composition may use
`var(--accent)` as a focal highlight. All other structural elements use `--on-surface`
or `--outline-variant`. Annotations may freely use `--accent` for text and arrows.

---

## Composition Principles

### Focal structure

- Single dominant focal area — not a split composition with disconnected halves
- Asymmetric balance; preserved whitespace
- Left-to-right narrative flow for pipeline/process diagrams — terminal element far right
- Readable thumbnail silhouette — test the 320×180px card crop before finalizing

### Safe zones

Keep important visual content away from extreme edges. Cards crop covers. Critical
elements near edges will be cut off in card layouts.

### Technical grounding

The cover encodes real project structure. Sources for cover concepts:
- Architecture diagrams and pipelines
- Data flows and model behavior
- Key experimental structure or findings
- Domain-specific structures (lane geometries, attention maps, etc.)

Not: generic neural network graphics, random particle systems, decorative circuitry.

**Test:** Can someone identify the project's central technical tension from the cover alone?
If no, the concept is wrong.

---

## Engineering Annotations

Annotations are second-pass additions after base composition approval. Build only
when explicitly approved.

### Content rules

Source annotation content from what is genuinely project-specific:
- Real numbers: "25k queries", "82.88%", "38ms/frame"
- Algorithm names specific to this project: "entropy-ranked coreset", "Double DQN refinement"
- Distinctive architectural decisions

Reject annotation content that could belong to any project in the domain:
- "ResNet-50", "PyTorch", "CIFAR-10" — these are context, not contribution
- Generic phase labels: "Training", "Inference"

### Construction rules

```
Font:   Caveat (var(--font-caveat)) — the only permitted font in annotations
Color:  var(--accent) for both text and arrow strokes — no other color
Count:  2–3 annotations maximum; each targets a distinct diagram element
```

**Arrow geometry:**
- Bezier path ends **7–9px before the arrowhead tip** — the path and arrowhead must not share a point
- Arrowhead: two independent `<line>` elements branching from the tip point
- Path starts from the edge of the label text nearest the target (not the far edge)

**Example structure:**
```tsx
{/* annotation label */}
<text
  x={420} y={180}
  fontFamily="var(--font-caveat)"
  fontSize={18}
  fill="var(--accent)"
>
  25k queries
</text>

{/* arrow path — ends 8px before tip */}
<path
  d="M 460 190 Q 480 220 495 238"
  stroke="var(--accent)"
  strokeWidth={1.5}
  fill="none"
/>

{/* arrowhead — two lines from tip */}
<line x1={495} y1={246} x2={491} y2={238} stroke="var(--accent)" strokeWidth={1.5} />
<line x1={495} y1={246} x2={503} y2={240} stroke="var(--accent)" strokeWidth={1.5} />
```

---

## Anti-Patterns

**Composition:**
- Generic AI art, fake holograms, random circuitry graphics, meaningless particles
- Dense unreadable labels; over-detailed UML-style diagrams
- Split compositions with disconnected regions and no reading direction
- Overly symmetrical compositions with no focal hierarchy
- Dead horizontal space that breaks reading flow
- Mixed element sizes and label styles within the same diagram

**Color:**
- Hardcoded hex or rgb() values in live SVG components
- Accent spread across multiple structural elements — one focal highlight maximum
- Annotations in any color other than `var(--accent)`

**Process:**
- Building annotations before the base is approved
- Writing code before a direction is selected
- Exporting a theme-adaptive diagram as a static PNG — use a live SVG component
- Omitting `aria-hidden` from wrapper or SVG
- Using any font other than Caveat in annotation text
- Starting path and arrowhead at the same coordinate
