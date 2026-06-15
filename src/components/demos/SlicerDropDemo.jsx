import { useRef, useState } from 'react'
import { Printer, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseSlicerFile } from '../../utils/slicerImport.js'

// Visitor states:
//   idle       — empty drop zone, sample-try affordance
//   dragOver   — drag target highlighted in copper
//   parsing    — file is being read, brief loading state
//   result     — parsed data displayed
//   error      — couldn't parse (rare; parser returns blank() on failure but
//                we surface a friendly note if filename has no useful data)

const SAMPLE = {
  source: 'bambu-3mf',
  name: 'saturn_keychain',
  rawName: 'saturn_keychain.gcode.3mf',
  printMinutes: 32,
  filamentGrams: 11,
  materials: [{ type: 'PLA', color: '#F5F1EA', grams: 11 }],
  thumbnailDataUrl: null,
}

const SOURCE_LABEL = {
  'bambu-3mf': 'Bambu Studio · 3MF',
  'prusa-3mf': 'PrusaSlicer · 3MF',
  gcode: 'G-code',
}

function formatHM(min) {
  if (!min) return '—'
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h && m) return `${h}h ${m}m`
  if (h) return `${h}h`
  return `${m}m`
}

export default function SlicerDropDemo() {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)
  // Drag enter/leave fires for child elements, so a depth counter avoids
  // flicker when the cursor crosses between nested nodes inside the dropzone.
  const dragDepthRef = useRef(0)

  async function handleFile(file) {
    if (!file) return
    setStatus('parsing')
    setErrorMsg('')

    // Tiny artificial delay so the parse state is actually visible —
    // real fflate unzip on a tiny .3mf is sub-50ms and the transition was
    // jarring without it.
    await new Promise((r) => setTimeout(r, 320))

    try {
      const parsed = await parseSlicerFile(file)
      if (!parsed.printMinutes && !parsed.filamentGrams && !parsed.thumbnailDataUrl) {
        setErrorMsg(
          "Couldn't find slicer metadata in this file. Try a .gcode from Prusa/Orca/Bambu, or a .3mf with embedded slice info.",
        )
        setStatus('error')
        return
      }
      setResult({ ...parsed, rawName: file.name })
      setStatus('result')
    } catch (err) {
      console.error(err)
      setErrorMsg("Couldn't read this file.")
      setStatus('error')
    }
  }

  function handleDragEnter(e) {
    e.preventDefault()
    e.stopPropagation()
    dragDepthRef.current += 1
    if (status === 'idle' || status === 'error') setStatus('dragOver')
  }

  function handleDragLeave(e) {
    e.preventDefault()
    e.stopPropagation()
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1)
    if (dragDepthRef.current === 0 && status === 'dragOver') {
      setStatus('idle')
    }
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
  }

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    dragDepthRef.current = 0
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function handleClick() {
    if (status === 'idle' || status === 'error') {
      fileInputRef.current?.click()
    }
  }

  function trySample(e) {
    e.stopPropagation()
    setStatus('parsing')
    setTimeout(() => {
      setResult(SAMPLE)
      setStatus('result')
    }, 600)
  }

  function reset() {
    setResult(null)
    setErrorMsg('')
    setStatus('idle')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const isDrop = status === 'idle' || status === 'dragOver' || status === 'error'

  return (
    <div className="w-full max-w-[480px] font-sans">
      <div
        onClick={isDrop ? handleClick : undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative border bg-bone transition-colors duration-200 ${
          status === 'dragOver'
            ? 'border-copper border-solid bg-copper/[0.04]'
            : status === 'error'
              ? 'border-red-500/40 border-dashed'
              : 'border-ink/15 border-dashed'
        } ${isDrop ? 'cursor-pointer hover:bg-ink/[0.02]' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".gcode,.gco,.3mf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <AnimatePresence mode="wait">
          {(status === 'idle' || status === 'dragOver') && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center justify-center px-6 py-14 text-center"
            >
              <DropIcon active={status === 'dragOver'} />
              <div className="mt-5 text-[15px] font-semibold text-ink">
                {status === 'dragOver'
                  ? 'Drop to parse'
                  : 'Drop a .gcode or .3mf'}
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-ink/45">
                from PrusaSlicer · OrcaSlicer · Bambu Studio
              </div>
              <button
                type="button"
                onClick={trySample}
                className="mt-6 font-mono text-[11px] uppercase tracking-wider text-copper underline-offset-4 hover:underline"
              >
                or try a sample →
              </button>
            </motion.div>
          )}

          {status === 'parsing' && (
            <motion.div
              key="parsing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center justify-center px-6 py-14 text-center"
            >
              <ParseSpinner />
              <div className="mt-5 font-mono text-[12px] uppercase tracking-wider text-ink/65">
                Reading slicer metadata…
              </div>
            </motion.div>
          )}

          {status === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-5 py-5"
            >
              <ResultView result={result} onReset={reset} />
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center justify-center px-6 py-12 text-center"
            >
              <div className="font-mono text-[11px] uppercase tracking-wider text-red-600/80">
                Parse failed
              </div>
              <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-ink/70">
                {errorMsg}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  reset()
                }}
                className="mt-5 font-mono text-[11px] uppercase tracking-wider text-copper underline-offset-4 hover:underline"
              >
                ← Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink/35">
        <span>Live parser · uses your file, never uploads</span>
        <span>fflate · client-side</span>
      </div>
    </div>
  )
}

function DropIcon({ active }) {
  return (
    <motion.div
      animate={{ y: active ? -3 : 0, scale: active ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className={`flex h-14 w-14 items-center justify-center border ${
        active ? 'border-copper text-copper' : 'border-ink/30 text-ink/55'
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </motion.div>
  )
}

function ParseSpinner() {
  return (
    <div className="flex h-14 w-14 items-center justify-center">
      <motion.div
        className="h-3 w-3 bg-copper"
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function ResultView({ result, onReset }) {
  const sourceLabel = SOURCE_LABEL[result.source] ?? 'Slicer file'
  return (
    <>
      {/* Top row — filename + source */}
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-ink/10 bg-ink/[0.04]">
          {result.thumbnailDataUrl ? (
            <img
              src={result.thumbnailDataUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <Printer size={22} className="text-ink/40" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-ink">
            {result.name || 'Untitled file'}
          </div>
          <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink/55">
            <span className="text-copper">imported</span>
            <span className="text-ink/25"> · </span>
            <span>{sourceLabel}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onReset()
          }}
          className="font-mono text-[10px] uppercase tracking-wider text-ink/45 hover:text-ink"
        >
          <span className="inline-flex items-center gap-1"><X size={11} /> reset</span>
        </button>
      </div>

      {/* Metric grid */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/[0.08] pt-4">
        <Metric label="Print time" value={formatHM(result.printMinutes)} />
        <Metric
          label="Filament"
          value={
            result.filamentGrams
              ? `${result.filamentGrams.toFixed(0)}g`
              : '—'
          }
        />
        <Metric
          label="Materials"
          value={
            result.materials?.length
              ? result.materials
                  .slice(0, 2)
                  .map((m) => m.type || 'unk')
                  .join(' · ')
              : '1 material'
          }
        />
      </div>

      {/* Action */}
      <button
        type="button"
        className="mt-5 w-full bg-ink px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-bone hover:bg-copper transition-colors"
      >
        Add to queue → cost auto-fills
      </button>
    </>
  )
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
        {label}
      </div>
      <div className="mt-1 font-mono text-[15px] font-semibold tabular-nums text-ink">
        {value}
      </div>
    </div>
  )
}
