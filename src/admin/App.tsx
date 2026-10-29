import { useEffect, useRef, useState } from "react";
import { Abra, samplePromo, SDK_VERSION, type PromoConfig } from "../sdk";

export function App() {
  const [config, setConfig] = useState<PromoConfig>(samplePromo);
  const [subtotal, setSubtotal] = useState(57);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = previewRef.current;
    if (!target) return;

    // Stub remounts on each change. The finished preview should update the same element in place.
    Abra.init({ target, config, subtotal });
    return () => {
      Abra.destroy();
    };
  }, [config, subtotal]);

  return (
    <main className="shell">
      <header>
        <h1>Promotion preview</h1>
        <p>Configure the gift banner. The preview mounts the storefront element.</p>
      </header>

      <div className="layout">
        <form
          className="panel"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h2>Merchant config</h2>

          <label className="field">
            Threshold (USD)
            <input
              type="number"
              min={0}
              step="0.01"
              value={config.threshold}
              onChange={(event) => {
                setConfig((current) => ({
                  ...current,
                  threshold: event.target.valueAsNumber,
                }));
              }}
            />
          </label>

          <label className="field">
            Reward
            <input
              type="text"
              value={config.rewardLabel}
              onChange={(event) => {
                setConfig((current) => ({
                  ...current,
                  rewardLabel: event.target.value,
                }));
              }}
            />
          </label>

          <label className="field">
            Promo code
            <input
              type="text"
              value={config.code}
              onChange={(event) => {
                setConfig((current) => ({
                  ...current,
                  code: event.target.value,
                }));
              }}
            />
          </label>

          <div className="colors">
            <label className="field">
              Background
              <input
                type="color"
                value={config.colors.background}
                onChange={(event) => {
                  setConfig((current) => ({
                    ...current,
                    colors: { ...current.colors, background: event.target.value },
                  }));
                }}
              />
            </label>
            <label className="field">
              Text
              <input
                type="color"
                value={config.colors.text}
                onChange={(event) => {
                  setConfig((current) => ({
                    ...current,
                    colors: { ...current.colors, text: event.target.value },
                  }));
                }}
              />
            </label>
            <label className="field">
              Accent
              <input
                type="color"
                value={config.colors.accent}
                onChange={(event) => {
                  setConfig((current) => ({
                    ...current,
                    colors: { ...current.colors, accent: event.target.value },
                  }));
                }}
              />
            </label>
          </div>

          <label className="field">
            Preview cart subtotal (USD)
            <input
              type="number"
              min={0}
              step="0.01"
              value={subtotal}
              onChange={(event) => {
                setSubtotal(event.target.valueAsNumber);
              }}
            />
          </label>
        </form>

        <section className="panel">
          <h2>Storefront preview</h2>
          <p className="preview-note">
            Placeholder widget. It does not read the form yet.
          </p>
          <div ref={previewRef} className="mount" />
          <pre>{JSON.stringify({ ...config, subtotal }, null, 2)}</pre>
        </section>
      </div>

      <footer>SDK {SDK_VERSION} (stub)</footer>
    </main>
  );
}
