import request from '@/utils/request'

export function getPlaces(params) {
  return request({
    url: 'v1/places',
    method: 'GET',
    params
  })
}
export function createPlace(params) {
  return request({
    url: 'v1/places',
    method: 'POST',
    data: params
  })
}
export function updatePlace(id, params) {
  return request({
    url: 'v1/places/' + id,
    method: 'PUT',
    data: params
  })
}
export function deletePlace(id) {
  return request({
    url: 'v1/places/' + id,
    method: 'DELETE'
  })
}
