// WCAG text-contrast check for the whole site.
//
//   npm run check:contrast              # against the dev server
//   BASE_URL=http://127.0.0.1:4173 npm run check:contrast
//
// Exits non-zero if any text fails its WCAG AA threshold, so it can gate a
// deploy. Written after a monochrome conversion shipped text-chalk (#EDEDEA)
// onto white surfaces: 1.17:1, invisible. Reading the markup did not catch it —
// a colour token is only right or wrong relative to whatever it lands on, which
// you cannot see from a class string.
//
// ── Why the background is resolved by hit-testing ─────────────────────────
// The obvious implementation walks up the DOM for the first opaque background.
// That is wrong for anything overlaid: the site nav is a positioned banner over
// a dark hero, and its DOM ancestors end at <body> (white), so every white nav
// link is reported as white-on-white. An earlier version of this script cried
// wolf on ~9 such elements, which is exactly how a check gets ignored.
//
// document.elementsFromPoint() returns the visual hit-test stack instead — for
// that nav link it includes the dark hero section the link actually sits over.
// Backgrounds are composited down that stack until an opaque one is reached.
//
// ── Text over photographs ─────────────────────────────────────────────────
// A hero photo has no single background colour, so its contrast is not
// computable this way. Those are reported separately as UNVERIFIABLE rather
// than passed silently or failed wrongly — they need a human eye, and the
// scrim under them is what makes them legible.

import { loadPlaywright } from './playwright-env.mjs'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:5190'

// Every route the router serves. Keep in step with src/App.jsx.
// (/makerbooks is a redirect to /maker-books, so it is not listed separately —
// it renders the same page and would only double the run time.)
const ROUTES = ['/', '/marginprint', '/marketday', '/benchstock', '/maker-books']

const AUDIT = () => {
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  const parse = (c) => {
    const m = (c || '').match(/[\d.]+/g)
    if (!m) return null
    return { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] }
  }
  const lum = ({ r, g, b }) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })
  const hex = ({ r, g, b }) =>
    '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()

  // Composite backgrounds down the VISUAL stack under a point.
  const backdropAt = (x, y, self) => {
    const stack = document.elementsFromPoint(x, y)
    // Start at the element ITSELF, not above it: its own background is the
    // first thing its text sits on. Skipping self reported the nav's dark
    // pill button as white-on-white.
    const i = stack.indexOf(self)
    const layers = []
    for (const el of stack.slice(i === -1 ? 0 : i)) {
      const s = getComputedStyle(el)
      if (s.backgroundImage && s.backgroundImage !== 'none') return { image: true }
      if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'CANVAS') return { image: true }
      const c = parse(s.backgroundColor)
      if (!c || c.a === 0) continue
      layers.push(c)
      if (c.a >= 0.999) break
    }
    let base = { r: 255, g: 255, b: 255, a: 1 }
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base)
    return { color: base }
  }

  const prevBehavior = document.documentElement.style.scrollBehavior
  document.documentElement.style.scrollBehavior = 'auto'
  const out = []
  for (const el of document.querySelectorAll('p,span,li,a,h1,h2,h3,h4,h5,label,button,td,th,div,figcaption')) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim()
    if (text.length < 3) continue
    const s = getComputedStyle(el)
    if (s.visibility === 'hidden' || s.display === 'none') continue
    if (Number(s.opacity) < 0.9) continue // mid-animation, not a final state
    // Screen-reader-only text (skip links) is clipped to nothing until focused.
    // It is not visible, so it has no meaningful contrast — and measuring it
    // reports white-on-white every time.
    if (s.clipPath === 'inset(50%)' || (s.clip && s.clip !== 'auto')) continue
    let r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue

    // A fixed/sticky element does not move when you scroll to it, so
    // scrollIntoView would leave the hit test pointing at whatever happens to
    // be under its resting position. Measure those at the top of the page,
    // where they actually sit.
    let pinned = false
    for (let a = el; a; a = a.parentElement) {
      const pos = getComputedStyle(a).position
      if (pos === 'fixed' || pos === 'sticky') { pinned = true; break }
    }

    // elementsFromPoint takes VIEWPORT coordinates, so anything off-screen has
    // to be brought into view first or the hit test finds nothing and every
    // below-the-fold element is scored against a white default. Instant, not
    // smooth — the stylesheet sets scroll-behavior: smooth globally.
    if (pinned) window.scrollTo({ top: 0, behavior: 'instant' })
    else el.scrollIntoView({ block: 'center', behavior: 'instant' })
    r = el.getBoundingClientRect()

    const x = Math.round(r.left + Math.min(r.width / 2, 40))
    const y = Math.round(r.top + r.height / 2)
    const back = backdropAt(x, y, el)

    const fgRaw = parse(s.color)
    if (!fgRaw) continue
    const px = parseFloat(s.fontSize)
    const bold = Number(s.fontWeight) >= 700
    const min = px >= 24 || (px >= 18.66 && bold) ? 3.0 : 4.5
    const key = `${el.className}|${s.color}|${px}`

    if (back.image) { out.push({ key, text: text.slice(0, 48), px: Math.round(px), overImage: true }); continue }

    const fg = over(fgRaw, back.color)
    const L1 = lum(fg), L2 = lum(back.color)
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
    if (ratio < min) {
      out.push({
        key, text: text.slice(0, 48), px: Math.round(px),
        ratio: +ratio.toFixed(2), min, fg: hex(fg), bg: hex(back.color),
        cls: (el.className || '').toString().slice(0, 64),
      })
    }
  }
  document.documentElement.style.scrollBehavior = prevBehavior
  return out
}

const { launch } = await loadPlaywright()
const browser = await launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })

const fails = new Map()
const overImage = new Map()

for (const route of ROUTES) {
  const page = await ctx.newPage()
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  // Scroll the whole page so reveal-on-scroll blocks reach their final state;
  // an element still at opacity 0 would be skipped and never checked.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 80))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(500)

  // Freeze every transition and animation before measuring.
  //
  // AUDIT is one synchronous loop: it scrolls to each element and reads
  // getComputedStyle immediately, never yielding. getComputedStyle returns the
  // CURRENT interpolated value, so any property still mid-transition is sampled
  // at an arbitrary point along its curve. The nav is the case that bit —
  // pinned, so the loop keeps scrolling it back to top, and its background
  // transitions between its over-hero and scrolled states. That reported the
  // "See the apps" chip as a different pair of blended greys on every run
  // (1.3:1, then 3.54:1, then passing), which made this gate flaky rather than
  // wrong: nothing about the settled page had changed.
  //
  // Contrast is a property of the resting state, so pin everything to it.
  await page.addStyleTag({
    content: `*, *::before, *::after {
      transition: none !important;
      animation: none !important;
      scroll-behavior: auto !important;
    }`,
  })
  await page.waitForTimeout(100)

  for (const row of await page.evaluate(AUDIT)) {
    const bucket = row.overImage ? overImage : fails
    if (!bucket.has(row.key)) bucket.set(row.key, { ...row, routes: [route] })
    else bucket.get(row.key).routes.push(route)
  }
  await page.close()
}
await browser.close()

if (overImage.size) {
  console.log(`\n${overImage.size} text style(s) sit over an image — contrast not computable, check by eye:`)
  for (const v of overImage.values()) {
    console.log(`  ${String(v.px).padStart(3)}px  "${v.text}"  ${[...new Set(v.routes)].join(' ')}`)
  }
}

if (!fails.size) {
  console.log(`\n✓ contrast: every measurable text style meets WCAG AA across ${ROUTES.length} routes\n`)
  process.exit(0)
}

console.error(`\n✗ contrast: ${fails.size} text style(s) below WCAG AA\n`)
for (const v of [...fails.values()].sort((a, b) => a.ratio - b.ratio)) {
  console.error(`  ${String(v.ratio).padStart(5)}:1  (needs ${v.min})  ${v.px}px  "${v.text}"`)
  console.error(`         ${v.fg} on ${v.bg}`)
  console.error(`         .${v.cls}`)
  console.error(`         ${[...new Set(v.routes)].join(' ')}\n`)
}
process.exit(1)
