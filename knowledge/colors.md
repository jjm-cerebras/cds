# Colors
Rationale and usage judgment for the all colors

## System conventions

Components only reference semantic tokens. Primitive ramps and raw OKLCH/hex values never
appear in component code. Tokens with different meanings stay independent even while
their values coincide: `color.brand.accent` and `color.action.primary.background` may
both resolve to orange-9 today and must remain separately changeable.

# Accent

## Button vs link

Use a `<button>` when the interaction opens a dialog, expands content, submits data,
changes application state, or triggers an operation without navigating. Use an
`<a href>` when it navigates to a page or route, opens a document, has a meaningful
destination URL, should support open-in-new-tab, or should appear in browser history.

Styling doesn't change the element: a button dressed as a link is still a `<button>`,
and a navigation link stays an `<a>`. Neither uses visited-state styling.

## Primary actions

Filled buttons: Continue, Save, Create account, Submit. One dominant accent action
per form, dialog, card, or decision area. Repeated cards may each carry one, provided
the page overall keeps a clear hierarchy. Destructive actions (Delete, Remove
permanently, Cancel) take the [destructive semantic](./destructive.md) plus a
confirmation pattern instead.

## Link buttons

Lower-emphasis actions still attached to the primary workflow — Learn more, View
details, Edit, See all — render as link buttons: accent *text* variant, underlined on
hover and active. If an accent text button would compete with the filled primary,
keep the secondary action neutral. Whether something is a button or a link at all is
an element question → [button vs link](./conventions.md#button-vs-link).

## Compact accents

Active tab underlines, selected radio/checkbox fills, current-step indicators, active
filter markers. Color is never the only signal: pair with position, shape,
iconography, text weight, or an explicit label.

# Variants

The approved set is hover (tokenized as `accent.hover`), pressed, and text — the
latter two pending token definitions. Disabled controls drop the saturated accent
because it keeps reading as actionable → [disabled](./disabled.md).

## Hover

Hover is ...
