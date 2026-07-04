// MarketDay "what it does" — mirrors WhatItDoes for MarginPrint so the two app
// pages stay symmetrical. Copy sourced from the MarketDay product README.
export default function MarketDayWhat() {
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
          Pack the night before.{' '}
          <span className="italic font-medium text-ink/55">Sell with no signal.</span>
        </h2>
      </div>

      {/* Main grid — copy left, question list right */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Copy column */}
        <div className="max-w-xl">
          <p className="text-[18px] leading-relaxed text-ink/80">
            MarketDay is one loop, end to end. Build your pack list the night
            before. Ring up each sale with a single tap — cash, card, Venmo, or
            other — <span className="font-medium text-ink">even with zero
            signal</span>. Then close the show to a screenshot-worthy profit
            summary.
          </p>

          <p className="mt-7 text-[15px] leading-relaxed text-ink/65">
            A cash box and a notebook only tell you the total, and only once
            you&rsquo;re home. MarketDay answers the questions you actually have
            <em> at the table</em>:
          </p>

          <ul className="mt-6 space-y-3 border-l-2 border-copper/40 pl-5">
            {[
              'Did I bring enough — and what am I about to sell out of?',
              'How much have I taken so far today?',
              'How does that split across cash, card, and Venmo?',
              'Did this show actually make me money?',
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
            It&rsquo;s a client-side PWA — no accounts, no backend. Every sale,
            pack list, and total lives on your device, with a one-tap JSON
            backup whenever you want one.
          </p>
        </div>

        {/* Companion note — places MarketDay within the studio without ranking apps */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full lg:max-w-[480px]">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
              One of four Bennett Studio apps
            </div>
            <div className="border border-ink/10 bg-bone p-7 shadow-[0_2px_0_rgba(26,26,26,0.04)]">
              <p className="text-[15px] leading-relaxed text-ink/75">
                MarketDay is the in-person selling piece of Bennett Studio —
                alongside MarginPrint, Benchstock, and Maker Books. Every app
                shares the same local-first storage, backup, and offline
                foundations, so use MarketDay on its own or with the rest.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink/55">
                <span>— Pack list</span>
                <span>— One-tap checkout</span>
                <span>— Profit summary</span>
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
