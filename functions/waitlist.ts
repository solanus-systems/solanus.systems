import { sendEmail } from "@cloudflare/pages-plugin-mailchannels/api"

// @ts-ignore
import template from "./waitlist-email.html"

// Environment variables set in the Pages dashboard
interface Env {
  DKIM_PRIVATE_KEY: string
}

// Send an email to the address provided in the waitlist form
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const formData = await context.request.formData()
  const email = formData.get("email")
  const name = formData.get("name")

  if (!formData.get("email"))
    return new Response("Email is required", { status: 400 })
  if (!formData.get("name"))
    return new Response("Name is required", { status: 400 })

  await sendEmail({
    personalizations: [
      {
        to: [{ email, name }],
        dkim_domain: "solanus.systems",
        dkim_selector: "mailchannels",
        dkim_private_key: context.env.DKIM_PRIVATE_KEY,
      },
    ],
    from: {
      email: "info@solanus.systems",
      name: "Solanus",
    },
    subject: "Thanks for your interest in Solanus",
    content: [
      {
        type: "text/html",
        value: template,
      },
    ],
  })

  return new Response(`Email sent to ${name} (${email})`)
}
