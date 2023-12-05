import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        manifest: {
            "name": 'OurChain Wallet',
            "description": "A Wallet demo built with OurChain",
            "theme_color": "#242424",

            // 为了方便，使用svg图标
            icons: [
                {
                    "src": "/vite.svg",
                    "sizes": "192x192",
                    "type": "image/svg+xml"
                },
                {
                    "src": "/vite.svg",
                    "sizes": "512x512",
                    "type": "image/svg+xml"
                }
            ]
        },
        devOptions: {
            // 如果想在`vite dev`命令下调试PWA, 必须启用它
            enabled: true,
            // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致
            type: "module"
        }
    })],
})
