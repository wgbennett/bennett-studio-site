import SiteNav from './SiteNav.jsx'
import PhotoBackdrop from './PhotoBackdrop.jsx'

// The photographic hero that opens each app page.
//
// Same construction as the landing hero — full-bleed image, ink scrim stack,
// bone copy, overlay nav — so arriving from a card on the landing page feels
// like the same site rather than a different template. The `index` and `kicker`
// deliberately repeat the card that linked here (01 / PRODUCTION QUEUE), which
// is what makes the numbering read as a system instead of decoration.
//
// Placeholder-safe: PhotoBackdrop draws a designed charcoal field for any slug
// whose photograph has not landed yet. See src/photos.js.
//
// Shorter than the landing hero (68svh, not 100svh) on purpose. The landing
// page is selling the studio and can afford a full screen; an app page is
// answering "what is this", and burying the actual explanation below a second
// full viewport would be style at the cost of the reader.
export default function AppHero({ slug, index, kicker, name, tagline, sub, cta, secondaryCta }) {
  return (
    <section className="relative flex min-h-[68svh] w-full items-center overflow-hidden bg-ink">
      <PhotoBackdrop slug={slug} priority />
      <SiteNav variant="overlay" cta={cta} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-20 pt-32 lg:pt-28">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 eyebrow text-copper-light">
            <span className="font-mono text-[13px] font-medium">{index}</span>
            <span className="h-px w-8 bg-copper-light/50" />
            <span className="text-bone/55">{kicker}</span>
          </div>

          <h1 className="display-hero text-bone">
            {name}
            {tagline && <span className="accent text-bone/60"> {tagline}</span>}
          </h1>

          <p className="lede mt-7 max-w-lg text-bone/80">{sub}</p>

          {secondaryCta && (
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={secondaryCta.href}
                target={secondaryCta.href.startsWith('http') ? '_blank' : undefined}
                rel={secondaryCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-2.5 bg-bone px-6 py-3.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:bg-copper hover:text-bone"
              >
                {secondaryCta.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2.5 border border-bone/35 px-6 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:border-bone hover:bg-bone/10"
              >
                See pricing
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
