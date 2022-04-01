import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import nodePolyfills from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
