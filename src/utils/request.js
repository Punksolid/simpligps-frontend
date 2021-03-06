import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, getTenantID, setToken } from './auth'
import { ErrorsHandling } from './errors_handling'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 60000 // request timeout
// })
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
      config.headers['X-Tenant-Id'] = getTenantID()
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(function(response) {
  if (response.headers['x-token']) {
    setToken(response.headers['x-token'])
  }
  // Do something with response data
  return response
}, function(error) {
  // Do something with response error
  return ErrorsHandling(error)
})

// response interceptor
// service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
    // response => {
    //   const res = response.data
    //   console.log(res.code)
    //   console.log('<-codigo')
    //   return response
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       })
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         // 请自行在引入 MessageBox
  //         // import { Message, MessageBox } from 'element-ui'
  //         MessageBox.confirm('Se ha desconectado, puede cancelar para permanecer en esta página o volver a iniciar sesión, \'Aceptar\'', {
  //           confirmButtonText: 'Volver a iniciar sesión',
  //           cancelButtonText: 'Cancelar',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload() // 为了重新实例化vue-router对象 避免bug
  //           })
  //         })
  //       }
  //       return Promise.reject('error')
  //     } else {
  //       return response.data
  //     }
  //   },
  // error => {
  //   console.log(error.message) // for debug
  //   console.log('blabla') // for debug
  //   console.log(error)
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
// )

export default service
