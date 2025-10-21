import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    optimizeDeps: {
    include: ['@apollo/client', 'graphql'],
  },
  plugins: [react()],

     commonjsOptions: {
      esmExternals: true 
   },
})
