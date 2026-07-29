import { loadPlaywright } from './playwright-env.mjs';
const { chromium, launch } = await loadPlaywright();
import { readFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const OUT  = new URL('../public/screenshots', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const { storage, aiText } = JSON.parse(readFileSync('/tmp/mp-seed.json', 'utf8'));

// ── Build a valid Anthropic SSE stream from the seed's aiText ────────────
function sseStream(text) {
  const ev = (name, data) => `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`;
  // Chunk the text so the stream looks real (and the cursor renders mid-flight).
  const chunks = text.match(/[\s\S]{1,40}/g) || [text];
  let body = '';
  body += ev('message_start', { type: 'message_start', message: {
    id: 'msg_demo', type: 'message', role: 'assistant', model: 'claude-sonnet-4-6',
    content: [], stop_reason: null, stop_sequence: null,
    usage: { input_tokens: 320, output_tokens: 1 } } });
  body += ev('content_block_start', { type: 'content_block_start', index: 0,
    content_block: { type: 'text', text: '' } });
  for (const c of chunks) {
    body += ev('content_block_delta', { type: 'content_block_delta', index: 0,
      delta: { type: 'text_delta', text: c } });
  }
  body += ev('content_block_stop', { type: 'content_block_stop', index: 0 });
  body += ev('message_delta', { type: 'message_delta',
    delta: { stop_reason: 'end_turn', stop_sequence: null }, usage: { output_tokens: 180 } });
  body += ev('message_stop', { type: 'message_stop' });
  return body;
}

const browser = await launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },   // iPhone 14 logical size
  deviceScaleFactor: 3,                      // crisp @3x for retina/marketing
  isMobile: true,
  hasTouch: true,
  colorScheme: 'dark',
});

// Seed storage before any app script runs (migrates LS → IDB on load).
await context.addInitScript((store) => {
  try {
    const RAW = new Set(['pp-theme', 'pp-dev-license']);  // read as raw strings, not JSON
    for (const [k, v] of Object.entries(store)) {
      localStorage.setItem(k, RAW.has(k) ? v : JSON.stringify(v));
    }
  } catch (e) { /* ignore */ }
}, storage);

// Intercept the Anthropic call → return our representative SSE stream.
await context.route(/api\.anthropic\.com\/.*\/messages/, async (route) => {
  await route.fulfill({
    status: 200,
    headers: { 'content-type': 'text/event-stream; charset=utf-8' },
    body: sseStream(aiText),
  });
});

const page = await context.newPage();

// ── 1. Queue ──────────────────────────────────────────────────────────
await page.goto(`${BASE}/queue`, { waitUntil: 'networkidle' });
await page.waitForSelector('.job-card', { timeout: 15000 });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/queue.png` });
console.log('✓ queue.png');

// ── 2. Calculator ─────────────────────────────────────────────────────
await page.goto(`${BASE}/calc`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: `${OUT}/calculator.png` });
console.log('✓ calculator.png');

// ── 2b. Calculator result (the profit payoff) ─────────────────────────
const hero = page.locator('.results-hero');
await hero.scrollIntoViewIfNeeded();
// Nudge the hero toward the top of the viewport so the breakdown below it shows too.
await page.evaluate(() => {
  const el = document.querySelector('.results-hero');
  if (el) window.scrollBy(0, el.getBoundingClientRect().top - 70);
});
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/calculator-result.png` });
console.log('✓ calculator-result.png');

// ── 3. AI analysis ────────────────────────────────────────────────────
const trigger = page.locator('button.ai-trigger');
await trigger.scrollIntoViewIfNeeded();
await trigger.click();
await page.waitForSelector('.ai-response h4', { timeout: 15000 });   // markdown rendered
await page.waitForTimeout(400);
const aiCard = page.locator('.ai-card');
await aiCard.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await aiCard.screenshot({ path: `${OUT}/ai-analysis.png` });
console.log('✓ ai-analysis.png');

await browser.close();
console.log('Done →', OUT);
