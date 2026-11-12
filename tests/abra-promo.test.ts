import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { AbraPromoElement } from "../src/sdk";
import { samplePromo } from "../src/sdk";

describe("AbraPromoElement", () => {
    let promo: AbraPromoElement;

    beforeEach(() => {
        promo = document.createElement(
            "abra-promo",
        ) as AbraPromoElement;

        promo.config = samplePromo;
        promo.subtotal = 40;

        document.body.appendChild(promo)
    });

    afterEach(() => {
        document.body.replaceChildren();
    });

    it("renders the remaining amount", () => {
        const message = promo.shadowRoot?.querySelector("p");
        expect(message?.textContent).toBe("You are $35 away from a free tote.")
    })

    it("updates the message without replacing the element", () => {
        const originalElement = promo;

        promo.subtotal = 60;

        const message = promo.shadowRoot?.querySelector("p");

        expect(message?.textContent).toBe(
            "You are $15 away from a free tote.",
        );

        expect(promo).toBe(originalElement);
        expect(document.querySelectorAll("abra-promo")).toHaveLength(1);
    });

    it("dispatches abra:apply with the promo code", () => {
        const listener = vi.fn();

        promo.addEventListener("abra:apply", listener);

        const button = promo.shadowRoot?.querySelector(".apply");

        button?.dispatchEvent(
            new MouseEvent("click", { bubbles: true }),
        );

        expect(listener).toHaveBeenCalledOnce();
        expect(listener.mock.calls[0][0].detail).toEqual({
            promoCode: "GIFT75",
        });
    });

    it("dispatches abra:dismiss and hides the widget", () => {
        const listener = vi.fn();

        promo.addEventListener("abra:dismiss", listener);

        const button = promo.shadowRoot?.querySelector(".dismiss");

        button?.dispatchEvent(
            new MouseEvent("click", { bubbles: true }),
        );

        expect(listener).toHaveBeenCalledOnce();
        expect(promo.hidden).toBe(true);
    });

    it("renders its content inside Shadow DOM", () => {
        expect(promo.shadowRoot).not.toBeNull();

        const paragraph = promo.shadowRoot?.querySelector("p");
        const button = promo.shadowRoot?.querySelector("button");

        expect(paragraph).not.toBeNull();
        expect(button).not.toBeNull();

        expect(promo.querySelector("p")).toBeNull();
        expect(promo.querySelector("button")).toBeNull();
    });
})