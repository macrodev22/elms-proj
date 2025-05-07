import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'
import router from './routes'
import './style.css'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'

const toastOptions = {
 autoClose: 3000,
}
const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.use(Vue3Toastify, toastOptions)
.mount('#app')
