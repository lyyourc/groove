import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'

import router from './router'
import App from './App.vue'

Vue.use(VueRx, Rx)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
