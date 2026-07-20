---
version: 0.1.4
type: reference
title: components
timestamp: 2026-07-17T00:00:00Z
---

# Components

The visual recipe (tokens, sizing, radius, typography) for each component is in [`tokens/alias.json`](../tokens/alias.json), extracted from the shipped `@cerebras/common` and
`web-common` libraries. This file covers the **behavioural** rules the token JSON can't carry: which variants exist, when to use which, and the anti-patterns to correct on sight.

**Naming note:** the core buttons take **boolean props** (`secondary`, `negative`, `small`), not a `primary | secondary | …` string union. "Primary" is simply the default (no `secondary`), and its fill is `interactive-55` (the orange accent).

**States.** Every interactive component and view consciously accounts for **rest · hover · focus · active/selected · disabled · loading · empty · error** — never ship only the happy path. Reuse existing tokens (focus = 2px `brand-50`; loading = `spinner`; disabled = `button-disabled`; empty/error follow the [Table](#table) empty state and [Overlays & feedback](#overlays--feedback) notifications). Not every component needs all eight, but each is a deliberate yes/no.

### Index

- [Breadcrumbs](#breadcrumbs)
- [Heading](#heading)
- [Button](#button)
- [SquareButton / IconButton](#squarebutton--iconbutton)
- [TextButton / PlainButton](#textbutton--plainbutton)
- [Textbox (input)](#textbox-input)
- [Selection controls](#selection-controls)
- [Status & metadata chips](#status--metadata-chips)
- [Overlays & feedback](#overlays--feedback)
- [Tabs](#tabs)
- [Table](#table)
- [Banner](#banner)
- [CodeBlock](#codeblock)

---

## Breadcrumbs

Tokens: [`components/breadcrumbs.json`](./breadcrumbs.json) → `breadcrumbs`, `breadcrumbs-item`, `breadcrumbs-current`, `breadcrumbs-separator`.

A horizontal navigation trail that sits **above the page title** to show where the current view lives — on the settings page it reads `Organizations / Settings`. Parent items are links; the last item is the current, non-link location.

Type is **Sometype Mono, 600, 0.8125rem (13px)**, UPPERCASE, with `0.02em` tracking and a tight `0.4rem` line-height. **Every crumb — link, separator, and current — is one flat color**,
`cds-neutral-500` (`oklch(0.5 0.003 67.78)`). The only state change is hover: **link crumbs gain a `2px`-offset underline** over `fast` (150ms) — the color does not change (text and underline stay `cds-neutral-500`), and the separator and current crumb never change. Crumbs are separated by a `0.375rem` gap and the trail carries `spacing.6` (24px) below it before the page title.

- **MUST** mark the final crumb as the current location — `aria-current="page"`, no `href`, and no hover treatment. It is a label, not a link.
- **MUST** wrap the trail in `<nav aria-label="Breadcrumb">` and hide separators from assistive tech (`aria-hidden`) — they are decoration, not content.
- **MUST** keep the whole trail on a single flat color (`cds-neutral-500`); the current crumb is **not** darkened or bolded. Hierarchy comes from position, not weight or color.
- **MUST** use all uppercase for crumb labels — this trail is one of the few CDS surfaces (with button labels and table headers) that is deliberately UPPERCASE.
- **MUST** limit the hover treatment to link crumbs — an **underline only**, in the default `cds-neutral-500` (`breadcrumbs-item.underlineColorHover`); the text color does not change, and the separator and current crumb never shift.
- **SHOULD** reserve breadcrumbs for views **two or more levels deep**. A single top-level page does not need a trail.
- **MUST NOT** repeat the page title verbatim below the trail as a second bold element — the current crumb and the page title already say it once each, by design.

---

## Heading

Tokens: [`components/heading.json`](./heading.json) → `heading`, `heading-page-title`, `heading-page-description`, `heading-section-title`, `heading-section-description`.

Titles the top of a view (`variant="page"`) or a block within it (`variant="section"`), each with an optional description line beneath. On the settings view the page heading reads **Settings** with the description *"Manage your organization's profile, members, and preferences."*, and each block below carries a section heading like **General** with *"General information about your organization."*

Exact type, extracted from the live page (all Manrope):

| Element             | Size / weight        | Line-height | Tracking  | Color                          |
| ------------------- | -------------------- | ----------- | --------- | ------------------------------ |
| Page title          | 1.25rem / 20px · 500 | 1 (20px)    | `-0.02em` | `neutral-95` (`#161519`)       |
| Page description    | 0.875rem / 14px · 500| 1.5 (21px)  | `-0.01em` | `neutral-95` (`#161519`)       |
| Section title       | 1rem / 16px · 500    | 1.3 (20.8px)| `-0.02em` | `neutral-95` (`#161519`)       |
| Section description | 0.75rem / 12px · 400 | 1.333 (16px)| normal    | `neutral-60` (`#424049`)       |

Spacing: the page title sits `1rem` (16px) above its description, which reserves `1.25rem` (20px) below itself. A section title sits `spacing.1` (4px) above its description and the section block opens with `spacing.12` (48px) above it.

- **MUST** keep exactly **one page title (`h1`) per view**; section titles are `h2`, not a second `h1`.
- **MUST** render the **page description in `neutral-95`** — the same near-black as the title, not a muted gray. This is the live pattern; only the **section** description is muted (`neutral-60`).
- **MUST** carry hierarchy through **size + weight**, not by dropping the page title to a muted color. Never shrink or bold a title off-spec to fake a level.
- **MUST** use sentence case for both titles and descriptions — no Title Case.
- **MUST** write descriptions as a short, plain statement of what the view manages ("Manage your organization's profile, members, and preferences."), not a marketing line.
- **SHOULD** pair the page heading with [Breadcrumbs](#breadcrumbs) above it on views two or more levels deep.
- **MAY** render trailing `actions` (e.g. a primary button) inline with the title; they sit opposite the title on the same top-aligned row.
- **MUST NOT** apply UPPERCASE to titles or descriptions — caps are reserved for button labels, table headers, and the breadcrumb trail.

---

## Button

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `button`, `button-primary`, `button-secondary`, `button-negative`, `button-secondary-negative`, `button-disabled`.

Primary inline action. Sizes: default (`h-11`) and `small` (`h-9`). Label is **Sometype Mono, uppercase** (`text-button-grp`), radius `rounded-sm`, transition `fast`.

- **MUST** keep exactly **one primary (orange) button per view**; everything else is `secondary` (white, `cds-neutral-200` border). Two orange buttons in one section means one should be secondary.
- **MUST** use `negative` only for genuinely destructive actions — never as decoration or emphasis.
- **MUST** use imperative verbs ("Create key", "Delete cluster") — never "Submit", "OK".
- **MUST NOT** hand-author hover fills; every variant has its `*-hover` token (`interactive-55 → interactive-60`, `negative-55 → negative-50`, `secondary → cds-neutral-100`).
- **MUST NOT** "correct" the uppercase mono label to sentence-case Manrope — it's the CDS button signature.
- Loading state overlays a `ring` spinner; disabled is `neutral-15` / `neutral-45`, no border.

---

## SquareButton / IconButton

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `square-button`, `icon-button`.

Square (`w-9 h-9`, `rounded-sm`) single-purpose controls for toolbars and row actions.

- **SquareButton** carries the full button variant model (secondary/primary/negative + `selected`) and the brand-orange focus outline.
- **IconButton** is the lowest-emphasis form: `neutral-60` icon, `neutral-10` hover wash, no border. It has **no focus ring in the current code** — **SHOULD** add the brand-orange outline when building new instances.
- **MUST** give every icon-only control an accessible name; **MUST NOT** use one where the glyph's meaning isn't obvious.

---

## TextButton / PlainButton

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `text-button`.

Link-styled and fully-unstyled action text. `TextButton` is `interactive-55` (orange) hovering to `interactive-50`. Use for inline, low-emphasis actions; **SHOULD** prefer it over inventing a "ghost" button appearance.

---

## Textbox (input)

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `textbox`, `textbox-focus`, `textbox-error`, `textbox-readonly`, `label`.

Single-line and multiline input. White fill, `cds-neutral-200` 1px border at `rounded-sm`, `input` typography.

- **MUST** provide a visible `Label` (`small-text`, `neutral-95`) — placeholder is not a label; placeholder color is `neutral-45`.
- **Focus** raises a `brand-50` border + 25%-opacity `brand-50` ring. **Hover** deepens the border to `cds-neutral-500`.
- **Error** state is `negative-5` fill + `negative-50` border, paired with an `Error` message; the message text, required asterisk, and invalid border use **`cds-danger`**, not `negative`.
- **ReadOnly** is `neutral-15` fill, `neutral-20` border, `neutral-60` text, non-interactive.
- Helper text is `helper-text` in `neutral-70`, `mt-2`.

---

## Selection controls

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `checkbox`, `radio`, `switch`, `segmented-control`.

- **Checkbox** — 16px. The `cds` variant is a native input tinted `accent-brand-50`; the Radix variant fills checked state with `interactive-55`. Show the check glyph only when checked.
- **RadioButton** — 16px circle, `interactive-55` border + dot when selected; this is the one control that uses the `shadow-focus` glow.
- **Switch** — 42×24 track, `neutral-15` off → **`accent`** (orange) checked; white thumb travels 19px as a `transition` (never a jump). Disabled-checked drops to `neutral-40`.
- **SegmentedControl** — sliding white highlight over a group; selected item is underlined (`offset-4 decoration-2`) in `neutral-80`, unselected `neutral-45`.
- **MUST** preserve these state tokens rather than substituting custom fills, and **MUST NOT** rely on color alone — the check glyph, dot, and underline carry state without color.

---

## Status & metadata chips

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `badge`, `count`, `stamp`.

- **Badge** — low-emphasis classification. `ground` = filled tint (`positive-10`, `info-15`, `warning-15`, `negative-15`, `neutral-10`); `floor` = outlined. Text stays `neutral-60`; only the optional icon takes the role color (`iconIntent`).
- **Count** — pill number (`rounded-full`), role-colored solid (`brand-55`, `neutral-85`, …) with `neutral-5` text.
- **Stamp** — bold monospace-style tag with tier support: `tier-1…5` text, or `tier/20` subtle fills. Use for ranked/tiered labels.
- **Status pill** — the concrete status pattern for tables and inline state: a Badge `ground` tint + `neutral-60` text **label**, **no icon** (never tint the text). The text label carries the meaning, which satisfies the non-color-alone requirement. Height `1.5rem`, `spacing.2` inline padding, `rounded-sm`. Map role by meaning: **healthy / success** → `positive-10`; **degraded / warning** → `warning-15`; **provisioning / in-progress** → `info-15`; **error / failed** → `negative-15`; **neutral / unknown** → `neutral-10`.
- **MUST** pick Badge/Count/Stamp by emphasis, and **MUST NOT** use a status tint where there is no status to communicate.

---

## Overlays & feedback

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `tooltip`, `notification`, `spinner`, `dropdown-trigger`, `dropdown-menu`, `dropdown-item`.

- **Tooltip** — dark inverted label: `neutral-85` fill, white text, `rounded-sm`, `max-w-240px`, 200ms open delay. Keep it short and non-interactive.
- **Notification** — inline banner: `success` = `positive-15` / `positive-80`, `error` = `negative-15` / `negative-80`, `warning` = `warning-15`, `info` = `neutral-5`. Each **MUST** keep its leading icon; default auto-dismiss is 12s.
- **Spinner** — `ring` (orange head `brand-50` on `neutral-20` track, 0.7s), `dots`, and `bar` variants. Carries `role="status"` + an `sr-only` "Loading…"; **MUST** preserve both.
- **Dropdown / Popover** — white (`cds-neutral-0`) menu, `cds-neutral-100` border, `rounded-sm`, soft `0 2px 8px` shadow, opening with `slideDownAndFade`/`fadeSlide` (fade + short rise). Selected item shows a `brand-50` check.

---

## Tabs

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `tab`, `tab-secondary`.

- **Tabs** — primary tabs are pill-shaped (`neutral-15` selected fill); secondary tabs are underline-style (`border-b-2 neutral-95` selected). Keep the selected state on both text weight (`md-b`) and the fill/underline together.

---

## Table

Tokens: [`tokens/table.json`](../tokens/table.json) → `table`, `table-header`, `table-sort-icon`, `table-empty`. Extracted from the shipped `@cerebras/common` `Table` component.

A sortable data table on a white card. The surface is `colors.neutral` (white) with a soft `shadows.default` and `rounded.sm` corners. Rows are `4rem` (`table.rowHeight`) tall and separated by `neutral-15` hairlines; the header rule is **2px** (`table.headerBorderWidth`), data-row rules are `1px` (`borders.width-default`), and the **last row has no rule**. Cell padding is `spacing.2` (0.5rem) all round, with the first and last columns getting `spacing.4` (1rem) on their outer edge so content clears the card.

Type: cells are `body` size (14px) on an `18px` line; the **first column is bold** (weight 700, `table.emphasisFontWeight`) as the row's name/identity, every other column is regular (400). Columns flagged `mono` render in `family-mono` (ids, hashes, aligned numbers). Row text is `foreground` — note the shipped component uses `neutral-95`, which has **no token in this system**; `foreground` is the closest and is the correct semantic for primary text.

Headers are **uppercase `table-header`** (12px / 600 / +0.02em) in a `flex` row with a `spacing.2` gap between label and sort icon. The **sort icon** shows on the **active column only** — lucide `arrow-down` (ascending / A→Z) or `arrow-up` (descending) in `interactive-55` (`table-sort-icon.colorActive`). Inactive columns show **no icon at rest**; on hover they preview the arrow in the *current active sort direction* in `interactive-60` (`colorHover`). The **empty state** is `emptyText` centered in a `10rem` (`table-empty.height`) band, colored `neutral-45`.

- **MUST** render column headers in **UPPERCASE `table-header`** — this is a deliberate CDS signature shared only with button labels and the breadcrumb trail. Never sentence-case a header.
- **MUST** emphasize the **first column** (weight 700) as the row's identity; keep all other columns at regular weight. Hierarchy across a row comes from that one bold column, not from coloring.
- **MUST** format cells by data type (the convention the platform app follows): **machine identifiers** (ids, hashes, keys, fingerprints) → `mono`, left; **human text** (names, labels, roles, statuses) → sans, left; **numeric magnitudes** (counts, quantities, amounts, currency) → sans, **right-aligned + `tabular-nums`**; **timestamps** → sans + `tabular-nums`, left (they read as text). Center alignment is not used in data tables; never set body text columns to mono.
- **MUST** show the sort icon on the **active column only** (`interactive-55`), hide it on inactive columns at rest, and on hover preview the *active sort direction* in `interactive-60`; hovering the active column also lifts it to `interactive-60`. (`neutral-60` remains the resting `color` token for any legacy always-on variant.)
- **MUST** show a centered `neutral-45` empty state (never a blank card) when there are no rows.
- **MUST** align every header left except optionally the **last** column, which may be left / center / right via `lastHeaderAlign` (default center) to sit over an actions or numeric column.
- **MUST** style row **action links** (the Options column) as CDS links (`table-link`): `interactive-55` (the accent), **`font-mono` + uppercase `button` type**, on a `1.5px` (`borders.width-medium`) transparent bottom border that appears in `interactive-55` on hover — the underline matches the text color, which does **not** change. Never use `brand-55` or an un-underlined link for row actions. Multiple actions sit in a `spacing.4` row (`table-link.gap`).
- **SHOULD** pair the table with a page [Heading](#heading) and a search field above it; the table itself carries no title.
- **MUST NOT** darken the row separators past `neutral-15` or drop the header rule to 1px — the 2px header rule vs 1px row rules is what sets the header apart without a fill.
- **MUST NOT** put a border rule under the final row; the card edge closes the table.

---

## Banner

Tokens: [`tokens/alias.json`](../tokens/alias.json) → `banner`.

Full-width promo/system bar with a warm orange gradient (`brand-25 → brand-15 → brand-25`), a dark pill link, and a circular dismiss. Sticky, `h-10`. Reserve for global announcements, not per-page status (that's Notification).

---

## CodeBlock

A thin CodeMirror wrapper (read-only, line-wrapped, python/js/cpp) — it carries **no CDS tokens** of its own. When embedding, wrap it in a tokenized container (`card-bg`, `divider` border, `rounded-sm`) rather than expecting the component to style itself.
