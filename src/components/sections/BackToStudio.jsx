import { Link } from 'react-router-dom'

// Slim "return home" band at the bottom of every app page, between Contact
// and Footer. Gives visitors who scrolled the whole page an obvious path back
// to the studio landing (and the other three apps) without hunting the nav.
export default function BackToStudio() {
  return (
    <section className="relative border-t border-ink/10 bg-bone px-8 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 eyebrow text-ink/45">
          One of four apps from Bennett Studio
        </div>
        <Link
          to="/"
          className="group inline-flex items-center justify-center gap-2.5 border border-ink/25 px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
          Back to the studio
        </Link>
      </div>
    </section>
  )
}
