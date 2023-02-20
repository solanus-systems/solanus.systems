import { resolve } from "path"
import { defineConfig } from "vite"

const root = resolve(__dirname, "src")

export default defineConfig({
  root: root,
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        404: resolve(root, "404.html"),
      },
    },
  },
  publicDir: resolve(__dirname, "public"),
  server: {
    port: 8080,
    hot: true,
  },
})
