import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Mirrors the real PRIMARY_ACTIONS chain in
// print-calc/src/components/Queue/JobCard.jsx — when the user taps the
// primary button on a quoted job, it advances to queued; queued → printing,
// etc. The demo just plays this chain on a timer so visitors see the loop
// without interacting.
const STATE_CYCLE = ['quoted', 'queued', 'printing', 'post-processing', 'ready']

// State display metadata. Color discipline: only "printing" uses the brand
// copper accent (the live, value-generating state). Other states stay in the
// ink scale to keep the page from looking like a status-pill rainbow.
const STATE_META = {
  quoted: {
    label: 'Quoted',
    stripe: 'bg-ink/20',
    pillText: 'text-ink/55',
    action: 'Accept',
  },
  queued: {
    label: 'Queued',
    stripe: 'bg-ink/45',
    pillText: 'text-ink/70',
    action: 'Start print',
  },
  printing: {
    label: 'Printing',
    stripe: 'bg-copper',
    pillText: 'text-copper',
    action: 'Mark done',
  },
  'post-processing': {
    label: 'Post',
    stripe: 'bg-ink/65',
    pillText: 'text-ink/80',
    action: 'Mark ready',
  },
  ready: {
    label: 'Ready',
    stripe: 'bg-ink',
    pillText: 'text-ink',
    action: 'Deliver',
  },
}

// Per-state row text. Matches what the real timeLabel + lifecycleStamp helpers
// in JobCard.jsx render — but with frozen demo values so the page never lies
// about elapsed time.
const STATE_DETAIL = {
  quoted: {
    time: '~3h 20m',
    stamp: 'Added 2m ago',
  },
  queued: {
    time: '~3h 20m',
    stamp: 'Accepted · just now',
  },
  printing: {
    time: '~2h 47m left',
    stamp: 'Started 33m ago',
  },
  'post-processing': {
    time: '15m post-work',
    stamp: 'Finished · just now',
  },
  ready: {
    time: 'Ready to ship',
    stamp: 'Ready 2m ago',
  },
}

const DEFAULT_JOB = {
  name: 'Saturn keychains × 24',
  customer: 'Marie K.',
  printer: 'Bambu A1',
  price: 32.0,
  paid: false,
  jobId: '#A-1142',
}

export default function JobCardDemo({
  state: forcedState,
  cycleMs,
  job = DEFAULT_JOB,
  startAt = 'quoted',
}) {
  // If a fixed state is passed, render that state forever. If cycleMs is
  // passed, advance through STATE_CYCLE on a timer. Default = static at
  // startAt (typically used for static composition).
  const [stateIndex, setStateIndex] = useState(
    Math.max(0, STATE_CYCLE.indexOf(startAt)),
  )

  useEffect(() => {
    if (!cycleMs || forcedState) return
    const id = setInterval(() => {
      setStateIndex((i) => (i + 1) % STATE_CYCLE.length)
    }, cycleMs)
    return () => clearInterval(id)
  }, [cycleMs, forcedState])

  const state = forcedState ?? STATE_CYCLE[stateIndex]
  const meta = STATE_META[state]
  const detail = STATE_DETAIL[state]

  return (
    <div className="relative w-full max-w-[440px] font-sans">
      {/* Left edge accent stripe — mirrors the .job-card state-* stripe in the
          real app's CSS. Smoothly cross-fades color on state change. */}
      <motion.div
        className={`absolute left-0 top-0 bottom-0 w-1 ${meta.stripe}`}
        layout
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      <motion.div
        // Pulse on state change — mirrors the .pulse-action class flash in the
        // real JobCard when the primary action fires.
        key={`pulse-${state}`}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.012, 1] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-bone border border-ink/10 pl-5 pr-4 py-4 shadow-[0_1px_0_rgba(26,26,26,0.04)]"
      >
        {/* Top row — thumb / info / price */}
        <div className="flex items-start gap-3.5">
          {/* Thumb placeholder. Real app shows a product photo if attached. */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink/[0.04] border border-ink/5 text-lg">
            🖨️
          </div>

          {/* Info column */}
          <div className="min-w-0 flex-1">
            <div className="font-semibold leading-snug text-ink line-clamp-2">
              {job.name}
            </div>

            {/* Natural inline text flow — wraps as a paragraph instead of as
                a flex column of one-word rows when space is tight. */}
            <div className="mt-1 font-mono text-[11px] leading-relaxed text-ink/55">
              <span>{job.customer}</span>
              <span className="mx-1.5 text-ink/20">·</span>
              <span>{job.printer}</span>
              <span className="mx-1.5 text-ink/20">·</span>
              <span className="text-ink/75">{detail.time}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`stamp-${state}`}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.2 }}
                className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/35"
              >
                {detail.stamp}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Price + paid badge */}
          <div className="shrink-0 text-right">
            <div className="font-mono text-[14px] font-semibold text-ink tabular-nums">
              ${job.price.toFixed(2)}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-ink/30">
              {job.paid ? '✓ paid' : 'unpaid'}
            </div>
          </div>
        </div>

        {/* Bottom row — action button + state pill. flex-wrap allows the
            jobId/kebab cluster to drop to a second line on narrow screens
            instead of crushing the button text. */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-ink/[0.06] pt-3">
          <AnimatePresence mode="wait">
            <motion.button
              key={`action-${state}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-bone hover:bg-copper transition-colors"
            >
              {meta.action}
              <span aria-hidden>→</span>
            </motion.button>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={`pill-${state}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-wider ${meta.pillText}`}
            >
              · {meta.label}
            </motion.span>
          </AnimatePresence>

          <span className="ml-auto whitespace-nowrap font-mono text-[11px] text-ink/40 leading-none select-none">
            {job.jobId}
          </span>
          <span className="font-mono text-[14px] text-ink/35 leading-none select-none px-1">
            ⋯
          </span>
        </div>
      </motion.div>
    </div>
  )
}
