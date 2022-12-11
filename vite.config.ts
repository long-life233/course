
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': require('path').join(__dirname, 'src'),
      'views': require('path').join(__dirname, 'src/views')
    }
  },
  base: './'
})
