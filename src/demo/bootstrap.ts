import { Abra, samplePromo } from "../sdk";

const root = document.querySelector("#abra-root");
const subtotalInput = document.querySelector<HTMLInputElement>("#subtotal");
const readout = document.querySelector("#subtotal-readout");

if (!root || !subtotalInput || !readout) {
  throw new Error("Storefront demo is missing a required element.");
}

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const readSubtotal = () => Number(subtotalInput.value);

const renderReadout = () => {
  readout.textContent = formatMoney(readSubtotal());
};

Abra.init({
  target: root,
  config: samplePromo,
  subtotal: readSubtotal(),
});
renderReadout();

subtotalInput.addEventListener("input", () => {
  renderReadout();
  Abra.update({ subtotal: readSubtotal() });
});
