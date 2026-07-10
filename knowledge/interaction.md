# Interaction Rule

## Button vs link

Use a `<button>` when the interaction opens a dialog, expands content, submits data,
changes application state, or triggers an operation without navigating. Use an
`<a href>` when it navigates to a page or route, opens a document, has a meaningful
destination URL, should support open-in-new-tab, or should appear in browser history.

Styling doesn't change the element: a button dressed as a link is still a `<button>`,
and a navigation link stays an `<a>`. Neither uses visited-state styling.

## Disabled controls

Disabled buttons must not retain the fully saturated orange accent, because that can make them continue to look actionable.

...
