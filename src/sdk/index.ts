import { AbraPromoElement } from "./abra-promo";
import type { PromoConfig } from "./types";

export { AbraPromoElement } from "./abra-promo";
export { getProgress } from "./progress";
export type { Progress } from "./progress";
export { samplePromo } from "./types";
export type { PromoConfig } from "./types";

/** Placeholder version. Treat the public surface you ship as 1.0.0. */
export const SDK_VERSION = "1.0.0";

export type AbraInitOptions = {
  target: Element;
  config: PromoConfig;
  subtotal: number;
};

export type AbraUpdatedOptions = {
  subtotal?: number;
  config?: PromoConfig;
}

export type AbraEventMap = {
  "abra:apply": CustomEvent<{ promoCode: string }>;
  "abra:dismiss": CustomEvent<null>;

};

export type AbraEventName = keyof AbraEventMap;

export type AbraEventHandler<K extends AbraEventName> = (
  event: AbraEventMap[K],
) => void;

let mounted: AbraPromoElement | null = null;

const listeners = new Map<AbraEventName, Set<EventListener>>();

/**
 * Placeholder host API so the admin and the demo page can boot.
 * Replace it with the public SDK you design, and keep those call sites working.
 * The storefront must not depend on React.
 */
export const Abra = {
  version: SDK_VERSION,

  init(options: AbraInitOptions): AbraPromoElement {
    this.destroy();

    const element = document.createElement("abra-promo") as AbraPromoElement;

    element.config = options.config;
    element.subtotal = options.subtotal;


    // element.dataset.stub = "true";
    options.target.replaceChildren(element);
    mounted = element;

    listeners.forEach((handlers, event) => {
      handlers.forEach((handler) => {
        element.addEventListener(event, handler);
      })
    })

    return element;
  },

  update(options: AbraUpdatedOptions): void {
    if (!mounted)
      throw new Error("Abra SDK has not been initialized. Call Abra.init() first.",)

    if (options.config)
      mounted.config = options.config

    if (options.subtotal !== undefined)
      mounted.subtotal = options.subtotal
    // The finished SDK updates the mounted widget in place.
  },

  destroy(): void {
    if (mounted) {
      listeners.forEach((handlers, event) => {
        handlers.forEach((handler) => {
          mounted!.removeEventListener(event, handler);
        });
      });

      mounted.remove();
      mounted = null;
    }

    listeners.clear();
  },

  on<K extends AbraEventName>(event: K, handler: AbraEventHandler<K>): () => void {
    const eventHandler = handler as EventListener;

    if (!listeners.has(event))
      listeners.set(event, new Set());

    listeners.get(event)!.add(eventHandler);

    mounted?.addEventListener(event, eventHandler);

    return () => this.off(event, handler);
  },

  off<K extends AbraEventName>(
    event: K,
    handler: AbraEventHandler<K>,
  ): void {
    const eventHandler = handler as EventListener;

    mounted?.removeEventListener(event, eventHandler);

    listeners.get(event)?.delete(eventHandler);
  },
};
