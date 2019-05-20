import { Message } from 'element-ui'
import store from '../store'


export function ErrorsHandling(error) {
  if (error.code === 'ECONNABORTED') {
    Message({
      message: 'Try again later',
      type: 'error'
    })
    return Promise.reject(error)
  }
  if (error.response.status === 422) {
    Message({
      message: error.response.data.errors.message,
      type: 'error'
    })

    var composed_message = ''

    for (var [key_errors, errors] of Object.entries(error.response.data.errors)) {
      let errors_explanations = ''
      for (var error_detail of errors) {
        errors_explanations += `<li>${error_detail}</li>`
      }
      composed_message += `
        ${key_errors}
        <ul>
          ${errors_explanations}
        </ul>
      `
    }
    Message({
      dangerouslyUseHTMLString: true,
      message: composed_message,
      type: 'error'
    })
  }
  if (error.response.status === 401) { // Authentication error
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    store.dispatch('LogOut').then(() => {
      location.reload() // 为了重新实例化vue-router对象 避免bug
    })
  }
  if (error.response.status === 500) { // Internal server error
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
  }

  return Promise.reject(error)
}
