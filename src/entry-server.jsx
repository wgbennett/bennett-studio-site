import { StaticRouter } from 'react-router-dom/server'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import App from './App.jsx'

// Build-time SSR entry. Consumed only by scripts/prerender.mjs — the browser
// never loads this file.
//
// renderToPipeableStream (rather than renderToString) because App.jsx routes
// the four app pages through React.lazy; onAllReady waits for those dynamic
// imports to resolve, so we get the fully-rendered page instead of the
// Suspense fallback.
export function render(url) {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk
        cb()
      },
    })
    sink.on('finish', () => resolve(html))

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady() {
          pipe(sink)
        },
        onError(err) {
          reject(err)
        },
      },
    )

    // A hung render must fail the build rather than silently emit a shell.
    setTimeout(() => {
      abort()
      reject(new Error(`Prerender timed out for ${url}`))
    }, 20_000).unref()
  })
}
