import request from '@/utils/request'

export function checkStatus(params) {
  return request({
    url: '',
    method: 'GET'
  })
}

export function getResources(params) {
  return request({
    url: 'v1/wialon/resources',
    method: 'get',
    params
  })
}

// export function createNotification(params) {
//   return request({
//     url: 'v1/'
//   })
// }
