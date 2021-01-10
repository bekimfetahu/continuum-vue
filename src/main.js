// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./router";
import Master from "./layouts/Master";
import {store} from './store/store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import {TablePlugin} from 'bootstrap-vue'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
//setup base api for all request

axios.defaults.baseURL = process.env.SERVER_API
axios.defaults.headers.common['Accepts'] = 'application/json'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(TablePlugin)


import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const router = new VueRouter({
  mode: 'history',
  routes,
})
function loggedIn() {
  return localStorage.getItem('access_token') !== null
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  components: {Master},
  template: '<Master/>'
})
