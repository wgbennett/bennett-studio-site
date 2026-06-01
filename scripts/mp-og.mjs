import pw from '/Users/williambennett/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';
const { chromium } = pw;

const OUT = '/Users/williambennett/print-calc/bennett-studio-site/site/public/og.png';
const browser = await chromium.launch();
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
