// Workshop anchor — Will's actual print room (4:5, in public/). A real working
// space does the "real maker" credibility job better than a posed headshot.
const PHOTO_SRC = '/about-workshop.jpg'

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/bennettstudio.dev' },
  { label: 'Email', href: 'mailto:will@bennettstudio.dev' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      {/* Header */}
      <div className="mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§05 &nbsp;—&nbsp; About the maker</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          One person, behind two apps.{' '}
          <span className="italic font-medium text-ink/55">For now.</span>
        </h2>
      </div>

      {/* Photo + bio */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        {/* Photo */}
        <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-ink/10 bg-ink/[0.03]">
          {PHOTO_SRC ? (
            <img
              src={PHOTO_SRC}
              alt="Will Bennett's 3D-printing workshop — print bench, filament shelves, and printers"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[11px] uppercase tracking-wider text-ink/35">
              <div className="h-12 w-12 border border-ink/15" />
              <div className="mt-4">Photo · placeholder</div>
              <div className="mt-1 text-[10px] text-ink/25">4:5 · ~1000×1250</div>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="max-w-xl">
          <p className="text-[18px] leading-relaxed text-ink/85">
            I'm <span className="font-semibold text-ink">Will Bennett</span> —
            an indie maker who codes, designs websites, and 3D-prints things
            for sale. I build the tools I needed for my own shop. A calculator
            alone was never enough — I wanted the queue, the costs, the
            customers, and the day's takings on my phone, next to the printer
            and behind the table.
          </p>

          <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
            That's two apps under{' '}
            <span className="font-semibold text-ink">Bennett Studio</span>:{' '}
            <span className="font-semibold text-ink">MarginPrint</span> for
            costing and queueing what you make, and{' '}
            <span className="font-semibold text-ink">MarketDay</span> for
            selling it in person. Both built in the open — MarginPrint's shipping
            now, MarketDay close behind.
            I'd rather ship two daily-driver tools that solve real problems
            than ten half-built apps that solve nothing. If you sell handmade
            or 3D-printed things, subscribe below to follow along.
          </p>

          {/* Studio note */}
          <div className="mt-8 border-l-2 border-copper/40 pl-5 font-mono text-[12px] leading-relaxed text-ink/55">
            Bennett Studio is the personal studio brand. The same hands that
            wrote this code wrote this page. The same person picks up the
            phone if something breaks.
          </div>

          {/* Social links */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group inline-flex items-center gap-2 border border-ink/15 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-ink/70 transition-colors hover:border-ink hover:text-ink"
              >
                <span>{s.label}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
