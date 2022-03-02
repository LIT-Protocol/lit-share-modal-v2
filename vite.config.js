import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'lit-modal-vite',
      fileName: (format) => `lit-modal-vite.${format}.js`,
    },
    rollupOptions: {
      external: [
        'lit-js-sdk',
        'react',
        'react-dom'
      ],
      output: {
        globals: {
          react: 'React',
          LitJsSdk: 'lit-js-sdk',
        }
      }
    }
  },
  plugins: [react()],
  define: {
    "global": {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
}
})
