#!/usr/bin/env node
import { createInterface } from 'readline'
import path from 'path'

const AI_CLICHES = [
  /\blet me\b/i,
  /\bi'?ll now\b/i,
  /\bcertainly!/i,
  /\bgreat question\b/i,
  /\bas an ai\b/i,
  /\bi hope this helps\b/i,
  /\bfeel free to\b/i,
  /\bin conclusion\b/i,
]

const PLACEHOLDERS = [
  /\bTBD\b/,
  /\bplaceholder\b/i,
  /\blorem ipsum\b/i,
  /\bTODO:/,
  /\bFIXME\b/,
  /\bcoming soon\b/i,
]

function findViolations(text) {
  const violations = []
  const lines = text.split('\n')

  for (const [lineIdx, line] of lines.entries()) {
    for (const pattern of [...AI_CLICHES, ...PLACEHOLDERS]) {
      if (pattern.test(line)) {
        violations.push({ line: lineIdx + 1, match: line.trim(), pattern: pattern.toString() })
      }
    }
  }

  return violations
}

function extractContent(input) {
  const toolName = input.tool_name || ''

  if (toolName === 'Write') return input.tool_input?.content || ''
  if (toolName === 'Edit') return input.tool_input?.new_string || ''
  if (toolName === 'MultiEdit') {
    return (input.tool_input?.edits || []).map(e => e.new_string || '').join('\n')
  }
  return ''
}

const rl = createInterface({ input: process.stdin })
let raw = ''
rl.on('line', line => (raw += line))
rl.on('close', () => {
  const input = JSON.parse(raw || '{}')
  const filePath = input.tool_input?.file_path || ''
  const ext = path.extname(filePath).toLowerCase()

  if (ext !== '.mdx') process.exit(0)

  const content = extractContent(input)
  if (!content) process.exit(0)

  const violations = findViolations(content)
  if (violations.length === 0) process.exit(0)

  const details = violations
    .map(v => `  Line ${v.line}: "${v.match}"`)
    .join('\n')

  process.stderr.write(
    `[text-enforce] BLOCKED: Disallowed content found in ${filePath}:\n${details}\nRewrite the flagged lines before saving.\n`
  )
  process.exit(2)
})
