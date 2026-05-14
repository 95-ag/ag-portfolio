#!/usr/bin/env node
/**
 * git-commit-guard.mjs — PreToolUse/Bash, git commit only
 *
 * Precedence (strict):
 *   1. Hard block  → exit 2, stderr, no bypass
 *   2. Ask         → critical infra/config staged, no bypass
 *   3. Warn        → clustering/debug/draft, bypassable via [commit-guard-ignore]
 */

import { createInterface } from "readline";
import { execSync } from "child_process";

// ---------------------------------------------------------------------------
// Hard-block: dangerous paths
// ---------------------------------------------------------------------------

const BLOCK_PREFIXES = [
  "node_modules/",
  ".next/",
  ".playwright/",
  ".playwrightcli/",
  "coverage/",
  "dist/",
];

const BLOCK_PATH_RE = [
  /^\.env$/,
  /^\.env\.(?!example$).+$/, // .env.* but not .env.example
  /\.pem$/,
  /\.key$/,
  /\.p12$/,
  /\.pfx$/,
];

// Hard-block commit messages (whole message, case-insensitive)
const BLOCK_MSG_RE = /^\s*(wip|temp|misc|asdf|\.+|x+|#+|-+)\s*$/i;

// ---------------------------------------------------------------------------
// Ask: critical files (always escalate, no bypass)
// ---------------------------------------------------------------------------

const CRITICAL_EXACT = new Set([
  ".claude/settings.json",
  ".gitignore",
  "biome.json",
  "tsconfig.json",
  ".env.example",
  "README.md",
  "package.json",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
]);

const CRITICAL_PREFIX_RE = [/^\.claude\/hooks\//, /^\.claude\/rules\//];

const CRITICAL_ROOT_RE = [/^next\.config\./, /^tailwind\.config\./];

function isCritical(file) {
  if (CRITICAL_EXACT.has(file)) return true;
  if (CRITICAL_PREFIX_RE.some((r) => r.test(file))) return true;
  if (CRITICAL_ROOT_RE.some((r) => r.test(file))) return true;
  return false;
}

// ---------------------------------------------------------------------------
// File area classification
// ---------------------------------------------------------------------------

const AREA_RULES = [
  { name: "UI", test: (f) => f.startsWith("src/components/") },
  { name: "Routing", test: (f) => f.startsWith("src/app/") },
  {
    name: "Lib/Utils",
    test: (f) => f.startsWith("src/lib/") || f.startsWith("src/utils/"),
  },
  { name: "Content", test: (f) => f.startsWith("content/") },
  { name: "Public", test: (f) => f.startsWith("public/") },
  {
    name: "Styling",
    test: (f) => /tailwind|theme|tokens|globals\.css/.test(f),
  },
  {
    name: "Tooling",
    test: (f) => f.startsWith("scripts/") || /^\.claude\/hooks\//.test(f),
  },
  { name: "Config", test: (f) => isCritical(f) || f.startsWith(".claude/") },
];

function classifyAreas(files) {
  const areas = new Set();
  for (const file of files) {
    for (const rule of AREA_RULES) {
      if (rule.test(file)) {
        areas.add(rule.name);
        break;
      }
    }
  }
  return [...areas];
}

// ---------------------------------------------------------------------------
// Debug/draft checks
// ---------------------------------------------------------------------------

const DEBUG_RE = /\bconsole\.log\b|\bdebugger\b|\bTODO\b|\bFIXME\b/;
const SOURCE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);

// Skip debug checks in these path prefixes
const DEBUG_SKIP_PREFIX = [
  "__tests__/",
  "tests/",
  "test/",
  "spec/",
  "examples/",
  "example/",
  "playground/",
  "scratch/",
  "fixtures/",
];

const DRAFT_PATH_RE = /(?:^_|_draft\.mdx$|\/drafts\/)/;

function extOf(file) {
  const m = file.match(/(\.[^./]+)$/);
  return m ? m[1] : "";
}

function skipDebugCheck(file) {
  return DEBUG_SKIP_PREFIX.some((p) => file.startsWith(p));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function extractCommitMessage(command) {
  // -m "..." or -m '...'
  const mFlag = command.match(/-m\s+["']([^"']+)["']/);
  if (mFlag) return mFlag[1].trim();

  // $(cat <<'EOF' \n ... \n EOF \n )
  const catHeredoc = command.match(
    /cat\s+<<['"]*\w+['"]*\n([\s\S]*?)\n\s*\w+\s*\)/,
  );
  if (catHeredoc) return catHeredoc[1].trim();

  // plain heredoc: <<EOF \n ... \n EOF
  const heredoc = command.match(/<<['"]*\w+['"]*\n([\s\S]*?)\n\w+/);
  if (heredoc) return heredoc[1].trim();

  // Parsing failed — return null (do not block)
  return null;
}

function block(reason) {
  process.stderr.write(`[commit-guard] BLOCKED\n${reason}\n`);
  process.exit(2);
}

function ask(lines) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "ask",
        permissionDecisionReason: `[commit-guard] Confirm commit\n${lines.join("\n")}`,
      },
    }),
  );
  process.exit(0);
}

function warn(lines) {
  process.stderr.write(`[commit-guard] Warning\n${lines.join("\n")}\n`);
  // Not a block — continue
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const rl = createInterface({ input: process.stdin });
let raw = "";
rl.on("line", (line) => (raw += line));
rl.on("close", () => {
  const input = JSON.parse(raw || "{}");
  const command = input.tool_input?.command || "";

  if (!/\bgit\s+commit\b/.test(command)) process.exit(0);

  // Two git calls only
  const stagedRaw = runGit("git diff --cached --name-status");
  const stagedDiff = runGit("git diff --cached --unified=0");

  // Parse name-status: A/M/R/D + path
  const allEntries = stagedRaw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, ...parts] = line.split("\t");
      // Renames: "R100\told\tnew" — use the new path
      const file = parts[parts.length - 1] || "";
      return { status: status[0], file };
    });

  // Meaningful file count: exclude pure deletes and pure renames with no content change
  const meaningfulFiles = allEntries
    .filter((e) => e.status !== "D")
    .map((e) => e.file);

  const allFiles = allEntries.map((e) => e.file);

  const commitMessage = extractCommitMessage(command);

  // Check for bypass token in commit message (bypasses warns only, not blocks/asks)
  const bypassed = commitMessage?.includes("[commit-guard-ignore]") ?? false;

  // ===========================================================================
  // TIER 1 — Hard Block (no bypass)
  // ===========================================================================

  if (commitMessage !== null) {
    if (!commitMessage.replace(/\[commit-guard-ignore\]/g, "").trim()) {
      block("Commit message is empty.");
    }
    if (
      BLOCK_MSG_RE.test(
        commitMessage.replace(/\[commit-guard-ignore\]/g, "").trim(),
      )
    ) {
      block(`Bad commit message: "${commitMessage}"`);
    }
  }

  for (const file of allFiles) {
    for (const prefix of BLOCK_PREFIXES) {
      if (file.startsWith(prefix)) block(`Dangerous path staged: ${file}`);
    }
    for (const re of BLOCK_PATH_RE) {
      if (re.test(file)) block(`Dangerous file staged: ${file}`);
    }
  }

  // ===========================================================================
  // TIER 2 — Ask: critical files (no bypass)
  // ===========================================================================

  const criticalFiles = allFiles.filter(isCritical);

  if (criticalFiles.length > 0) {
    const areas = classifyAreas(meaningfulFiles);
    const lines = [
      `Critical files:`,
      ...criticalFiles.map((f) => `  * ${f}`),
      `Areas:`,
      ...areas.map((a) => `  * ${a}`),
      `Files: ${meaningfulFiles.length}`,
    ];
    if (commitMessage)
      lines.push(
        `Message: "${commitMessage.replace(/\[commit-guard-ignore\]/g, "").trim()}"`,
      );
    ask(lines);
  }

  // ===========================================================================
  // TIER 3 — Warn: clustering, debug artifacts, draft content (bypassable)
  // ===========================================================================

  if (bypassed) process.exit(0);

  const areas = classifyAreas(meaningfulFiles);
  const count = meaningfulFiles.length;
  const warnings = [];

  // File count
  if (count > 40) {
    warnings.push(`Very large commit: ${count} files.`);
  } else if (count > 25) {
    warnings.push(`Large commit: ${count} files.`);
  }

  // Area span
  if (areas.length >= 4) {
    warnings.push(`Spans ${areas.length} areas: ${areas.join(", ")}.`);
  } else if (areas.length >= 3) {
    warnings.push(`Spans multiple areas: ${areas.join(", ")}.`);
  }

  // Draft content
  const draftFiles = meaningfulFiles.filter((f) => DRAFT_PATH_RE.test(f));
  if (draftFiles.length > 0) {
    warnings.push(`Draft files: ${draftFiles.join(", ")}`);
  }

  // Debug artifacts in staged diff
  const debugHits = new Set();
  let currentFile = "";
  for (const line of stagedDiff.split("\n")) {
    if (line.startsWith("+++ b/")) {
      currentFile = line.slice(6);
    } else if (line.startsWith("+") && !line.startsWith("+++")) {
      if (
        SOURCE_EXTS.has(extOf(currentFile)) &&
        !skipDebugCheck(currentFile) &&
        DEBUG_RE.test(line)
      ) {
        debugHits.add(currentFile);
      }
    }
  }
  if (debugHits.size > 0) {
    warnings.push(`Debug artifacts in: ${[...debugHits].join(", ")}`);
  }

  if (warnings.length > 0) {
    const lines = [
      ...warnings.map((w) => `  ! ${w}`),
      `  Files: ${count}  Areas: ${areas.join(", ")}`,
      `  (add [commit-guard-ignore] to message to skip these warnings)`,
    ];
    warn(lines);
  }

  process.exit(0);
});
