// Renders one Open Graph card per route from scripts/og-template.html.
//
//   node scripts/og-shots.mjs
//
// Writes public/og.png (studio landing) and public/og-<app>.png. The filenames
// are referenced by ogImage in src/site-meta.js, which scripts/prerender.mjs
// bakes into each route's og:image / twitter:image — so a MarketDay link
// unfurls with MarketDay, not with the MarginPrint queue every route used to
// share.
//
// Re-run this after any UI refresh that makes the screenshots in
// public/screenshots/ look dated (those are captured by mp-shots.mjs).
//
// Playwright is resolved at run time via scripts/playwright-env.mjs (it is not a
// dependency of the site — see that file for why, and for PLAYWRIGHT_PATH).

import { readFile, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadPlaywright } from './playwright-env.mjs'

const { launch } = await loadPlaywright()
const here = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(here, '..')
const shotsDir = path.join(siteRoot, 'public/screenshots')
const outDir = path.join(siteRoot, 'public')

const shot = (name) => `file://${path.join(shotsDir, name)}`

// One card per prerendered route. `file` must match the ogImage in
// src/site-meta.js. Headlines are deliberately short — they render at 90–118px.
const CARDS = [
  {
    route: '/',
    file: 'og.png',
    eyebrowA: 'BENNETT STUDIO',
    eyebrowB: 'FOUR APPS',
    headline: 'The business side<br/><span class="em">of making,</span><br/>handled<span class="accent">.</span>',
    headlineSize: 68,
    headlineWidth: 640,
    subhead: 'Focused, mobile-first software for people who sell what they make.',
    front: 'queue.png',
    back: 'marketday-quicksale.png',
  },
  {
    route: '/marginprint',
    file: 'og-marginprint.png',
    eyebrowA: 'MARGINPRINT',
    eyebrowB: '3D-PRINT SHOPS',
    headline: 'The queue<br/>is the app<span class="accent">.</span>',
    headlineSize: 108,
    headlineWidth: 640,
    subhead: 'Mobile-first operations for small 3D&nbsp;print sellers.',
    front: 'queue.png',
    back: 'calculator-result.png',
  },
  {
    route: '/marketday',
    file: 'og-marketday.png',
    eyebrowA: 'MARKETDAY',
    eyebrowB: 'MARKETS & FAIRS',
    headline: 'Run the booth<br/>offline<span class="accent">.</span>',
    headlineSize: 90,
    headlineWidth: 640,
    subhead: 'Pack lists, one-tap sales, and what each show actually made.',
    front: 'marketday-quicksale.png',
    back: 'marketday-showsummary.png',
  },
  {
    route: '/benchstock',
    file: 'og-benchstock.png',
    eyebrowA: 'BENCHSTOCK',
    eyebrowB: 'TRUE COST',
    headline: 'Know what it<br/>really cost<span class="accent">.</span>',
    headlineSize: 94,
    headlineWidth: 640,
    subhead: 'Stock levels, reorder points, and landed cost per item.',
    front: 'benchstock-materials.png',
    back: 'benchstock-dashboard.png',
  },
  {
    route: '/maker-books',
    file: 'og-makerbooks.png',
    eyebrowA: 'MAKERBOOKS',
    eyebrowB: 'BOOKKEEPING',
    headline: 'Ready before<br/>tax season<span class="accent">.</span>',
    headlineSize: 94,
    headlineWidth: 640,
    subhead: 'Income, expenses, and a Schedule C view that stays current.',
    front: 'makerbooks-dashboard.png',
    back: 'makerbooks-schedulec.png',
  },
]

const template = await readFile(path.join(here, 'og-template.html'), 'utf8')

const browser = await launch()
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2, // 2400×1260 actual — crisp; platforms downscale to 1200×630
})

for (const card of CARDS) {
  const html = template
    .replaceAll('{{EYEBROW_A}}', card.eyebrowA)
    .replaceAll('{{EYEBROW_B}}', card.eyebrowB)
    .replaceAll('{{HEADLINE}}', card.headline)
    .replaceAll('{{HEADLINE_SIZE}}', String(card.headlineSize))
    .replaceAll('{{HEADLINE_WIDTH}}', String(card.headlineWidth))
    .replaceAll('{{SUBHEAD}}', card.subhead)
    .replaceAll('{{SHOT_FRONT}}', shot(card.front))
    .replaceAll('{{SHOT_BACK}}', shot(card.back))

  // Written next to the template so the file:// screenshot paths and the
  // webfont requests resolve exactly as they do for the real template.
  const tmp = path.join(here, `.og-render-${card.file}.html`)
  await writeFile(tmp, html)

  const page = await ctx.newPage()
  await page.goto(`file://${tmp}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800) // let webfonts settle before the shot

  // These cards are typeset blind, so check the two things that go wrong and
  // are easy to miss at a glance: a headline line that wrapped (adding a line
  // the layout didn't budget for, pushing text into the subhead), and any text
  // straying under the phone mockups. Both produced shippable-looking but
  // broken cards during the first pass.
  const expectedLines = (card.headline.match(/<br\s*\/?>/g) || []).length + 1
  const audit = await page.evaluate((expected) => {
    // A Range over the contents yields one rect per line box (per inline run),
    // which is what we need — getClientRects() on the block itself is a single
    // border box and tells us nothing about wrapping or actual text extent.
    const lineRects = (sel) => {
      const r = document.createRange()
      r.selectNodeContents(document.querySelector(sel))
      return [...r.getClientRects()].filter((x) => x.width > 0)
    }
    const measure = (sel) => {
      const rects = lineRects(sel)
      const tops = new Set(rects.map((x) => Math.round(x.top)))
      return {
        lines: tops.size,
        right: Math.round(Math.max(...rects.map((x) => x.right))),
        bottom: Math.round(Math.max(...rects.map((x) => x.bottom))),
        top: Math.round(Math.min(...rects.map((x) => x.top))),
      }
    }
    const head = measure('.headline .l1')
    const sub = measure('.subhead')
    return {
      lines: head.lines,
      expected,
      wrapped: head.lines !== expected,
      headlineRight: head.right,
      subheadRight: sub.right,
      eyebrowRight: Math.round(document.querySelector('.eyebrow').getBoundingClientRect().right),
      // Rotated, so the visual left edge is the bounding box's, not right+width.
      phoneLeft: Math.round(document.querySelector('.phone.back').getBoundingClientRect().left),
      headlineBottom: head.bottom,
      subheadTop: sub.top,
    }
  }, expectedLines)

  const problems = []
  if (audit.wrapped) {
    problems.push(`headline rendered ${audit.lines} lines, expected ${audit.expected} — reduce headlineSize or raise headlineWidth`)
  }
  if (audit.headlineBottom > audit.subheadTop) {
    problems.push(`headline overlaps subhead (bottom ${audit.headlineBottom} > top ${audit.subheadTop})`)
  }
  for (const [what, x] of [['headline', audit.headlineRight], ['subhead', audit.subheadRight], ['eyebrow', audit.eyebrowRight]]) {
    if (x > audit.phoneLeft) {
      problems.push(`${what} runs under the phone (right ${x} > phone left ${audit.phoneLeft})`)
    }
  }
  if (problems.length) {
    console.error(`\n✗ ${card.route}:`)
    for (const p of problems) console.error(`    ${p}`)
    process.exitCode = 1
  }

  const out = path.join(outDir, card.file)
  await page.screenshot({ path: out })
  await page.close()
  await unlink(tmp)

  const flag = problems.length ? '✗' : '✓'
  console.log(`  ${flag} ${card.route.padEnd(14)} → public/${card.file}  (${audit.lines} lines, text ends ${audit.headlineRight}, phone ${audit.phoneLeft})`)
}

await browser.close()
console.log(`\nrendered ${CARDS.length} OG cards\n`)
