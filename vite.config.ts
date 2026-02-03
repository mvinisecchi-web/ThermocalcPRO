import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Adicione esta linha abaixo para garantir que os caminhos do CSS/JS funcionem na Vercel
  base: '/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Remova o bloco 'define' antigo, pois o Vite já gerencia o VITE_GEMINI_API_KEY automaticamente
})