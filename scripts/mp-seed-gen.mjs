// Seed generator for MarginPrint marketing screenshots.
// Uses the app's OWN createJob/calcAll so seeded jobs are byte-identical to
// what the real UI would produce. Outputs /tmp/mp-seed.json:
//   { storage: { 'pp-*': <object> }, aiText: "<markdown>" }
import { createJob, markPaid } from '/Users/williambennett/print-calc/src/utils/jobs.js';
import { calcAll } from '/Users/williambennett/print-calc/src/utils/calculations.js';
import { writeFileSync } from 'node:fs';

const NOW = Date.now();
const H = 3600_000;
const M = 60_000;

// ── Printers ───────────────────────────────────────────────────────────
const printers = [
  { id: 'pr_x1c',    name: 'Bambu X1C',  status: 'printing', currentJob: '', completedJobs: 41 },
  { id: 'pr_ender2', name: 'Ender 3 #2', status: 'printing', currentJob: '', completedJobs: 88 },
  { id: 'pr_a1',     name: 'Bambu A1',   status: 'idle',     currentJob: '', completedJobs: 17 },
];

// ── Spools ─────────────────────────────────────────────────────────────
const spools = [
  { id: 'sp_1', brand: 'Bambu', type: 'pla', color: '#e84a5f', totalGrams: 1000, usedGrams: 430, costPerKg: 22 },
  { id: 'sp_2', brand: 'Polymaker', type: 'petg', color: '#2b6cb0', totalGrams: 1000, usedGrams: 910, costPerKg: 26 },
  { id: 'sp_3', brand: 'Sunlu', type: 'pla', color: '#2f855a', totalGrams: 1000, usedGrams: 120, costPerKg: 19 },
];

// ── A reusable form factory ──────────────────────────────────────────────
function form(over = {}) {
  return {
    filamentType: 'pla', filamentGrams: 50, filamentCostPerKg: 22,
    printHours: 2, printMinutes: 0, printerWatts: 120, electricityRate: 0.16,
    batchSize: 1, designMinutes: 0, postProcessMinutes: 15, packagingMinutes: 5,
    hourlyRate: 18, failureRate: 0.10, platform: 'etsy', yourPrice: 15,
    shippingCharged: 0, actualShipping: 5.0, packagingCost: 1.0,
    ...over,
  };
}

// ── The hero calculator scenario (also drives /calc + AI screenshots) ────
// A 4-up batch of hex planters: strong margin AND a healthy effective hourly,
// because batching amortizes the print + labor across four units. That batch
// story is exactly the kind of insight worth showing in the hero shot.
const calcForm = form({
  filamentType: 'petg', filamentGrams: 180, filamentCostPerKg: 26,
  printHours: 5, printMinutes: 0, printerWatts: 120,
  batchSize: 4, postProcessMinutes: 8, packagingMinutes: 5,
  hourlyRate: 18, platform: 'etsy', yourPrice: 44,
  actualShipping: 5.0, packagingCost: 1.25,
});
const calcResults = calcAll(calcForm);

// ── Jobs (across states for a believable active queue) ───────────────────
const defs = [
  { name: 'Articulated Dragon — Rainbow', customerName: 'Maya R.', printerId: 'pr_x1c',
    state: 'printing', f: { filamentGrams: 145, printHours: 9, printMinutes: 30, yourPrice: 38, postProcessMinutes: 20 },
    startedAgo: 6 * H, paid: false },
  { name: 'Hex Planter ×4', customerName: '', printerId: 'pr_ender2',
    state: 'printing', f: { filamentType: 'petg', filamentGrams: 220, printHours: 7, printMinutes: 15, batchSize: 4, yourPrice: 44 },
    startedAgo: 1 * H + 40 * M, paid: false },
  { name: "Nameplate — 'OAKLEY'", customerName: 'Devin K.', printerId: 'pr_a1',
    state: 'queued', f: { filamentGrams: 35, printHours: 1, printMinutes: 50, yourPrice: 24 },
    createdAgo: 2 * H, paid: false },
  { name: 'Skull Dice Tower', customerName: 'Jordan P.', printerId: null,
    state: 'quoted', f: { filamentGrams: 190, printHours: 11, printMinutes: 0, yourPrice: 55, postProcessMinutes: 30 },
    createdAgo: 5 * H, paid: false },
  { name: 'Desk Cable Tray', customerName: 'Lena M.', printerId: 'pr_x1c',
    state: 'post-processing', f: { filamentType: 'petg', filamentGrams: 95, printHours: 4, printMinutes: 20, yourPrice: 28 },
    finishedAgo: 35 * M, paid: true },
  { name: 'Cable Clips — set of 10', customerName: 'Sam T.', printerId: 'pr_ender2',
    state: 'ready', f: { filamentGrams: 60, printHours: 3, printMinutes: 0, batchSize: 10, yourPrice: 12 },
    finishedAgo: 2 * H, paid: true },
];

const jobs = defs.map(d => {
  let j = createJob({
    name: d.name, customerName: d.customerName, printerId: d.printerId,
    state: d.state, formSnapshot: form(d.f), quotedPrice: d.f.yourPrice,
  });
  // Backdate timestamps so relative labels read naturally in the screenshot.
  if (d.startedAgo)  { j.startedAt  = NOW - d.startedAgo;  j.createdAt = j.startedAt - 30 * M; }
  if (d.finishedAgo) { j.finishedAt = NOW - d.finishedAgo; j.startedAt = j.finishedAt - 3 * H; j.createdAt = j.startedAt - 30 * M; }
  if (d.createdAgo)  { j.createdAt  = NOW - d.createdAgo; }
  j.updatedAt = NOW - 5 * M;
  if (d.paid) j = markPaid(j, true);
  return j;
});

// ── AI advice text referencing the REAL computed numbers ─────────────────
const r = calcResults;
const batchProfit = r.profitPerBatch ?? (r.profit * calcForm.batchSize);
const aiText = `## Quick verdict
Healthy. At **$${calcForm.yourPrice}** these planters clear a **${r.margin.toFixed(0)}% margin** and **$${r.earningsPerHour.toFixed(2)}/hr** — your batch-of-4 is doing the heavy lifting.

## Biggest issue
No major pricing problem — the one leak is shipping. You're absorbing **$${calcForm.actualShipping.toFixed(2)}** per order while charging the buyer **$0**, which quietly trims **$${calcForm.actualShipping.toFixed(2)}** straight off profit on every sale.

## Action plan
- **Add $5 shipping** — recovers the **$${calcForm.actualShipping.toFixed(2)}** you absorb today; pure margin, ~$${(calcForm.actualShipping).toFixed(0)}/order.
- **Test $48** — still mid-pack for a 4-set; lifts batch profit past **$${(batchProfit + 16).toFixed(0)}**.
- **List singles at $14** — a 1-up option captures buyers who don't want four.`;

const storage = {
  'pp-onboarded': true,
  'pp-theme': 'dark',
  'pp-dev-license': 'paid',   // dev-only render overlay → unlocks paid UI, no network
  'pp-prefs': { hourlyRate: 18, electricityRate: 0.16 },
  'pp-printers': printers,
  'pp-spools': spools,
  'pp-jobs': jobs,
  'pp-archived-jobs': [],
  'pp-calc-form': calcForm,
  'pp-api-key': 'sk-ant-demo-screenshot-key',
  'pp-ai-model': 'claude-sonnet-4-6',
  // Valid, recently-validated license so isPaid() is true and the mount-time
  // revalidation is skipped (lastValidatedAt is inside the window → no network).
  'pp-license': {
    key: 'DEMO-XXXX-XXXX-XXXX', instanceId: 'demo-instance', instanceName: 'MarginPrint demo',
    storeId: 'DEMO', productId: 'DEMO', variantId: 'DEMO', variantName: 'Annual',
    customerEmail: 'demo@marginprint.local', status: 'active', isValid: true,
    activatedAt: NOW - 30 * 24 * H, lastValidatedAt: NOW - 6 * H, lastError: null,
  },
};

writeFileSync('/tmp/mp-seed.json', JSON.stringify({ storage, aiText }, null, 2));
console.log('Seeded', jobs.length, 'jobs.  Calc results:',
  `margin=${r.margin.toFixed(1)}%  $/hr=${r.earningsPerHour.toFixed(2)}  fees=$${r.fees.total.toFixed(2)}  total=$${r.totalCost.toFixed(2)}`);
