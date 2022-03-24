import 'core-js/stable'; 
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import MarkDown from '@/views/MarkDown/index'
Vue.config.productionTip = false
Vue.use(MarkDown)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
