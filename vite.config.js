import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/shareModal/ShareModal.jsx"),
      name: "lit-share-modal",
      fileName: (format) => `lit-share-modal.${format}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["lit-js-sdk", "react", "react-dom"],
      output: {
        globals: {
          React: "react",
          ReactDom: "react-dom",
          LitJsSdk: "lit-js-sdk",
        },
      },
    },
  },
  plugins: [react(), viteCommonjs()],
  define: {
    global: {},
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
