import { Message } from 'element-ui'

export function ErrorsHandling(error) {
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
