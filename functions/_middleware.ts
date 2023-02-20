import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms"

// Intercept form submissions for the waitlist and store them in KV
export const onRequest: PagesFunction = staticFormsPlugin({
  respondWith: ({ formData }) => {
    const name = formData.get("name")
    const email = formData.get("email")

    return new Response(`Hello ${name}! We'll email you at ${email}.`)
  },
})
