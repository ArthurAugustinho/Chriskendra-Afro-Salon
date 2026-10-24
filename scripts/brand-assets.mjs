// Builds the site's logo and icon files from the owner's original logo mark.
// Re-run after replacing the source file:  node scripts/brand-assets.mjs
import sharp from "sharp";

const source = "briefing/brand/logo-mark-redrawn.png";
const cocoa = "#3B2117";

// Mark for the header lockup: transparent padding trimmed; astro:assets makes AVIF/WebP.
const mark = await sharp(source).trim().resize({ height: 480 }).png().toBuffer();
await sharp(mark).toFile("src/assets/brand/logo-mark.png");

// Icons: the gold mark on the cocoa of the logo background.
const icon = async (size, radius, file) => {
  const inner = Math.round(size * 0.8);
  const markPng = await sharp(mark)
    .resize({
      width: inner,
      height: inner,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${cocoa}"/></svg>`,
  );
  await sharp(tile)
    .composite([{ input: markPng, gravity: "center" }])
    .png()
    .toFile(file);
};

await icon(48, 10, "public/favicon.png");
await icon(180, 0, "public/apple-touch-icon.png");

console.log(
  "Wrote src/assets/brand/logo-mark.png, public/favicon.png, public/apple-touch-icon.png",
);
