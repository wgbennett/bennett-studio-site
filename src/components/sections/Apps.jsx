// The honest "apps" band. Studio-level, sits right under the hero.
// ONE real flagship (MarginPrint, in development) + ONE muted "on the bench"
// placeholder that deliberately names nothing — the line between an honest
// portfolio and vaporware. Do not add fake/unbuilt app names here.
export default function Apps() {
  return (
    <section
      id="apps"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      {/* Header */}
      <div className="relative mx-auto mb-16 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>Bennett Studio &nbsp;—&nbsp; what&rsquo;s on the bench</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          One app, built in the open.{' '}
          <span className="italic font-medium text-ink/55">More on the bench.</span>
        </h2>
        <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink/65">
          Bennett Studio is one maker shipping focused software, one app at a
          time. What&rsquo;s real shows up here. What isn&rsquo;t, doesn&rsquo;t.
        </p>
      </div>

      {/* Two cards — flagship + on-the-bench */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Flagship — MarginPrint */}
        <a
          href="#marginprint"
          className="group relative flex flex-col justify-between overflow-hidden border border-ink/15 bg-bone p-8 transition-colors hover:border-copper/60 lg:p-10"
        >
          {/* copper rail on the left edge */}
          <span className="absolute inset-y-0 left-0 w-1 bg-copper" />
          <div>
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
              <span className="text-ink/45">App 01 &nbsp;·&nbsp; Flagship</span>
              <StatusPill tone="live">In development</StatusPill>
            </div>

            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="text-2xl font-bold tracking-tight text-ink">
                MarginPrint
              </span>
            </div>

            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/75">
              Mission control for small 3D-print sellers — the production queue,
              live costs, and the customer list on one mobile screen. The app
              you open 5&ndash;15 times a day, not once per print.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink/55">
              <li>— Production queue</li>
              <li>— Slicer file import</li>
              <li>— True cost &amp; pricing</li>
              <li>— AI analysis</li>
            </ul>
          </div>

          <div className="mt-9 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors group-hover:text-copper">
            Meet MarginPrint
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
          </div>
        </a>

        {/* On the bench — deliberately unnamed */}
        <div className="relative flex flex-col justify-between border border-dashed border-ink/20 bg-bone/40 p-8 lg:p-10">
          <div>
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
              <span className="text-ink/35">App 02 &nbsp;·&nbsp; On the bench</span>
              <StatusPill tone="muted">Early concept</StatusPill>
            </div>

            <div className="flex items-center gap-2.5 opacity-40">
              <Mark />
              <span className="text-2xl font-bold tracking-tight text-ink">
                Not named yet
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/55">
              More focused tools for people who sell what they make are in the
              works. They&rsquo;ll appear here when they&rsquo;re real software
              with a working app &mdash; not a render and a promise. Until then,
              this space stays honest.
            </p>
          </div>

          <div className="mt-9 font-mono text-[11px] uppercase tracking-wider text-ink/35">
            Coming when it&rsquo;s ready
          </div>
        </div>
      </div>
    </section>
  )
}

function StatusPill({ tone = 'live', children }) {
  const styles =
    tone === 'live'
      ? 'border-copper/40 bg-copper/10 text-copper'
      : 'border-ink/20 bg-ink/[0.03] text-ink/45'
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[9px] font-semibold tracking-wider ${styles}`}
    >
      {tone === 'live' && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" />
      )}
      {children}
    </span>
  )
}

function Mark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-ink">
      <rect x="0" y="2" width="16" height="1.6" fill="currentColor" />
      <rect x="0" y="7.2" width="16" height="1.6" fill="currentColor" />
      <rect x="0" y="12.4" width="16" height="1.6" fill="currentColor" />
    </svg>
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
