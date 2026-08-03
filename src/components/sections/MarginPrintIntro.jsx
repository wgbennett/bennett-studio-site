// "Meet MarginPrint" — inverted (ink) transitional band that opens the
// flagship deep-dive. Carries id="marginprint" (hero + apps band link here).
// Doubles as the device-frame showcase for the three real app screenshots
// (captured to /public/screenshots/). The §01–§04 sections below are
// MarginPrint's chapters.
const SHOTS = [
  { src: '/screenshots/queue.png',             label: 'The queue',  note: "What's printing, queued, owed" },
  { src: '/screenshots/calculator-result.png', label: 'True cost',  note: 'Profit, margin, full breakdown' },
  { src: '/screenshots/stats.png',             label: 'Your stats', note: 'Revenue, profit, top sellers' },
]

export default function MarginPrintIntro() {
  return (
    <section
      id="marginprint"
      className="relative overflow-hidden border-t border-ink/10 bg-charcoal px-8 py-28 text-bone lg:py-32"
    >
      {/* warm copper glow behind the phones */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,69,31,0.18), rgba(184,69,31,0) 62%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-section text-bone">
            Queue, cost,{' '}
            <span className="accent text-bone/55">stats.</span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-1.5 border border-copper/40 bg-copper/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-copper-light">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper-light" />
              Available now
            </span>
            <a
              href="https://app.bennettstudio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-copper px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              Start free
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="https://app.bennettstudio.dev/?demo"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-bone/25 px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:border-copper-light hover:text-copper-light"
            >
              Try the demo
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>

        {/* Phones — real screenshots */}
        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 lg:gap-10">
          {SHOTS.map((s, i) => (
            <figure
              key={s.src}
              className={`flex flex-col items-center ${i === 1 ? 'lg:-translate-y-5' : ''}`}
            >
              <div className="rounded-[28px] border border-bone/15 bg-[#0d0d10] p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
                <img
                  src={s.src}
                  alt={`MarginPrint — ${s.label}`}
                  loading="lazy"
                  className="block w-[180px] rounded-[22px] sm:w-[210px]"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <div className="eyebrow text-bone">
                  {s.label}
                </div>
                <div className="mt-1 text-[12px] text-bone/60">{s.note}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* lead-in to the deep dive */}
        <div className="mt-16 text-center font-mono text-[10px] uppercase tracking-wider text-bone/60">
          — The full tour below
        </div>
      </div>
    </section>
  )
}
