#!/usr/bin/env node
import { createInterface } from "readline";
import path from "path";

const rl = createInterface({ input: process.stdin });
let raw = "";
rl.on("line", (line) => (raw += line));
rl.on("close", () => {
  const input = JSON.parse(raw || "{}");
  const filePath = input.tool_input?.file_path || "";
  const projectRoot = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const rel = path.relative(projectRoot, path.resolve(projectRoot, filePath));

  const HARD_BLOCK = [/^\.git(\/|$)/, /^\.claude\/docs(\/|$)/, /^\.env(\.|$)/];

  const ASK = [
    /^\.claude(\/|$)/,
    /^CLAUDE\.md$/,
    /^AGENTS\.md$/,
    /^\.gitignore$/,
    /^package\.json$/,
    /^biome\.json$/,
    /^tsconfig\.json$/,
    /^next\.config\.ts$/,
  ];

  for (const pattern of HARD_BLOCK) {
    if (pattern.test(rel)) {
      process.stderr.write(
        `[file-protect] BLOCKED: "${rel}" is a protected file and cannot be edited.\n`,
      );
      process.exit(2);
    }
  }

  for (const pattern of ASK) {
    if (pattern.test(rel)) {
      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "ask",
            permissionDecisionReason: `"${rel}" is a sensitive config/rules file. Confirm this edit is intentional.`,
          },
        }),
      );
      process.exit(0);
    }
  }

  process.exit(0);
});
