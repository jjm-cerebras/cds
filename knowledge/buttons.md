# DESIGN KNOWLEDGE
## Component: Button

> Status: Draft
> Confidence: Medium
> Last Updated: 2026-07-16
>
> This document is the canonical knowledge model for the Button component.
> It is optimized for AI consumption rather than human reading.
>
> Distinguish carefully between:
> - Principle — a design philosophy that should remain stable over time.
> - Rule — a normative requirement of the design system.
> - Observation — something currently true, but not necessarily required.
> - Unknown — an area that has not yet been decided.
>
> Never infer Rules from Observations.

---

# 1. Identity

## Purpose

A Button initiates an action within the current context.

Examples include:

- Submit data
- Confirm an operation
- Open a dialog
- Navigate to another page

---

# 2. Mental Model

Buttons are described by multiple independent dimensions.

```yaml
Hierarchy:
  - Primary
  - Secondary
  - Tertiary
  - Ghost

Intent:
  - Default
  - Destructive

State:
  - Default
  - Hover
  - Pressed
  - Focus
  - Disabled
  - Loading (TBD)

Size:
  - TBD

Content:
  - Text
  - Leading icon
  - Trailing icon
  - Icon only (TBD)
```

The design system should treat these as orthogonal dimensions whenever possible.

Example:

```
Primary + Default

Primary + Destructive

Secondary + Default

Ghost + Destructive
```

rather than separate unrelated variants.

---

# 4. Decision Model

Hierarchy should always be chosen based on the action's importance, not implementation convenience.

---

# 5. Hierarchy

## Primary

Purpose

The primary action for the current page or view.

Rules

- Prefer one Primary button per page.
- Two may be acceptable in exceptional situations.
- Should receive the greatest visual emphasis.

---

## Secondary

Purpose

Supporting actions that are important but are not the primary task.

Rules

- Should never visually compete with the Primary action.

---

## Tertiary

Purpose

Low-emphasis actions that do not require strong visual attention.

Common examples

- Navigation
- Optional actions
- Supporting workflows

Tertiary is defined by visual emphasis, not by navigation behavior.

---

## Ghost

Purpose

Low-emphasis utility actions.

Current usage

- Contextual menus
- Other isolated UI patterns

Observation

There are currently no page-level Ghost button usages.

Do not interpret this as a permanent rule.

---

# 6. Intent

## Default

Standard actions.

---

## Destructive

Used for actions that permanently modify or delete data.

Rules

Destructive intent follows the same hierarchy model as default actions.

Examples

- Primary Destructive
- Secondary Destructive
- Ghost Destructive

Use Primary Destructive when the destructive action is the primary action within its context (for example, a deletion confirmation dialog).

---

# 7. Rules

## BTN-001

Buttons express action hierarchy.

Hierarchy is communicated through visual emphasis.

---

## BTN-002

Primary actions should dominate the visual hierarchy.

---

## BTN-003

Supporting actions should never compete with the primary action.

---

## BTN-004

Intent (Default vs Destructive) is independent of hierarchy.

---

## BTN-005

Use the lowest hierarchy level that still communicates the action's importance.

---

# 9. Anti-patterns

Avoid multiple Primary buttons unless there is a strong justification.

Avoid increasing emphasis simply to make an action easier to notice.

Do not choose hierarchy based on implementation convenience.

Do not define Tertiary by navigation behavior alone.

Do not infer permanent rules from current implementation patterns.
