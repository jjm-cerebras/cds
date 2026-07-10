# - WORK IN PROGRESS -

# CDS AI

AI-ready design system pairs OKF guidance with DTCG design tokens

<https://github.com/GoogleCloudPlatform/knowledge-catalog> \
<https://www.designtokens.org>

### Repo structure

**Knowledge** \
- Detailed usage guidance, examples, accessibility, and related design rules
 
**Tokens** \
- Machine-readable token values, definitions, and concise purpose

### Naming convention

**Slot vocabularies are disjoint**

The category, element, priority, and state lists share no term, and a term is never reassigned between slots. Terms are single lowercase words and `-` appears only as the delimiter. This is what lets a name with omitted slots parse by registry lookup to exactly one reading.

**Primitive**
[type?]-[element]-[ramp]
- category: color, size, space, weight, height, width, radius, opacity, shadow, z-index, etc
- element: orange, text, etc
- ramp: 500, small, semibold, etc
- ? = optional

examples
- color-orange-500
- orange-500
- text-medium
- tracking-small

**Semantic**
[type]-[element]-[tier?]-[state?]
- category: color, size, space, weight, height, width, radius, opacity, shadow, z-index, etc
- element: background, text, icon, border, etc
- tier: primary, secondary, tertiaey, utility, ghost, etc
- state: default, active, disabled, hover, etc
- ? = optional

examples
- color-background-primary-hover
- color-background-secondary (no state = default)
- color-text-disabled (skip tier)
- size-icon (category + element only)
