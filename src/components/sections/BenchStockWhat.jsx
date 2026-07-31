// BenchStock "what it does" — mirrors WhatItDoes / MarketDayWhat so all four app
// pages stay symmetrical. Copy sourced from the BenchStock product features.
export default function BenchStockWhat() {
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
          What it{' '}
          <span className="accent text-ink/55">really costs.</span>
        </h2>
      </div>

      {/* Main grid — copy left, question list right */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Copy column */}
        <div className="max-w-xl">
          <p className="text-[18px] leading-relaxed text-ink/80">
            BenchStock is one loop, end to end. Add the materials you buy with
            their cost per unit. Build a product from those materials, and it
            shows you the <span className="font-medium text-ink">true cost —
            materials, labor, and overhead</span> — plus a suggested price. Then
            plan a run and get a shopping list of exactly what&rsquo;s short.
          </p>

          <p className="mt-7 text-[15px] leading-relaxed text-ink/65">
            A spreadsheet tells you what you paid last month. BenchStock answers
            the questions you have <em>right now, at the bench</em>:
          </p>

          <ul className="mt-6 space-y-3 border-l-2 border-copper/40 pl-5">
            {[
              'What does this product actually cost to make?',
              'What should I charge to hit the margin I want?',
              'How many can I make with what I have on hand?',
              'For this order, what do I need to buy — and from whom?',
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
            material, product, and count lives on your device, with a one-tap
            JSON backup whenever you want one.
          </p>
        </div>

        {/* Companion note — places BenchStock within the studio without ranking apps */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full lg:max-w-[480px]">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
              One of four Bennett Studio apps
            </div>
            <div className="border border-ink/10 bg-bone p-7 shadow-[0_2px_0_rgba(26,26,26,0.04)]">
              <p className="text-[15px] leading-relaxed text-ink/75">
                BenchStock is the materials &amp; true-cost piece of Bennett
                Studio — alongside MarginPrint, MarketDay, and MakerBooks. Every
                app shares the same local-first storage, backup, and offline
                foundations, so use BenchStock on its own or with the rest.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 eyebrow text-ink/55">
                <span>— Materials</span>
                <span>— True cost</span>
                <span>— Plan a run</span>
                <span>— Works offline</span>
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
