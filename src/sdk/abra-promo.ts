
import type { PromoConfig } from "./types";
import { getProgress } from "./progress";

export class AbraPromoElement extends HTMLElement {
  private _config: PromoConfig | null = null;
  private _subtotal = 0;

  private messageElement: HTMLParagraphElement;
  private applyButton: HTMLButtonElement;
  private dismissButton: HTMLButtonElement;

  constructor() {
    super();

    const root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    style.textContent = `
      :host {
        display: block;
        padding: 16px;
        border-radius: 8px;
        background: var(--promo-background);
        color: var(--promo-text);
        border-left: 4px solid var(--promo-accent);
        font-family: system-ui, sans-serif;
        font-size: 14px;
        line-height: 1.4;
      }

      :host([hidden]) {
        display: none;
      }

      p {
        margin: 0 0 12px;
      }

      button {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font: inherit;
      }

      .apply {
        background: var(--promo-accent);
        color: var(--promo-background);
      }

      .dismiss {
        margin-left: 8px;
      }
    `;

    this.messageElement = document.createElement("p");
    this.messageElement.textContent =
      "Configure a promotion to see the message.";

    this.applyButton = document.createElement("button");
    this.applyButton.type = "button";
    this.applyButton.className = "apply";
    this.applyButton.textContent = "Apply code";

    this.dismissButton = document.createElement("button");
    this.dismissButton.type = "button";
    this.dismissButton.className = "dismiss";
    this.dismissButton.textContent = "Dismiss";

    // Notify the merchant that the shopper wants to apply the code.
    this.applyButton.addEventListener("click", () => {
      if (!this._config) return;

      this.dispatchEvent(
        new CustomEvent("abra:apply", {
          detail: {
            promoCode: this._config.code,
          },
          bubbles: true,
          composed: true,
        }),
      );
    });

    // Hide the widget and notify the merchant.
    this.dismissButton.addEventListener("click", () => {
      this.hidden = true;

      this.dispatchEvent(
        new CustomEvent("abra:dismiss", {
          detail: null,
          bubbles: true,
          composed: true,
        }),
      );
    });

    root.append(
      style,
      this.messageElement,
      this.applyButton,
      this.dismissButton,
    );
  }

  set config(value: PromoConfig) {
    this._config = value;
    this.render();
  }

  get config(): PromoConfig | null {
    return this._config;
  }

  set subtotal(value: number) {
    this._subtotal = value;
    this.render();
  }

  get subtotal(): number {
    return this._subtotal;
  }

  private render(): void {
    if (!this._config) {
      this.messageElement.textContent =
        "Configure a promotion to see the message.";
      return;
    }

    const progress = getProgress(
      this._subtotal,
      this._config.threshold,
    );

    this.style.setProperty(
      "--promo-background",
      this._config.colors.background,
    );

    this.style.setProperty(
      "--promo-text",
      this._config.colors.text,
    );

    this.style.setProperty(
      "--promo-accent",
      this._config.colors.accent,
    );

    if (progress.completed) {
      this.messageElement.textContent =
        `Your ${this._config.rewardLabel} is unlocked!`;
    } else {
      this.messageElement.textContent =
        `You are $${progress.remaining} away from a ${this._config.rewardLabel}.`;
    }
  }
}

if (!customElements.get("abra-promo")) {
  customElements.define("abra-promo", AbraPromoElement);
}
