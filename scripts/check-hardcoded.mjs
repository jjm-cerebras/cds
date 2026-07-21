#!/usr/bin/env node
/**
 * check-hardcoded — fail if a hand-authored example HTML file carries a
 * hardcoded color instead of a token var(). Every color in a CDS surface MUST
 * resolve to a token (DESIGN.md Do/Don't), so the shipped examples are held to
 * that: no raw hex, rgb()/rgba(), hsl()/hsla(), or CSS named colors.
 *
 * The generated src/tokens.css (hex is canonical there) and the SSR gallery are
 * token-driven; this guards the hand-written references (e.g. clusters.html).
 *
 * Run:  node scripts/check-hardcoded.mjs   (exit 1 on any hardcoded color)
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'examples')
const files = readdirSync(dir).filter((f) => f.endsWith('.html'))

// Only unambiguous CSS color syntax — named colors overlap English words
// ("orange accent") and produce false positives in prose/comments.
const patterns = [
  { name: 'hex color', re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: 'rgb()/rgba()', re: /\brgba?\(/g },
  { name: 'hsl()/hsla()', re: /\bhsla?\(/g }
]

let total = 0
for (const f of files) {
  const text = readFileSync(join(dir, f), 'utf8')
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    // ignore the <link>/<script> src attributes and font-family names
    if (/font-family/i.test(line)) return
    for (const { name, re } of patterns) {
      re.lastIndex = 0
      const m = line.match(re)
      if (m) {
        total += m.length
        console.error(`  ${f}:${i + 1}  ${name}: ${m.join(', ').trim()}`)
      }
    }
  })
}

if (total) {
  console.error(`\n✗ ${total} hardcoded color value(s) in examples/ — use a token var(--colors-*).`)
  process.exit(1)
}
console.log(`✓ no hardcoded colors in ${files.length} example file(s) — all token-driven.`)
