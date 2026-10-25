import { defineConfig, devices } from "@playwright/test";

// Default: the local production build (npm run build first).
// Against a deployed site: BASE_URL=https://chriskendra-preview.pages.dev npm test
const remote = process.env["BASE_URL"];

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: remote ?? "http://localhost:4321",
    ...devices["Desktop Chrome"],
  },
  ...(remote
    ? {}
    : {
        webServer: {
          command: "npm run preview",
          url: "http://localhost:4321",
          reuseExistingServer: true,
        },
      }),
});
