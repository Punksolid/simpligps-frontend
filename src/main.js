import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import './assets/global/plugins/jquery/jquery-3.1.0.min.js' // make
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/assets/global/css/fontawesome-all.css'
import '@/styles/iofrm-style.css' // make

import '@/styles/iofrm-theme9.css' // make
// Make Panel
import '@/assets/global/css/style.css'
import '@/assets/global/css/theme.css'
import '@/assets/global/css/ui.css'
import '@/assets/global/css/icons/line-icons/simple-line-icons.css'
import '@/assets/admin/layout3/js/layout.js'

// Vue GMaps
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App'
import store from './store'
import router from './router'
// import Pusher from 'pusher-js'
import Echo from 'laravel-echo'

// import './mock' // simulation data should be deleted on prod
import '@/permission' // permission control, verifica que usuario tenga permisos
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCzsnMy1tCub2fzL9_5W2zlLvlWlHyMu-c', // Create a custom API for TRM.
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // If you want to set the version, you can do so:
    // v: '3.26',
  }
})

window.event = new Vue()
window.Pusher = require('pusher-js')
window.Echo = new Echo({
  authEndpoint: process.env.BASE + 'broadcasting/auth',
  broadcaster: 'pusher',
  key: '535c65dd1f4182513a5f',
  auth: {
    headers: {
      Authorization: 'Bearer ' + store.getters.token
    }
  }
  // cluster: 'mt1'
})

Vue.config.productionTip = false

// import * as filters from './filters' // global filters

Vue.use(Element, {
  locale,
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
