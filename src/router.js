import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Sorting from './components/sorting/index.vue'
import BubbleSort from './components/sorting/Bubble.vue'
import SelectSort from './components/sorting/Select.vue'


Vue.use(VueRouter)

export default new VueRouter ({
  routes: [
    { path: '/' , component: Home },
    { path: '/sorting', component: Sorting,
      children: [
        { path: 'bubble', component: BubbleSort },
        { path: 'select', component: SelectSort },
      ]
    },
  ]
})
