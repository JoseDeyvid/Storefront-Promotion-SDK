
import { Abra } from "../src/sdk";

const target = document.querySelector("#abra-root");

if (!target) {
  throw new Error("Promotion container not found.");
}

const config = {
  threshold: 75,
  rewardLabel: "free tote",
  code: "GIFT75",
  colors: {
    background: "#111827",
    text: "#f9fafb",
    accent: "#f59e0b",
  },
};

// Initialize the widget.
Abra.init({
  target,
  config,
  subtotal: 57,
});

// Subscribe to Apply.
const unsubscribeApply = Abra.on("abra:apply", (event) => {
  const { promoCode } = event.detail;

  console.log("Applying promotion:", promoCode);

  // Integrate with your own checkout/coupon API here.
});

// Subscribe to Dismiss.
const unsubscribeDismiss = Abra.on("abra:dismiss", () => {
  console.log("Promotion dismissed.");
});

// Call this whenever the cart changes.
export function updateCart(subtotal) {
  Abra.update({ subtotal });
}

// Cleanup when the integration is no longer needed.
export function destroyPromotion() {
  unsubscribeApply();
  unsubscribeDismiss();
  Abra.destroy();
}
