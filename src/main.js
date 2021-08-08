import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Global } from './Global'
import vuetify from './plugins/vuetify'
import './plugins/base'

Vue.use(VueAxios, axios)

export const axiosConfig = {
    baseURL: Global.urlPublic
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')