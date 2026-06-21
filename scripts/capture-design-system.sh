#!/usr/bin/env bash
#
# Regenerate the dev-only /design-system screenshot assets (public/design-system/*.png).
# These show components that can't render live in the gallery (fixed chrome, full-
# viewport WebGL, scroll-driven) in light + dark. The route AND these assets are pruned
# from the production snapshot by release.sh — they never ship.
#
# Usage:
#   1. Start the dev server:  npm run dev   (http://localhost:3000)
#   2. Run:                    bash scripts/capture-design-system.sh
#
# Requires playwright-cli (installed) + a Chromium browser.
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
WORK_SLUG="${WORK_SLUG:-model-extraction-attacks}"
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/design-system"
P="npx --no-install playwright-cli"
# Remove the Next.js dev error overlay / "Issues" toast before full-viewport shots.
RM="(function(){document.querySelectorAll('nextjs-portal').forEach(function(e){e.remove()})})()"

mkdir -p "$DIR"
$P close-all >/dev/null 2>&1 || true
$P open "$BASE_URL/" >/dev/null 2>&1
sleep 2

shoot() {
  local T="$1"
  $P localstorage-set theme "$T" >/dev/null 2>&1

  # Desktop home — pill nav, footer, ambient background
  $P resize 1440 1000 >/dev/null 2>&1
  $P goto "$BASE_URL/" >/dev/null 2>&1
  sleep 3
  $P screenshot "nav[aria-label='Primary']" --filename="$DIR/nav-pill-$T.png" >/dev/null 2>&1
  $P eval "window.scrollTo(0, document.body.scrollHeight)" >/dev/null 2>&1
  sleep 1
  $P eval "$RM" >/dev/null 2>&1
  $P screenshot "footer:not(.error-overlay-footer)" --filename="$DIR/footer-$T.png" >/dev/null 2>&1
  $P eval "window.scrollTo(0,0)" >/dev/null 2>&1
  sleep 1
  $P eval "$RM" >/dev/null 2>&1
  $P screenshot --filename="$DIR/background-$T.png" >/dev/null 2>&1

  # Long project page (xl) — scroll-to-top FAB + section-progress rail
  $P resize 1440 1200 >/dev/null 2>&1
  $P goto "$BASE_URL/work/$WORK_SLUG" >/dev/null 2>&1
  sleep 3
  $P eval "window.scrollTo(0,1600)" >/dev/null 2>&1
  sleep 1
  $P screenshot "button[aria-label='Scroll to top']" --filename="$DIR/scroll-to-top-$T.png" >/dev/null 2>&1
  $P screenshot "nav[aria-label='Page sections']" --filename="$DIR/section-progress-$T.png" >/dev/null 2>&1

  # Mobile — open the slide-out drawer
  $P resize 390 820 >/dev/null 2>&1
  $P goto "$BASE_URL/" >/dev/null 2>&1
  sleep 2
  $P click "button[aria-label='Open navigation menu']" >/dev/null 2>&1
  sleep 1
  $P eval "$RM" >/dev/null 2>&1
  $P screenshot --filename="$DIR/nav-mobile-$T.png" >/dev/null 2>&1
}

shoot light
shoot dark
$P close-all >/dev/null 2>&1 || true
echo "Captured design-system assets to $DIR"
ls -1 "$DIR"
