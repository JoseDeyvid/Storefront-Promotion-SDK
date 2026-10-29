/**
 * Placeholder custom element. The finished widget renders the gift message,
 * updates in place, and emits `abra:apply` and `abra:dismiss` from inside
 * this shadow root. Those events have to be observable on the element itself.
 */
export class AbraPromoElement extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        color: #111827;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        line-height: 1.4;
      }
      p { margin: 0; }
    `;

    const message = document.createElement("p");
    message.textContent = "abra-promo: not implemented";

    root.append(style, message);
  }
}

if (!customElements.get("abra-promo")) {
  customElements.define("abra-promo", AbraPromoElement);
}
