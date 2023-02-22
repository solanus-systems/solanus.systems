import { resolve } from "path"
import { defineConfig } from "vite"
import postHtmlPlugin from "./vendor/vite-plugin-posthtml"
import include from "posthtml-include"

const root = resolve(__dirname, "src")

export default defineConfig({
  root: root,
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
      "~bootstrap-icons": resolve(__dirname, "node_modules/bootstrap-icons"),
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        about: resolve(root, "about.html"),
        404: resolve(root, "404.html"),
      },
    },
  },
  publicDir: resolve(__dirname, "public"),
  server: {
    port: 8080,
    hot: true,
  },
  plugins: [
    postHtmlPlugin({
      plugins: [include({ root })],
    }),
  ],
})
