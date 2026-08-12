# Instructions for AI agents

1. Read this file first, then work in this order. Paths are relative to the repo root.
2. **`guidelines/`** — `workflow.md` → `principles.md` → `foundation.md` → `accessibility.md` → `components.md` → `patterns.md`. Load only what the task requires.
3. **`src/`** — use an existing component at its intended API before building anything new.
4. **`tokens/`** — resolve every `{group.token}` reference here. `src/tokens.css` is generated; never hand-edit it.

## Before reporting the work done

- `npm run lint` must pass — token refs, hardcoded values, stylelint, jsx-a11y.
- Read `guidelines/accessibility.md`. Do not claim full WCAG 2.2 AA while the flagged sub-AA pairings are open.

## Note for Claude Code

This repo doubles as a skill (`SKILL.md`, `name: design-cds`). If it's installed as one, you are already reading it — don't re-invoke it, and don't fall back to a separate copy under `~/.claude/skills/`.

This repo is the source of truth.
