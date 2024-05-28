import path from "path";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createHtmlPlugin} from "vite-plugin-html";
import {viteStaticCopy} from "vite-plugin-static-copy";

const srcPath = path.resolve(__dirname, 'src')

export default defineConfig({
    server: {
        port: 8001,
    },
    resolve: {
        alias: {
            '@/': `${srcPath}/`,
        }
    },
    plugins: [
        vue(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: '练习题'
                }
            }
        }),
        /*viteStaticCopy({
            silent: true,
            targets: [
                {
                    src: 'dist/*',
                    dest: path.resolve(__dirname, 'docs')
                }
            ]
        })*/
    ],
    base:'./',
    build: {
        chunkSizeWarningLimit: 1500,
    },
})
