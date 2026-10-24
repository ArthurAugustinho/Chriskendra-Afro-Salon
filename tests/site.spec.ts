import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import site from "../src/content/site.json" with { type: "json" };

const WA = `https://wa.me/${site.business.whatsapp}?text=`;
const itemCount = site.priceGroups.reduce((n, g) => n + g.items.length, 0);

const scrollThrough = async (page: Page) => {
  for (const img of await page.locator("img").all()) await img.scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");
};

test.describe("phone (360px)", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test("no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    const { scroll, client } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(scroll).toBeLessThanOrEqual(client);
  });

  test("touch targets are at least 44px", async ({ page }) => {
    await page.goto("/");
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("a, button, summary")]
        .filter((el) => el.offsetParent !== null && !el.classList.contains("skip"))
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.height < 44 || r.width < 44)
        .map(
          ({ el, r }) => `${el.textContent?.trim()} ${Math.round(r.width)}x${Math.round(r.height)}`,
        ),
    );
    expect(small).toEqual([]);
  });

  test("fixed WhatsApp and Call bar is visible", async ({ page }) => {
    await page.goto("/");
    const bar = page.locator(".action-bar");
    await expect(bar).toBeVisible();
    await expect(bar.locator(`a[href^="${WA}"]`)).toBeVisible();
    await expect(bar.locator(`a[href="tel:${site.business.phone}"]`)).toBeVisible();
  });
});

test("desktop hides the fixed bar", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  await expect(page.locator(".action-bar")).toBeHidden();
});

test("no request leaves the site while loading and scrolling", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (req) => {
    const url = new URL(req.url());
    if (url.protocol !== "data:" && url.host !== "localhost:4321") external.push(req.url());
  });
  await page.goto("/");
  await scrollThrough(page);
  expect(external).toEqual([]);
});

test("no cookies are set", async ({ page, context }) => {
  await page.goto("/");
  await scrollThrough(page);
  expect(await context.cookies()).toEqual([]);
});

test("draft and SEO basics", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.getByText(site.pageCopy.draftBanner)).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page).toHaveTitle(new RegExp(site.business.nameOnGoogle));
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Croydon/);
});

test("heading levels never skip", async ({ page }) => {
  await page.goto("/");
  const levels = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
  expect(levels[0]).toBe(1);
  levels.forEach((level, i) => {
    if (i > 0) expect(level - (levels[i - 1] ?? 1)).toBeLessThanOrEqual(1);
  });
});

test("JSON-LD HairSalon without aggregateRating", async ({ page }) => {
  await page.goto("/");
  const data = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(data["@type"]).toBe("HairSalon");
  expect(data.name).toBe(site.business.nameOnGoogle);
  expect(data.telephone).toBe(site.business.phone);
  expect(data.address.postalCode).toBe(site.business.address.postcode);
  expect(data.geo.latitude).toBe(site.business.geo.lat);
  expect(data.hasMap).toBe(site.business.googleMapsUrl);
  expect(data.openingHoursSpecification).toHaveLength(6);
  expect(data).not.toHaveProperty("aggregateRating");
  expect(JSON.stringify(data)).not.toContain("Rating");
});

test("all 6 price groups and 37 items, with WhatsApp links for unknown prices", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#prices details")).toHaveCount(site.priceGroups.length);
  await expect(page.locator("#prices li.item")).toHaveCount(itemCount);
  expect(itemCount).toBe(37);

  const unknown = site.priceGroups.flatMap((g) => g.items.filter((i) => i.price === null));
  const asks = page.locator(".item__ask");
  await expect(asks).toHaveCount(unknown.length);
  for (const href of await asks.evaluateAll((els) => els.map((a) => a.getAttribute("href")))) {
    expect(href).toMatch(new RegExp(`^${WA.replace(/[.?]/g, "\\$&")}`));
    const text = new URL(href ?? "").searchParams.get("text");
    expect(text).toMatch(/^Hi, could I get a price for .+\?$/);
  }
  await expect(page.getByText(site.offer.title)).toBeVisible();
  await expect(page.getByText(site.priceNote)).toBeVisible();
});

test("booking, photo quote and call links", async ({ page }) => {
  await page.goto("/");
  const booking = WA + encodeURIComponent(site.suggestedCopy.bookingMessage);
  const photo = WA + encodeURIComponent(site.suggestedCopy.photoQuoteMessage);
  expect(await page.locator(`a[href="${booking}"]`).count()).toBeGreaterThanOrEqual(2);
  await expect(page.locator(`a[href="${photo}"]`)).toHaveCount(1);
  expect(await page.locator(`a[href="tel:${site.business.phone}"]`).count()).toBeGreaterThanOrEqual(
    2,
  );
});

test("gallery: 8 photos with captions and descriptive alt", async ({ page }) => {
  await page.goto("/");
  const figures = page.locator("#styles figure");
  await expect(figures).toHaveCount(site.photos.length);
  for (const [i, photo] of site.photos.entries()) {
    await expect(figures.nth(i).locator("img")).toHaveAttribute("alt", photo.alt);
    await expect(figures.nth(i).locator("figcaption")).toHaveText(photo.caption);
  }
});

test("images: AVIF/WebP, dimensions, lazy below the fold, hero first", async ({ page }) => {
  await page.goto("/");
  const imgs = await page.locator("img").evaluateAll((els) =>
    els.map((img) => ({
      width: img.getAttribute("width"),
      height: img.getAttribute("height"),
      loading: img.getAttribute("loading"),
      priority: img.getAttribute("fetchpriority"),
      inGallery: !!img.closest("#styles"),
      types: [...(img.parentElement?.querySelectorAll("source") ?? [])].map((s) => s.type),
    })),
  );
  for (const img of imgs) {
    expect(Number(img.width)).toBeGreaterThan(0);
    expect(Number(img.height)).toBeGreaterThan(0);
    expect(img.types).toEqual(["image/avif", "image/webp"]);
    if (img.inGallery) expect(img.loading).toBe("lazy");
  }
  expect(imgs[0]?.priority).toBe("high");
  expect(imgs[0]?.loading).toBe("eager");
});

test("reviews: themes only, no quotes or names", async ({ page }) => {
  await page.goto("/");
  for (const theme of site.reviewThemes) await expect(page.getByText(theme.title)).toBeVisible();
  await expect(page.locator("blockquote, q")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Summarised from 7 reviews on Google" }),
  ).toHaveAttribute("href", site.business.googleMapsUrl);
});

test.describe("opening status in Europe/London", () => {
  const cases = [
    // 2026-10-26 is a Monday, after the clocks go back (London = UTC).
    { at: "2026-10-26T09:00:00Z", day: "Monday", text: "Closed now. Opens today at 10am" },
    { at: "2026-10-26T12:00:00Z", day: "Monday", text: "Open now until 6pm" },
    // Saturday 2026-10-24, still BST (UTC+1): 20:30 UTC is 21:30 in London.
    { at: "2026-10-24T20:30:00Z", day: "Saturday", text: "Closed now. Opens Monday at 10am" },
    { at: "2026-10-24T19:30:00Z", day: "Saturday", text: "Open now until 9pm" },
    { at: "2026-10-25T12:00:00Z", day: "Sunday", text: "Closed now. Opens tomorrow at 10am" },
  ];
  for (const c of cases) {
    test(`${c.at} -> ${c.text}`, async ({ page }) => {
      await page.clock.setFixedTime(new Date(c.at));
      await page.goto("/");
      await expect(page.locator("[data-open-status]")).toHaveText(c.text);
      const today = page.locator('tr[aria-current="date"]');
      await expect(today).toHaveCount(1);
      await expect(today.locator("th")).toContainText(c.day);
    });
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("hours table still shows, status stays hidden", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("table.hours tr")).toHaveCount(7);
    await expect(page.locator("[data-open-status]")).toBeHidden();
    await expect(page.locator("#prices details").first()).toHaveAttribute("open", "");
  });
});

test("keyboard focus is visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const s = getComputedStyle(el);
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
  });
  expect(outline.style).not.toBe("none");
  expect(outline.width).toBeGreaterThanOrEqual(2);
});

for (const width of [360, 1366]) {
  test(`axe: no WCAG 2.x A/AA violations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page
      .locator("#prices details")
      .evaluateAll((els) => els.forEach((el) => el.setAttribute("open", "")));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}
