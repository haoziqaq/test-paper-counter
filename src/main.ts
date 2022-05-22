import App from './App.vue'
import '@varlet/touch-emulator'
import { createApp } from 'vue'
import dark from '@varlet/ui/es/themes/dark'
import { StyleProvider } from '@varlet/ui'
import 'uno.css'

StyleProvider(dark)

createApp(App).mount('#app')
