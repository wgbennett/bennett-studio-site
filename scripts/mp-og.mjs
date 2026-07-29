import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPlaywright } from './playwright-env.mjs';

const { launch } = await loadPlaywright();
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const OUT = path.join(siteRoot, 'public/og.png');
const browser = await launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,            // 2400×1260 actual — crisp; platforms downscale to 1200×630
});
const page = await ctx.newPage();
await page.goto('file:///tmp/og-template.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);    // let webfonts settle
await page.screenshot({ path: OUT });
await browser.close();
console.log('✓ og.png →', OUT);
