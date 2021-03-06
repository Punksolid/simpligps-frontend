import request from '@/utils/request'

export function fetchDevices(params) {
  return request({
    url: 'v1/devices',
    method: 'GET',
    params: params
  })
}
export function searchDevices(params) {
  return request({
    url: 'v1/devices/search',
    method: 'GET',
    params: params
  })
}
export function fetchDevice(id) {
  return request({
    url: 'v1/devices/' + id,
    method: 'GET',
    params: ''
  })
}
export function newDevice(params) {
  return request({
    url: 'v1/devices',
    method: 'POST',
    data: params
  })
}
export function updateDevice(id, params) {
  return request({
    url: 'v1/devices/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteDevice(id, params) {
  return request({
    url: 'v1/devices/' + id,
    method: 'DELETE'
  })
}
