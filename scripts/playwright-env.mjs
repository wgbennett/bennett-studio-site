// Shared Playwright resolution for the capture scripts.
//
// Playwright is deliberately NOT a dependency of this site — it is only needed
// to regenerate screenshots and OG cards, which happens rarely and never during
// a deploy. Adding it to package.json would put a ~300MB browser download in
// front of every `npm install` and every Cloudflare Pages build.
//
// So it is resolved at run time, in this order:
//   1. $PLAYWRIGHT_PATH  — explicit path to a playwright entry point
//   2. `playwright`      — a normal local/global install
// and the browser binary comes from $PLAYWRIGHT_CHROMIUM if set, otherwise
// whatever Playwright's own resolution finds.
//
// Usage from another script:
//   const { chromium, launch } = await loadPlaywright()
//   const browser = await launch()

export async function loadPlaywright() {
  const explicit = process.env.PLAYWRIGHT_PATH
  let mod
  try {
    mod = await import(explicit || 'playwright')
  } catch (err) {
    throw new Error(
      'Could not load Playwright. Install it (`npm i -D playwright && npx playwright install chromium`) ' +
        'or point PLAYWRIGHT_PATH at an existing install, e.g.\n' +
        '  PLAYWRIGHT_PATH=$(npm root -g)/playwright/index.js node scripts/og-shots.mjs\n' +
        `Underlying error: ${err.message}`,
    )
  }

  const pw = mod.default ?? mod
  const { chromium } = pw

  // An explicitly pinned binary wins; otherwise let Playwright find its own.
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM || undefined
  const launch = (opts = {}) => chromium.launch({ executablePath, ...opts })

  return { chromium, launch }
}
