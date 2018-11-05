
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

// import '@/styles/style.css' // make GLOBAL
// import '@/styles/theme.css' // make global
// import '@/styles/ui.css' // make global
 import '@/styles/bootstrap.min.css' // make
// import '@/styles/fontawesome-all.min.css'
 import '@/styles/iofrm-style.css' // make
 import '@/styles/iofrm-theme9.css' // make

import App from './App'
import router from './router'
import store from './store'

// import i18n from './lang' // Internationalization
import './icons' // icon
// import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data

// import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,

  render: h => h(App)
})

