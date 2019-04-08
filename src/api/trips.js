import request from '@/utils/request'

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
export function tripList(params) {
  return request({
    url: 'v1/trips',
    method: 'GET',
    data: params
  })
}
