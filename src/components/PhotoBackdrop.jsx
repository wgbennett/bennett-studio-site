import { PHOTOS } from '../photos.js'

// The full-bleed photographic backdrop behind a hero, plus its scrim stack.
//
// Used by the landing hero and by all four app-page heroes, so the treatment is
// defined once. If the scrims drift apart per page, the copy stops being
// legible on some of them and nobody notices until a screenshot.
//
// PLACEHOLDER-SAFE BY DESIGN. `PHOTOS[slug]` is null until a real photograph
// lands in photo-assets/ and scripts/photos.mjs has run. With no photo this
// renders a charcoal field carrying the same scrim stack, which means the
// layout, the type sizes and the contrast measurements are all final BEFORE any
// image exists — dropping a file in changes only what is behind the copy.
//
// The scrims are ink, never black: pure black over a warm photograph turns it
// grey and drags it out of the bone/ink/copper family. Four layers, each with a
// job:
//   1. horizontal — heavy under the copy on the left, clearing to the right, so
//      the photograph is actually visible somewhere.
//   2. flat wash  — mobile only, where copy spans the full width and there is
//      no "right side" to clear to.
//   3. top band   — the overlay nav sits here and has to stay readable against
//      whatever the photo happens to be doing.
//   4. bottom fade — DARKENS toward the bottom edge, it does not lighten. The
//      first version faded to bone to blend into the section below, and washed
//      out the section index sitting on top of it: bone/55 text over a bone/95
//      scrim is invisible. Everything overlaid on a hero is light, so the
//      backdrop has to stay dark the whole way down. The join to the bone
//      section below is a deliberate hard edge — which is what the reference
//      does between its bands anyway.
export default function PhotoBackdrop({ slug, alt = '', priority = false }) {
  const photo = PHOTOS[slug] ?? null

  return (
    <>
      {photo ? (
        <img
          src={photo.src}
          alt={alt || photo.alt}
          // The hero image is the largest paint on the page; letting it load
          // lazily guarantees a flash of empty scrim on first view.
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-charcoal">
          {/* Same blueprint grid the rest of the site uses, held well back. It
              reads as a considered surface rather than a missing image, which
              is the whole point of shipping before the photos arrive. */}
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #F5F1EA 1px, transparent 1px), linear-gradient(to bottom, #F5F1EA 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(64% 52% at 32% 42%, rgba(184,69,31,0.16), rgba(184,69,31,0) 70%)' }}
          />
        </div>
      )}

      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/15" />
      <div aria-hidden className="absolute inset-0 bg-ink/45 lg:hidden" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/85 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent" />
    </>
  )
}
