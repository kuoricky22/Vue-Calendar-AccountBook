import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
