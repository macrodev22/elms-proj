import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode == 'production' ? '/static/hr_dashboard/' : '',
    plugins: [
      vue(),
      tailwindcss(),
     ],
  }
})
