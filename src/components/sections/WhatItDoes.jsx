import MiniQueueDemo from '../demos/MiniQueueDemo.jsx'

export default function WhatItDoes() {
  return (
    <section
      id="what"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      {/* Header */}
      <div className="relative mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§01 &nbsp;—&nbsp; What it does</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          The queue is the screen{' '}
          <span className="italic font-medium text-ink/55">you open all day.</span>
        </h2>
      </div>

      {/* Main grid — copy left, mini queue right */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Copy column */}
        <div className="max-w-xl">
          <p className="text-[18px] leading-relaxed text-ink/80">
            MarginPrint runs the queue, the costs, and the customer list from
            one screen. Mobile-first. Built solo, by a maker who needed it.
            <span className="font-medium text-ink"> It opens 5–15 times a day.</span>{' '}
            That is the bar.
          </p>

          <p className="mt-7 text-[15px] leading-relaxed text-ink/65">
            Most "3D print cost" apps get opened once per print and forgotten.
            That's because they answer one question — "what does this cost?" —
            and stop. MarginPrint answers the others too:
          </p>

          <ul className="mt-6 space-y-3 border-l-2 border-copper/40 pl-5">
            {[
              "What's printing right now?",
              'Which jobs are queued, and on which printer?',
              "Who owes me money, and how much?",
              "What did I actually clear last week?",
            ].map((q) => (
              <li
                key={q}
                className="font-mono text-[13px] leading-relaxed text-ink/70"
              >
                — {q}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[15px] leading-relaxed text-ink/65">
            One screen, on your phone, next to the printer. Not a desktop
            dashboard. Not a calculator that closes when you tap save.
          </p>
        </div>

        {/* Mini queue demo */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full lg:max-w-[480px]">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
                Live preview · static snapshot
              </span>
            </div>
            <div className="border border-ink/10 bg-bone p-5 shadow-[0_2px_0_rgba(26,26,26,0.04)]">
              <MiniQueueDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    />
  )
}
