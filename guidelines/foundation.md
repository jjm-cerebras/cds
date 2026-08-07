---
version: 0.1.4
type: reference
title: design foundation
timestamp: 2026-07-17T00:00:00Z
---

# Foundation

How the [`tokens/`](../tokens/) combine into the CDS look and feel. Each section states the rules (RFC 2119: MUST, MUST NOT, SHOULD, MAY) that the raw token values can't carry on their own.

### Index

- [Colors](#colors)
- [Typography](#typography)
- [Layout](#layout)
- [Elevation & Depth](#elevation--depth)
- [Shapes](#shapes)
- [Motion](#motion)
- [Icons](#icons)

---

## Colors

Tokens for this section live in [`tokens/primitive.json`](../tokens/primitive.json) (raw ramps) and [`tokens/semantic.json`](../tokens/semantic.json) (semantic aliases).

CDS color resolves in two layers, and they are not interchangeable:

1. **Raw palette** — the Radix-style ramps (`brand-*`, `info-*`, `negative-*`, `positive-*`, `warning-*`, `neutral-*`, `cds-neutral-*`, `tier-*`). Numeric positions carry fixed meaning: low numbers are pale surface tints, `50` is the strongest usable solid fill, high numbers are the dark end.
2. **Semantic aliases** — `accent`, `accent-hover`, `accent-subtle`, `surface`, `foreground`, `foreground-muted`, `divider`. Components consume these; they indirect over the palette so the brand can re-map centrally.

- **MUST NOT** wire a component to a raw palette value where a semantic alias exists (use `accent`, not `brand-50`, for the primary action).
- **MUST** author and adjust color in OKLCH — edit lightness/chroma/hue, never the compiled hex.

### 1) Neutrals and surfaces

The warm `cds-neutral` ramp is the backbone; the cooler `neutral` ramp covers non-branded chrome.

| Token               | Value                        | Use                                                    |
| ------------------- | ---------------------------- | ------------------------------------------------------ |
| `surface`           | `oklch(97.1% 0.005 78.3)`    | Warm off-white page / body canvas                      |
| `cds-neutral-0`     | `oklch(1 0 0)` (white)       | Card / modal / popover fill — the elevation signal     |
| `foreground`        | `oklch(0.2156 0 0)`          | Primary text — headings, body, labels                  |
| `foreground-muted`  | `oklch(0.5 0.003 67.78)`     | Secondary text — captions, column headers, row numbers |
| `divider`           | `oklch(0.9331 0.0067 67.74)` | Hairline borders, dividers, track fills                |
| `neutral-50`        | `#716F79`                    | Muted chrome, sidenav headings                         |

- **MUST** use `surface` as the page background and pure white (`cds-neutral-0`) for cards. Elevation comes from that warmth contrast plus a soft `shadow`, not a darkened canvas.
- **MUST NOT** use pure `black` for text — `foreground` is the near-black that keeps high contrast from feeling harsh.
- **SHOULD** reach for `foreground-muted` only for genuinely secondary text; body copy stays in `foreground`.

### 2) Brand accent — orange

The single Cerebras signature. Warm, saturated, energetic — and therefore scarce.

| Token                 | Value                        | Use                                                   |
| --------------------- | ---------------------------- | ----------------------------------------------------- |
| `accent`              | `oklch(66.1% 0.196 37.71)`   | Primary button, focus, active/selected — the one CTA  |
| `accent-hover`        | `oklch(77.6% 0.145 49.61)`   | Hover/pressed of the primary action                   |
| `accent-subtle`       | `oklch(98% 0.01 17)`         | Selected/alternate row wash, accent callout, copied flash |
| `accent-hover-subtle` | `oklch(98.5% 0.006 51)`      | Hover of subtle accent surfaces, interactive-text hover |

- **States lift, they don't darken.** On hover, lightness moves *up* (`accent` ~66% → `accent-hover` ~78%) so the surface feels like it warms toward you rather than receding.
- **MUST** reserve `accent` for the *one* primary action in a view.
- **MUST NOT** use orange for large fills, backgrounds, or body text.
- **MUST NOT** let orange stand in for a real error state — that is red's job.

### 3) Semantic status — _they mean something to the user_

Each status role has a solid (`50`) and pale surfaces (`5`–`25`). Use the surface behind a message and the solid for its icon/border/emphasis.

| Role         | Solid           | Surface          | Speaks when…                          |
| ------------ | --------------- | ---------------- | ------------------------------------- |
| **positive** | `positive-50`   | `positive-10`    | An action succeeded                   |
| **negative** | `negative-50`   | `negative-10`    | Error / destructive / failure         |
| **warning**  | `warning-50`    | `warning-10`     | Caution before an action              |
| **info**     | `info-50`       | `info-10`        | Neutral guidance or notice            |

- **Validation red is `cds-danger`, not `negative`.** Field-level error text, the required-field asterisk, and invalid-input borders use `cds-danger-8` / `cds-danger-9` (truer red hue). The `negative` ramp is the pinker family for destructive-action buttons and banners.
- **MUST** pick the role that matches user meaning (a delete confirmation is **negative**, not
  **warning**).
- **MUST NOT** use status hues decoratively. No state to communicate → no status color.

### 4) Data visualization

- **`tier-1` … `tier-5`** — an ordered orange ramp for ranked/tiered data (dark → bright).
- For categorical series without a ranking, draw from the status + info + brand solids (`positive-50`, `info-50`, `negative-50`, `warning-50`, `accent`).
- **MUST** add non-color cues (labels, patterns, shapes) so charts read for colorblind users and in greyscale.

---

## Typography

Type tokens live in [`tokens/semantic.json`](../tokens/semantic.json) (named recipes) and [`tokens/primitive.json`](../tokens/primitive.json) (families, weights, display scale).

### Families

- **Manrope** (`family-sans`) — all interface text: screens, forms, tables, dashboards. Geometric-humanist; modern and precise with just enough warmth to agree with the neutrals. Loaded via `next/font/google` as `--font-manrope`.
- **Sometype Mono** (`family-mono`) — values, buttons, link buttons, breadcrumbs, token names, row numbers, code — anything meant to be copied or aligned in a column. Monospace *is* the copyability affordance.
- **MUST NOT** introduce third-party UI fonts (Inter, Geist, SF Pro, Roboto). The fallback stack
  (`ui-sans-serif`, `system-ui`) covers platforms where Manrope is unavailable.

### Type recipes

Type ships as **named composite tokens** (size + line-height + weight + letter-spacing), not loose sizes. Pick the recipe by role; don't hand-assemble a fifth combination.

| Token           | Size / px      | Weight | Use                                              |
| --------------- | -------------- | ------ | ------------------------------------------------ |
| `page-title`    | 1.25rem / 20px | 500    | Page / view title                                |
| `section-title` | 1rem / 16px    | 500    | Section heading within a page                    |
| `body`          | 0.875rem / 14px| 400    | Default body / paragraph text                    |
| `body-medium`   | 0.875rem / 14px| 500    | Emphasized body, names                           |
| `bold-text`     | 0.875rem / 14px| 600    | Strong emphasis inline                           |
| `input`         | 0.875rem / 14px| 500    | Text inputs                                      |
| `button`        | 0.875rem / 14px| 600    | Button labels — **Sometype Mono, UPPERCASE**, +0.01em |
| `small-text`    | 0.8125rem / 13px| 500   | Compact secondary text                           |
| `helper-text`   | 0.75rem / 12px | 400    | Helper / hint text under fields                  |
| `table-header`  | 0.75rem / 12px | 600    | Table column headers — **UPPERCASE**, +0.02em    |
| `code`          | 0.875rem / 14px| 500    | Inline / block code (Sometype Mono)              |

Display sizes (`display-small` 26px → `display-xl` 96px, all weight 700) are for hero and marketing moments only — never product chrome.

Rules:

- **MUST** render body copy in `body` (14px) and `foreground`. Using `foreground-muted` for body "to differentiate it from headings" is a drift pattern — size and weight already carry hierarchy.
- **MUST NOT** drop body copy below **13px** (`small-text`).
- **MUST** set weight via the recipe/token, not arbitrary numerics. Emphasis rides on 500 and 600;
  **700 is reserved** for display and rare bold.
- **MUST** use sentence case for titles, section headings, labels, menu items, and body — no Title Case.
- **MUST** render **button labels** and **table column headers** in **UPPERCASE**; this is a deliberate CDS signature, not a drift. Buttons additionally switch to **Sometype Mono**
  (`text-button-grp`); table headers stay Manrope (`text-table-header-grp`). Do not apply uppercase anywhere else (no ALL-CAPS eyebrows on headings or tags).

---

## Layout

Spacing tokens live in [`tokens/primitive.json`](../tokens/primitive.json) under `spacing`.

Cerebras spacing is a **4px-base** system (Tailwind's default scale). Every distance — padding, margin, gap, inset — **MUST** land on a step from the `spacing` scale. No off-grid `13px` or `10px 14px`.

### Picking a step

Tight component interiors land at `1`–`2` (4–8px); roomier interiors at `3`–`4` (12–16px); section- and page-level spacing at `6`–`12` (24–48px).

### Principles

- **MUST** express relationships through proximity — related things sit closer, unrelated things further apart.
- **MUST** keep spacing consistent within repeating elements (table rows, list items, card grids) — consistency is what makes dense views scannable.
- **MUST** vary the step to express hierarchy; the same gap on every edge flattens it.
- **MAY** make ±one-step optical adjustments, but the starting point is always a token, not a pixel measurement.
- For full-page composition — the structure and spacing rhythm of a list / table view — see [Page patterns](./patterns.md).

---

## Elevation & Depth

Shadow tokens live in [`tokens/primitive.json`](../tokens/primitive.json) under `shadows`.

Cerebras elevation is **warmth-first, shadow-second**. There is no multi-plane z-scale; depth is a quiet cue.

| Plane        | Surface token     | Shadow          | Use                                                          |
| ------------ | ----------------- | --------------- | ------------------------------------------------------------ |
| **Canvas**   | `surface`         | —               | The warm page background. Everything sits on this.           |
| **Card**     | `cds-neutral-0`   | `shadow`        | White cards/panels on the warm canvas + soft 1px/4px shadow. |
| **Overlay**  | `cds-neutral-0`   | `shadow-overlay`| Modals, popovers, dropdowns, toasts.                         |
| **Recessed** | `divider` fill    | —               | Table header bands, wells, progress tracks — inset, no shadow.|

- **MUST** create card/panel separation with white-on-warm + `shadow` (or a `divider` hairline), not by darkening the canvas.
- **MUST** pair overlays (modal, popover, toast) with `shadow-overlay` (`0 8px 24px rgba(0,0,0,.08)`) and the modal/dropdown motion in [Motion](#motion).
- **MUST NOT** stack card-on-card shadows or use glass/blur effects as generic polish.
- **SHOULD** default to a hairline before a shadow when grouping content inside a page.

---

## Shapes

Radius and border tokens live in [`tokens/primitive.json`](../tokens/primitive.json) under `rounded` and `borders`.

### Corner radius

Corners are barely rounded — precise and technical, not playful. **One radius does nearly everything.**

| Token         | rem      | px   | Use                                                    |
| ------------- | -------- | ---- | ------------------------------------------------------ |
| `rounded-sm`  | 0.125rem | 2px  | Default — buttons, inputs, cards, chips, swatches, toasts |
| `rounded-md`  | 0.25rem  | 4px  | Slightly larger controls where 2px looks tight         |
| `rounded-lg`  | 0.5rem   | 8px  | Large containers, modals                               |
| `rounded-full`| pill     | —    | Pills, badges, avatars, circular controls              |

- **MUST** default to `rounded-sm` (2px). Reach past it only for large containers (`lg`) or pill/circular shapes (`full`).
- **MUST NOT** emit arbitrary radii like `border-radius: 10px`; map to the nearest token.

### Borders & focus

- **MUST** use a **1px** hairline (`divider` / `cds-neutral-200`) for resting borders (inputs, cards, table rules).
- **Focus is a 2px brand-orange indicator.** Two dominant shapes exist in the shipped library, and both are canonical:
  - **Buttons & menu items** — `outline: 2px solid focus` at `2px` offset.
  - **Inputs, dropdowns, selects** — a solid 2px `focus` box-shadow ring plus a `focus` border. (The ring is solid rather than a translucent glow so it stays crisp and isn't muddied against the field border.)

  The **`focus` token** resolves to `brand-52` (`#E04A18`). It was darkened from the shipped `brand-50` (`#FF985C`) so the 2px indicator clears the **3:1** non-text-contrast minimum (WCAG 2.2 §1.4.11) against both the warm canvas and white cards — `brand-50` measured only 1.95:1 / 2.12:1. Retune focus centrally via this one token.
- **MUST** show one of those focus indicators on every focusable control; **never** ship `outline: none` without replacing it. (Note: a few controls historically use an interactive-blue ring — `ring-interactive-55` — and RadioButton uses the `shadow-focus` glow token `0 0 0 4px #89D8F0`. Prefer the brand-orange indicator for new work; treat the others as legacy.)
- **MUST NOT** use thick colored borders as the sole callout emphasis — use a status surface + icon.

---

## Motion

Motion tokens live in [`tokens/primitive.json`](../tokens/primitive.json) under `motion`.

Motion is a clarifying layer, never decoration. The system defines two everyday durations and a directional one; **all of it collapses under reduced motion.**

- **`fast` (150ms, ease)** — hover and interactive feedback (`transition-fast`). Dropdowns/popovers open with `fadeSlide` (fade + 4px rise) at this duration.
- **`normal` (200ms, ease)** — larger movement. Modals fade the blanket (`overlayShow`) and rise the content (`contentShow`, fade + `--modal-rise` 8px).
- **`slide` (400ms, `cubic-bezier(0.16, 1, 0.3, 1)`)** — directional slide-and-fade for panels entering from an edge.
- **`spinner` (0.7s linear)** — the loading spinner; `dot-pulse` and `bar-slide` are its variants.

Rules:

- **MUST** respect `prefers-reduced-motion: reduce` — the `--modal-rise` offset collapses to `0`, so entrances become opacity-only. Honor this everywhere.
- **MUST** use the duration/easing tokens above rather than hand-authored values.
- **SHOULD** animate `transform` and `opacity` (not `top`/`left`/`width`/`height`) to keep frames cheap.
- **SHOULD** make exit motion match or beat entrance so dismissed elements clear quickly.
- **MUST NOT** auto-play decorative loops (glow, gradient sweeps) on dense product surfaces; save expressive motion for marketing/hero moments.

---

## Icons

- **Library:** **lucide-react** is the primary icon set (a small amount of Heroicons exists in legacy spots). **MUST NOT** mix a third pack in, and **MUST NOT** substitute Unicode/emoji/HTML entities (`›` `→` `✓` `✕` `…` `⚠`) for real icons.
- **Size:** default **16px** in product UI; icons inherit `currentColor` so they take the color of the text or control they sit in.
- **Color:** pair the icon role with the text role — a muted icon beside muted text (`foreground-muted`), a status icon in its status solid (`negative-50`, `positive-50`, …).
- **Accessibility:** meaningful icons carry an accessible name; decorative icons beside a label are hidden from assistive tech.
