import request from '@/utils/request'

export function getCarriers(params) {
  return request({
    url: 'v1/carriers',
    method: 'GET',
    params
  })
}
export function createCarrier(params) {
  return request({
    url: 'v1/carriers',
    method: 'POST',
    data: params
  })
}
export function deleteCarrier(id) {
  return request({
    url: 'v1/carriers/' + id,
    method: 'DELETE'
  })
}
