import request from '@/utils/request'

export function createUser(params) {
  return request({
    url: 'v1/users',
    method: 'POST',
    data: params
  })
}
export function updateUser(id, params) {
  return request({
    url: 'v1/users/' + id,
    method: 'PUT',
    data: params
  })
}
export function usersList(params) {
  return request({
    url: 'v1/users',
    method: 'GET',
    params: params
  })
}
export function loggedUser() {
  return request({
    url: 'v1/me',
    method: 'GET'
  })
}
