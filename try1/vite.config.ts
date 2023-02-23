import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    reporters: "verbose",
    setupFiles: "src/setupTests.ts",
    environmentMatchGlobs: [
      // all tests in tests/dom will run in jsdom
      ["tests/dom/**", "jsdom"],
      // all tests in tests/ with .edge.test.ts will run in edge-runtime
      ["**/*.edge.test.ts", "edge-runtime"],
      // ...
    ],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
