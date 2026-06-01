# Marketing asset capture scripts

One-off scripts that regenerate the app screenshots and the OG social image
used on the marketing site. Not part of the build — run by hand after a UI
change.

## Files
- `mp-seed-gen.mjs` — builds realistic seed data (queue jobs, filled calculator,
  AI advice text) using the **app's own** `createJob`/`calcAll`, writing
  `/tmp/mp-seed.json`.
- `mp-shots.mjs` — Playwright: seeds a fresh browser context from that JSON,
  intercepts the Anthropic call with a representative SSE stream, and captures
  `queue.png`, `calculator.png`, `calculator-result.png`, `ai-analysis.png`
  into `public/screenshots/`.
- `mp-og.mjs` + `og-template.html` — render the 1200×630 `public/og.png`
  (two real phones on the brand canvas).

## Running them
These need **Playwright** + a Chromium browser, and the **app dev server**
running (for the screenshot scripts). Playwright is not a repo dependency —
install on demand:

```sh
npx playwright install chromium
# app dev server (from repo root) for screenshots:
npm run dev          # serves the app at http://localhost:5173
# then, from this folder:
node mp-seed-gen.mjs && node mp-shots.mjs
# OG image (no dev server needed):
node mp-og.mjs
```

## Caveats (these scripts use absolute paths)
The scripts were captured with hard-coded absolute paths (the repo location and
the Playwright import from the npx cache). Before running on another machine,
update:
- the `import` path to `playwright` at the top of `mp-shots.mjs` / `mp-og.mjs`
- the `/Users/...` paths to the repo and output dirs

The AI-analysis screenshot is **representative**: the script intercepts the
Anthropic request and returns canned (but realistic) advice, so no API key or
live call is involved. Treat that one shot as illustrative, not a live capture.
