import './assets/main.scss'

import { createApp } from 'vue'
import InlineSvg from 'vue-inline-svg'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('InSvg', InlineSvg)

app.use(router)

app.mount('#app')
