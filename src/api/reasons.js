import request from '@/utils/request'

export function reasonsList(params) {
  return request({
    url: 'v1/cancelation_reasons',
    method: 'GET',
    params: params
  })
}
export function createReason(params) {
  return request({
    url: 'v1/cancelation_reasons',
    method: 'POST',
    data: params
  })
}
export function updateReason(id, params) {
  return request({
    url: 'v1/cancelation_reasons/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteReason(id) {
  return request({
    url: 'v1/cancelation_reasons/' + id,
    method: 'DELETE'
  })
}
