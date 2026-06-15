// "Meet MarketDay" — inverted (charcoal) band that opens the MarketDay
// deep-dive, deliberately mirroring MarginPrintIntro so the two apps read at
// equal weight. The device trio shows the three real app screenshots
// (captured to /public/screenshots/) tracing the core loop: pack the night
// before → ring up sales offline → close to a profit summary.
const SLOTS = [
  { src: '/screenshots/marketday-pack.png',    label: 'Pack list',    note: 'Built the night before' },
  { src: '/screenshots/marketday-sell.png',    label: 'Quick sale',   note: 'One tap — cash or card' },
  { src: '/screenshots/marketday-summary.png', label: 'Show summary', note: 'What the day earned' },
]

export default function MarketDayIntro() {
  return (
    <section
      id="marketday"
      className="relative overflow-hidden border-t border-ink/10 bg-charcoal px-8 py-28 text-bone lg:py-32"
    >
      {/* warm copper glow behind the devices */}
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
          <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper-light">
            <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
            <span>The booth companion &nbsp;—&nbsp; app 02</span>
          </div>
          <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tightest">
            Meet <span className="text-bone">MarketDay</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-bone/70">
            The offline-first booth companion for market vendors. Pack smarter,
            sell faster, and know exactly what every show earned you — all on
            your phone, all on your device.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-1.5 border border-copper/40 bg-copper/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-copper-light">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper-light" />
              Free tier ready &nbsp;·&nbsp; paid coming soon
            </span>
            <a
              href="#contact"
              className="font-mono text-[12px] uppercase tracking-wider text-bone/80 underline-offset-4 hover:text-bone hover:underline"
            >
              Join the beta →
            </a>
          </div>
        </div>

        {/* Device trio — real screenshots */}
        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 lg:gap-10">
          {SLOTS.map((s, i) => (
            <figure
              key={s.src}
              className={`flex flex-col items-center ${i === 1 ? 'lg:-translate-y-5' : ''}`}
            >
              <div className="rounded-[28px] border border-bone/15 bg-[#0d0d10] p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
                <img
                  src={s.src}
                  alt={`MarketDay — ${s.label}`}
                  loading="lazy"
                  className="block w-[180px] rounded-[22px] sm:w-[210px]"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <div className="font-mono text-[11px] uppercase tracking-wider text-bone">
                  {s.label}
                </div>
                <div className="mt-1 text-[12px] text-bone/50">{s.note}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* lead-in to the deep dive */}
        <div className="mt-16 text-center font-mono text-[10px] uppercase tracking-wider text-bone/40">
          — The full tour below
        </div>
      </div>
    </section>
  )
}
