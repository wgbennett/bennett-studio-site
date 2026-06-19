import Hero from '../components/Hero.jsx'
import Apps from '../components/sections/Apps.jsx'
import About from '../components/sections/About.jsx'
import PrintShowcase from '../components/sections/PrintShowcase.jsx'
import Contact from '../components/sections/Contact.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

// Bennett Studio landing — studio-first. You arrive here, choose an app from
// the equal two-app band, and the deep marketing for each app lives on its own
// route. Keeps the landing short: hero → apps → about → prints → close.
export default function Landing() {
  usePageTitle('Bennett Studio — software for makers · MarginPrint & MarketDay')
  return (
    <>
      <Hero />
      <Apps />
      <About />
      <PrintShowcase />
      {/* Studio-level close: two clearly-attributed paths, never a generic
          "which app is this?" form. MarginPrint is live → send people straight
          in. MarketDay's paid tier is still coming → capture the email. */}
      <Contact actions={<HomeCtas />} />
      <Footer />
    </>
  )
}

function HomeCtas() {
  return (
    <div className="mx-auto mt-12 grid max-w-3xl gap-6 text-left sm:grid-cols-2">
      {/* MarginPrint — live, no signup needed */}
      <div className="flex flex-col border border-ink/12 bg-bone p-7">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[12px] font-semibold tracking-wider text-ink">
            MarginPrint
          </span>
          <span className="inline-flex items-center gap-1.5 border border-copper/40 bg-copper/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-copper">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" />
            Available now
          </span>
        </div>
        <p className="flex-1 text-[14px] leading-relaxed text-ink/65">
          The full app is live — no account, no login. Start free and price your
          first printer today.
        </p>
        <a
          href="https://app.bennettstudio.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center justify-center gap-2.5 bg-ink px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
        >
          Start free
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>

      {/* MarketDay — available now, free to start */}
      <div className="flex flex-col border border-ink/12 bg-bone p-7">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[12px] font-semibold tracking-wider text-ink">
            MarketDay
          </span>
          <span className="inline-flex items-center gap-1.5 border border-copper/40 bg-copper/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-copper">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" />
            Available now
          </span>
        </div>
        <p className="flex-1 text-[14px] leading-relaxed text-ink/65">
          The full booth app is live — no account, no signal needed. Start free
          and run your next show from your phone.
        </p>
        <a
          href="https://marketday.bennettstudio.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center justify-center gap-2.5 bg-ink px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
        >
          Start free
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </div>
  )
}
