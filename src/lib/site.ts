import type { ImageMetadata } from "astro";
import raw from "../content/site.json";
import { siteSchema, type PriceGroup, type PriceItem } from "../content/schema";

// Fails the build with a readable message if the content file is malformed.
export const site = siteSchema.parse(raw);
export const { business, suggestedCopy: copy, pageCopy: ui } = site;

export const ratingLine = ui.ratingLine
  .replace("{value}", business.googleRating.value.toFixed(1))
  .replace("{count}", String(business.googleRating.count));

export const whatsappUrl = (message: string): string =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export const telUrl = `tel:${business.phone}`;

/** Display phone number that never breaks across lines. */
export const phoneText = business.phoneDisplay.replace(/ /g, " ");

export const bookingUrl = whatsappUrl(copy.bookingMessage);
export const photoQuoteUrl = whatsappUrl(copy.photoQuoteMessage);

export const addressLine = `${business.address.street}, ${business.address.locality} ${business.address.postcode}`;

const placeId = new URL(business.googleMapsUrl).searchParams.get("query_place_id");
export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`${business.nameOnGoogle}, ${addressLine}`) +
  (placeId ? `&destination_place_id=${placeId}` : "");

export const formatPrice = (price: number): string => `£${price}`;

/** Service name as it reads inside a sentence, e.g. "children's feed-in braids". */
export const serviceLabel = (group: PriceGroup, item: PriceItem): string => {
  const name = item.name.charAt(0).toLowerCase() + item.name.slice(1);
  return group.title === "Children's braids" ? `children's ${name}` : name;
};

export const priceQuestionUrl = (group: PriceGroup, item: PriceItem): string =>
  whatsappUrl(copy.priceQuestionMessage.replace("{service}", serviceLabel(group, item)));

export const groupSummary = (group: PriceGroup): string => {
  const prices = group.items.flatMap((i) => (i.price === null ? [] : [i.price]));
  const count = `${group.items.length} ${group.items.length === 1 ? "service" : "services"}`;
  return prices.length ? `${count}, from ${formatPrice(Math.min(...prices))}` : count;
};

const allPrices = site.priceGroups.flatMap((g) => g.items.flatMap((i) => i.price ?? []));
export const priceRange = `${formatPrice(Math.min(...allPrices))}–${formatPrice(Math.max(...allPrices))}`;

const photoFiles = import.meta.glob<ImageMetadata>("../content/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export const photos = site.photos.map((photo) => {
  const src = photoFiles[`../content/${photo.file}`];
  if (!src) throw new Error(`Photo listed in site.json not found in src/content/: ${photo.file}`);
  return { ...photo, src };
});

export const photoByFile = (file: string) => {
  const photo = photos.find((p) => p.file === file);
  if (!photo) throw new Error(`Unknown photo: ${file}`);
  return photo;
};
