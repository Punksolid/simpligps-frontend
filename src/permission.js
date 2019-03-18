import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { getTenantID } from './utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

// const dontRequireTenant = ['/login', '/404', '/login/:mode', '/user_settings']

// function getInfoOrDropToken(next) {
//   store.dispatch('GetInfo').then(res => { // Obtener información del usuario
//     next()
//   }).catch((err) => {
//     store.dispatch('FedLogOut').then(() => {
//       Message.error(err || 'Verification failed, please login again')
//       next({ path: '/' })
//     })
//   })
// }

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) { // si tiene token entonces avanza
    if (to.path === '/login') { // si tiene token e intenta entrar en el login lo redirige al dashboard
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else { // si intenta ir a cualquier ruta y tiene token entrar[a aqui
      if (getTenantID() || to.path === '/login/select_account/') {
        console.log('tiene tenant')
        next()
        // if (store.getters.roles.length === 0) {
        //   // getInfoOrDropToken(next)
        // } else {
        //   next()
        // }
      } else {
        next({ path: '/login/select_account/' })
      }
    }
  } else { // si no tiene token entonces o da acceso libre al login o setea redirect
    if (whiteList.indexOf(to.path) !== -1) { // si el path al que se dirige se encuentra en el whitelist entonces prosigue
      next()
    } else { // si no se encuentra en el whitelist lo agarra como parametro pero lo envia al login por que no existe el token
      next(`/login?redirect=${to.path}`) // De lo contrario redirigir taodo a la página de inicio de sesión.
      NProgress.done()
    }
  }
})

// function requireTenant(route) {
//   return !dontRequireTenant.includes(route.path)
// }

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  console.log(next)
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
