import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  if (mode === "library") {
    return {
      build: {
        lib: {
          entry: fileURLToPath(new URL("./src/sdk/index.ts", import.meta.url)),
          name: "Abra",
          fileName: "abra-sdk",
          formats: ["es", "iife"],
        },
        outDir: "dist/sdk",
        emptyOutDir: true,
      },
    };
  }

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          admin: fileURLToPath(new URL("./index.html", import.meta.url)),
          storefront: fileURLToPath(new URL("./demo/storefront.html", import.meta.url)),
        },
      },
    },
  };
});
