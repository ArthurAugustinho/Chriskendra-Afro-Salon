import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (npm run build first).
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4321",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4321",
    reuseExistingServer: true,
  },
});
