import JobCardDemo from '../demos/JobCardDemo.jsx'
import CalculatorDemo from '../demos/CalculatorDemo.jsx'
import SlicerDropDemo from '../demos/SlicerDropDemo.jsx'

const STEPS = [
  {
    index: '01',
    title: 'Drop in a slicer file.',
    description:
      'Export from PrusaSlicer, OrcaSlicer, or Bambu Studio. Drag the .gcode or .3mf onto the calculator. MarginPrint reads the file directly — print time, filament weight, layer count — and fills them in. Drop one here to see it work.',
    demoKind: 'slicer',
  },
  {
    index: '02',
    title: 'Cost math runs itself.',
    description:
      'Filament, electricity, machine depreciation, labor, failure-risk buffer, platform fees. The math runs on every keystroke. Override any line if your shop is different from the defaults.',
    demoKind: 'calculator',
  },
  {
    index: '03',
    title: 'One tap moves the job.',
    description:
      'Every job has a state. Tap to advance it. Quoted, queued, printing, post-processing, ready, delivered. The queue colors update, the timestamps stamp themselves, the dashboard knows what you owe.',
    demoKind: 'jobcard',
  },
]

export default function Flow() {
  return (
    <section
      id="flow"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      {/* Header */}
      <div className="relative mx-auto mb-24 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§02 &nbsp;—&nbsp; The flow</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          Three steps from a sliced file to a paid job.
        </h2>
        <p className="mt-7 max-w-xl font-mono text-[13px] leading-relaxed text-ink/55">
          MarginPrint is a tool for the moments between slicing and shipping.
          Here is what the day looks like.
        </p>
      </div>

      {/* Steps */}
      <div className="relative mx-auto max-w-7xl space-y-28 lg:space-y-36">
        {STEPS.map((step) => (
          <FlowStep key={step.index} step={step} />
        ))}
      </div>
    </section>
  )
}

function FlowStep({ step }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
      {/* Copy */}
      <div className="max-w-md">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink/40">
          Step {step.index}
        </div>
        <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-ink">
          {step.title}
        </h3>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
          {step.description}
        </p>
      </div>

      {/* Demo */}
      <div className="flex justify-center lg:justify-start">
        {step.demoKind === 'slicer' && <SlicerDropDemo />}
        {step.demoKind === 'calculator' && <CalculatorDemo />}
        {step.demoKind === 'jobcard' && <JobCardDemo cycleMs={2400} />}
        {step.demoKind === 'placeholder' && (
          <DemoPlaceholder
            label={step.placeholderLabel}
            note={step.placeholderNote}
          />
        )}
      </div>
    </div>
  )
}

function DemoPlaceholder({ label, note }) {
  return (
    <div className="relative flex h-[200px] w-full max-w-[440px] items-center justify-center border border-dashed border-ink/15 bg-ink/[0.02]">
      <div className="text-center">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink/35">
          {label}
        </div>
        <div className="mt-1.5 font-mono text-[10px] text-ink/30">
          {note}
        </div>
      </div>
    </div>
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
