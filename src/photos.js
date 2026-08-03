// The one place that says which photograph belongs to which hero.
//
// A slug maps to null until its source lands in ../photo-assets/ AND
// `npm run photos` has produced the graded WebP. Null is a supported state, not
// a broken one — PhotoBackdrop renders a designed placeholder for it, so the
// site ships and reads correctly with none of these filled in.
//
// TO TURN ONE ON: drop the source in photo-assets/ (names and search terms are
// in photo-assets/README.md), run `npm run photos`, then swap the null here for
// the object below it. Two edits, no component changes.
//
// `portrait` is the same photograph re-cropped 3:4 for phones. A 3:2 hero
// cropped by object-cover to a 9:19.5 screen keeps only the middle third of its
// width, which cut the landing shot's printer in half. PhotoBackdrop serves it
// through <picture> under 900px.
//
// Alt text is written here rather than at the call site because it describes
// the PHOTOGRAPH, and the photograph is what this file owns. Each hero also
// carries its own headline in real text, so these images are decorative
// support — keep the alt short and concrete, and never restate the headline.

export const PHOTOS = {
  // Landing hero.
  home: { src: '/photos/hero-workshop.webp', portrait: '/photos/hero-workshop-portrait.webp', alt: 'A workshop bench with a 3D printer mid-print, spools and finished parts around it.' },

  // Each app's photograph is used TWICE — on its card in the landing grid and
  // as the backdrop of its own page hero. One image per app, not two: the photo
  // becomes that app's visual identity, so a card and the page it opens are
  // recognisably the same thing.
  marginprint: { src: '/photos/app-marginprint.webp', portrait: '/photos/app-marginprint-portrait.webp', alt: 'A 3D printer hot-end laying down a layer, close up.' },

  marketday: { src: '/photos/app-marketday.webp', portrait: '/photos/app-marketday-portrait.webp', alt: 'A market stall table covered with handmade goods for sale.' },

  benchstock: { src: '/photos/app-benchstock.webp', portrait: '/photos/app-benchstock-portrait.webp', alt: 'A wall of old wooden index drawers, each one labelled.' },

  makerbooks: { src: '/photos/app-makerbooks.webp', portrait: '/photos/app-makerbooks-portrait.webp', alt: 'An open notebook, calculator and printed figures on a desk.' },
}
