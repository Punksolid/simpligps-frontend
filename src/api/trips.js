import request from '@/utils/request'

export function tripList(params) {
  return request({
    url: 'v1/trips',
    method: 'GET',
    data: params
  })
}
export function createTrip(params) {
  return request({
    url: 'v1/trips',
    method: 'POST',
    data: params
  })
}
export function updateTrip(id, params) {
  return request({
    url: 'v1/trips/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteTrip(id) {
  return request({
    url: 'v1/trips/' + id,
    method: 'DELETE'
  })
}
export function tripDetails(id) {
  return request({
    url: 'v1/trips/' + id,
    method: 'GET'
  })
}
export function fetchTripLog(id) {
  return request({
    url: 'v1/trips/' + id + '/logs',
    method: 'GET'
  })
}
