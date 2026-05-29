// Copied as-is from print-calc/src/utils/slicerImport.js — kept verbatim so
// the marketing demo parses files identically to the real app. If the source
// parser changes, update this file too.
import { unzip } from 'fflate'

function blank(filename) {
  return {
    source: null,
    name: stripExtension(filename),
    printMinutes: 0,
    filamentGrams: 0,
    materials: [],
    thumbnailDataUrl: null,
  }
}

function stripExtension(name) {
  return String(name || '')
    .replace(/\.gcode\.3mf$/i, '')
    .replace(/\.(3mf|gcode|gco)$/i, '')
}

function unzipAsync(uint8) {
  return new Promise((resolve, reject) => {
    unzip(uint8, (err, files) => (err ? reject(err) : resolve(files)))
  })
}

function decodeText(uint8) {
  return new TextDecoder('utf-8').decode(uint8)
}

function bytesToDataUrl(uint8, mime) {
  let binary = ''
  const CHUNK = 0x8000
  for (let i = 0; i < uint8.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, uint8.subarray(i, i + CHUNK))
  }
  return `data:${mime};base64,${btoa(binary)}`
}

function parseHmsToMinutes(raw) {
  const s = String(raw || '').trim()
  if (!s) return 0
  let h = 0,
    m = 0,
    sec = 0
  const hMatch = s.match(/(\d+)\s*h/i)
  const mMatch = s.match(/(\d+)\s*m(?!s)/i)
  const sMatch = s.match(/(\d+)\s*s/i)
  if (hMatch) h = Number(hMatch[1])
  if (mMatch) m = Number(mMatch[1])
  if (sMatch) sec = Number(sMatch[1])
  if (h === 0 && m === 0 && sec === 0) {
    const parts = s.split(':').map(Number)
    if (parts.length === 3 && parts.every(Number.isFinite)) [h, m, sec] = parts
    else if (parts.length === 2 && parts.every(Number.isFinite)) [m, sec] = parts
  }
  return Math.max(0, h * 60 + m + Math.round(sec / 60))
}

export function parseGcode(text, filename = '') {
  const r = blank(filename)
  r.source = 'gcode'
  if (!text) return r

  const timeMatch =
    text.match(/;\s*estimated printing time \(normal mode\)\s*=\s*([^\n\r;]+)/i) ??
    text.match(/;\s*total estimated time:\s*([^\n\r;]+)/i) ??
    text.match(/;\s*model printing time:\s*([^\n\r;]+)/i) ??
    text.match(/;\s*estimated printing time[^=]*=\s*([^\n\r;]+)/i) ??
    text.match(/;\s*print time:\s*([^\n\r;]+)/i)
  if (timeMatch) r.printMinutes = parseHmsToMinutes(timeMatch[1])

  const weightMatch =
    text.match(/;\s*total filament used \[g\]\s*=\s*([\d.,\s]+)/i) ??
    text.match(/;\s*filament used \[g\]\s*=\s*([\d.,\s]+)/i) ??
    text.match(/;\s*total filament weight \[g\]\s*:\s*([\d.,\s]+)/i)
  if (weightMatch) {
    const parts = weightMatch[1]
      .split(/[,\s]+/)
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n) && n > 0)
    r.filamentGrams = parts.reduce((sum, g) => sum + g, 0)
    if (parts.length > 1) {
      r.materials = parts.map((g) => ({ type: '', color: '', grams: g }))
    }
  }

  return r
}

export async function parse3mf(file) {
  const r = blank(file.name)
  const buf = new Uint8Array(await file.arrayBuffer())
  const entries = await unzipAsync(buf)

  const bambuConfig = entries['Metadata/slice_info.config']
  if (bambuConfig) {
    r.source = 'bambu-3mf'
    parseBambuSliceInfo(decodeText(bambuConfig), r)
  }

  if (r.printMinutes === 0 && r.filamentGrams === 0) {
    const prusaConfigKey = Object.keys(entries).find((k) =>
      /^Metadata\/(Slic3r_PE|slic3r_pe|prusaslicer)\.config$/i.test(k),
    )
    if (prusaConfigKey) {
      r.source = r.source ?? 'prusa-3mf'
      parsePrusaConfig(decodeText(entries[prusaConfigKey]), r)
    }
  }

  const thumbKey =
    Object.keys(entries).find((k) => /^Metadata\/plate_1\.png$/i.test(k)) ??
    Object.keys(entries).find((k) => /^Metadata\/plate_\d+\.png$/i.test(k)) ??
    Object.keys(entries).find((k) => /^Metadata\/thumbnail.*\.png$/i.test(k)) ??
    Object.keys(entries).find((k) => /^Metadata\/.*\.png$/i.test(k))
  if (thumbKey) {
    r.thumbnailDataUrl = bytesToDataUrl(entries[thumbKey], 'image/png')
  }

  if (!r.source) r.source = 'bambu-3mf'
  return r
}

function parseBambuSliceInfo(xml, result) {
  try {
    const doc = new DOMParser().parseFromString(xml, 'text/xml')
    if (doc.querySelector('parsererror')) return
    const plate = doc.querySelector('plate')
    if (!plate) return

    for (const m of plate.children) {
      if (m.tagName !== 'metadata') continue
      const key = m.getAttribute('key')
      const val = m.getAttribute('value')
      if (key === 'prediction') {
        const sec = Number(val) || 0
        if (sec > 0) result.printMinutes = Math.round(sec / 60)
      } else if (key === 'weight' && result.filamentGrams === 0) {
        result.filamentGrams = Number(val) || 0
      }
    }

    const mats = []
    for (const f of plate.querySelectorAll('filament')) {
      const grams = Number(f.getAttribute('used_g')) || 0
      if (grams <= 0) continue
      mats.push({
        type: f.getAttribute('type') || '',
        color: f.getAttribute('color') || '',
        grams,
      })
    }
    if (mats.length) {
      result.materials = mats
      const summed = mats.reduce((s, m) => s + m.grams, 0)
      if (summed > 0) result.filamentGrams = summed
    }
  } catch (err) {
    console.error('parseBambuSliceInfo failed:', err)
  }
}

function parsePrusaConfig(text, result) {
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue

    if (result.printMinutes === 0) {
      const tm = line.match(/^estimated[_ ]printing[_ ]time[^=]*=\s*(.+)$/i)
      if (tm) result.printMinutes = parseHmsToMinutes(tm[1])
    }
    if (result.filamentGrams === 0) {
      const wm =
        line.match(/^total[_ ]filament[_ ]used[^=]*=\s*([\d.,\s]+)/i) ??
        line.match(/^filament[_ ]used\[g\]\s*=\s*([\d.,\s]+)/i)
      if (wm) {
        const parts = wm[1]
          .split(/[,\s]+/)
          .map(Number)
          .filter((n) => Number.isFinite(n) && n > 0)
        result.filamentGrams = parts.reduce((s, g) => s + g, 0)
        if (parts.length > 1) {
          result.materials = parts.map((g) => ({ type: '', color: '', grams: g }))
        }
      }
    }
  }
}

export async function parseSlicerFile(file) {
  const lower = (file?.name || '').toLowerCase()

  if (lower.endsWith('.3mf')) {
    return parse3mf(file)
  }
  if (lower.endsWith('.gcode') || lower.endsWith('.gco')) {
    const text = await file.text()
    return parseGcode(text, file.name)
  }

  try {
    const out = await parse3mf(file)
    if (out.printMinutes || out.filamentGrams || out.thumbnailDataUrl) return out
  } catch (_) {
    /* fall through */
  }
  try {
    const text = await file.text()
    return parseGcode(text, file.name)
  } catch (err) {
    console.error('parseSlicerFile: unable to parse', file?.name, err)
  }
  return blank(file?.name || '')
}
