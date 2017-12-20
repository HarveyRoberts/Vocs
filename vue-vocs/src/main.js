
import Vue from 'vue'

import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import draggable from 'vuedraggable'

import { store } from './store'
Vue.use(VueResource)
Vue.use(Vuetify)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  draggable,
  render: h => h(App)
})
