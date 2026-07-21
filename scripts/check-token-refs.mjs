#!/usr/bin/env node
/**
 * check-token-refs — lint the DTCG token graph.
 *
 * Every `{group.token}` reference in any tokens/*.json MUST resolve to a token
 * leaf (an object carrying `$value`) defined somewhere in the token set. This
 * catches the drift the prose rules can't: a component recipe pointing at a
 * primitive that was renamed or never existed (e.g. `{colors.neutral-95}` when
 * only `{colors.cds-neutral-*}` is defined).
 *
 * Run:  node scripts/check-token-refs.mjs   (exit 1 on any unresolved ref)
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensDir = join(root, 'tokens')
const files = readdirSync(tokensDir).filter((f) => f.endsWith('.json'))

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const isLeaf = (v) => isObj(v) && '$value' in v

/** All defined token paths → "group.token" (and composite sub-paths). */
const defined = new Set()
/** Every reference found → { ref, file, path } */
const refs = []

const REF_RE = /\{([^}]+)\}/g

const walk = (node, path, file) => {
  if (isLeaf(node)) {
    defined.add(path)
    collectRefs(node.$value, file, path)
    return
  }
  if (!isObj(node)) return
  for (const [k, v] of Object.entries(node)) {
    walk(v, path ? `${path}.${k}` : k, file)
  }
}

const collectRefs = (value, file, path) => {
  const scan = (s) => {
    let m
    while ((m = REF_RE.exec(s)) !== null) refs.push({ ref: m[1], file, path })
  }
  if (typeof value === 'string') scan(value)
  else if (isObj(value)) for (const v of Object.values(value)) if (typeof v === 'string') scan(v)
  else if (Array.isArray(value)) for (const v of value) if (typeof v === 'string') scan(v)
}

for (const f of files) {
  const json = JSON.parse(readFileSync(join(tokensDir, f), 'utf8'))
  walk(json, '', f)
}

// A ref resolves if its exact path is a defined leaf.
const unresolved = refs.filter((r) => !defined.has(r.ref))

if (unresolved.length) {
  console.error(`✗ ${unresolved.length} unresolved token reference(s):\n`)
  for (const u of unresolved) {
    console.error(`  {${u.ref}}  ←  ${u.file} :: ${u.path}`)
  }
  console.error(`\n${defined.size} tokens defined, ${refs.length} references checked.`)
  process.exit(1)
}

console.log(`✓ token refs OK — ${defined.size} tokens defined, ${refs.length} references all resolve.`)
