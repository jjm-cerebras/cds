#!/usr/bin/env node
/**
 * contrast-table — compute WCAG contrast ratios for the CDS text/background
 * pairings and inject a generated table into guidelines/accessibility.md
 * between the <!-- CONTRAST:START --> / <!-- CONTRAST:END --> markers.
 *
 * Colors are read from the generated src/tokens.css (so this stays in sync with
 * the token build), var() chains are resolved, and both hex and oklch() literals
 * are converted to linear sRGB for the luminance math.
 *
 * Run:  node scripts/contrast-table.mjs   (after npm run tokens)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'src/tokens.css'), 'utf8')

// --- token map + var() resolution -----------------------------------------
const map = new Map()
for (const m of css.matchAll(/(--[\w-]+):\s*([^;]+);/g)) map.set(m[1], m[2].trim())
const resolve = (v, seen = 0) => {
  if (seen > 20) return v
  const ref = v.match(/^var\((--[\w-]+)\)$/)
  return ref && map.has(ref[1]) ? resolve(map.get(ref[1]), seen + 1) : v
}
const colorOf = (name) => resolve(map.get(`--colors-${name}`) ?? name)

// --- color parsing → linear sRGB -------------------------------------------
const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

const hexToLinear = (hex) => {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(n.slice(0, 2), 16) / 255
  const g = parseInt(n.slice(2, 4), 16) / 255
  const b = parseInt(n.slice(4, 6), 16) / 255
  return [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)]
}

// oklch(L C H) → linear sRGB (L accepts % or 0–1; H in degrees)
const oklchToLinear = (str) => {
  const parts = str.replace(/oklch\(|\)/g, '').trim().split(/[\s/]+/)
  let L = parseFloat(parts[0])
  if (parts[0].includes('%')) L /= 100
  const C = parseFloat(parts[1]) || 0
  const H = ((parseFloat(parts[2]) || 0) * Math.PI) / 180
  const a = C * Math.cos(H)
  const b = C * Math.sin(H)
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const R = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
  const G = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
  const B = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_
  return [R, G, B].map((c) => Math.min(1, Math.max(0, c)))
}

const toLinear = (v) => (v.startsWith('#') ? hexToLinear(v) : oklchToLinear(v))
const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b
const contrast = (fg, bg) => {
  const a = luminance(toLinear(colorOf(fg)))
  const b = luminance(toLinear(colorOf(bg)))
  const [hi, lo] = a > b ? [a, b] : [b, a]
  return (hi + 0.05) / (lo + 0.05)
}

// --- the pairings we guarantee ---------------------------------------------
// [foreground token, background token, where it's used, minimum ratio]
const PAIRS = [
  ['foreground', 'surface', 'Body / titles on the page canvas', 4.5],
  ['foreground', 'white', 'Body / titles on a white card', 4.5],
  ['foreground-muted', 'surface', 'Secondary text on canvas', 4.5],
  ['foreground-muted', 'white', 'Column headers, captions on a card', 4.5],
  ['white', 'interactive-55', 'Primary button label on the accent fill', 4.5],
  ['white', 'negative-55', 'Destructive button label', 4.5],
  ['neutral-60', 'positive-10', 'Status pill text — healthy', 4.5],
  ['neutral-60', 'warning-15', 'Status pill text — degraded', 4.5],
  ['neutral-60', 'info-15', 'Status pill text — provisioning', 4.5],
  ['neutral-60', 'negative-15', 'Status pill text — error', 4.5],
  ['cds-danger-8', 'white', 'Field-error text / required asterisk', 4.5],
  ['cds-danger-8', 'negative-5', 'Field-error text on the error fill', 4.5],
  ['positive-60', 'positive-15', 'Success notification text', 4.5],
  ['negative-60', 'negative-15', 'Error notification text', 4.5],
  ['interactive-55', 'white', 'Table row action link', 4.5],
  ['cds-neutral-500', 'surface', 'Breadcrumb trail', 4.5],
  ['focus', 'surface', 'Focus indicator vs canvas (non-text, ≥3:1)', 3.0],
  ['focus', 'white', 'Focus indicator vs card (non-text, ≥3:1)', 3.0]
]

const rows = PAIRS.map(([fg, bg, use, min]) => {
  const ratio = contrast(fg, bg)
  const pass = ratio >= min
  return { fg, bg, use, min, ratio, pass }
})

const fmt = (r) => r.toFixed(2)
const table = [
  '| Foreground | Background | Where | Ratio | Min | Result |',
  '| ---------- | ---------- | ----- | ----: | --: | :----: |',
  ...rows.map(
    (r) =>
      `| \`${r.fg}\` | \`${r.bg}\` | ${r.use} | ${fmt(r.ratio)}:1 | ${r.min}:1 | ${
        r.pass ? '✅ pass' : '❌ FAIL'
      } |`
  )
].join('\n')

const failing = rows.filter((r) => !r.pass)
const note = failing.length
  ? `\n\n> ⚠️ ${failing.length} pairing(s) below their floor — see "Flagged pairings" below for which are accepted deviations vs open.`
  : '\n\n> All pairings clear the WCAG 2.2 AA floor.'

const block = `<!-- CONTRAST:START -->\n<!-- GENERATED by scripts/contrast-table.mjs — do not edit by hand. -->\n\n${table}${note}\n<!-- CONTRAST:END -->`

const mdPath = join(root, 'guidelines/accessibility.md')
const md = readFileSync(mdPath, 'utf8')
const next = md.replace(/<!-- CONTRAST:START -->[\s\S]*<!-- CONTRAST:END -->/, block)
writeFileSync(mdPath, next)

console.log(`contrast-table: ${rows.length} pairings, ${failing.length} failing`)
for (const r of rows) console.log(`  ${r.pass ? '✓' : '✗'} ${r.fg} on ${r.bg}: ${fmt(r.ratio)}:1`)
if (failing.length) process.exitCode = 1
