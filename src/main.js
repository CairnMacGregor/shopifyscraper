import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import VueJsonToCsv from 'vue-json-to-csv'
import JsonCSV from 'vue-json-csv'

// Vue.use(VueJsonToCsv)
Vue.use(BootstrapVue)
Vue.component('downloadCsv', JsonCSV)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
