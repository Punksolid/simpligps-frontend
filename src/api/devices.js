import request from '@/utils/request'

export function getDevices(params) {
  return request({
    url: 'v1/devices',
    method: 'GET',
    params
  })
}
export function newDevice(params) {
  return request({
    url: 'v1/devices',
    method: 'POST',
    params
  })
}
export function deleteDevice(id, params) {
  return request({
    url: 'v1/devices/' + id,
    method: 'DELETE',
    params
  })
}
