import '@/assets/scss/main.scss'
import 'vue-toastification/dist/index.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import vClickOutside from 'click-outside-vue3'
import { createPinia } from 'pinia'
import PiniaPersistedState from 'pinia-plugin-persistedstate'
import VWave from 'v-wave'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import YmapPlugin from 'vue-yandex-maps'
import App from '@/App/App.vue'
import { ToastOptions } from '@/plugins/toast'
import router from '@/router'

export const YmapSettings = {
  apiKey: import.meta.env.VITE_YMAP_API_KEY as string,
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
  debug: true
}

const pinia = createPinia()
pinia.use(PiniaPersistedState)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Toast, ToastOptions)
app.use(autoAnimatePlugin)
app.use(VWave, {})
app.use(YmapPlugin, YmapSettings)
app.use(vClickOutside)

app.mount('#app')
