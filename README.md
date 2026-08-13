# CDS (Cerebras Design System)

Using DTCG design token format and OKF repo structure for context and knowledge

<https://www.designtokens.org> \
<https://github.com/GoogleCloudPlatform/knowledge-catalog>

### Repo structure

**AGENTS.md**
- Instructions for AI agents to design and implement interfaces consistently

**/guidelines**
- Design principles and rules, detailed usage guidance, examples, accessibility
 
**/tokens**
- Machine-readable token values, definitions, and concise purpose

**/src**
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
