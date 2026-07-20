# - WORK IN PROGRESS -

# CDS (Cerebras Design System)

Using DTCG design tokens

<https://github.com/GoogleCloudPlatform/knowledge-catalog> \
<https://www.designtokens.org>

### Repo structure

**DESIGN.md**
- Design system specification that teaches AI agents how to design and implement interfaces consistently

**Guidelines**
- Detailed usage guidance, examples, accessibility, and related design rules
 
**Tokens**
- Machine-readable token values, definitions, and concise purpose

**Source**
- Component library of approved UI components in isolation to serve as the visual reference

---

### Token architecture

**Structure**
- 3-tier system — primitive, semantic, component
- Primitive tokens are raw values (colors, spacing, radii, type sizes). Named by scale/value, not by usage.
- Semantic tokens reference primitives and encode intent (e.g., --color-accent → --color-orange-500).
- The trigger for adding a component tier is when more than 3 components need the same semantic override that doesn't map to an existing semantic token.

**Token format**
- DTCG-compliant JSON ($value / $type) for tooling and handoff
- Color values are in OKLCH
- CSS custom properties for runtime use
