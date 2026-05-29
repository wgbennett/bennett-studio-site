import AIAnalysisDemo from '../demos/AIAnalysisDemo.jsx'
import CardEdgeHighlight from '../effects/CardEdgeHighlight.jsx'

// Small line-art icons sized for the 36px feature-card slot. All use
// currentColor and stroke (no fills) so they inherit text color and pick up
// the group-hover transition to copper from the parent card.
const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'square',
}

function IconSlicerFile() {
  // File icon with a download arrow descending into it — "read a slicer file in"
  return (
    <svg {...ICON_PROPS}>
      <rect x="2.5" y="6.5" width="11" height="7.5" />
      <path d="M8 1 L8 8.5 M5 5.5 L8 8.5 L11 5.5" />
    </svg>
  )
}

function IconStateMachine() {
  // Three nodes connected — "state → state → state"
  return (
    <svg {...ICON_PROPS}>
      <circle cx="2.6" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="13.4" cy="8" r="1.5" />
      <path d="M4.4 8 L6.3 8 M9.7 8 L11.6 8" />
    </svg>
  )
}

function IconPresets() {
  // 2×2 grid — "a library of presets to pick from"
  return (
    <svg {...ICON_PROPS}>
      <rect x="2" y="2" width="5" height="5" />
      <rect x="9" y="2" width="5" height="5" />
      <rect x="2" y="9" width="5" height="5" />
      <rect x="9" y="9" width="5" height="5" />
    </svg>
  )
}

function IconMobile() {
  // Phone outline
  return (
    <svg {...ICON_PROPS}>
      <rect x="4.5" y="1.5" width="7" height="13" rx="0.8" />
      <path d="M6.8 12.5 L9.2 12.5" />
    </svg>
  )
}

function IconLocalDisk() {
  // Drive / disk with LED indicators — "data lives here, locally"
  return (
    <svg {...ICON_PROPS}>
      <rect x="2" y="5" width="12" height="6" />
      <circle cx="4.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6.7" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M2 3 L14 3" />
    </svg>
  )
}

function IconSparkle() {
  // Four-point star — the same mark used throughout for AI moments
  return (
    <svg {...ICON_PROPS} strokeLinejoin="miter">
      <path d="M8 1.5 L9 7 L14.5 8 L9 9 L8 14.5 L7 9 L1.5 8 L7 7 Z" />
    </svg>
  )
}

const FEATURES = [
  {
    Icon: IconSlicerFile,
    title: 'Real slicer ingestion',
    body: 'Drag in .gcode or .3mf from PrusaSlicer, OrcaSlicer, or Bambu Studio. We read the file directly — not just the time and weight, but the embedded plate thumbnail and per-material breakdown.',
    spec: 'Uses fflate · client-side',
  },
  {
    Icon: IconStateMachine,
    title: 'A state machine per job',
    body: 'Every job is quoted, queued, printing, post-processing, ready, delivered, or failed. State changes are one-tap. Timestamps stamp themselves. The dashboard knows what you owe.',
    spec: '7 states · 1-tap transitions',
  },
  {
    Icon: IconPresets,
    title: 'Curated printer presets',
    body: 'Bambu A1, P1S, X1C. Prusa MK4. Ender 3. The most common machines come pre-loaded with realistic wattage and filament defaults. A new account is useful in 60 seconds.',
    spec: 'Bambu · Prusa · Orca presets',
  },
  {
    Icon: IconMobile,
    title: 'Mobile-first, thumb-first',
    body: 'Most usage happens standing next to a printer with one hand. Every primary action is reachable with your thumb. The desktop view is the same view, scaled up.',
    spec: 'Built for the bench',
  },
  {
    Icon: IconLocalDisk,
    title: 'Local-first, offline by default',
    body: 'Your data lives in your browser. The app works in a garage with bad Wi-Fi. Backup and restore is a JSON file you can email yourself. iCloud sync is on the roadmap, not the foundation.',
    spec: 'No server · ever',
  },
  {
    Icon: IconSparkle,
    title: 'AI pricing analysis',
    body: 'Bring your own Anthropic key. Claude reads your numbers — material, labor, fees, margin — and gives a personalized take on what to charge and where you\'re leaving money behind.',
    spec: 'Streaming · BYOK',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="relative border-t border-ink/10 bg-charcoal px-8 py-28 lg:py-36 text-bone"
    >
      {/* Header */}
      <div className="relative mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§03 &nbsp;—&nbsp; What's inside</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-bone">
          Six things that separate this from a calculator{' '}
          <span className="italic font-medium text-bone/55">that closes on Save.</span>
        </h2>
      </div>

      {/* Feature grid */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-px bg-bone/10 border border-bone/10 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>

      {/* AI deep-dive */}
      <div className="relative mx-auto mt-28 grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="max-w-lg">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-copper">
            Try it · the AI feature
          </div>
          <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-bone">
            A second opinion on every quote.
          </h3>
          <p className="mt-5 text-[15px] leading-relaxed text-bone/70">
            The AI feature reads your numbers — material, fees, margin, platform, even the failure rate you put in — and writes a few short paragraphs on what to change. Not a pitch deck. A pair of eyes from someone who has seen a thousand listings.
          </p>
          <p className="mt-4 font-mono text-[12px] leading-relaxed text-bone/45">
            Bring your own Anthropic key. New accounts get $5 of free credit — enough for hundreds of analyses. Your numbers stay local; only the analysis prompt is sent.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <AIAnalysisDemo />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
  const Icon = feature.Icon
  const number = String(index + 1).padStart(2, '0')
  return (
    <div className="group relative bg-charcoal p-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/50">
      {/* Stagger the edge trace by index — feels like the section is
          powering on row-by-row instead of all at once. */}
      <CardEdgeHighlight delay={index * 0.08} />

      {/* Mono identifier — workshop-tag in the top-right corner */}
      <div className="absolute right-7 top-7 font-mono text-[10px] uppercase tracking-wider text-bone/25 transition-colors group-hover:text-bone/45">
        / {number}
      </div>

      <div className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/85 transition-colors group-hover:border-copper group-hover:text-copper">
        <Icon />
      </div>
      <div className="mt-5 text-[17px] font-semibold leading-tight text-bone">
        {feature.title}
      </div>
      <div className="mt-3 text-[14px] leading-relaxed text-bone/65">
        {feature.body}
      </div>

      {/* Spec footer — adds a concrete factual layer + visual rhythm */}
      <div className="mt-6 flex items-center gap-2 border-t border-bone/[0.08] pt-4 font-mono text-[10px] uppercase tracking-wider text-bone/35 transition-colors group-hover:text-bone/60">
        <span className="text-copper/70 group-hover:text-copper">▸</span>
        <span>{feature.spec}</span>
      </div>
    </div>
  )
}

