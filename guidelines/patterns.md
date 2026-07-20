---
version: 0.1.4
type: reference
title: page patterns
timestamp: 2026-07-18T00:00:00Z
---

# Page patterns

Composition templates that combine [components](./components.md) and [foundations](./foundation.md)
into full views. Where `components.md` covers a single component and `foundation.md` covers a single
token family, this file covers **how a whole page is assembled** — the parts, their order, and the
spacing rhythm between them — so a new page starts from a template instead of hand-tuned gaps.

### Index

- [List / table view](#list--table-view)

---

## List / table view

The default for an inventory or management page (e.g. Clusters): breadcrumbs → page heading → toolbar
→ data table. Reference build: [`clusters.html`](../clusters.html).

### Structure (top to bottom)

1. **Breadcrumbs** ([`Breadcrumbs`](./components.md#breadcrumbs)) — trail to the current view.
2. **Page heading** ([`Heading` variant `page`](./components.md#heading)) — title + one-line description.
3. **Toolbar** — a result-count line, then a control row: a search field that **grows to fill the
   width** with a secondary **Filter** button flush to the right edge of the table.
4. **Data table** ([`Table`](./components.md#table)) — the list, on a white card.

### Container

- **MUST** apply page padding of `spacing.12` block / `spacing.8` inline. The view is full-width — do
  **not** impose a fixed `max-width` (there is no CDS container-width token).
- **MUST** let the table scroll horizontally (`overflow-x: auto`) below its min width rather than
  truncate columns.

### Vertical spacing rhythm

Every gap lands on the `spacing` scale. Note `title → description` uses `spacing.2` (8px) because the
description's line-height adds ~8px of optical leading, so the **visible** gap reads as ~16px —
measure the rendered result, not the box value.

| Between                    | Token       | Box                | Owner                              |
| -------------------------- | ----------- | ------------------ | ---------------------------------- |
| Breadcrumbs → page title   | `spacing.6` | 24px               | `breadcrumbs.bottomMargin`         |
| Page title → description   | `spacing.2` | 8px (~16px visible)| `heading.pageTitleBottomMargin`    |
| Description → result count | `spacing.6` | 24px               | `heading.pageDescriptionBottomMargin` |
| Result count → search row  | `spacing.2` | 8px                | toolbar                            |
| Search row → table         | `spacing.2` | 8px                | toolbar                            |

### Toolbar / search row

- **OPTIONAL** place the result count (`small-text`, `foreground-muted`) above the control row.
- **MUST** let the search field flex to fill the row (`flex: 1`) and keep the **Filter** button
  (`button-secondary`) fixed and flush-right, aligned to the table's right edge.
- Gap between the search field and the Filter button: `spacing.2` (8px).
- The search field is a `textbox` with a leading lucide `search` icon (16px, `neutral-45`); Filter is
  `button-secondary` with a leading lucide `filter` / `list-filter` icon.

### Rules

- **MUST** handle the table's non-happy states, not just the populated view: **loading** (skeleton rows or a centered `spinner`), **empty** (centered `neutral-45` message, per [Table](./components.md#table)), and **error** (a `notification` with reason + retry).
- **MUST** build the count, search, and filter from tokens — no hand-authored spacing or color.
- **MUST** keep the primary/secondary balance: a list view carries **no orange primary** unless there
  is a genuine primary action (e.g. "Create cluster"); Filter and row actions stay secondary / link
  emphasis.
- **SHOULD** reuse this rhythm for any list / management page so dense views stay consistent.
