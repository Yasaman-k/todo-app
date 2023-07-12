import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import './assets/tailwind.css'
const pinia = createPinia()
createApp(App).use(pinia)
createApp(App).use(router).mount('#app')
