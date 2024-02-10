import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import OhVueIcon from './icons'
import AppCard from '@/components/AppCard.vue'

const app = createApp(App)

app.component('app-card', AppCard)
app.component('v-icon', OhVueIcon)

app.use(router)
app.use(store)

app.mount('#app')
