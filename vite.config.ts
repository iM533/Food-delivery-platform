/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {playwright} from "@vitest/browser-playwright";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['babel-plugin-react-compiler'],
    },
  })],
  test: {
    globals: true,
    browser: {
      enabled: true,
      headless: false,
      provider: playwright(),
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
  }
})
