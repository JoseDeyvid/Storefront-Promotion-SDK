
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
  } from "vitest";
  
  import { Abra, samplePromo } from "../src/sdk";
  
  describe("Abra SDK", () => {
    let target: HTMLDivElement;
  
    beforeEach(() => {
      target = document.createElement("div");
      document.body.appendChild(target);
    });
  
    afterEach(() => {
      Abra.destroy();
      document.body.replaceChildren();
    });
  
    it("exposes the correct SDK version", () => {
      expect(Abra.version).toBe("1.0.0");
    });
  
    it("initializes the promotion widget", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      expect(element.tagName.toLowerCase()).toBe("abra-promo");
      expect(target.querySelectorAll("abra-promo")).toHaveLength(1);
  
      const message = element.shadowRoot?.querySelector("p");
  
      expect(message?.textContent).toBe(
        "You are $35 away from a free tote.",
      );
    });
  
    it("updates the existing widget", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      Abra.update({ subtotal: 60 });
  
      const message = element.shadowRoot?.querySelector("p");
  
      expect(message?.textContent).toBe(
        "You are $15 away from a free tote.",
      );
  
      expect(target.querySelectorAll("abra-promo")).toHaveLength(1);
      expect(target.querySelector("abra-promo")).toBe(element);
    });
  
    it("updates the widget configuration", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 75,
      });
  
      Abra.update({
        config: {
          ...samplePromo,
          rewardLabel: "free backpack",
        },
      });
  
      const message = element.shadowRoot?.querySelector("p");
  
      expect(message?.textContent).toBe(
        "Your free backpack is unlocked!",
      );
    });
  
    it("subscribes to the apply event", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      const handler = vi.fn();
  
      Abra.on("abra:apply", handler);
  
      const button = element.shadowRoot?.querySelector<HTMLButtonElement>(
        ".apply",
      );
  
      button?.click();
  
      expect(handler).toHaveBeenCalledOnce();
      expect(handler.mock.calls[0][0].detail).toEqual({
        promoCode: "GIFT75",
      });
    });
  
    it("subscribes to the dismiss event", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      const handler = vi.fn();
  
      Abra.on("abra:dismiss", handler);
  
      const button = element.shadowRoot?.querySelector<HTMLButtonElement>(
        ".dismiss",
      );
  
      button?.click();
  
      expect(handler).toHaveBeenCalledOnce();
      expect(element.hidden).toBe(true);
    });
  
    it("removes an event subscription with off", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      const handler = vi.fn();
  
      Abra.on("abra:apply", handler);
      Abra.off("abra:apply", handler);
  
      element.shadowRoot
        ?.querySelector<HTMLButtonElement>(".apply")
        ?.click();
  
      expect(handler).not.toHaveBeenCalled();
    });
  
    it("returns an unsubscribe function from on", () => {
      const element = Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      const handler = vi.fn();
  
      const unsubscribe = Abra.on("abra:apply", handler);
  
      unsubscribe();
  
      element.shadowRoot
        ?.querySelector<HTMLButtonElement>(".apply")
        ?.click();
  
      expect(handler).not.toHaveBeenCalled();
    });
  
    it("removes the widget when destroyed", () => {
      Abra.init({
        target,
        config: samplePromo,
        subtotal: 40,
      });
  
      Abra.destroy();
  
      expect(target.querySelector("abra-promo")).toBeNull();
    });
  
    it("throws when update is called before initialization", () => {
      expect(() => Abra.update({ subtotal: 60 })).toThrow(
        "Abra SDK has not been initialized.",
      );
    });
  });
  