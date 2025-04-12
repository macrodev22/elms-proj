import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode == 'production' ? '/static/hr_dashboard/' : '',
    plugins: [vue()],
  }
})
