// Lighthouse (mobile, default throttling) against the local production build.
// Usage: npm run build && npm run preview   (in another terminal)
//        npm run lighthouse [url]
import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { mkdirSync, writeFileSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:4321/";
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox"],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: ["json", "html"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result) throw new Error("Lighthouse returned no result");

  mkdirSync("reports/lighthouse", { recursive: true });
  const [json, html] = result.report;
  writeFileSync("reports/lighthouse/mobile.json", json);
  writeFileSync("reports/lighthouse/mobile.html", html);

  const { categories, audits } = result.lhr;
  for (const c of Object.values(categories)) {
    console.log(`${c.title.padEnd(16)} ${Math.round((c.score ?? 0) * 100)}`);
  }
  for (const id of [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
    "speed-index",
  ]) {
    console.log(`  ${audits[id]?.title}: ${audits[id]?.displayValue}`);
  }
  const failing = Object.values(audits).filter(
    (a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative",
  );
  if (failing.length)
    console.log("\nBelow 0.9:", failing.map((a) => `${a.id} (${a.score})`).join(", "));
} finally {
  chrome.kill();
}
