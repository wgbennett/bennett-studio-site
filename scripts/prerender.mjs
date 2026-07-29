// Build-time prerender for the Bennett Studio marketing site.
//
// Runs as the last step of `npm run build`, after both Vite passes:
//   1. `vite build`                       → dist/          (client bundle + index.html)
//   2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr`
//
// For every route in PRERENDER_ROUTES it renders the real React tree to HTML,
// injects it into the built index.html, rewrites the head for that route, and
// writes dist/<route>/index.html. Cloudflare Pages serves those files directly;
// unmatched paths still fall through to public/_redirects → the SPA shell.
//
// The client hydrates this markup (see src/main.jsx), so a visitor sees the
// finished page on first paint and crawlers never need to run JS.

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(here, '..')
const distDir = path.join(siteRoot, 'dist')
const ssrDir = path.join(siteRoot, 'dist-ssr')

const fail = (msg) => {
  console.error(`\n✗ prerender: ${msg}\n`)
  process.exit(1)
}

if (!existsSync(path.join(distDir, 'index.html'))) {
  fail('dist/index.html not found — run `vite build` first.')
}
if (!existsSync(path.join(ssrDir, 'entry-server.js'))) {
  fail('dist-ssr/entry-server.js not found — run the --ssr build first.')
}

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const { PRERENDER_ROUTES, metaFor, SITE_ORIGIN } = await import(
  pathToFileURL(path.join(siteRoot, 'src/site-meta.js')).href
)

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

// ── head rewriting ───────────────────────────────────────────────────────
// Swap only the per-route tags; everything else in index.html (fonts,
// favicon, theme-color, og:image, twitter:card) is route-independent and
// passes through untouched.
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function rewriteHead(html, route, meta) {
  const url = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`
  const title = esc(meta.title)
  const description = esc(meta.description)
  const ogTitle = esc(meta.ogTitle ?? meta.title)

  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [/(<meta name="description" content=")[\s\S]*?(" \/>)/, `$1${description}$2`],
    [/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2`],
    [/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[\s\S]*?(" \/>)/, `$1${ogTitle}$2`],
    [/(<meta property="og:description" content=")[\s\S]*?(" \/>)/, `$1${description}$2`],
    [/(<meta name="twitter:title" content=")[\s\S]*?(" \/>)/, `$1${ogTitle}$2`],
    [/(<meta name="twitter:description" content=")[\s\S]*?(" \/>)/, `$1${description}$2`],
  ]

  let out = html
  for (const [pattern, replacement] of swaps) {
    if (!pattern.test(out)) {
      fail(`head tag not found in index.html for ${pattern} — template changed?`)
    }
    out = out.replace(pattern, replacement)
  }
  return out
}

// ── render ───────────────────────────────────────────────────────────────
const MARKER = '<div id="root"></div>'
if (!template.includes(MARKER)) fail(`expected \`${MARKER}\` in dist/index.html`)

for (const route of PRERENDER_ROUTES) {
  const appHtml = await render(route)

  // A route that renders nothing means the router didn't match — that would
  // ship an empty page to crawlers, so treat it as a build failure.
  if (appHtml.trim().length < 500) {
    fail(`${route} rendered only ${appHtml.trim().length} bytes — router mismatch?`)
  }

  const html = rewriteHead(
    template.replace(MARKER, `<div id="root">${appHtml}</div>`),
    route,
    metaFor(route),
  )

  // Flat `<route>.html`, NOT `<route>/index.html`. Pages canonicalises a
  // directory to a trailing slash (/marginprint → 308 → /marginprint/) but
  // serves a flat file at the bare path. Every nav link, canonical tag and
  // sitemap entry uses the slashless form, so flat files mean those resolve
  // 200 first try instead of taking a redirect hop to a URL that disagrees
  // with its own canonical.
  const outFile =
    route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, `${route.replace(/^\//, '')}.html`)

  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, html)
  console.log(`  ✓ ${route.padEnd(14)} → ${path.relative(siteRoot, outFile)}  (${(html.length / 1024).toFixed(0)} kB)`)
}

// No separate SPA fallback file is emitted on purpose. Cloudflare Pages only
// lets real static assets take precedence over the `_redirects` catch-all when
// that catch-all targets /index.html; aiming it at a dedicated shell makes the
// rule win instead, serving that shell for every route and defeating this
// whole script. See public/_redirects. Unmatched paths therefore get the
// prerendered landing markup, and App.jsx's `*` route is written to hydrate
// against it cleanly.

// The SSR bundle is a build artifact, not something to deploy.
await rm(ssrDir, { recursive: true, force: true })
console.log(`\nprerendered ${PRERENDER_ROUTES.length} routes\n`)
