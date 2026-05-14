#!/usr/bin/env node
/**
 * primer-guard.mjs — PreToolUse/Bash, git commit only
 *
 * Encourages PRIMER.md checkpointing at meaningful architectural boundaries.
 * Never hard-blocks. Warn or ask only.
 *
 * Note: /exit and /clear are CLI-level commands and cannot be intercepted
 * via PreToolUse hooks — this hook fires on git commit only.
 *
 * State sources: git log, git diff --cached, git status only.
 * No session files, no external tracking.
 *
 * Severity model (max 5 pts):
 *   Cadence  (0–2): commits since last committed PRIMER.md update
 *   Arch     (0–2): cumulative path weight across bounded commit window + staged
 *   Breadth  (0–1): distinct file areas touched (secondary modifier only)
 *
 *   0–1 → silent
 *   2–3 → soft warn
 *     4 → stronger warn
 *    5+ → ask permission
 *
 * Reset: if HEAD already touches PRIMER.md → silent pass-through.
 * Bounded window: last 15 commits maximum.
 */

import { createInterface } from "readline";
import { execSync } from "child_process";

const WINDOW = 15;

// ---------------------------------------------------------------------------
// Path weights (architectural significance)
// ---------------------------------------------------------------------------

const WEIGHT_RULES = [
  { weight: 3, test: (f) => /^\.claude\/(hooks|rules|settings\.json)/.test(f) },
  { weight: 3, test: (f) => f.startsWith("src/app/") },
  {
    weight: 3,
    test: (f) =>
      /^(package\.json|tsconfig\.json|next\.config\.|tailwind\.config\.|package-lock\.json|yarn\.lock|pnpm-lock\.yaml)/.test(
        f,
      ),
  },
  { weight: 2, test: (f) => f.startsWith("content/") },
  { weight: 2, test: (f) => f.startsWith("src/components/") },
  {
    weight: 1,
    test: (f) =>
      f.startsWith("public/") || /tailwind|theme|tokens|globals\.css/.test(f),
  },
];

function pathWeight(file) {
  for (const rule of WEIGHT_RULES) {
    if (rule.test(file)) return rule.weight;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Area classification (for breadth signal)
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
    name: "Infrastructure",
    test: (f) =>
      f.startsWith(".claude/") ||
      /^(package\.json|tsconfig\.json|next\.config\.|tailwind\.config\.)/.test(
        f,
      ),
  },
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
// Git helpers
// ---------------------------------------------------------------------------

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function getCommitsSincePrimer() {
  // All commits in window
  const allLog = runGit(`git log --oneline -${WINDOW} --format=%H`);
  const allShas = allLog.split("\n").filter(Boolean);

  // Last commit that touched PRIMER.md (within window)
  const primerLog = runGit(
    `git log --oneline -${WINDOW} --format=%H -- PRIMER.md`,
  );
  const lastPrimerSha = primerLog.split("\n").filter(Boolean)[0] || null;

  if (!lastPrimerSha) return { count: allShas.length, shas: allShas };

  const idx = allShas.indexOf(lastPrimerSha);
  if (idx === -1) return { count: allShas.length, shas: allShas };
  if (idx === 0) return { count: 0, shas: [] }; // HEAD is the PRIMER commit

  return { count: idx, shas: allShas.slice(0, idx) };
}

function getFilesForShas(shas) {
  if (shas.length === 0) return [];
  const range =
    shas.length === 1
      ? `${shas[0]}^..${shas[0]}`
      : `${shas[shas.length - 1]}^..${shas[0]}`;
  const out = runGit(`git diff --name-only ${range}`);
  return out.split("\n").filter(Boolean);
}

function getStagedFiles() {
  return runGit("git diff --cached --name-only").split("\n").filter(Boolean);
}

function primerHasLocalChanges() {
  // Modified but not staged
  const unstaged = runGit("git diff --name-only -- PRIMER.md");
  // Staged but not committed
  const staged = runGit("git diff --cached --name-only -- PRIMER.md");
  return { unstaged: unstaged.length > 0, staged: staged.length > 0 };
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function warn(lines) {
  process.stderr.write(`[primer-guard]\n${lines.join("\n")}\n`);
  process.exit(0);
}

function ask(lines) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "ask",
        permissionDecisionReason: `[primer-guard]\n${lines.join("\n")}`,
      },
    }),
  );
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

  // --- Reset: if HEAD already touches PRIMER.md, pass through silently ---
  const headPrimer = runGit("git log -1 --format=%H -- PRIMER.md");
  const headCommit = runGit("git rev-parse HEAD");
  if (headPrimer && headPrimer === headCommit) process.exit(0);

  // --- Gather state (git only) ---
  const { count: commitsSince, shas } = getCommitsSincePrimer();
  const recentFiles = getFilesForShas(shas);
  const stagedFiles = getStagedFiles();
  const primerChanges = primerHasLocalChanges();

  // Deduplicated file set: recent committed + currently staged
  const allFiles = [...new Set([...recentFiles, ...stagedFiles])];

  // --- Signal 1: Cadence (0–2) ---
  const cadence = commitsSince >= 12 ? 2 : commitsSince >= 7 ? 1 : 0;

  // --- Signal 2: Architectural weight (0–2) ---
  const totalWeight = allFiles.reduce((sum, f) => sum + pathWeight(f), 0);
  const arch = totalWeight >= 16 ? 2 : totalWeight >= 8 ? 1 : 0;

  // --- Signal 3: Breadth (0–1, secondary) ---
  const areas = classifyAreas(allFiles);
  const breadth = areas.length >= 4 ? 1 : 0;

  const severity = cadence + arch + breadth;

  if (severity <= 1) process.exit(0);

  // --- Build output ---
  const lines = [];

  if (commitsSince > 0) {
    lines.push(
      `${commitsSince} commit${commitsSince === 1 ? "" : "s"} since last PRIMER checkpoint.`,
    );
  }
  if (areas.length > 0) {
    lines.push(`Areas touched: ${areas.join(", ")}.`);
  }
  if (primerChanges.staged) {
    lines.push(
      `PRIMER.md is staged but not yet committed — still vulnerable to crashes.`,
    );
  } else if (primerChanges.unstaged) {
    lines.push(
      `PRIMER.md has local changes but is not committed — still vulnerable to crashes.`,
    );
  }
  lines.push(
    `Consider: git add PRIMER.md && git commit -m "docs: update PRIMER"`,
  );

  if (severity >= 5) {
    ask(lines);
  } else if (severity === 4) {
    lines.unshift(
      `Significant architectural progress since last PRIMER checkpoint.`,
    );
    warn(lines);
  } else {
    warn(lines);
  }
});
