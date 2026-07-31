import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles, Square } from 'lucide-react'

// Canned analysis text. Mirrors the structure of what
// print-calc/src/utils/ai.js streams from Claude in the real app —
// markdown with ## headers, ** bold **, and `- bullets`. Numbers reference
// the same job the CalculatorDemo shows so the page reads as one story.
const ANALYSIS = `## Your Saturn keychain is priced well.

**$11.13 profit at 74% margin** — that's strong for Etsy at this price point. Most sellers in this category hover between 35 and 50%.

### What's working

- **Failure buffer at 10%** is honest. A lot of sellers leave this at 0 and quietly bleed margin every month.
- **Etsy fees ate 41% of your cost**. You can't avoid this — only out-volume it.

### Two things to consider

- At $15 you're above Etsy's "$10 or less" comparison-shop band. Good positioning.
- Batch this to 24 per print: filament cost drops from **$0.22 to $0.04 per unit**. Re-run the numbers in batch mode.

### One bold move

Test a $19 listing for a week on 25% of inventory. With 74% margin you have room; you may find the price ceiling sits higher than you think.`

const STREAM_INTERVAL_MS = 28

export default function AIAnalysisDemo() {
  const [status, setStatus] = useState('idle') // idle | streaming | done
  const [revealed, setRevealed] = useState('')
  const indexRef = useRef(0)
  // Respect prefers-reduced-motion: skip the word-by-word stream and reveal the
  // full analysis immediately.
  const reduce = useReducedMotion()

  useEffect(() => {
    if (status !== 'streaming') return

    if (reduce) {
      setRevealed(ANALYSIS)
      setStatus('done')
      return
    }

    // Word-by-word reveal — split on whitespace but keep the separators so
    // the recombined string preserves line breaks and spacing exactly.
    const tokens = ANALYSIS.split(/(\s+)/)
    const id = setInterval(() => {
      indexRef.current += 1
      if (indexRef.current >= tokens.length) {
        clearInterval(id)
        setRevealed(ANALYSIS)
        setStatus('done')
        return
      }
      setRevealed(tokens.slice(0, indexRef.current).join(''))
    }, STREAM_INTERVAL_MS)
    return () => clearInterval(id)
  }, [status, reduce])

  function start() {
    indexRef.current = 0
    setRevealed('')
    setStatus('streaming')
  }

  function stop() {
    setStatus('done')
    setRevealed(ANALYSIS)
  }

  return (
    <div className="w-full max-w-[520px] font-sans border border-ink/10 bg-bone shadow-[0_2px_0_rgba(26,26,26,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center bg-copper text-bone">
            <Sparkles size={13} />
          </span>
          <div>
            <div className="text-[13px] font-semibold leading-tight text-ink">
              AI analysis
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/70 leading-tight">
              Claude · personalized take
            </div>
          </div>
        </div>
        {status === 'done' && (
          <button
            type="button"
            onClick={start}
            className="font-mono text-[10px] uppercase tracking-wider text-copper hover:underline underline-offset-4"
          >
            ↻ regenerate
          </button>
        )}
        {status === 'streaming' && (
          <button
            type="button"
            onClick={stop}
            className="font-mono text-[10px] uppercase tracking-wider text-ink/70 hover:text-ink"
          >
            <span className="inline-flex items-center gap-1"><Square size={10} /> stop</span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="min-h-[280px] px-5 py-5">
        <AnimatePresence mode="wait">
          {status === 'idle' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-copper/10 text-copper">
                <Sparkles size={22} />
              </div>
              <div className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink/65">
                Bring your own Anthropic key. The app reads your numbers, your
                platform, your printer, and gives a personalized take on what
                to charge and where you're leaving money behind.
              </div>
              <button
                type="button"
                onClick={start}
                className="mt-6 inline-flex items-center gap-2 bg-ink px-4 py-2 eyebrow text-bone hover:bg-copper transition-colors"
              >
                <Sparkles size={12} /> Run AI analysis
              </button>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink/70">
                demo · canned response · no key needed
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              aria-live="polite"
              className="text-[14px] leading-relaxed text-ink/85"
            >
              <Markdown text={revealed} />
              {status === 'streaming' && (
                <motion.span
                  className="ml-0.5 inline-block h-3 w-[7px] bg-copper align-middle"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Minimal markdown renderer — same shape as the real AIAnalysis.jsx Markdown
// component (## / ### headers, - bullets, **bold**, paragraphs). No HTML, no
// XSS surface — text rendered through React children only.
function Markdown({ text }) {
  const lines = text.split('\n')
  const nodes = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith('### ')) {
      nodes.push(
        <h4
          key={`h${i}`}
          className="mt-5 mb-2 eyebrow text-ink/70 first:mt-0"
        >
          {renderInline(trimmed.slice(4))}
        </h4>,
      )
      i++
    } else if (trimmed.startsWith('## ')) {
      nodes.push(
        <h3
          key={`h${i}`}
          className="mb-3 text-[18px] font-semibold leading-snug text-ink first:mt-0"
        >
          {renderInline(trimmed.slice(3))}
        </h3>,
      )
      i++
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = []
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        items.push(
          <li
            key={`l${i}`}
            className="ml-4 list-disc pl-1 marker:text-copper [&>strong]:text-ink"
          >
            {renderInline(lines[i].trim().slice(2))}
          </li>,
        )
        i++
      }
      nodes.push(
        <ul key={`u${i}`} className="my-2 space-y-1.5">
          {items}
        </ul>,
      )
    } else if (trimmed) {
      nodes.push(
        <p key={`p${i}`} className="my-3 first:mt-0">
          {renderInline(trimmed)}
        </p>,
      )
      i++
    } else {
      i++
    }
  }
  return <>{nodes}</>
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}
