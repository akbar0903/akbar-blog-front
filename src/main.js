import { createApp } from 'vue'
import pinia from '@/stores/index.js'
import App from './App.vue'
import router from './router'
import './style.css'
import '@/styles/index.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
