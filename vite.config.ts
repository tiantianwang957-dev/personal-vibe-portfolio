import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        hisense: resolve(import.meta.dirname, "cases/hisense.html"),
        aigc: resolve(import.meta.dirname, "cases/aigc.html"),
        usage: resolve(import.meta.dirname, "cases/usage-platform.html"),
        park: resolve(import.meta.dirname, "cases/pocket-park.html"),
        weibo: resolve(import.meta.dirname, "cases/weibo.html"),
        photography: resolve(import.meta.dirname, "cases/photography.html"),
        jdhome: resolve(import.meta.dirname, "cases/jd-home.html"),
      },
    },
  },
});
