import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

// test
import '@/styles/bootstrap.min.css'
// import '@/styles/fontawesome-all.min.css'
import '@/styles/iofrm-style.css'
import '@/styles/iofrm-theme9.css'

import App from './App'
import router from './router'
import store from './store'

// import './mock' // simulation data should be deleted on prod
import '@/mock'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
