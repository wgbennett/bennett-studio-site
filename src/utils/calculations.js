// Canonical shape of the Calculator form / Job formSnapshot. Lives here in
// utils (not in Calculator.jsx) so consumers — JobForm, App's initial state,
// the storage seed — can import it without pulling in the Calculator UI
// module. That's what makes lazy-loading the Calculator (Polish #5) possible.
export const DEFAULT_FORM = {
  filamentType:       'pla',
  filamentGrams:      50,
  filamentCostPerKg:  20,
  printHours:         2,
  printMinutes:       0,
  printerWatts:       150,
  electricityRate:    0.16,
  batchSize:          1,
  designMinutes:      0,
  postProcessMinutes: 15,
  packagingMinutes:   5,
  hourlyRate:         15,
  failureRate:        0.10,
  platform:           'etsy',
  yourPrice:          15,
  shippingCharged:    0,
  actualShipping:     4.50,
  packagingCost:      0.75,
};

export const PLATFORM_DEFAULTS = {
  etsy:     { label: 'Etsy',        listing: 0.20, txPct: 0.065, payPct: 0.03, payFlat: 0.25 },
  shopify:  { label: 'Shopify',     listing: 0,    txPct: 0,     payPct: 0.029, payFlat: 0.30 },
  ebay:     { label: 'eBay',        listing: 0,    txPct: 0.1325,payPct: 0,     payFlat: 0 },
  direct:   { label: 'Direct/Cash', listing: 0,    txPct: 0,     payPct: 0,     payFlat: 0 },
};

export const FILAMENT_DEFAULTS = {
  pla:   { label: 'PLA',       costPerKg: 20, watts: 150 },
  petg:  { label: 'PETG',      costPerKg: 25, watts: 180 },
  abs:   { label: 'ABS',       costPerKg: 22, watts: 200 },
  tpu:   { label: 'TPU',       costPerKg: 28, watts: 150 },
  resin: { label: 'Resin',     costPerKg: 35, watts: 50  },
  asa:   { label: 'ASA',       costPerKg: 26, watts: 200 },
};

export function calcFilamentCost(grams, costPerKg) {
  return (grams / 1000) * costPerKg;
}

export function calcElectricityCost(printHours, printerWatts, kwhRate) {
  return (printHours * printerWatts / 1000) * kwhRate;
}

export function calcLaborCost(totalMinutes, hourlyRate) {
  return (totalMinutes / 60) * hourlyRate;
}

export function calcPlatformFees(platform, price, shippingCharged) {
  const p = PLATFORM_DEFAULTS[platform] ?? PLATFORM_DEFAULTS.etsy;
  const base = price + shippingCharged;
  const listing = p.listing;
  const transaction = base * p.txPct;
  const payment = base * p.payPct + p.payFlat;
  const total = listing + transaction + payment;
  return { listing, transaction, payment, total };
}

export function calcAll(form) {
  // Batch size: how many units come out of one print job
  const batchSize = Math.max(1, Math.floor(Number(form.batchSize) || 1));

  // ── Per-batch costs (one-time per print job) ─────────────────────────
  // Filament and print time are entered as totals for the batch when batchSize > 1.
  const filamentTotal    = calcFilamentCost(form.filamentGrams, form.filamentCostPerKg);
  const printTimeHours   = Number(form.printHours) + Number(form.printMinutes) / 60;
  const electricityTotal = calcElectricityCost(printTimeHours, form.printerWatts, form.electricityRate);

  // Failure rate scales per batch event (whole plate fails → all units lost)
  const failureRate  = Math.max(0, Math.min(0.5, Number(form.failureRate) || 0));
  const successRate  = 1 - failureRate;
  const failureRatio = successRate > 0 ? failureRate / successRate : 0;
  const failureTotal = (filamentTotal + electricityTotal) * failureRatio;

  // Design labor is one-time per product
  const designMin   = Number(form.designMinutes) || 0;
  const designLabor = (designMin / 60) * Number(form.hourlyRate);

  // ── Per-unit costs ───────────────────────────────────────────────────
  // Post-process + packaging time are entered per-unit
  const postMin = Number(form.postProcessMinutes) || 0;
  const packMin = Number(form.packagingMinutes)   || 0;
  const postPackLabor = ((postMin + packMin) / 60) * Number(form.hourlyRate);

  // Allocate batch costs to per-unit shares
  const filamentCost    = filamentTotal    / batchSize;
  const electricityCost = electricityTotal / batchSize;
  const failureCost     = failureTotal     / batchSize;
  const amortizedDesign = designLabor      / batchSize;
  const laborCost       = amortizedDesign + postPackLabor;

  // ── Per-sale costs (one per sale, regardless of batch) ───────────────
  const packagingCost   = Number(form.packagingCost);
  const actualShipping  = Number(form.actualShipping);
  const shippingCharged = Number(form.shippingCharged);
  const shippingNet     = actualShipping - shippingCharged;

  const fees = calcPlatformFees(form.platform, form.yourPrice, form.shippingCharged);

  // ── Per-unit totals ──────────────────────────────────────────────────
  const totalCost = filamentCost + electricityCost + laborCost + fees.total
                  + packagingCost + Math.max(0, shippingNet) + failureCost;
  const revenue   = Number(form.yourPrice);
  const profit    = revenue - totalCost;
  const margin    = revenue > 0 ? (profit / revenue) * 100 : 0;

  // ── Time per unit (for $/hr calc) ────────────────────────────────────
  // Print time per unit = batchPrintTime / batchSize, scaled up for failures
  const realPrintTimePerUnit = (printTimeHours / batchSize) / (successRate > 0 ? successRate : 1);
  const designTimePerUnit    = (designMin / 60) / batchSize;
  const postPackTimePerUnit  = (postMin + packMin) / 60;
  const totalTimeHours       = realPrintTimePerUnit + designTimePerUnit + postPackTimePerUnit;
  const earningsPerHour      = totalTimeHours > 0 ? profit / totalTimeHours : 0;

  // ── Break-even (per unit) ────────────────────────────────────────────
  const p        = PLATFORM_DEFAULTS[form.platform] ?? PLATFORM_DEFAULTS.etsy;
  const feeRate  = p.txPct + p.payPct;
  const feeFlat  = p.listing + p.payFlat;
  const costWithoutFees = filamentCost + electricityCost + laborCost + failureCost + packagingCost + actualShipping;
  const breakeven = feeRate < 1 ? (costWithoutFees + feeFlat) / (1 - feeRate) : costWithoutFees * 2;

  // ── Batch totals (for display) ───────────────────────────────────────
  const profitPerBatch  = profit  * batchSize;
  const revenuePerBatch = revenue * batchSize;
  const costPerBatch    = totalCost * batchSize;

  return {
    batchSize,
    filamentCost,
    electricityCost,
    laborCost,
    fees,
    packagingCost,
    actualShipping,
    shippingCharged,
    shippingNet,
    failureRate,
    failureCost,
    totalCost,
    revenue,
    profit,
    margin,
    earningsPerHour,
    breakeven,
    totalTimeHours,
    // Batch-level
    profitPerBatch,
    revenuePerBatch,
    costPerBatch,
    // Raw batch costs (for breakdown / debug)
    filamentTotal,
    electricityTotal,
    failureTotal,
    designLabor,
  };
}

// Solve for the listing price that achieves a target margin given current costs.
// Math: margin = (price − nonFeeCost − fees(price)) / price
//   where fees(price) = (price + shippingCharged) × feeRate + flatFees
// → price = (nonFeeCost + shippingCharged × feeRate + flatFees) / (1 − feeRate − margin)
// Returns null if the target is unachievable (e.g. fees + margin ≥ 100%).
export function priceForMargin(form, targetMargin) {
  const batchSize = Math.max(1, Math.floor(Number(form.batchSize) || 1));

  // Per-batch costs, then divided across the batch
  const filamentTotal    = (form.filamentGrams / 1000) * form.filamentCostPerKg;
  const printTimeHours   = Number(form.printHours) + Number(form.printMinutes) / 60;
  const electricityTotal = (printTimeHours * form.printerWatts / 1000) * form.electricityRate;
  const failureRate      = Math.max(0, Math.min(0.5, Number(form.failureRate) || 0));
  const successRate      = 1 - failureRate;
  const failureRatio     = successRate > 0 ? failureRate / successRate : 0;
  const failureTotal     = (filamentTotal + electricityTotal) * failureRatio;
  const designLabor      = ((Number(form.designMinutes) || 0) / 60) * form.hourlyRate;

  const filamentCost     = filamentTotal    / batchSize;
  const electricityCost  = electricityTotal / batchSize;
  const failureCost      = failureTotal     / batchSize;
  const amortizedDesign  = designLabor      / batchSize;

  const postPackLabor    = ((Number(form.postProcessMinutes) || 0) + (Number(form.packagingMinutes) || 0)) / 60 * form.hourlyRate;
  const laborCost        = amortizedDesign + postPackLabor;
  const packagingCost    = Number(form.packagingCost);
  const shippingNet      = Math.max(0, Number(form.actualShipping) - Number(form.shippingCharged));

  const nonFeeCost = filamentCost + electricityCost + laborCost + failureCost + packagingCost + shippingNet;

  const p        = PLATFORM_DEFAULTS[form.platform] ?? PLATFORM_DEFAULTS.etsy;
  const feeRate  = p.txPct + p.payPct;
  const flatFees = p.listing + p.payFlat;
  const shipping = Number(form.shippingCharged);

  const denom = 1 - feeRate - targetMargin;
  if (denom <= 0) return null;

  const price = (nonFeeCost + shipping * feeRate + flatFees) / denom;
  return price > 0 ? price : null;
}

export function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n ?? 0);
}

export function pct(n) {
  return `${Math.round(n ?? 0)}%`;
}

export function fmtElapsed(ms) {
  const totalSec = Math.max(0, Math.floor((ms ?? 0) / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
