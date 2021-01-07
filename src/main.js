// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./router";
import Master from "./layouts/Master";
import {store} from './store/store'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.min.css'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


const router = new VueRouter({
  mode: 'history',
  routes,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  components: {Master},
  template: '<Master/>'
})
