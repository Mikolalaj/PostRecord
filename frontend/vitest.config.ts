import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            hooks: '/src/hooks',
            components: '/src/components',
            types: '/src/types',
            atoms: '/src/atoms',
            utils: '/src/utils',
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests-setup.ts',
    },
})
