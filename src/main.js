import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Utilizar axios para consumir apis
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(VueAxios, axios).use(store).use(router)

app.mount('#app')
