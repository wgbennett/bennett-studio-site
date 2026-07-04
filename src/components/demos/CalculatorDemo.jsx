import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { calcAll } from '../../utils/calculations.js'

// Frozen demo form. Numbers feed the *real* calcAll() from the app — so
// every value shown on the marketing page reflects what the live MarginPrint
// calculator would output for this job, not a hardcoded marketing fiction.
// Chosen to match the slicer-drop sample (11g PLA, 32min, .3mf import).
const DEMO_FORM = {
  filamentType:       'pla',
  filamentGrams:      11,
  filamentCostPerKg:  20,
  printHours:         0,
  printMinutes:       32,
  printerWatts:       150,
  electricityRate:    0.16,
  batchSize:          1,
  designMinutes:      0,
  postProcessMinutes: 3,
  packagingMinutes:   2,
  hourlyRate:         15,
  failureRate:        0.10,
  platform:           'etsy',
  yourPrice:          15,
  shippingCharged:    0,
  actualShipping:     0,
  packagingCost:      0.75,
}

// Slicer-file metadata that doesn't come from calcAll — these are what the
// parser surfaces on import (filename, plate prediction, layer count).
const SOURCE = {
  filename: 'saturn_keychain.gcode.3mf',
  printTime: '32m',
  filamentGrams: 11,
  layers: 156,
}

// Order matters: this is how the rows render. Each entry maps to a real
// field on the calcAll result. `highlight` flags the failure-buffer row in
// copper — the cost most calculators miss and the one this app surfaces.
const COST_LINE_DEFS = [
  { label: 'Filament',       field: 'filamentCost' },
  { label: 'Electricity',    field: 'electricityCost' },
  { label: 'Failure buffer', field: 'failureCost', highlight: true },
  { label: 'Labor',          field: 'laborCost' },
  { label: 'Platform fees',  field: 'feesTotal' },
  { label: 'Packaging',      field: 'packagingCost' },
]

export default function CalculatorDemo() {
  // Compute once. The form is frozen so the result is constant across renders.
  const result = useMemo(() => {
    const r = calcAll(DEMO_FORM)
    return {
      revenue:   r.revenue,
      totalCost: r.totalCost,
      profit:    r.profit,
      margin:    r.margin,
      lines: COST_LINE_DEFS.map((def) => {
        const value = def.field === 'feesTotal' ? r.fees.total : r[def.field]
        return {
          label: def.label,
          value,
          percent: r.totalCost > 0 ? (value / r.totalCost) * 100 : 0,
          highlight: !!def.highlight,
        }
      }),
    }
  }, [])

  // Hold off on the count-up animation until the panel scrolls into view —
  // otherwise it fires invisibly while the page loads. Re-fires on re-entry.
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  // Respect prefers-reduced-motion: skip count-ups / growing bars and show the
  // resolved end state immediately.
  const reduce = useReducedMotion()

  return (
    <div
      ref={ref}
      className="w-full max-w-[480px] font-sans border border-ink/10 bg-bone shadow-[0_2px_0_rgba(26,26,26,0.04)]"
    >
      {/* Slicer file source — appears as if it just got dropped */}
      <div className="flex items-center gap-2 border-b border-ink/10 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink/55">
        <span className="h-1.5 w-1.5 rounded-full bg-copper" />
        <span>imported</span>
        <span className="text-ink/25">·</span>
        <span className="truncate text-ink/75">{SOURCE.filename}</span>
        <span className="ml-auto text-ink/45">
          {SOURCE.printTime} · {SOURCE.filamentGrams}g · {SOURCE.layers} layers
        </span>
      </div>

      {/* Hero result — profit + margin */}
      <div className="px-5 py-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/45">
              Profit per unit
            </div>
            <div className="mt-1 font-mono text-[44px] font-semibold leading-none tracking-tight text-ink tabular-nums">
              $<AnimatedNumber target={result.profit} active={inView} decimals={2} reduce={reduce} />
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/45">
              Margin
            </div>
            <div className="mt-1 inline-flex items-baseline gap-0.5 bg-copper px-2.5 py-1 font-mono text-[18px] font-semibold leading-none tracking-tight text-bone tabular-nums">
              <AnimatedNumber target={result.margin} active={inView} decimals={0} reduce={reduce} />
              <span>%</span>
            </div>
          </div>
        </div>

        {/* Margin track */}
        <div className="mt-5 h-1 w-full bg-ink/10 overflow-hidden">
          <motion.div
            className="h-full bg-copper origin-left"
            initial={{ scaleX: reduce ? result.margin / 100 : 0 }}
            animate={{ scaleX: reduce || inView ? result.margin / 100 : 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            style={{ width: '100%' }}
          />
        </div>

        <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-wider text-ink/45">
          <span>
            Revenue&nbsp;
            <span className="text-ink/70">${result.revenue.toFixed(2)}</span>
          </span>
          <span>
            Total cost&nbsp;
            <span className="text-ink/70">${result.totalCost.toFixed(2)}</span>
          </span>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="border-t border-ink/10 px-5 py-5">
        <div className="mb-3.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span className="text-ink/45">Cost breakdown</span>
          <span className="text-ink/35">per unit · live calcAll()</span>
        </div>

        <ul className="space-y-2.5">
          {result.lines.map((cost, i) => (
            <CostRow key={cost.label} cost={cost} index={i} active={inView} reduce={reduce} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function CostRow({ cost, index, active, reduce }) {
  const delay = 0.25 + index * 0.06
  return (
    <li className="grid grid-cols-[110px_1fr_56px] items-center gap-3 font-mono text-[11px]">
      <span className={cost.highlight ? 'text-copper' : 'text-ink/65'}>
        {cost.label}
      </span>
      <div className="relative h-1.5 w-full bg-ink/[0.06] overflow-hidden">
        <motion.div
          className={`h-full origin-left ${
            cost.highlight ? 'bg-copper/80' : 'bg-ink/55'
          }`}
          initial={{ scaleX: reduce ? cost.percent / 100 : 0 }}
          animate={{ scaleX: reduce || active ? cost.percent / 100 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease: 'easeOut', delay }}
          style={{ width: '100%' }}
        />
      </div>
      <span className="text-right tabular-nums text-ink/85">
        ${cost.value.toFixed(2)}
      </span>
    </li>
  )
}

// Eased count-up from 0 to target. Restarts whenever `active` flips true,
// so scrolling back into view replays the tick — visitors who scroll up to
// re-look see the same animated reveal a second time.
function AnimatedNumber({ target, active, decimals = 2, durationMs = 800, reduce = false }) {
  const [value, setValue] = useState(0)
  const startedAtRef = useRef(0)

  useEffect(() => {
    if (reduce) {
      setValue(target)
      return
    }
    if (!active) {
      setValue(0)
      return
    }
    let raf
    startedAtRef.current = performance.now()
    function tick(now) {
      const elapsed = now - startedAtRef.current
      const t = Math.min(1, elapsed / durationMs)
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, durationMs, reduce])

  return <>{value.toFixed(decimals)}</>
}
