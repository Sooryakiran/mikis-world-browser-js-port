import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:4174", headless: true, viewport: { width: 1280, height: 900 } },
  webServer: {
    command: "PORT=4174 node server.mjs",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: false,
  },
});
