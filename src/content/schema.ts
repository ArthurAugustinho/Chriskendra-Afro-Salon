import { z } from "astro/zod";

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:MM");

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const openDay = z.object({ day: z.enum(days), open: time, close: time });
const closedDay = z.object({ day: z.enum(days), closed: z.literal(true) });

const priceItem = z.object({
  name: z.string().min(1),
  // null = not listed or unreadable: the page shows "Ask for a price".
  price: z.number().positive().nullable(),
});

export const siteSchema = z.object({
  business: z.object({
    name: z.string(),
    nameOnGoogle: z.string(),
    wordmark: z.string(),
    descriptor: z.string(),
    schemaType: z.literal("HairSalon"),
    phone: z.string().regex(/^\+44\d{10}$/),
    phoneDisplay: z.string(),
    whatsapp: z.string().regex(/^44\d{10}$/),
    address: z.object({
      street: z.string(),
      locality: z.string(),
      region: z.string(),
      postcode: z.string(),
      country: z.literal("GB"),
    }),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    googleMapsUrl: z.url(),
    googleRating: z.object({
      value: z.number().min(0).max(5),
      count: z.number().int().positive(),
      checkedOn: z.iso.date(),
    }),
    hours: z.array(z.union([openDay, closedDay])).length(7),
    siteLanguage: z.literal("en-GB"),
  }),
  suggestedCopy: z.object({
    headline: z.string(),
    intro: z.string(),
    bookingMessage: z.string(),
    priceQuestionMessage: z.string().includes("{service}"),
    photoQuoteMessage: z.string(),
    slogan: z.string(),
  }),
  pageCopy: z.object({
    draftBanner: z.string(),
    bookButton: z.string(),
    callButton: z.string(),
    ratingLine: z.string().includes("{value}").includes("{count}"),
    pricesTitle: z.string(),
    askForPrice: z.string(),
    stylesTitle: z.string(),
    photoQuoteTitle: z.string(),
    photoQuoteText: z.string(),
    photoQuoteButton: z.string(),
    reviewsTitle: z.string(),
    reviewsSource: z.string().includes("{count}"),
    visitTitle: z.string(),
    directionsButton: z.string(),
    hoursTitle: z.string(),
    todayLabel: z.string(),
  }),
  offer: z.object({ title: z.string(), text: z.string() }),
  priceNote: z.string(),
  priceGroups: z.array(z.object({ title: z.string(), items: z.array(priceItem).min(1) })).min(1),
  photos: z
    .array(
      z.object({
        file: z.string().regex(/^photos\/[\w-]+\.(jpe?g|png|webp)$/),
        alt: z.string().min(1),
        caption: z.string().min(1),
      }),
    )
    .min(1),
  reviewThemes: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
});

export type Site = z.infer<typeof siteSchema>;
export type PriceGroup = Site["priceGroups"][number];
export type PriceItem = PriceGroup["items"][number];
export type Day = (typeof days)[number];
