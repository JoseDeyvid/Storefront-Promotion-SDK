/**
 * Partner snippet — starter only.
 *
 * Replace the comments below with a short script a third-party developer can
 * paste into a storefront that does not run React. The finished snippet has
 * to match the public API you document in the README.
 *
 * The element contract is fixed:
 *   - tag: <abra-promo>
 *   - apply action emits "abra:apply" and includes the promo code
 *   - dismiss action emits "abra:dismiss"
 *   - both events are observable on the custom element, outside the shadow root
 *
 * A possible SDK shape, which you may keep or replace:
 *
 *   Abra.init({
 *     target: document.querySelector("#abra-root"),
 *     config: {
 *       threshold: 75,
 *       rewardLabel: "free tote",
 *       code: "GIFT75",
 *       colors: { background: "#111827", text: "#f9fafb", accent: "#f59e0b" },
 *     },
 *     subtotal: 57,
 *   });
 *
 *   Abra.update({ subtotal: 60 });
 *
 *   const unsubscribe = Abra.on("abra:apply", (event) => {
 *     // read the promo code from the event
 *   });
 *
 *   Abra.on("abra:dismiss", () => {});
 *
 *   unsubscribe();
 *   Abra.destroy();
 */
