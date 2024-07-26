import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    esbuild: { target: 'es2022' },
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['./src/**/*.test.{ts,tsx,js,jsx}']
  },
})