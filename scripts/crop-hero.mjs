// Builds the hero close-up from the salon's own photo (the head sits in the lower
// half of the original, under the salon chair). Re-run after replacing the photo:
//   node scripts/crop-hero.mjs
import sharp from "sharp";

const source = "src/content/photos/two-strand-twists-in-salon.jpg";
const target = "src/assets/hero/two-strand-twists-in-salon-closeup.jpg";

await sharp(source)
  .extract({ left: 100, top: 330, width: 620, height: 922 })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(target);

console.log(`Wrote ${target}`);
