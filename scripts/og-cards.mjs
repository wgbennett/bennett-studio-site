// Renders the five Open Graph cards — one per route — into public/.
//
//   PLAYWRIGHT_PATH=... node scripts/og-cards.mjs
//
// These are what a person sees when a link to this site is pasted into
// iMessage, Slack, LinkedIn or a Discord channel. For most visitors it is the
// FIRST thing they see, before the site itself.
//
// The previous set was captured on 29 July, two days before the redesign, and
// still showed the old identity: Inter for the headline instead of Anton, the
// old six-word hero copy ("The business side of making, handled"), a light
// bone field where the hero is now a dark photograph. Every share advertised a
// site that no longer existed.
//
// Built as HTML rendered in Chromium rather than a hand-written SVG so the card
// uses the site's real fonts and the same graded photographs as the pages —
// and so the headline can be copied from the component instead of re-typed.
// The construction mirrors PhotoBackdrop: image, then a left-heavy ink scrim,
// so the copy sits where it is legible whatever the photo does.
import { loadPlaywright } from './playwright-env.mjs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const pub = resolve(here, '../public');

// Headline text is kept identical to each page's real <h1>. If a headline
// changes on the page and not here, the share card starts lying — which is the
// exact failure this file exists to fix.
const CARDS = [
  { out: 'og.png',             photo: 'photos/hero-workshop.webp',  eyebrow: 'Bennett Studio',
    head: 'The business side,', accent: 'handled.',
    sub: 'Four apps for people who sell what they make. All four free to start.' },
  { out: 'og-marginprint.png', photo: 'photos/app-marginprint.webp', eyebrow: '01 · Production queue',
    head: 'MarginPrint', accent: 'runs the shop.',
    sub: 'The production queue, true costs, and your customers on one screen.' },
  { out: 'og-marketday.png',   photo: 'photos/app-marketday.webp',   eyebrow: '02 · Market sales',
    head: 'MarketDay', accent: 'works the booth.',
    sub: 'Pack smarter, sell faster, and know what every show earned you.' },
  { out: 'og-benchstock.png',  photo: 'photos/app-benchstock.webp',  eyebrow: '03 · Inventory & cost',
    head: 'BenchStock', accent: 'knows the cost.',
    sub: 'What every product actually costs to make, and what to charge.' },
  { out: 'og-makerbooks.png',  photo: 'photos/app-makerbooks.webp',  eyebrow: '04 · Bookkeeping',
    head: 'MakerBooks', accent: 'keeps the books.',
    sub: 'Real profit, tax set-aside, and Schedule-C-ready records all year.' },
];

// Fonts and photos are inlined as data URIs: the page is rendered from
// setContent with no server behind it, so a /fonts/… or /photos/… URL would
// silently 404 and fall back to a system face on a blank field — which looks
// plausible in review and wrong in the shipped card.
const b64 = async (p) => (await readFile(resolve(pub, p))).toString('base64');
const anton = await b64('fonts/anton-latin.woff2');
const serif = await b64('fonts/instrument-serif-italic-latin.woff2');
const inter = await b64('fonts/inter-latin.woff2');
const mono = await b64('fonts/jetbrains-mono-latin.woff2');

const { launch } = await loadPlaywright();
const browser = await launch();

for (const c of CARDS) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const photo = await b64(c.photo);

  await page.setContent(`<!doctype html><meta charset="utf-8"><style>
    @font-face { font-family:'Anton'; src:url(data:font/woff2;base64,${anton}) format('woff2'); font-display:block }
    @font-face { font-family:'IS'; font-style:italic; src:url(data:font/woff2;base64,${serif}) format('woff2'); font-display:block }
    @font-face { font-family:'Inter'; src:url(data:font/woff2;base64,${inter}) format('woff2'); font-display:block }
    @font-face { font-family:'Mono'; src:url(data:font/woff2;base64,${mono}) format('woff2'); font-display:block }
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:1200px;height:630px;position:relative;overflow:hidden;background:#1A1A1A;font-family:Inter,sans-serif}
    img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    /* Same three-layer scrim as PhotoBackdrop, in ink — never black, which
       would pull the warm grade grey. */
    .s1{position:absolute;inset:0;background:linear-gradient(to right,#1A1A1A 0%,rgba(26,26,26,.72) 46%,rgba(26,26,26,.16) 100%)}
    .s2{position:absolute;inset:0 0 auto 0;height:150px;background:linear-gradient(to bottom,rgba(26,26,26,.85),transparent)}
    .s3{position:absolute;inset:auto 0 0 0;height:200px;background:linear-gradient(to top,rgba(26,26,26,.85),transparent)}
    .pad{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
    .eyebrow{font-family:Mono;font-size:15px;letter-spacing:.18em;text-transform:uppercase;color:#DD7C45}
    h1{font-family:Anton;text-transform:uppercase;font-size:82px;line-height:.97;letter-spacing:-.015em;color:#F5F1EA;max-width:820px}
    h1 .a{font-family:IS;font-style:italic;text-transform:none;font-size:1.02em;letter-spacing:-.01em;color:rgba(245,241,234,.72)}
    .sub{margin-top:22px;font-size:24px;line-height:1.45;color:rgba(245,241,234,.78);max-width:620px}
    .foot{font-family:Mono;font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:rgba(245,241,234,.6)}
  </style>
  <img class="bg" src="data:image/webp;base64,${photo}">
  <div class="s1"></div><div class="s2"></div><div class="s3"></div>
  <div class="pad">
    <div class="eyebrow">${c.eyebrow}</div>
    <div>
      <h1>${c.head} <span class="a">${c.accent}</span></h1>
      <p class="sub">${c.sub}</p>
    </div>
    <div class="foot">bennettstudio.dev</div>
  </div>`, { waitUntil: 'load' });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: resolve(pub, c.out) });
  console.log(`  ✓ ${c.out.padEnd(22)} ${c.head} ${c.accent}`);
  await page.close();
}

await browser.close();
console.log('\n[og-cards] done — 1200×630.');
// Rendered at 1x, not 2x. At deviceScaleFactor 2 these came out 2400×1260 and
// 2.5 MB each: a photograph does not compress like the flat cards this
// replaced, and some link scrapers give up on a slow fetch. 1200×630 is the
// size every platform specifies and displays at.
