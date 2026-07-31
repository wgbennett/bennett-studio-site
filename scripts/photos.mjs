// Turns the raw shots in bennett-studio-site/photo-assets/ into web-ready
// assets in public/photos/.
//
//   PLAYWRIGHT_PATH=... node scripts/photos.mjs
//
// MISSING SOURCES ARE NOT AN ERROR. Every job whose source file is absent is
// skipped with a note, and the components fall back to a designed placeholder
// (see PhotoBackdrop.jsx). That is deliberate: the layout, the scrims and the
// contrast were all built and verified before a single photograph existed, so
// dropping a file into photo-assets/ and re-running this is the whole workflow.
//
// Done in a Chromium canvas rather than with sips for three reasons: sips can
// read WebP but not write it; canvas gives per-image focal-point control so a
// crop doesn't decapitate the subject; and drawing through a canvas strips EXIF
// orientation — the trap that made the earlier print pipeline look sideways
// (files render upright in browsers, but macOS Preview applies a phantom
// rotation, so verify output in a BROWSER, never in Preview).
//
// GRADE — the important difference from the Feintwork pipeline, which bakes
// full greyscale. Bennett Studio is a warm brand (bone / ink / copper), and a
// monochrome photograph under it reads as a different studio. So these are
// desaturated only partway and pushed warm:
//
//     saturate(0.78) sepia(0.12)
//
// Enough desaturation that the photograph stops competing with copper for
// attention, enough warmth that it sits in the same family as bone. Colour is
// pulled toward the brand rather than removed. Per-image brightness/contrast on
// top, because stock photos arrive in wildly different light and one global
// setting leaves some muddy and others blown out behind overlaid copy.

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { loadPlaywright } from './playwright-env.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(here, '..')
const srcDir = path.resolve(siteRoot, '../photo-assets')
const outDir = path.join(siteRoot, 'public/photos')

// Global grade. Tweak here, not per-job, so the set stays coherent.
const SATURATE = 0.78
const SEPIA = 0.12

// focalX/focalY are 0–1 positions kept in frame when cropping (0.5 = centre).
// zoom scales beyond cover-fit so a crop can tighten on the subject instead of
// keeping dead space. NOTE: when the target is wider than the source, cover-fit
// is constrained by width and focalX does nothing until zoom > 1.
//
// All heroes are 2400×1600 (3:2). One file has to cover both a wide desktop
// viewport and a ~9:19.5 phone; a 21:9 source would have no vertical room left
// to crop on a phone.
//
// `src` accepts any extension — the loader resolves .jpg/.jpeg/.png/.webp, so
// whatever Unsplash hands over works without renaming.
const JOBS = [
  {
    // Landing hero. Look for a workbench receding into depth, warm light,
    // and a calm LEFT third — that is where the headline sits.
    src: 'hero-workshop',
    out: 'hero-workshop',
    w: 2400, h: 1600,
    focalX: 0.55, focalY: 0.5,
    zoom: 1.06,
    brightness: 0.86, // pulled down: bone copy sits on top
    contrast: 1.08,
  },

  // ── App page heroes ───────────────────────────────────────────────────────
  {
    src: 'app-marginprint',
    out: 'app-marginprint',
    w: 2400, h: 1600,
    focalX: 0.5, focalY: 0.48,
    zoom: 1.05,
    brightness: 0.84,
    contrast: 1.1,
  },
  {
    src: 'app-marketday',
    out: 'app-marketday',
    w: 2400, h: 1600,
    focalX: 0.5, focalY: 0.5,
    zoom: 1.05,
    brightness: 0.82, // market shots are usually bright daylight
    contrast: 1.1,
  },
  {
    src: 'app-benchstock',
    out: 'app-benchstock',
    w: 2400, h: 1600,
    focalX: 0.5, focalY: 0.5,
    zoom: 1.05,
    brightness: 0.86,
    contrast: 1.08,
  },
  {
    src: 'app-makerbooks',
    out: 'app-makerbooks',
    w: 2400, h: 1600,
    focalX: 0.5, focalY: 0.5,
    zoom: 1.05,
    brightness: 0.86,
    contrast: 1.08,
  },
]

const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']

async function resolveSource(base) {
  for (const ext of EXTS) {
    const p = path.join(srcDir, base + ext)
    try { await access(p); return p } catch { /* try the next extension */ }
  }
  return null
}

const MIME = { '.png': 'image/png', '.webp': 'image/webp' }

await mkdir(outDir, { recursive: true })

// Resolve everything first so a run with no photos at all costs nothing and
// doesn't need a browser.
const resolved = []
const missing = []
for (const job of JOBS) {
  const file = await resolveSource(job.src)
  if (file) resolved.push({ ...job, file })
  else missing.push(job.src)
}

if (resolved.length === 0) {
  console.log('[photos] no sources in photo-assets/ — nothing to build.')
  console.log(`[photos] waiting on: ${missing.join(', ')}`)
  console.log('[photos] the site renders designed placeholders until these land.')
  process.exit(0)
}

const { launch } = await loadPlaywright()
const browser = await launch()
const page = await (await browser.newContext()).newPage()

for (const job of resolved) {
  const bytes = await readFile(job.file)
  const ext = path.extname(job.file).toLowerCase()
  const dataUrl = `data:${MIME[ext] ?? 'image/jpeg'};base64,${bytes.toString('base64')}`

  const webpB64 = await page.evaluate(
    async ({ dataUrl, w, h, focalX, focalY, contrast, brightness, zoom, saturate, sepia }) => {
      const img = new Image()
      img.src = dataUrl
      await img.decode()

      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')
      ctx.filter =
        `saturate(${saturate}) sepia(${sepia}) ` +
        `brightness(${brightness ?? 1}) contrast(${contrast ?? 1})`

      // cover-fit, then offset by the focal point so the subject survives.
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * (zoom ?? 1)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.drawImage(img, (w - dw) * focalX, (h - dh) * focalY, dw, dh)

      return c.toDataURL('image/webp', 0.82).split(',')[1]
    },
    { dataUrl, ...job, saturate: SATURATE, sepia: SEPIA },
  )

  const buf = Buffer.from(webpB64, 'base64')
  await writeFile(path.join(outDir, `${job.out}.webp`), buf)
  console.log(`  ✓ ${path.basename(job.file).padEnd(26)} → photos/${job.out}.webp  ${job.w}×${job.h}  ${(buf.length / 1024).toFixed(0)} kB`)
}

await browser.close()
if (missing.length) console.log(`\n[photos] still waiting on: ${missing.join(', ')}`)
