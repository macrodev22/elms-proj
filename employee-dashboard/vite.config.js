import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode == 'production' ? '/static/employee_dashboard': '',
    plugins: [
      react(),
      tailwindcss(),
      ],
  }
})
