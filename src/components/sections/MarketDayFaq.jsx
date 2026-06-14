// MarketDay FAQ — mirrors MarginPrint's Faq section so the two app pages stay
// symmetrical. Native <details>/<summary> accordion (accessible, no JS).
// Answers reflect the real product: client-side PWA, offline-first, on-device
// data, free tier now with paid coming soon.
const FAQS = [
  {
    q: 'Where does my data live? Is it safe?',
    a: "On your device — full stop. MarketDay is a client-side app: every sale, pack list, and total is stored in your own browser and never sent to a server. There's no account and no backend, so there's no central database of your business to leak. Export a full JSON backup from Settings anytime.",
  },
  {
    q: 'Do I need to be online?',
    a: 'No. MarketDay is offline-first — built for church halls and open fields with no signal. Everything runs on your phone, so there’s never a spinner between you and a sale. It syncs nothing and waits on nothing.',
  },
  {
    q: 'Can it take payments?',
    a: 'MarketDay records how each sale was paid — cash, card, Venmo, or other — so your end-of-day totals reconcile by payment type. It doesn’t process the payment itself: you still take cash or run your card reader as usual, and log it in one tap.',
  },
  {
    q: 'Is it an app I install?',
    a: 'It’s a web app you can install. Open it on your phone and “Add to Home Screen” — it runs full-screen like a native app, works offline, and updates itself. No app store, no download, works on iPhone and Android.',
  },
  {
    q: 'What does it cost?',
    a: 'The free tier is fully functional today — pack lists, one-tap sales, and show summaries all work at no cost. Paid upgrades are coming soon; join the beta to get early access and lock the founding lifetime price before it goes up.',
  },
  {
    q: 'Do I need MarginPrint too?',
    a: 'No — MarketDay works on its own. If you also use MarginPrint, the two are built to pair: they share the same local-first storage, backup, and offline foundations, so the app that costs and queues what you make sits naturally next to the one that sells it at the booth.',
  },
]

export default function MarketDayFaq() {
  return (
    <section
      id="faq"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§03 &nbsp;—&nbsp; Questions</span>
        </div>

        <h2 className="mb-12 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-ink">
          The honest answers.
        </h2>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-copper transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70">
                {item.a}
              </p>
            </details>
          ))}
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
