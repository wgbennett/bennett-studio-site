import JobCardDemo from './JobCardDemo.jsx'

// A static "today's queue" composition — three jobs in different states.
// Used in the "What it does" section as the visual centerpiece. Cards are
// fixed-state (no cycling) so the section reads as a snapshot rather than
// a slideshow.
const QUEUE = [
  {
    state: 'printing',
    job: {
      name: 'Saturn keychains × 24',
      customer: 'Marie K.',
      printer: 'Bambu A1',
      price: 32.0,
      paid: false,
      jobId: '#A-1142',
    },
  },
  {
    state: 'queued',
    job: {
      name: 'Custom name plate',
      customer: 'James R.',
      printer: 'Bambu P1S',
      price: 18.5,
      paid: false,
      jobId: '#A-1143',
    },
  },
  {
    state: 'ready',
    job: {
      name: 'Wedding favor batch',
      customer: 'Lila O.',
      printer: 'Prusa MK4',
      price: 84.0,
      paid: true,
      jobId: '#A-1141',
    },
  },
]

export default function MiniQueueDemo() {
  return (
    <div className="w-full max-w-[480px] font-sans">
      <QueueHeader />
      <div className="mt-4 space-y-3">
        {QUEUE.map((item, i) => (
          <JobCardDemo key={i} state={item.state} job={item.job} />
        ))}
      </div>
      <QueueFooter />
    </div>
  )
}

function QueueHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-ink/10 pb-3">
      <div className="flex items-baseline gap-2.5">
        <div className="font-semibold text-ink text-lg leading-none">Queue</div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/45">
          · today
        </span>
      </div>
      {/* Inline text flow with whitespace-nowrap on the whole block — the
          counts stay together as a single unit, drop to a new line as one
          group when the header doesn't fit. */}
      <div className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider">
        <span className="text-copper">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-copper align-baseline" />
          1 printing
        </span>
        <span className="mx-1.5 text-ink/45">·</span>
        <span className="text-ink/55">1 queued</span>
        <span className="mx-1.5 text-ink/45">·</span>
        <span className="text-ink/55">1 ready</span>
      </div>
    </div>
  )
}

function QueueFooter() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-ink/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-ink/45">
      <span>3 active · $134.50 owed</span>
      <span>filter ▾</span>
    </div>
  )
}
