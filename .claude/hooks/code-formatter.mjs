#!/usr/bin/env node
import { createInterface } from 'readline'
import { execSync } from 'child_process'
import path from 'path'

const BIOME_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.css', '.md', '.mdx'])

const rl = createInterface({ input: process.stdin })
let raw = ''
rl.on('line', line => (raw += line))
rl.on('close', () => {
  const input = JSON.parse(raw || '{}')
  const filePath = input.tool_input?.file_path || ''
  const ext = path.extname(filePath).toLowerCase()

  if (!BIOME_EXTS.has(ext)) {
    process.exit(0)
  }

  try {
    const result = execSync(`npx biome format --write "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    if (result) process.stdout.write(result)
  } catch (err) {
    // Formatter errors are non-fatal — the write already happened
    process.stdout.write(`[code-formatter] Biome warning on ${filePath}: ${err.message}\n`)
  }

  process.exit(0)
})
