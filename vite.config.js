const path = require('path')

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  publicDir: path.resolve(__dirname, 'public'),
  server: {
    port: 8080,
    hot: true
  },
}
