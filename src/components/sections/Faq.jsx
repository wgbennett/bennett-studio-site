// FAQ — objection handling near the pricing decision + cuts support load.
// Native <details>/<summary> accordion (accessible, no JS). Answers reflect the
// real product: local-first, BYO AI key, PWA, Lemon Squeezy payments.
const FAQS = [
  {
    q: 'Where does my data live? Is it safe?',
    a: "On your device — full stop. MarginPrint is local-first: your jobs, customers, costs, and prices are stored in your own browser and never sent to a server. There's no central database of your business to leak. You can export a full backup anytime, and nothing is ever sold or shared.",
  },
  {
    q: 'Do I need to be online?',
    a: 'No. The app works offline — useful when you’re standing next to a printer with bad Wi-Fi. Everything runs on your device; there’s nothing to wait on.',
  },
  {
    q: 'What’s the AI analysis — and what’s Claude?',
    a: 'Claude is an AI assistant similar to ChatGPT, made by a company called Anthropic. MarginPrint can send it your cost numbers and get back short, specific pricing advice. To turn it on, you create a free Anthropic account and paste a “key” (a password-like code from that account) into MarginPrint once — about two minutes, and new accounts include $5 of credit, enough for hundreds of analyses. The key stays on your device, requests go straight from your browser to Anthropic, and we never see them or charge a markup. Skip it entirely and the queue, costs, and everything else still work.',
  },
  {
    q: 'Which printers and slicers does it work with?',
    a: 'Any of them. Drag in a .gcode or .3mf exported from PrusaSlicer, OrcaSlicer, or Bambu Studio and MarginPrint reads print time, filament weight, and layer count directly. Curated presets cover common machines (Bambu A1 / P1S / X1C, Prusa MK4, Ender 3, and more) so setup takes a minute, not an evening.',
  },
  {
    q: 'Is it an app I install?',
    a: 'It’s a web app you can install. Open it on your phone and “Add to Home Screen” — it runs full-screen like a native app, works offline, and updates itself. No app store, no download, works on iPhone and Android.',
  },
  {
    q: 'Can I cancel? What about refunds?',
    a: 'Cancel anytime — the free tier keeps working for one printer, forever. Payments are handled by Lemon Squeezy (your card details never touch us), and refunds go through them.',
  },
  {
    q: 'Is MarginPrint finished, or still changing?',
    a: "MarginPrint is live — you can start free today, no account needed. It's a young v1 from a solo maker, so it keeps improving fast, and the founding lifetime price is the lowest it'll ever be before it goes up.",
  },
]

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§05 &nbsp;—&nbsp; Questions</span>
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
