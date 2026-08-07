# Instructions for AI agents

1. Read this file first, then follow the instructions in the order listed
2. Read files in cds/guidelines/
3. Refer to relevant components in cds/src/
4. Resolve token references in cds/tokens/

# Instructions for AI agents

Read this file first, then work in this order. Paths are relative to the repo root.

1. **`SKILL.md`** — what lives where, the commands, and the non-negotiables.
2. **`guidelines/`** — `principles.md` → `foundation.md` → `components.md` → `patterns.md`.
   Load only what the task needs.
3. **`src/`** — use an existing component at its intended API before building anything new.
4. **`tokens/`** — resolve every `{group.token}` reference here.
   `src/tokens.css` is generated; never hand-edit it.

## Before reporting the work done

- `npm run lint` must pass — token refs, hardcoded values, stylelint, jsx-a11y.
- Read `guidelines/accessibility.md`. Do not claim full WCAG 2.2 AA while the
  flagged sub-AA pairings are open.

## Note for Claude Code

This repo doubles as a skill (`SKILL.md`, `name: design-cds`). If it's installed as one,
you are already reading it — don't re-invoke it, and don't fall back to a separate copy
under `~/.claude/skills/`. This repo is the source of truth.
