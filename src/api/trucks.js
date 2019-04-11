import request from '@/utils/request'

export function createTruck(params) {
  return request({
    url: 'v1/trucks',
    method: 'POST',
    data: params
  })
}
export function updateTruck(id, params) {
  return request({
    url: 'v1/trucks/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteTruck(user_id) {
  return request({
    url: 'v1/trucks/' + user_id,
    method: 'DELETE'
  })
}
export function trucksList(params) {
  return request({
    url: 'v1/trucks',
    method: 'GET',
    data: params
  })
}
export function loggedTruck() {
  return request({
    url: 'v1/me',
    method: 'GET'
  })
}
