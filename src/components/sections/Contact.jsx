export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-ink/10 bg-bone px-8 py-32 lg:py-44"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>Private beta — now open</span>
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
        </div>

        <h2 className="text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tightest text-ink">
          Be first to run your shop{' '}
          <span className="italic font-medium">from one screen.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          MarginPrint is in active development. Join the private beta to get
          early access, help shape what ships, and lock the founding lifetime
          price before it goes up.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          {/* TODO(launch): swap mailto for a real waitlist form (Tally /
              Formspree / ConvertKit). mailto works once Cloudflare Email
              Routing for will@bennett.studio is live. */}
          <a
            href="mailto:will@bennett.studio?subject=MarginPrint%20beta&body=I%27d%20like%20to%20join%20the%20MarginPrint%20private%20beta."
            className="group inline-flex items-center gap-2.5 bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
          >
            Email to join the beta
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#pricing"
            className="font-mono text-[12px] uppercase tracking-wider text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          >
            See pricing ↓
          </a>
        </div>

        {/* Tiny reassurance row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
          <span>Local-first · works offline</span>
          <span>·</span>
          <span>Founding lifetime price</span>
          <span>·</span>
          <span>No data sold, ever</span>
          <span>·</span>
          <span>Built solo, by a maker</span>
        </div>
      </div>
    </section>
  )
}
