import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "lib",
      fileName: "index",
    },
  },
  test: {
    environmentMatchGlobs: [["test/dom/**", "jsdom"]],
  },
});
