import "../styles/main.scss"
import * as bootstrap from "bootstrap"
import WaitlistForm from "./waitlist"

// Handle waitlist form submissions
document.addEventListener("DOMContentLoaded", () => {
  const form = <HTMLFormElement>document.getElementById("waitlist-form")
  new WaitlistForm(form)
})
