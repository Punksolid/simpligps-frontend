import request from '@/utils/request'

export function fetchCarriers(params) {
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
export function updateCarrier(id, params) {
  return request({
    url: 'v1/carriers/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteCarrier(id) {
  return request({
    url: 'v1/carriers/' + id,
    method: 'DELETE'
  })
}
export function searchCarriers(params) {
  return request({
    url: 'v1/carriers/search',
    method: 'GET',
    params: params
  })
}
