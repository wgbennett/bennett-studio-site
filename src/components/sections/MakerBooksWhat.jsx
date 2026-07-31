// MakerBooks "what it does" — mirrors WhatItDoes / MarketDayWhat / BenchStockWhat
// so all four app pages stay symmetrical. Copy sourced from the MakerBooks
// product features.
export default function MakerBooksWhat() {
  return (
    <section
      id="what"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      {/* Header */}
      <div className="relative mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 eyebrow text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§01 &nbsp;—&nbsp; What it does</span>
        </div>
        <h2 className="max-w-4xl display-section text-ink">
          Know your{' '}
          <span className="accent text-ink/55">real profit.</span>
        </h2>
      </div>

      {/* Main grid — copy left, question list right */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Copy column */}
        <div className="max-w-xl">
          <p className="text-[18px] leading-relaxed text-ink/80">
            MakerBooks is one loop, end to end. Log income and expenses in
            seconds and tag each one. The dashboard shows your{' '}
            <span className="font-medium text-ink">real profit — month,
            year-to-date, and all-time</span> — tells you what to set aside for
            taxes, and organizes every expense into approximate Schedule C lines
            for your accountant.
          </p>

          <p className="mt-7 text-[15px] leading-relaxed text-ink/65">
            A shoebox of receipts tells you nothing until April. MakerBooks
            answers the questions you have <em>all year</em>:
          </p>

          <ul className="mt-6 space-y-3 border-l-2 border-copper/40 pl-5">
            {[
              'Is my maker business actually making money?',
              'How much should I set aside for taxes?',
              'Where did the money actually go this year?',
              'What do I hand my accountant in April?',
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
            It&rsquo;s a client-side PWA — no accounts, no backend. Every
            transaction lives on your device, with a one-tap JSON backup whenever
            you want one. Your books never touch someone else&rsquo;s server.
          </p>
        </div>

        {/* Companion note — places MakerBooks within the studio without ranking apps */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full lg:max-w-[480px]">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink/70">
              One of four Bennett Studio apps
            </div>
            <div className="border border-ink/10 bg-bone p-7 shadow-[0_2px_0_rgba(26,26,26,0.04)]">
              <p className="text-[15px] leading-relaxed text-ink/75">
                MakerBooks is the bookkeeping &amp; tax piece of Bennett Studio —
                alongside MarginPrint, MarketDay, and BenchStock. Every app
                shares the same local-first storage, backup, and offline
                foundations, so use MakerBooks on its own or with the rest.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 eyebrow text-ink/70">
                <span>— Income &amp; expenses</span>
                <span>— Real profit</span>
                <span>— Tax set-aside</span>
                <span>— Schedule C</span>
              </div>
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
