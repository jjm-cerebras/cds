---
name: design-cds
description: Build UI that belongs in the Cerebras Cloud platform — product UI, dashboards, tables, forms, onboarding, docs surfaces. Use whenever generating or reviewing HTML/CSS/React that must follow the Cerebras Design System (CDS): its tokens (OKLCH colors, 4px spacing, 2px radius, Manrope + Sometype Mono), foundations, components (Button, Table, Breadcrumbs, Heading, Textbox, Chips, Tabs, Banner, etc.), page patterns, accessibility contract, and voice. Triggers on "Cerebras", "CDS", "cds-*" tokens, or requests to match the Cerebras look.
---

# Cerebras Design System

A token-first design system for the Cerebras Cloud platform. Everything is bundled in this folder. Load only what the task needs — don't read every file up front.

## Start here

Read **`DESIGN.md`** first. It's the manifest: overview, do's & don'ts, voice, accessibility, and responsive rules, with links to everything below.

## Where things live

- **`tokens/`** — source of truth (DTCG JSON). `primitive.json` (raw ramps), `semantic.json` (aliases like `accent`, `surface`, `foreground`), `alias.json` (component bindings), plus per-component token files. **`src/tokens.css` is generated from these** — never hand-edit it.
- **`guidelines/foundation.md`** — how tokens combine: colors, typography, layout, elevation, shapes, motion, icons.
- **`guidelines/components.md`** — behavioural rules per component (variants, when to use which, anti-patterns).
- **`guidelines/patterns.md`** — full-page composition templates (e.g. list/table view). Reference build: `examples/clusters.html`.
- **`guidelines/principles.md`** — emphasis & hierarchy rules.
- **`guidelines/workflow.md`** — the two-layer model (approved components vs manifest) and how to build a page or a new component.
- **`guidelines/accessibility.md`** — the WCAG 2.2 AA contract: keyboard, focus, and ARIA per component, plus a **generated contrast table** with flagged sub-AA pairings.
- **`src/`** — the reference React component library (all 13 components) + the `tokens.css` / `tokens.ts` bridge and `components.css` (pseudo-state styling). `src/index.ts` is the barrel export.
- **`examples/`** — static HTML the components render to: `components.html` (the full gallery, generated from `src/`) and `clusters.html` (the list/table page pattern).
- **`scripts/`** — `build-tokens.mjs` (JSON → `tokens.css`), `render-examples.tsx` (SSR gallery), `contrast-table.mjs`, `check-token-refs.mjs`, `check-hardcoded.mjs`.

## Commands

```
npm run tokens     # regenerate src/tokens.css from the DTCG JSON
npm run examples   # re-render examples/components.html from src/
npm run contrast   # recompute the WCAG contrast table into accessibility.md
npm run lint       # token refs + hardcoded colors + stylelint + jsx-a11y
npm run build      # tokens + typecheck + examples
```

## Non-negotiables (verify against `DESIGN.md` for the full list)

- Reference tokens by key in prose; emit resolved values in code. **Never hardcode** a color, spacing, or radius that has a token.
- Warm `surface` canvas, white cards on top; elevation via soft `shadow`, not heavy drop shadows.
- Exactly **one orange `accent` primary action per view**. Semantic colors (green/red/blue/gray) signal state only.
- 4px `spacing` grid; 2px default radius. Manrope for text, Sometype Mono for CTAs/code/tabular data.
- 2px brand-orange `focus-visible` on every control; accessible name on every icon-only control; never rely on color alone. WCAG 2.2 AA floor — see `guidelines/accessibility.md`.
- Voice: precise, imperative CTAs ("Delete cluster"); errors as reason + fix; sentence case.

## Default output format — React/TSX

Unless the request asks for standalone HTML/CSS, produce **React/TSX** that matches the reference components in `src/`:

- **No literal style values in components.** Read token references (e.g. `"{colors.neutral-95}"`, `"{typography.page-title}"`) and resolve them with the `token()` / `typography()` helpers from `src/tokens.ts`, or the `av()` / `araw()` helpers from `src/alias.ts` for component-recipe values → they become `var(--colors-*)`, `var(--typography-*)`, etc.
- Model the API on the existing components: boolean props (`secondary`, `negative`, `small`), not string unions. "Primary" = the default (no `secondary`).
- Put base styling inline (via the token bridge); put pseudo-state styling (`:hover`, `:focus-visible`, `:disabled`) in `src/components.css` using `var(--…)` — see the `.cds-focus` / `.cds-focus-ring` utilities.
- When asked for HTML/CSS instead, emit resolved values via the CSS custom properties defined in `src/tokens.css` (see `examples/clusters.html`).

## Known accessibility deviations

The contrast tooling flags pairings that don't clear their WCAG floor — most importantly the **`brand-50` focus indicator (1.95:1 on canvas)** and **accent text/labels (white-on-`interactive-55`, 3.37:1)**. These are unresolved brand/token decisions; see the flagged section in `guidelines/accessibility.md` for the recommended token fixes. Don't claim full AA until they're addressed.
