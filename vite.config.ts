/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    }, 
    plugins: [
      react(),
      svgr({ svgrOptions: { icon: true } })
    ],
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    server: {
      open: true
    }
  }
})
