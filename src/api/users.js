import request from '@/utils/request'

export function createUser(params) {
  return request({
    url: 'v1/users',
    method: 'post',
    params
  })
}
export function updateUser(id, params) {
  return request({
    url: 'v1/users/' + id,
    method: 'PUT',
    params
  })
}
export function usersList(params) {
  return request({
    url: 'v1/users',
    method: 'get',
    params: params
  })
}
export function loggedUser() {
  return request({
    url: 'v1/me',
    method: 'GET'
  })
}
