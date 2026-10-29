import type { PromoConfig } from "./types";

export { AbraPromoElement } from "./abra-promo";
export { getProgress } from "./progress";
export type { Progress } from "./progress";
export { samplePromo } from "./types";
export type { PromoConfig } from "./types";

/** Placeholder version. Treat the public surface you ship as 1.0.0. */
export const SDK_VERSION = "0.0.0";

export type AbraInitOptions = {
  target: Element;
  config: PromoConfig;
  subtotal: number;
};

let mounted: HTMLElement | null = null;

/**
 * Placeholder host API so the admin and the demo page can boot.
 * Replace it with the public SDK you design, and keep those call sites working.
 * The storefront must not depend on React.
 */
export const Abra = {
  version: SDK_VERSION,

  init(options: AbraInitOptions) {
    const element = document.createElement("abra-promo");
    element.dataset.stub = "true";
    options.target.replaceChildren(element);
    mounted = element;
  },

  update(_cart: { subtotal: number }) {
    // The finished SDK updates the mounted widget in place.
  },

  destroy() {
    mounted?.remove();
    mounted = null;
  },

  on(_event: string, _handler: EventListener) {
    return () => {};
  },

  off(_event: string, _handler: EventListener) {
    // The finished SDK removes the subscription created by `on`.
  },
};
