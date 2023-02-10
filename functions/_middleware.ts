import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels"

// @ts-ignore
import template from "./waitlist-email.html"

// Environment variables set in the Pages dashboard
interface Env {
  DKIM_PRIVATE_KEY: string
}

// Send an email to the address provided in the waitlist form
export const onRequest: PagesFunction<Env> = (context) =>
  mailChannelsPlugin({
    personalizations: ({ formData }) => {
      return [
        {
          to: [{ email: formData.get("email"), name: formData.get("name") }],
          dkim_domain: "solanus.systems",
          dkim_selector: "mailchannels",
          dkim_private_key: context.env.DKIM_PRIVATE_KEY,
        },
      ]
    },
    from: {
      email: "info@solanus.systems",
      name: "Solanus",
    },
    subject: "Thanks for your interest in Solanus",
    content: () => [
      {
        type: "text/html",
        value: template,
      },
    ],
    respondWith: ({ request, formData }) => {
      if (request.method !== "POST")
        return new Response("Method not allowed", { status: 405 })

      return new Response(`Email sent to ${formData.get("email")}`)
    },
  })(context)
