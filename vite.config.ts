import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"
// eslint-disable-next-line import/default
import checker from "vite-plugin-checker"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 8080
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true
    })
  ]
})
