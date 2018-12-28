import request from '@/utils/request'

export function updateAccessKey(params) {
  return request({
    url: 'v1/settings/',
    method: 'POST',
    params
  })
}

export function getSettings() {
  return request({
    url: 'v1/settings/',
    method: 'GET'
  })
}
