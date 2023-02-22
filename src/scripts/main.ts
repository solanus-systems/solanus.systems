import "../styles/main.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

import * as bootstrap from "bootstrap"
import WaitlistForm from "./waitlist"

// Handle waitlist form submissions
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlist-form")
  if (form) new WaitlistForm(form as HTMLFormElement)
})
