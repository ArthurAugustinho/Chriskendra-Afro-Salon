// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// Preview URL (docs/decisions/0003). Change to the client's domain at launch.
const site = "https://chriskendra-preview.pages.dev";

export default defineConfig({
  site,
  output: "static",
  // Keep pre-v7 whitespace handling so inline text never loses its spaces.
  compressHTML: true,
  // ~14 KB of CSS: inline it to save render-blocking requests (CSP hashes cover it).
  build: { inlineStylesheets: "always" },
  // No Markdown pages; Shiki's inline styles would also conflict with the CSP.
  markdown: { syntaxHighlight: false },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Young Serif",
      cssVariable: "--font-display",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/young-serif-latin-400-normal.woff2"],
            weight: "400",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Atkinson Hyperlegible Next",
      cssVariable: "--font-body",
      fallbacks: ["Arial", "sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2"],
            weight: "200 800",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],
  security: {
    // Hash-based CSP in a <meta> tag; header-only directives live in public/_headers.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
