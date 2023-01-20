import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import babel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv(process.env.MODE, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      babel({
        babelConfig: {
          babelrc: false,
          configFile: false,
          presets: [
            '@vue/cli-plugin-babel/preset',
            '@babel/preset-env',
          ],
          plugins: [
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: +env.VITE_CLIENT_PORT || 8080,
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/variables.scss";
          `,
        }
      }
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      commonjsOptions: {
        sourceMap: true,
      },
      rollupOptions: {
        external: [
          'lodash',
        ]
      }
    }
  })
}
