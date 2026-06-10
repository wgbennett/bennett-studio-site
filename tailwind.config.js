/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F5F1EA',
        ink: '#1A1A1A',
        copper: '#B8451F',
        // Copper for small text on charcoal/ink bands. Brand copper is 3.2:1
        // on charcoal (fails WCAG AA's 4.5:1 for body-size text); this tint
        // hits 5.7:1 while staying in the copper family. Bone-background text
        // keeps using `copper` (4.8:1 there).
        'copper-light': '#DD7C45',
        charcoal: '#1F1B17',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        // Each row duplicates its cards, so translating by -50% loops seamlessly.
        'marquee-left':  { from: { transform: 'translateX(0)' },      to: { transform: 'translateX(-50%)' } },
        'marquee-right': { from: { transform: 'translateX(-50%)' },   to: { transform: 'translateX(0)' } },
      },
      animation: {
        'marquee-left':  'marquee-left 60s linear infinite',
        'marquee-right': 'marquee-right 60s linear infinite',
      },
    },
  },
  plugins: [],
}
