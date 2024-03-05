import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
    resolve: {
        alias: {
            hooks: '/src/hooks',
            components: '/src/components',
            types: '/src/types',
            atoms: '/src/atoms',
            utils: '/src/utils',
        },
    },
})
