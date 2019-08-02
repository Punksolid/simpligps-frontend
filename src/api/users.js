import request from '@/utils/request'

export function createUser(params) {
  return request({
    url: 'v1/users',
    method: 'POST',
    data: params
  })
}
export function deleteUser(user_id) {
  return request({
    url: 'v1/users/' + user_id,
    method: 'DELETE'
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
export function getUserLogs(params) {
  return request({
    url: 'v1/account/access_logs',
    method: 'GET',
    params: params
  })
}
