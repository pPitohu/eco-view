import '@/assets/scss/main.scss'
import 'vue-toastification/dist/index.css'
import { createPinia } from 'pinia'
import PiniaPersistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from '@/App/App.vue'
import { ToastOptions } from '@/plugins/toast'
import router from '@/router'

const pinia = createPinia()
pinia.use(PiniaPersistedState)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Toast, ToastOptions)

app.mount('#app')
