// Simple dynamic form that submits to a Pages worker
export default class WaitlistForm {
  element: HTMLFormElement
  containerElement: HTMLElement
  honeypotInput: HTMLInputElement
  submitButton: HTMLButtonElement
  emailLinks: NodeListOf<HTMLLinkElement>

  readonly states = ["loading", "success", "error"]
  readonly contactEmail = "info@solanus.systems"

  constructor(element: HTMLFormElement) {
    this.element = element
    this.containerElement = element.parentElement
    this.honeypotInput = element.querySelector<HTMLInputElement>(
      "input[name=address]"
    )
    this.submitButton = element.querySelector<HTMLButtonElement>(
      "button[type=submit]"
    )
    this.emailLinks = <NodeListOf<HTMLLinkElement>>(
      this.containerElement.querySelectorAll("a.email")
    )
    this.element.addEventListener("submit", this.onSubmit.bind(this))
  }

  async onSubmit(event: Event) {
    // Prevent default form submission
    event.preventDefault()

    // If the honeypot field was filled out, do nothing
    if (this.honeypotInput.value) return

    // Disable the submit button and set the loading status
    this.submitButton.setAttribute("disabled", "")
    this.setState("loading")

    // POST the data to the worker
    const response = await fetch(this.element.action, {
      method: "POST",
      body: new FormData(this.element),
    })

    // Update the email links with our contact email. We do this dynamically
    // so that bots can't scrape it from the page.
    this.emailLinks.forEach((emailLink) => {
      emailLink.textContent = this.contactEmail
      emailLink.href = `mailto:${this.contactEmail}`
    })

    // Set state based on the response
    response.ok ? this.setState("success") : this.setState("error")
  }

  // Set the form state via a class; the rest is handled in CSS
  setState(state: string) {
    this.containerElement.classList.remove(...this.states)
    this.containerElement.classList.add(state)
  }
}
