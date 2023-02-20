// Adapted from vite-plugin-posthtml
// https://github.com/chromeos/static-site-scaffold-modules/blob/main/modules/vite-plugin-posthtml/index.js

import posthtml from "posthtml"
import { Plugin, Options } from "posthtml"

// Options to pass to the posthtml renderer
interface PostHtmlPluginOptions {
  plugins?: Plugin<any>[]
  renderOptions?: Options
}

export default function postHtmlPlugin(options: PostHtmlPluginOptions = {}) {
  const plugins = options.plugins || []
  const renderOptions = options.renderOptions || {}
  renderOptions.sync = false

  return {
    name: "posthtml",
    enforce: "post",
    async transformIndexHtml(input) {
      const { html } = await posthtml(plugins).process(input, renderOptions)
      return html
    },
  }
}
