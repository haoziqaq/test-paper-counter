import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import uno from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { defineConfig } from 'vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({ reactivityTransform: true }),
    uno({
      presets: [
        presetAttributify(),
        presetUno(),
      ],
    }),
    components({
      resolvers: [VarletUIResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
