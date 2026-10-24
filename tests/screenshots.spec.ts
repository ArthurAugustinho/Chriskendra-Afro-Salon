import { test } from "@playwright/test";

// Screenshots for review in docs/screenshots/:
//   <width>-first-screen.png  what a visitor sees on arrival (fixed bar included)
//   <width>.png               the whole page (fixed bar hidden, otherwise it is
//                             stamped mid-page where the viewport happened to be)
const widths = [360, 390, 1366];

for (const width of widths) {
  test(`screenshot ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 900 ? 800 : 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `docs/screenshots/${width}-first-screen.png` });

    // Bring lazy images in before the full-page capture.
    for (const img of await page.locator("img").all()) await img.scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      const bar = document.querySelector<HTMLElement>(".action-bar");
      if (bar) bar.style.display = "none";
      window.scrollTo(0, 0);
    });
    await page.screenshot({ path: `docs/screenshots/${width}.png`, fullPage: true });
  });
}
