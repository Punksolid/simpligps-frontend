import request from '@/utils/request'

export function updateAccessKey(params) {
  return request({
    url: 'v1/settings/',
    method: 'POST',
    data: params
  })
}

export function getSettings() {
  return request({
    url: 'v1/settings/',
    method: 'GET'
  })
}
