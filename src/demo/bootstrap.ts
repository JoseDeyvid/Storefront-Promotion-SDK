
import { Abra, samplePromo } from "../sdk";

const root = document.querySelector("#abra-root");
const subtotalInput =
  document.querySelector<HTMLInputElement>("#subtotal");
const readout = document.querySelector("#subtotal-readout");

if (!root || !subtotalInput || !readout) {
  throw new Error("Storefront demo is missing a required element.");
}

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const readSubtotal = () => Number(subtotalInput.value);

const renderReadout = () => {
  readout.textContent = formatMoney(readSubtotal());
};

// Initialize the widget.
Abra.init({
  target: root,
  config: samplePromo,
  subtotal: readSubtotal(),
});

renderReadout();

// Listen for Apply events.
Abra.on("abra:apply", (event) => {
  const { promoCode } = event.detail;

  console.log("Promotion applied:", promoCode);

  alert(`Promotion code ${promoCode} selected!`);
});

// Listen for Dismiss events.
Abra.on("abra:dismiss", () => {
  console.log("Promotion dismissed.");

  alert("You dismissed the promotion.");
});

// Update the widget whenever the cart subtotal changes.
subtotalInput.addEventListener("input", () => {
  renderReadout();

  Abra.update({
    subtotal: readSubtotal(),
  });
});
