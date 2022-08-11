import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(ArcoVue).use(ArcoVueIcon).mount('#app')
