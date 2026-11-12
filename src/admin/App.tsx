
import { useEffect, useRef, useState } from "react";
import {
  Abra,
  samplePromo,
  SDK_VERSION,
  type PromoConfig,
} from "../sdk";

export function App() {
  const [config, setConfig] = useState<PromoConfig>(samplePromo);
  const [subtotal, setSubtotal] = useState(57);

  const previewRef = useRef<HTMLDivElement>(null);

  // Preserve the initial values for the one-time initialization.
  const initialValues = useRef({ config, subtotal });

  // Initialize the Web Component only once.
  useEffect(() => {
    const target = previewRef.current;

    if (!target) return;

    Abra.init({
      target,
      config: initialValues.current.config,
      subtotal: initialValues.current.subtotal,
    });

    return () => {
      Abra.destroy();
    };
  }, []);

  // Validate the configuration.
  const errors = {
    threshold:
      !Number.isFinite(config.threshold) || config.threshold < 0
        ? "Threshold must be a valid non-negative number."
        : "",
    code: config.code.trim()
      ? ""
      : "Promo code is required.",
    subtotal:
      !Number.isFinite(subtotal) || subtotal < 0
        ? "Subtotal must be a valid non-negative number."
        : "",
  };

  const isValid = Object.values(errors).every((error) => !error);

  // Update the existing widget whenever valid values change.
  useEffect(() => {
    if (!isValid) return;

    Abra.update({
      config,
      subtotal,
    });
  }, [config, subtotal, isValid]);

  return (
    <main className="shell">
      <header>
        <h1>Promotion preview</h1>
        <p>
          Configure the gift banner. The preview mounts the
          storefront element.
        </p>
      </header>

      <div className="layout">
        <form
          className="panel"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2>Merchant config</h2>

          <label className="field">
            Threshold (USD)
            <input
              type="number"
              min={0}
              step="0.01"
              value={
                Number.isNaN(config.threshold)
                  ? ""
                  : config.threshold
              }
              aria-invalid={!!errors.threshold}
              onChange={(event) => {
                setConfig((current) => ({
                  ...current,
                  threshold: event.target.valueAsNumber,
                }));
              }}
            />
            {errors.threshold && (
              <span className="error" role="alert">
                {errors.threshold}
              </span>
            )}
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
              aria-invalid={!!errors.code}
              onChange={(event) => {
                setConfig((current) => ({
                  ...current,
                  code: event.target.value,
                }));
              }}
            />
            {errors.code && (
              <span className="error" role="alert">
                {errors.code}
              </span>
            )}
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
                    colors: {
                      ...current.colors,
                      background: event.target.value,
                    },
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
                    colors: {
                      ...current.colors,
                      text: event.target.value,
                    },
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
                    colors: {
                      ...current.colors,
                      accent: event.target.value,
                    },
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
              value={Number.isNaN(subtotal) ? "" : subtotal}
              aria-invalid={!!errors.subtotal}
              onChange={(event) => {
                setSubtotal(event.target.valueAsNumber);
              }}
            />
            {errors.subtotal && (
              <span className="error" role="alert">
                {errors.subtotal}
              </span>
            )}
          </label>
        </form>

        <section className="panel">
          <h2>Storefront preview</h2>

          <p className="preview-note">
            {isValid
              ? "Live preview of the storefront widget."
              : "Fix the validation errors to update the preview."}
          </p>

          <div ref={previewRef} className="mount" />

          <pre>
            {JSON.stringify({ ...config, subtotal }, null, 2)}
          </pre>
        </section>
      </div>

      <footer>SDK {SDK_VERSION}</footer>
    </main>
  );
}
