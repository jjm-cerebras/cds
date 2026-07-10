---
type: Interaction Rule
title: Interaction Rule
---

# Interaction Rule

## Button

Use a `<button>` when the interaction:

- opens a dialog
- expands content
- submits data
- changes application state
- triggers an operation without navigating to a new URL

## Link

Use an `<a href="...">` when the interaction:

- navigates to a page or route
- opens a document
- has a meaningful destination URL
- should support opening in a new tab
- should appear in browser history

## Link-style treatment

Visual treatment does not change element semantics: a button styled like a link remains a `<button>`, and a navigation link remains an `<a href="...">`.

Use a dedicated `color.action.link.text` token for lower-emphasis actions connected to the primary workflow, such as `Learn more`, `View details`, `Edit`, or `See all`.

Underline this treatment on hover and active. Keep it neutral when orange text would compete with a filled primary action.

Do not map the text token directly to `color.brand.accent` on a light surface.

Buttons and links do not use visited-state styling.

## Disabled controls

Disabled buttons must not retain the fully saturated orange accent, because that can make them continue to look actionable.

...
