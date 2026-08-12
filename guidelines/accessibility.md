---
version: 0.1.4
type: reference
title: accessibility
timestamp: 2026-08-12T00:00:00Z
---

# Accessibility

WCAG 2.2 AA is the floor for every CDS surface. RFC 2119 keywords (MUST, MUST NOT, SHOULD, MAY) apply.

### Index

- [Focus](#focus)
- [Keyboard & ARIA per component](#keyboard--aria-per-component)
- [Motion](#motion)
- [Contrast (generated)](#contrast-generated)

---

## Focus

- **MUST** show a visible focus indicator on every focusable control; **never** `outline: none`
  without a replacement. Two canonical indicators (see [Shapes](./foundation.md#shapes)):
  - **Buttons, menu items, links, tabs** — `outline: 2px solid var(--colors-focus)` at `2px` offset
    (the `.cds-focus` utility in [`src/components.css`](../src/components.css)).
  - **Inputs, dropdown triggers, selects** — a `focus` border + a solid 2px `focus` ring
    (`.cds-focus-ring`), `outline: none` replaced by the ring. The ring is solid (not a translucent
    glow) and renders outside the field's inline-styled border, so it stays visible and crisp.
  - The **`focus` token** resolves to `brand-52` (`#E04A18`), chosen so the indicator clears the 3:1
    non-text minimum (§1.4.11) on both the canvas and white — the shipped `brand-50` did not.
- **MUST** use `:focus-visible` (not `:focus`) so the indicator shows for keyboard users without
  firing on mouse click.
- **MUST** keep tab order in visual/DOM order; **MUST NOT** add positive `tabindex`.
- **MUST** trap focus inside an open modal, return focus to the trigger on close, and make `Esc`
  dismiss it. Popovers and dropdowns return focus to their trigger on close.
- **MUST** meet a **3:1** non-text contrast for the focus ring against both the canvas and the card
  (verified in the [table below](#contrast-generated)).

---

## General

**Keyboard & ARIA per component**

- SHOULD: Each component's interaction contract
- SHOULD: "Roving tabindex" = one tab stop for the group; arrow keys move within it
- MUST: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- MUST: Visible focus rings (`:focus-visible`; group with `:focus-within`)
- MUST: Manage focus (trap, move, return) per APG patterns
- NEVER: `outline: none` without visible focus replacement

---

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

**Cross-cutting MUSTs**

- **MUST NOT** rely on color alone — pair every status color with an icon or text label.
- **MUST** keep every control reachable and operable by keyboard, in visual order.
- **MUST** give every icon-only control an accessible name; hide decorative icons from AT.
- **MUST** support 200% zoom and reflow without loss of content or function.

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

> ⚠️ 3 pairing(s) below their floor — see "Flagged pairings" below for which are accepted deviations vs open.
<!-- CONTRAST:END -->

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
