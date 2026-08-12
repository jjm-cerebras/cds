---
version: 0.1.4
type: reference
title: accessibility
timestamp: 2026-08-12T00:00:00Z
---

# Accessibility

WCAG 2.2 AA is the floor for every CDS surface. RFC 2119 keywords (MUST, MUST NOT, SHOULD, MAY) apply.

---

## Keyboard & ARIA

- SHOULD: Each component's interaction contract
- SHOULD: "Roving tabindex" = one tab stop for the group; arrow keys move within it
- MUST: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns)
- MUST: Visible focus rings (`:focus-visible`; group with `:focus-within`)
- MUST: Manage focus (trap, move, return) per APG patterns
- NEVER: `outline: none` without visible focus replacement

---

### Targets & Input

- MUST: Hit target ≥24px (mobile ≥44px); if visual <24px, expand hit area
- MUST: Mobile `<input>` font-size ≥16px to prevent iOS zoom
- NEVER: Disable browser zoom (`user-scalable=no`, `maximum-scale=1`)
- MUST: `touch-action: manipulation` to prevent double-tap zoom
- SHOULD: Set `-webkit-tap-highlight-color` to match design

### Forms

- NEVER: Block paste in `<input>`/`<textarea>`
- MUST: Loading buttons show spinner and keep original label
- MUST: Enter submits focused input; in `<textarea>`, ⌘/Ctrl+Enter submits
- MUST: Keep submit enabled until request starts; then disable with spinner
- MUST: Accept free text, validate after—don't block typing
- MUST: Allow incomplete form submission to surface validation
- SHOULD: Disable spellcheck for emails/codes/usernames
- SHOULD: Placeholders end with `…` and show example pattern
- MUST: Warn on unsaved changes before navigation
- MUST: Trim values to handle text expansion trailing spaces
- MUST: No dead zones on checkboxes/radios; label+control share one hit target

### State & Navigation

- SHOULD: URL reflects state (deep-link filters/tabs/pagination/expanded panels)
- SHOULD: Back/Forward restores scroll position
- SHOULD: Links use `<a>`/`<Link>` for navigation (support Cmd/Ctrl/middle-click)
- SHOULD: Use `<div onClick>` for navigation

### Feedback

- SHOULD: Optimistic UI; reconcile on response; on failure rollback or offer Undo
- MUST: Confirm destructive actions or provide Undo window
- MUST: Use polite `aria-live` for toasts/inline validation
- SHOULD: Ellipsis (`…`) for options opening follow-ups ("Rename…") and loading states ("Loading…")

### Touch & Drag

- MUST: Generous targets, clear affordances; avoid finicky interactions
- MUST: Delay first tooltip; subsequent peers instant
- MUST: `overscroll-behavior: contain` in modals/drawers
- MUST: During drag, disable text selection and set `inert` on dragged elements

## Animation

- MUST: Honor `prefers-reduced-motion` (provide reduced variant or disable)
- SHOULD: Animate to clarify cause/effect or add deliberate delight
- SHOULD: Choose easing to match the change (size/distance/trigger)
- SHOULD: Animations interruptible and input-driven (no autoplay)
- SHOULD: Correct `transform-origin` (motion starts where it "physically" should)

## Layout

- SHOULD: Optical alignment; adjust ±1px when perception beats geometry
- MUST: Deliberate alignment to grid/baseline/edges—no accidental placement
- SHOULD: Balance icon/text lockups (weight/size/spacing/color)
- SHOULD: Verify mobile, laptop, ultra-wide (simulate ultra-wide at 50% zoom)
- SHOULD: Respect safe areas (`env(safe-area-inset-*)`)
- SHOULD: Avoid unwanted scrollbars; fix overflows

## Content & Accessibility

- SHOULD: Inline help first; tooltips last resort
- SHOULD: Skeletons mirror final content to avoid layout shift
- MUST: `<title>` matches current context
- SHOULD: No dead ends; always offer next step/recovery
- SHOULD: Design empty/sparse/dense/error states
- SHOULD: Curly quotes (" "); avoid widows/orphans (`text-wrap: balance`)
- SHOULD: `font-variant-numeric: tabular-nums` for number comparisons
- MUST: Redundant status cues (not color-only); icons have text labels
- MUST: Accessible names exist even when visuals omit labels
- MUST: Use `…` character (not `...`)
- SHOULD: Accurate `aria-label`; decorative elements `aria-hidden`
- SHOULD: Icon-only buttons have descriptive `aria-label`
- SHOULD: Prefer native semantics (`button`, `a`, `label`, `table`) before ARIA

---

## Text Handling

- MUST: Text containers handle long content (`truncate`, `line-clamp-*`, `break-words`)
- MUST: Flex children need `min-w-0` to allow truncation
- MUST: Handle empty states—no broken UI for empty strings/arrays
- MUST: Apply antialiased smoothing to the root layout so all text renders crisper and thinner (-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;)

---

## Dark Mode & Theming

- MUST: `color-scheme: dark` on `<html>` for dark themes
- SHOULD: `<meta name="theme-color">` matches page background
- MUST: Native `<select>`: explicit `background-color` and `color` (Windows fix)

---

## Design

- SHOULD: Hue consistency
- SHOULD: Accessible charts (color-blind-friendly palettes)
- SHOULD: Meet contrast—prefer [APCA](https://apcacontrast.com) over WCAG 2.0

---

## Components

| Component | Roles / attributes | Keyboard |
| --------- | ------------------ | -------- |
| **Breadcrumbs** | `<nav aria-label="Breadcrumb">`, last crumb `aria-current="page"` and not a link, separators `aria-hidden` | `Tab` through link crumbs; `Enter` follows |
| **Heading** | One `<h1>` per view (page), `<h2>` for sections; no skipped levels | — |
| **Button** | `<button>`; `aria-busy="true"` while loading; `disabled` (never a styled `<div>`) | `Enter` / `Space` activate |
| **SquareButton / IconButton** | Icon-only **MUST** carry `aria-label`; decorative icon `aria-hidden`; toggle uses `aria-pressed` | `Enter` / `Space` |
| **TextButton** | `<button>` (action) or `<a>` (navigation) — pick by behaviour, not looks | `Enter` (+ `Space` for button) |
| **Textbox** | `<label for>` (visible, not placeholder-only); error via `aria-invalid="true"` + `aria-describedby` to the message; required via `required` + `aria-required` | standard text editing |
| **Checkbox** | native `<input type="checkbox">`; group in `<fieldset><legend>` | `Space` toggles |
| **RadioButton** | native `<input type="radio">` group sharing a `name`, in `<fieldset><legend>` | arrows move + select within group; one tab stop |
| **Switch** | `role="switch"` + `aria-checked`; label association | `Space` / `Enter` toggle |
| **SegmentedControl** | `role="radiogroup"` + `role="radio"` items, or `tablist` if it swaps views | arrows move selection; roving tabindex |
| **Chips (Badge/Count/Stamp/StatusPill)** | Decorative text — no role. **MUST NOT** encode state in color alone; the text label carries meaning. Icon-only status needs an `aria-label` | not focusable unless interactive |
| **Tooltip** | `role="tooltip"`, referenced by `aria-describedby` on the trigger | shows on focus **and** hover; `Esc` hides; never the only home of critical info |
| **Notification** | `role="status"` (info/success) or `role="alert"` (error/warning); dismiss is a labelled `<button aria-label="Dismiss">` | `Tab` to dismiss; `Enter`/`Space` |
| **Spinner** | `role="status"` + `sr-only` "Loading…"; container `aria-busy="true"` | — |
| **Dropdown / Popover** | trigger `aria-haspopup` + `aria-expanded`; menu `role="menu"`, items `role="menuitem"`; selected item `aria-checked` | `Enter`/`Space`/`↓` open; arrows move; `Enter` select; `Esc` close + return focus |
| **Tabs** | `role="tablist"`, `role="tab"` + `aria-selected` + `aria-controls`, panel `role="tabpanel"` + `aria-labelledby`; roving tabindex | arrows move between tabs; `Home`/`End` jump; `Enter`/`Space` (manual activation) |
| **Table** | `<table>` with `<th scope="col">`; sortable header is a `<button>` in the `th` with `aria-sort` (`ascending`/`descending`/`none`); empty state announced, never a blank card | `Tab` to sort buttons; `Enter`/`Space` sort |
| **Banner** | `role="region" aria-label`; dismiss labelled | `Tab` to link + dismiss |
| **CodeBlock** | `<pre><code>`; read-only; if copy is offered, the copy control is a labelled button | `Tab` reaches copy control |

---

## Cross-cutting MUSTs

- NEVER: Rely on color alone — pair every status color with an icon or text label
- MUST: Keep every control reachable and operable by keyboard, in visual order
- MUST: Give every icon-only control an accessible name
- MUST: Support 200% zoom and reflow without loss of content or function

---

## Motion

- **MUST** honor `prefers-reduced-motion: reduce`: entrance rises (`--modal-rise`, `fadeSlide`)
  collapse to opacity-only, and non-essential looping animation stops. The spinner MAY keep turning
  (it communicates state) but MUST NOT be the only progress cue.
- **MUST** animate `transform`/`opacity`, never layout properties, so motion stays smooth and cheap.

---

## Contrast (generated)

The core text/background and focus pairings, with their measured WCAG contrast ratios. Regenerate
after any color-token change with `node scripts/contrast-table.mjs` (`npm run tokens` first). Normal
text needs **4.5:1**; non-text/UI (focus ring) needs **3:1**.

<!-- CONTRAST:START -->
<!-- GENERATED by scripts/contrast-table.mjs — do not edit by hand. -->

| Foreground | Background | Where | Ratio | Min | Result |
| ---------- | ---------- | ----- | ----: | --: | :----: |
| `foreground` | `surface` | Body / titles on the page canvas | 16.08:1 | 4.5:1 | ✅ pass |
| `foreground` | `white` | Body / titles on a white card | 17.49:1 | 4.5:1 | ✅ pass |
| `foreground-muted` | `surface` | Secondary text on canvas | 5.52:1 | 4.5:1 | ✅ pass |
| `foreground-muted` | `white` | Column headers, captions on a card | 6.00:1 | 4.5:1 | ✅ pass |
| `white` | `interactive-55` | Primary button label on the accent fill | 3.37:1 | 4.5:1 | ❌ FAIL |
| `white` | `negative-55` | Destructive button label | 6.85:1 | 4.5:1 | ✅ pass |
| `neutral-60` | `positive-10` | Status pill text — healthy | 9.28:1 | 4.5:1 | ✅ pass |
| `neutral-60` | `warning-15` | Status pill text — degraded | 8.93:1 | 4.5:1 | ✅ pass |
| `neutral-60` | `info-15` | Status pill text — provisioning | 8.66:1 | 4.5:1 | ✅ pass |
| `neutral-60` | `negative-15` | Status pill text — error | 8.46:1 | 4.5:1 | ✅ pass |
| `cds-danger-8` | `white` | Field-error text / required asterisk | 5.37:1 | 4.5:1 | ✅ pass |
| `cds-danger-8` | `negative-5` | Field-error text on the error fill | 5.03:1 | 4.5:1 | ✅ pass |
| `positive-60` | `positive-15` | Success notification text | 4.26:1 | 4.5:1 | ❌ FAIL |
| `negative-60` | `negative-15` | Error notification text | 7.40:1 | 4.5:1 | ✅ pass |
| `interactive-55` | `white` | Table row action link | 3.37:1 | 4.5:1 | ❌ FAIL |
| `cds-neutral-500` | `surface` | Breadcrumb trail | 5.52:1 | 4.5:1 | ✅ pass |
| `focus` | `surface` | Focus indicator vs canvas (non-text, ≥3:1) | 3.74:1 | 3:1 | ✅ pass |
| `focus` | `white` | Focus indicator vs card (non-text, ≥3:1) | 4.07:1 | 3:1 | ✅ pass |

> ⚠️ 3 pairing(s) below their floor — see "Flagged pairings" below for which are accepted deviations vs open

---

### Flagged pairings — status

The contrast tool lists three pairings below the 4.5:1 normal-text floor. Their status:

**✅ Resolved — focus indicator.** The focus color was a light orange (`brand-50` `#FF985C`) at 1.95:1
on the canvas — a §1.4.11 failure (nearly invisible). It now resolves through a dedicated semantic
token, **`focus` → `brand-52` (`#E04A18`)**, which clears the 3:1 non-text minimum with margin
(**3.74:1** on canvas, **4.07:1** on white). `.cds-focus` / `.cds-focus-ring` and the example builds
all reference `var(--colors-focus)`, so retuning it later is a one-token change.

**☑︎ Accepted deviations — accent text on primary action and row links (signed off).** The primary
button label (white on `interactive-55`, **3.37:1**) and the table row-action link (`interactive-55`
on white, **3.37:1**) are **accepted as intentional deviations**. Rationale (design owner): these are
bold **semibold (600)** labels, and per
[WCAG 2.2 Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) large
bold text qualifies for the lower **3:1** threshold — which both clear (3.37:1). Treated as large
text, they pass; treated as normal text, they are a borderline-acceptable, deliberately-held
deviation to preserve the single-accent brand. **MUST NOT** extend this exception to non-bold or
smaller accent text.

**⏸ Deferred — success notification text.** `positive-60` on `positive-15` (**4.26:1**) is defined in
`alias.json` (`notification.successText`) but **not currently rendered** — the `Notification`
component uses `foreground` for message text. If `successText` is ever wired up, deepen it to
`positive-80` to clear 4.5:1. Tracked, not urgent.
