// Turns the raw shots in bennett-studio-site/photo-assets/ (or the repo-root
// bennettstudiophotos/ folder) into web-ready assets in public/photos/.
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
// Two search roots so the originals can live in either place.
const srcDirs = [
  path.resolve(siteRoot, '../photo-assets'),
  path.resolve(siteRoot, '../../bennettstudiophotos'),
]
const outDir = path.join(siteRoot, 'public/photos')

// Grade DEFAULTS. Every one is overridable per job, because a single global
// grade cannot make this set cohere — measured on the originals:
//
//   photo          luminance   chroma
//   marginprint      0.107      0.317   dark, hard teal/orange gel lighting
//   benchstock       0.133      0.086   dark, warm, already close to target
//   home             0.190      0.167   mid, warm workshop
//   marketday        0.244      0.232   bright midday, very high chroma
//   makerbooks       0.300      0.059   bright, COOL, almost no colour
//
// Three stops of luminance and a 5× chroma range. Turning that into one family
// means solving each image toward a shared target rather than applying one
// filter to all five and hoping.
const SATURATE = 0.78
const SEPIA = 0.14

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
    // Landing hero — a workshop with the printer centre-right, which suits the
    // left-heavy scrim: the headline sits over the darkest part and the machine
    // stays visible. Source is already 3:2, so nothing is cropped at 2400×1600
    // and focalX only matters for the 16:10 card crop.
    src: '3d-print-farm-photo-home',
    out: 'hero-workshop',
    w: 2400, h: 1600,
    focalX: 0.55, focalY: 0.5,
    zoom: 1.06,
    brightness: 0.86, saturate: 0.42, contrast: 1.06,
  },

  // ── App page heroes ───────────────────────────────────────────────────────
  {
    // Hard teal-and-orange gel lighting — by far the most saturated source, and
    // the one that would otherwise look like it came from a different website.
    // Cut to a fifth of its colour; the shape and the glow do the work.
    src: 'app-marginprint-photo',
    out: 'app-marginprint',
    w: 2400, h: 1600,
    focalX: 0.5, focalY: 0.48,
    zoom: 1.05,
    // sepia well above the default: desaturating alone leaves the residual
    // cyan reading GREEN next to four warm-brown frames. Chroma was already
    // in band — the hue was the problem, so the tint does the correcting.
    brightness: 1.14, saturate: 0.17, sepia: 0.40, contrast: 1.10,
  },
  {
    // Bright midday market. The crop is doing real work here, not just
    // composition: the source has a stallholder's face top-right and readable
    // VISA / Mastercard signage bottom-right. Zoomed in hard and pushed left so
    // both are outside the frame — the table of goods was the subject anyway.
    // Verify after any change to zoom or focalX; this is the one photo where a
    // looser crop reintroduces a person and two trademarks.
    src: 'app-marketday-photo',
    out: 'app-marketday',
    w: 2400, h: 1600,
    focalX: 0.10, focalY: 0.42,
    zoom: 1.95,
    brightness: 0.83, saturate: 0.28, contrast: 1.12,
  },
  {
    // Closest to the target already: dark, warm timber. Barely touched.
    src: 'app-benchstock-photos',
    out: 'app-benchstock',
    w: 2400, h: 1600,
    focalX: 0.55, focalY: 0.5,
    zoom: 1.05,
    brightness: 1.04, saturate: 0.72, contrast: 1.06,
  },
  {
    // The opposite outlier: bright, cool, almost colourless. Needs darkening
    // rather than desaturating — its saturate stays high so the sepia has
    // something to warm, otherwise it grades to flat grey.
    src: 'app-makerbooks-photo',
    out: 'app-makerbooks',
    w: 2400, h: 1600,
    focalX: 0.5, focalY: 0.52,
    zoom: 1.06,
    brightness: 0.67, saturate: 1.00, sepia: 0.34, contrast: 1.10,
  },
]

const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']

async function resolveSource(base) {
  for (const dir of srcDirs) {
    for (const ext of EXTS) {
      const p = path.join(dir, base + ext)
      try { await access(p); return p } catch { /* keep looking */ }
    }
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
      // Order matters: desaturate FIRST so sepia tints a neutral image rather
      // than compounding whatever hue was already there.
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
    { dataUrl, saturate: SATURATE, sepia: SEPIA, ...job },
  )

  const buf = Buffer.from(webpB64, 'base64')
  await writeFile(path.join(outDir, `${job.out}.webp`), buf)
  console.log(`  ✓ ${path.basename(job.file).padEnd(26)} → photos/${job.out}.webp  ${job.w}×${job.h}  ${(buf.length / 1024).toFixed(0)} kB`)
}

await browser.close()
if (missing.length) console.log(`\n[photos] still waiting on: ${missing.join(', ')}`)
