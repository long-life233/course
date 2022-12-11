import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/index.css'

const app = createApp(App)

const pinia = createPinia().use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
