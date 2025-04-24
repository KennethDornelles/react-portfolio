import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Isso é importante para o Vercel (diferente do GitHub Pages que pode precisar do nome do repo)
})
