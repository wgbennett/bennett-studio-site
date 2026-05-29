export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-ink/10 bg-bone px-8 py-32 lg:py-44"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>The queue is waiting</span>
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
        </div>

        <h2 className="text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tightest text-ink">
          Run your shop{' '}
          <span className="italic font-medium">from one screen.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          Free for one printer, forever. No card to start. Drop a slicer file,
          see the math, ship a job before this page loads on someone else's
          phone.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
          >
            Try Free
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
          <span>No card to start</span>
          <span>·</span>
          <span>Cancel anytime</span>
          <span>·</span>
          <span>Built solo, by a maker</span>
        </div>
      </div>
    </section>
  )
}
